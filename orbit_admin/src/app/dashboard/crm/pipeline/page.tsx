"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  collection,
  getDocs,
  query,
  orderBy,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "@/lib/firebase-crm";
import { LeadData, LeadStatus } from "@/types/crm";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import {
  Loader2,
  ExternalLink,
  Calendar,
  Mail,
  MessageSquare,
  Target,
  DollarSign,
  X,
  Trash2,
  GripVertical,
  Filter,
  XCircle,
} from "lucide-react";

const cn = (...classes: (string | boolean | undefined)[]) =>
  classes.filter(Boolean).join(" ");

const toDate = (value: any) => {
  if (!value) return new Date(0);
  if (typeof value === "string" || typeof value === "number")
    return new Date(value);
  if ((value as any).seconds) return new Date((value as any).seconds * 1000);
  return new Date(value);
};

const formatDateShort = (value: any) => toDate(value).toLocaleDateString();
const formatDateLong = (value: any) => toDate(value).toLocaleString();

const getStatusBadgeClass = (status: LeadStatus) => {
  switch (status) {
    case "leads":
      return "bg-slate-100 text-slate-700 border-slate-300";
    case "contacted":
      return "bg-blue-100 text-blue-700 border-blue-300";
    case "won":
      return "bg-green-100 text-green-700 border-green-300";
    case "lost":
      return "bg-red-100 text-red-700 border-red-300";
    default:
      return "bg-slate-100 text-slate-700 border-slate-300";
  }
};

interface PipelineColumn {
  id: LeadStatus;
  title: string;
  leads: LeadData[];
}

// Lead Card Component
function LeadCard({
  lead,
  onClick,
  onDragStart,
  onDragEnd,
  isDragging,
}: {
  lead: LeadData;
  onClick: () => void;
  onDragStart: (e: React.DragEvent) => void;
  onDragEnd: () => void;
  isDragging?: boolean;
}) {
  return (
    <div
      draggable
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onClick={onClick}
      className={cn(
        "bg-card border border-border rounded-lg p-3 cursor-grab active:cursor-grabbing transition-all shadow-sm hover:shadow-md relative group",
        isDragging && "opacity-50 rotate-2 scale-95",
      )}
    >
      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <GripVertical size={14} className="text-muted-foreground" />
      </div>
      <div className="space-y-2">
        <div className="flex items-start justify-between gap-2">
          <h4 className="font-medium text-foreground text-sm line-clamp-1">
            {lead.name}
          </h4>
        </div>

        {(lead.workEmail || lead.email) && (
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Mail size={12} />
            <span className="truncate">{lead.workEmail || lead.email}</span>
          </div>
        )}

        {lead.phoneNumber && (
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <span className="text-[10px] font-bold bg-accent px-1 rounded text-foreground opacity-70">
              +91
            </span>
            <span>{lead.phoneNumber}</span>
          </div>
        )}

        {lead.category && (
          <div className="mt-1">
            <span className="text-[10px] font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-full">
              {lead.category}
            </span>
          </div>
        )}

        {(lead.budget || lead.revenueRange) && (
          <div className="flex items-center gap-1.5 text-xs text-foreground font-medium pt-1">
            <DollarSign size={12} className="text-muted-foreground" />
            {lead.budget || lead.revenueRange}
          </div>
        )}

        {(lead.goals || lead.message) && (
          <p className="text-xs text-muted-foreground line-clamp-2 italic">
            "{lead.goals || lead.message}"
          </p>
        )}

        <div className="flex items-center gap-1.5 text-xs text-muted-foreground pt-1 border-t border-border">
          <Calendar size={10} />
          <span>{formatDateShort(lead.createdAt || lead.timestamp)}</span>
        </div>
      </div>
    </div>
  );
}

// Pipeline Column Component
function PipelineColumn({
  id,
  title,
  leads,
  onCardClick,
  onDrop,
  onDragOver,
  draggedLeadId,
}: {
  id: LeadStatus;
  title: string;
  leads: LeadData[];
  onCardClick: (lead: LeadData) => void;
  onDrop: (e: React.DragEvent, targetStatus: LeadStatus) => void;
  onDragOver: (e: React.DragEvent) => void;
  draggedLeadId?: string | null;
}) {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
    onDragOver(e);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
    onDrop(e, id);
  };

  return (
    <div
      className={cn(
        "flex flex-col min-w-[280px] w-[280px] h-full transition-colors",
        isDragOver && "bg-accent/20",
      )}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="flex items-center justify-between gap-2 p-3 sticky top-0 bg-background z-10 border-b border-border">
        <h3 className="text-sm font-medium text-foreground">{title}</h3>
        <span className="text-xs font-mono bg-muted text-muted-foreground px-2 py-0.5 rounded-full">
          {leads.length}
        </span>
      </div>

      <div className="flex-1 p-3 space-y-3 overflow-y-auto">
        {leads.length > 0 ? (
          leads.map((lead) => (
            <div key={lead.id}>
              <LeadCard
                lead={lead}
                onClick={() => onCardClick(lead)}
                onDragStart={(e) => {
                  e.dataTransfer.effectAllowed = "move";
                  e.dataTransfer.setData("text/plain", lead.id);
                }}
                onDragEnd={() => {}}
                isDragging={draggedLeadId === lead.id}
              />
            </div>
          ))
        ) : (
          <div
            className={cn(
              "flex items-center justify-center h-24 text-sm text-muted-foreground border border-dashed border-border rounded-md transition-colors",
              isDragOver && "border-primary bg-accent/10",
            )}
          >
            {isDragOver ? "Drop here" : "No leads"}
          </div>
        )}
      </div>
    </div>
  );
}

// Lead Detail Modal
function LeadDetail({
  lead,
  isOpen,
  onClose,
  onStatusChange,
  onDelete,
}: {
  lead: LeadData | null;
  isOpen: boolean;
  onClose: () => void;
  onStatusChange: (leadId: string, newStatus: LeadStatus) => void;
  onDelete: (leadId: string) => void;
}) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  if (!lead || !isOpen) return null;

  const statusOptions: { value: LeadStatus; label: string }[] = [
    { value: "leads", label: "Leads" },
    { value: "contacted", label: "Contacted" },
    { value: "won", label: "Won" },
    { value: "lost", label: "Lost" },
  ];

  return (
    <>
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
        onClick={onClose}
      />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          className="bg-card border border-border rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-6 space-y-6">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-2xl font-bold text-foreground">
                  {lead.name}
                </h2>
                <div className="flex flex-col gap-1 mt-1">
                  {(lead.workEmail || lead.email) && (
                    <p className="text-sm text-muted-foreground flex items-center gap-2">
                      <Mail size={14} /> {lead.workEmail || lead.email}
                    </p>
                  )}
                  {lead.phoneNumber && (
                    <p className="text-sm text-muted-foreground flex items-center gap-2">
                      <span className="text-xs font-bold">+91</span>{" "}
                      {lead.phoneNumber}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2">
                {!showDeleteConfirm ? (
                  <button
                    onClick={() => setShowDeleteConfirm(true)}
                    className="p-2 hover:bg-destructive/10 text-destructive rounded-lg transition-colors"
                    title="Delete lead"
                  >
                    <Trash2 size={20} />
                  </button>
                ) : (
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">
                      Delete?
                    </span>
                    <button
                      onClick={() => {
                        onDelete(lead.id);
                        onClose();
                      }}
                      className="px-3 py-1.5 bg-destructive text-destructive-foreground rounded-md text-sm font-medium hover:opacity-90 transition-opacity"
                    >
                      Confirm
                    </button>
                    <button
                      onClick={() => setShowDeleteConfirm(false)}
                      className="px-3 py-1.5 bg-muted text-muted-foreground rounded-md text-sm font-medium hover:bg-accent transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                )}
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-accent rounded-lg transition-colors"
                >
                  <X size={20} className="text-muted-foreground" />
                </button>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2 block">
                  Status
                </label>
                <div className="flex gap-2 flex-wrap">
                  {statusOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => {
                        onStatusChange(lead.id, option.value);
                        onClose();
                      }}
                      className={cn(
                        "px-3 py-1.5 rounded-md text-sm font-medium transition-colors border",
                        lead.status === option.value
                          ? getStatusBadgeClass(option.value)
                          : "bg-white text-muted-foreground border-border hover:bg-accent",
                      )}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1 block">
                    Budget / Revenue / Category
                  </label>
                  <div className="flex flex-col gap-2">
                    {lead.budget && (
                      <p className="text-sm text-foreground font-medium">
                        Budget: {lead.budget}
                      </p>
                    )}
                    {lead.revenueRange && (
                      <p className="text-sm text-foreground font-medium">
                        Revenue: {lead.revenueRange}
                      </p>
                    )}
                    {lead.category && (
                      <p className="text-sm text-foreground">
                        Category:{" "}
                        <span className="text-xs font-medium bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                          {lead.category}
                        </span>
                      </p>
                    )}
                    {!lead.budget && !lead.revenueRange && !lead.category && (
                      <p className="text-sm text-muted-foreground">N/A</p>
                    )}
                  </div>
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1 block">
                    Form Type
                  </label>
                  <span
                    className={cn(
                      "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border",
                      lead.formType === "book-demo"
                        ? "bg-white text-blue-600 border-blue-400"
                        : "bg-white text-blue-700 border-blue-500",
                    )}
                  >
                    {lead.formType === "book-demo" ? "Book Demo" : "Contact"}
                  </span>
                </div>
              </div>

              {lead.website && (
                <div>
                  <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1 block">
                    Website
                  </label>
                  <a
                    href={lead.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-primary hover:opacity-80 text-sm"
                  >
                    <ExternalLink size={14} />
                    <span className="truncate">{lead.website}</span>
                  </a>
                </div>
              )}

              {lead.goals && (
                <div>
                  <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1 block">
                    Goals
                  </label>
                  <p className="text-sm text-foreground">{lead.goals}</p>
                </div>
              )}

              {lead.message && (
                <div>
                  <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1 block">
                    Message
                  </label>
                  <p className="text-sm text-foreground">{lead.message}</p>
                </div>
              )}

              <div>
                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1 block">
                  Submitted
                </label>
                <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <Calendar size={14} />
                  <span>
                    {formatDateLong(lead.createdAt || lead.timestamp)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// Main Pipeline Page
export default function PipelinePage() {
  const [leads, setLeads] = useState<LeadData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedLead, setSelectedLead] = useState<LeadData | null>(null);
  const [draggedLeadId, setDraggedLeadId] = useState<string | null>(null);
  const [formTypeFilter, setFormTypeFilter] = useState<string>("all");
  const [dateRange, setDateRange] = useState<{ start: string; end: string }>({
    start: "",
    end: "",
  });

  const filteredLeads = leads.filter((lead) => {
    if (formTypeFilter !== "all" && lead.formType !== formTypeFilter) {
      return false;
    }

    if (dateRange.start && dateRange.end) {
      const start = new Date(dateRange.start).getTime();
      const end = new Date(dateRange.end).getTime() + 86400000;
      const leadDate = lead.createdAt || lead.timestamp;

      if (!leadDate) return false;

      const time =
        typeof leadDate === "string"
          ? new Date(leadDate).getTime()
          : (leadDate as any).seconds
            ? (leadDate as any).seconds * 1000
            : 0;

      if (time < start || time > end) return false;
    }

    return true;
  });

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const collectionNames = [
          "leads",
          "forms",
          "submissions",
          "contacts",
          "formSubmissions",
        ];
        let leadsData: LeadData[] = [];
        let lastError: any = null;

        for (const collectionName of collectionNames) {
          try {
            let querySnapshot;
            try {
              const q = query(
                collection(db, collectionName),
                orderBy("createdAt", "desc"),
              );
              querySnapshot = await getDocs(q);
            } catch {
              querySnapshot = await getDocs(collection(db, collectionName));
            }

            querySnapshot.forEach((doc) => {
              const data = doc.data();
              leadsData.push({
                id: doc.id,
                ...data,
                status: (data.status as LeadStatus) || "leads",
                collection: collectionName,
              } as LeadData);
            });

            if (leadsData.length > 0) break;
          } catch (err: any) {
            lastError = err;
            continue;
          }
        }

        if (leadsData.length === 0 && lastError) {
          setError(`No leads found. Error: ${lastError.message}`);
        } else {
          setLeads(leadsData);
        }
      } catch (err: any) {
        console.error("Error fetching leads:", err);
        setError(`Failed to load leads: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchLeads();
  }, []);

  const handleStatusChange = async (leadId: string, newStatus: LeadStatus) => {
    try {
      setLeads((prevLeads) =>
        prevLeads.map((lead) =>
          lead.id === leadId ? { ...lead, status: newStatus } : lead,
        ),
      );

      const collectionNames = [
        "leads",
        "forms",
        "submissions",
        "contacts",
        "formSubmissions",
      ];
      const lead = leads.find((l) => l.id === leadId);
      const preferredOrder = lead?.collection
        ? [lead.collection, ...collectionNames]
        : collectionNames;

      let updated = false;
      for (const collectionName of preferredOrder) {
        try {
          const leadRef = doc(db, collectionName, leadId);
          await updateDoc(leadRef, { status: newStatus });
          updated = true;
          console.log(
            `Updated status for ${leadId} in ${collectionName} to ${newStatus}`,
          );
          break;
        } catch (err) {
          continue;
        }
      }

      if (!updated) {
        console.warn(
          "Could not find document to update status in any known collection",
        );
      }
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  const handleDelete = async (leadId: string) => {
    try {
      setLeads((prevLeads) => prevLeads.filter((lead) => lead.id !== leadId));

      const collectionNames = [
        "leads",
        "forms",
        "submissions",
        "contacts",
        "formSubmissions",
      ];
      const lead = leads.find((l) => l.id === leadId);
      const preferredOrder = lead?.collection
        ? [lead.collection, ...collectionNames]
        : collectionNames;

      let deleted = false;
      for (const collectionName of preferredOrder) {
        try {
          const leadRef = doc(db, collectionName, leadId);
          await deleteDoc(leadRef);
          deleted = true;
          console.log(`Deleted document ${leadId} from ${collectionName}`);
          break;
        } catch (err) {
          console.log(`Failed to delete from ${collectionName}:`, err);
          continue;
        }
      }

      if (!deleted) {
        console.warn(
          "Could not find document to delete in any known collection",
        );
      }
    } catch (err) {
      console.error("Error deleting lead:", err);
    }
  };

  const handleDrop = async (e: React.DragEvent, targetStatus: LeadStatus) => {
    e.preventDefault();
    const leadId = e.dataTransfer.getData("text/plain");

    if (leadId) {
      await handleStatusChange(leadId, targetStatus);
    }

    setDraggedLeadId(null);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const getPipelineColumns = (): PipelineColumn[] => {
    const columns: PipelineColumn[] = [
      { id: "leads", title: "Leads", leads: [] },
      { id: "contacted", title: "Contacted", leads: [] },
      { id: "won", title: "Won", leads: [] },
      { id: "lost", title: "Lost", leads: [] },
    ];

    filteredLeads.forEach((lead) => {
      const status = lead.status || "leads";
      const column = columns.find((col) => col.id === status);
      if (column) {
        column.leads.push(lead);
      }
    });

    return columns;
  };

  if (loading) {
    return (
      <SidebarProvider suppressHydrationWarning>
        <AppSidebar variant="inset" />
        <SidebarInset>
          <SiteHeader />
          <div className="flex h-screen items-center justify-center bg-background">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        </SidebarInset>
      </SidebarProvider>
    );
  }

  const columns = getPipelineColumns();

  return (
    <SidebarProvider suppressHydrationWarning>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col" suppressHydrationWarning>
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-6 py-6 md:gap-8 md:py-8">
              <div className="relative h-full flex flex-col bg-background">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 pb-4 bg-background">
                  <div>
                    <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
                      Pipeline View
                    </h1>
                    <p className="text-sm sm:text-base text-muted-foreground mt-1">
                      Drag and drop leads between stages
                    </p>
                  </div>

                  <div className="flex flex-col xl:flex-row items-center gap-4">
                    {/* Form Type Filter */}
                    <div className="flex items-center gap-2 bg-card border border-border rounded-lg p-1">
                      <div className="flex items-center gap-2 px-2 border-r border-border mr-1">
                        <Filter size={14} className="text-muted-foreground" />
                        <span className="text-sm font-medium text-muted-foreground">
                          Type:
                        </span>
                      </div>
                      <select
                        className="bg-transparent text-sm border-none focus:ring-0 text-foreground cursor-pointer pr-8 py-1"
                        value={formTypeFilter}
                        onChange={(e) => setFormTypeFilter(e.target.value)}
                      >
                        <option value="all">All Submissions</option>
                        <option value="book-demo">Book Demo</option>
                        <option value="contact">Contact Us</option>
                      </select>
                    </div>

                    {/* Date Filter */}
                    <div className="flex items-center gap-2 bg-card border border-border rounded-lg p-1">
                      <div className="flex items-center gap-2 px-2">
                        <Calendar size={14} className="text-muted-foreground" />
                        <span className="text-sm font-medium text-muted-foreground">
                          Filter by Date:
                        </span>
                      </div>
                      <input
                        type="date"
                        className="bg-transparent text-sm border-none focus:ring-0 text-foreground placeholder:text-muted-foreground"
                        value={dateRange.start}
                        onChange={(e) =>
                          setDateRange((prev) => ({
                            ...prev,
                            start: e.target.value,
                          }))
                        }
                      />
                      <span className="text-muted-foreground">-</span>
                      <input
                        type="date"
                        className="bg-transparent text-sm border-none focus:ring-0 text-foreground placeholder:text-muted-foreground"
                        value={dateRange.end}
                        onChange={(e) =>
                          setDateRange((prev) => ({
                            ...prev,
                            end: e.target.value,
                          }))
                        }
                      />
                      {(dateRange.start || dateRange.end) && (
                        <button
                          onClick={() => setDateRange({ start: "", end: "" })}
                          className="p-1 hover:bg-accent rounded-md text-muted-foreground"
                        >
                          <XCircle size={14} />
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {error && (
                  <div className="mx-6 mb-4 p-4 rounded-md bg-destructive/10 text-destructive-foreground border border-destructive/20">
                    <p className="font-semibold mb-2">Error loading leads</p>
                    <p className="text-sm">{error}</p>
                  </div>
                )}

                <div className="flex-1 overflow-x-auto px-6 pb-6">
                  <div className="flex gap-4 h-[calc(100vh-280px)] min-h-[600px]">
                    {columns.map((column) => (
                      <PipelineColumn
                        key={column.id}
                        id={column.id}
                        title={column.title}
                        leads={column.leads}
                        onCardClick={setSelectedLead}
                        onDrop={handleDrop}
                        onDragOver={handleDragOver}
                        draggedLeadId={draggedLeadId}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <LeadDetail
                lead={selectedLead}
                isOpen={!!selectedLead}
                onClose={() => setSelectedLead(null)}
                onStatusChange={handleStatusChange}
                onDelete={handleDelete}
              />
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
