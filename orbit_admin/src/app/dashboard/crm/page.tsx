"use client";

import React, { useEffect, useState } from "react";
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
import { LeadDetail } from "@/components/crm/lead-detail";
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
  Users,
  CheckCircle,
  Filter,
  XCircle,
} from "lucide-react";

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

export default function CrmPage() {
  const [leads, setLeads] = useState<LeadData[]>([]);
  const [filteredLeads, setFilteredLeads] = useState<LeadData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [debugInfo, setDebugInfo] = useState<string>("");
  const [dateRange, setDateRange] = useState<{ start: string; end: string }>({
    start: "",
    end: "",
  });
  const [formTypeFilter, setFormTypeFilter] = useState<string>("all");
  const [selectedLead, setSelectedLead] = useState<LeadData | null>(null);

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        // Try common collection names
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
            console.log(`Trying collection: ${collectionName}`);
            setDebugInfo(`Checking collection: ${collectionName}...`);

            // First try with orderBy
            try {
              const q = query(
                collection(db, collectionName),
                orderBy("createdAt", "desc"),
              );
              const querySnapshot = await getDocs(q);

              querySnapshot.forEach((doc) => {
                const data = doc.data();
                console.log(`Found document in ${collectionName}:`, data);
                leadsData.push({
                  id: doc.id,
                  ...data,
                  collection: collectionName,
                } as LeadData);
              });

              if (leadsData.length > 0) {
                console.log(
                  `Successfully loaded ${leadsData.length} leads from ${collectionName}`,
                );
                setDebugInfo(
                  `Found ${leadsData.length} leads in collection: ${collectionName}`,
                );
                break;
              }
            } catch (orderByError: any) {
              // If orderBy fails (maybe no index), try without it
              console.log(
                `orderBy failed for ${collectionName}, trying without orderBy:`,
                orderByError.message,
              );

              const querySnapshot = await getDocs(
                collection(db, collectionName),
              );

              querySnapshot.forEach((doc) => {
                const data = doc.data();
                console.log(`Found document in ${collectionName}:`, data);
                leadsData.push({
                  id: doc.id,
                  ...data,
                  collection: collectionName,
                } as LeadData);
              });

              // Sort manually by createdAt if available
              if (leadsData.length > 0) {
                leadsData.sort((a, b) => {
                  const dateA = a.createdAt || a.timestamp;
                  const dateB = b.createdAt || b.timestamp;
                  if (!dateA || !dateB) return 0;
                  const timeA =
                    typeof dateA === "string"
                      ? new Date(dateA).getTime()
                      : (dateA as any).seconds
                        ? (dateA as any).seconds * 1000
                        : 0;
                  const timeB =
                    typeof dateB === "string"
                      ? new Date(dateB).getTime()
                      : (dateB as any).seconds
                        ? (dateB as any).seconds * 1000
                        : 0;
                  return timeB - timeA;
                });
                console.log(
                  `Successfully loaded ${leadsData.length} leads from ${collectionName} (without orderBy)`,
                );
                setDebugInfo(
                  `Found ${leadsData.length} leads in collection: ${collectionName}`,
                );
                break;
              }
            }
          } catch (err: any) {
            console.log(
              `Error with collection ${collectionName}:`,
              err.message,
            );
            lastError = err;
            continue;
          }
        }

        if (leadsData.length === 0 && lastError) {
          console.error(
            "No data found in any collection. Last error:",
            lastError,
          );
          setError(
            `No leads found. Please check Firestore collection name. Tried: ${collectionNames.join(
              ", ",
            )}. Error: ${lastError.message}`,
          );
          setDebugInfo(
            `Checked collections: ${collectionNames.join(", ")}. No data found.`,
          );
        } else if (leadsData.length === 0) {
          setError(
            `No leads found in any of the checked collections: ${collectionNames.join(
              ", ",
            )}`,
          );
          setDebugInfo(
            `Checked collections: ${collectionNames.join(", ")}. No data found.`,
          );
        } else {
          setLeads(leadsData);
          setFilteredLeads(leadsData);
          setDebugInfo("");
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

  useEffect(() => {
    let filtered = leads;

    // Filter by Date
    if (dateRange.start && dateRange.end) {
      const start = new Date(dateRange.start).getTime();
      const end = new Date(dateRange.end).getTime() + 86400000;

      filtered = filtered.filter((lead) => {
        const leadDate = lead.createdAt || lead.timestamp;
        if (!leadDate) return false;

        const time =
          typeof leadDate === "string"
            ? new Date(leadDate).getTime()
            : (leadDate as any).seconds
              ? (leadDate as any).seconds * 1000
              : 0;
        return time >= start && time <= end;
      });
    }

    // Filter by Form Type
    if (formTypeFilter !== "all") {
      filtered = filtered.filter((lead) => lead.formType === formTypeFilter);
    }

    setFilteredLeads(filtered);
  }, [dateRange, formTypeFilter, leads]);

  const handleStatusChange = async (leadId: string, newStatus: LeadStatus) => {
    try {
      // Update local state immediately
      setLeads((prevLeads) =>
        prevLeads.map((lead) =>
          lead.id === leadId ? { ...lead, status: newStatus } : lead,
        ),
      );

      // Try to update in Firestore (find the collection)
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
      // Update local state immediately
      setLeads((prevLeads) => prevLeads.filter((lead) => lead.id !== leadId));

      // Try to delete from Firestore (find the collection)
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

  const formatDate = (timestamp: any) => {
    if (!timestamp) return "";

    // Handle Firestore Timestamp
    if (timestamp.seconds) {
      return new Date(timestamp.seconds * 1000).toLocaleString();
    }

    // Handle string date
    return new Date(timestamp).toLocaleString();
  };

  const getStats = () => {
    const total = filteredLeads.length;
    const contacted = filteredLeads.filter(
      (l) => l.status === "contacted",
    ).length;
    const won = filteredLeads.filter((l) => l.status === "won").length;
    return { total, contacted, won };
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  const stats = getStats();

  return (
    <SidebarProvider suppressHydrationWarning>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col" suppressHydrationWarning>
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-6 py-6 md:gap-8 md:py-8">
              <div className="flex-1 min-h-screen bg-background p-4 sm:p-6 lg:p-8 space-y-6 lg:space-y-8">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
                      CRM - Leads Management
                    </h1>
                    <p className="text-sm sm:text-base text-muted-foreground mt-1">
                      Manage and view your form submissions.
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

                {/* KPI Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-6 rounded-xl border border-border bg-card shadow-sm">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">
                          Total Leads
                        </p>
                        <h3 className="text-2xl font-bold text-foreground mt-2">
                          {stats.total}
                        </h3>
                      </div>
                      <div className="p-3 bg-primary/10 rounded-full">
                        <Users className="w-6 h-6 text-primary" />
                      </div>
                    </div>
                  </div>
                  <div className="p-6 rounded-xl border border-border bg-card shadow-sm">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">
                          Contacted
                        </p>
                        <h3 className="text-2xl font-bold text-foreground mt-2">
                          {stats.contacted}
                        </h3>
                      </div>
                      <div className="p-3 bg-blue-500/10 rounded-full">
                        <Mail className="w-6 h-6 text-blue-500" />
                      </div>
                    </div>
                  </div>
                  <div className="p-6 rounded-xl border border-border bg-card shadow-sm">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">
                          Won
                        </p>
                        <h3 className="text-2xl font-bold text-foreground mt-2">
                          {stats.won}
                        </h3>
                      </div>
                      <div className="p-3 bg-blue-600/10 rounded-full">
                        <CheckCircle className="w-6 h-6 text-blue-600" />
                      </div>
                    </div>
                  </div>
                </div>

                {error && (
                  <div className="p-4 rounded-md bg-destructive/10 text-destructive-foreground border border-destructive/20">
                    <p className="font-semibold mb-2">Error loading leads</p>
                    <p className="text-sm">{error}</p>
                    {debugInfo && (
                      <p className="text-xs mt-2 opacity-75">{debugInfo}</p>
                    )}
                    <p className="text-xs mt-2 opacity-75">
                      Please check: 1) Firestore collection name, 2) Firestore
                      security rules allow read access, 3) Browser console for
                      detailed errors
                    </p>
                  </div>
                )}

                {/* Desktop Table View */}
                <div className="hidden lg:block rounded-xl border border-border bg-card shadow-sm overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                      <thead className="bg-gray-50 border-b border-border">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Name & Contact
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Type
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Details
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Budget / Revenue
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Submitted
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border">
                        {filteredLeads.length === 0 ? (
                          <tr>
                            <td
                              colSpan={6}
                              className="px-6 py-8 text-center text-muted-foreground"
                            >
                              No leads found matching your criteria.
                            </td>
                          </tr>
                        ) : (
                          filteredLeads.map((lead) => (
                            <tr
                              key={lead.id}
                              className="hover:bg-accent/40 transition-colors cursor-pointer"
                              onClick={() => setSelectedLead(lead)}
                            >
                              <td className="px-6 py-4">
                                <div className="font-medium text-foreground">
                                  {lead.name}
                                </div>
                                {(lead.workEmail || lead.email) && (
                                  <div className="flex items-center gap-1.5 text-muted-foreground mt-1">
                                    <Mail size={12} />
                                    <span>{lead.workEmail || lead.email}</span>
                                  </div>
                                )}
                                {lead.phoneNumber && (
                                  <div className="flex items-center gap-1.5 text-muted-foreground mt-1">
                                    <span className="text-xs font-bold bg-accent px-1 rounded text-foreground opacity-70">
                                      +91
                                    </span>
                                    <span>{lead.phoneNumber}</span>
                                  </div>
                                )}
                                {lead.website && (
                                  <a
                                    href={lead.website}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-1.5 text-primary hover:opacity-80 mt-1 w-fit"
                                    onClick={(e) => e.stopPropagation()}
                                  >
                                    <ExternalLink size={12} />
                                    <span className="truncate max-w-[150px]">
                                      {lead.website.replace(/^https?:\/\//, "")}
                                    </span>
                                  </a>
                                )}
                              </td>
                              <td className="px-6 py-4">
                                <span
                                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                                    lead.formType === "book-demo"
                                      ? "bg-white text-blue-600 border-blue-400"
                                      : "bg-white text-blue-700 border-blue-500"
                                  }`}
                                >
                                  {lead.formType === "book-demo"
                                    ? "Book Demo"
                                    : "Contact"}
                                </span>
                              </td>
                              <td className="px-6 py-4">
                                {lead.category && (
                                  <div className="flex items-center gap-1.5 mb-1.5">
                                    <span className="text-[10px] uppercase font-bold text-muted-foreground">
                                      Category:
                                    </span>
                                    <span className="text-xs font-medium bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                                      {lead.category}
                                    </span>
                                  </div>
                                )}
                                {lead.goals && (
                                  <div className="flex items-start gap-2">
                                    <Target
                                      size={14}
                                      className="mt-0.5 text-muted-foreground shrink-0"
                                    />
                                    <p className="text-foreground line-clamp-2 max-w-[300px]">
                                      {lead.goals}
                                    </p>
                                  </div>
                                )}
                                {lead.message && (
                                  <div className="flex items-start gap-2">
                                    <MessageSquare
                                      size={14}
                                      className="mt-0.5 text-muted-foreground shrink-0"
                                    />
                                    <p className="text-foreground line-clamp-2 max-w-[300px]">
                                      {lead.message}
                                    </p>
                                  </div>
                                )}
                              </td>
                              <td className="px-6 py-4">
                                <div className="flex items-center gap-1.5 text-foreground font-medium">
                                  {(lead.budget || lead.revenueRange) && (
                                    <DollarSign
                                      size={14}
                                      className="text-muted-foreground"
                                    />
                                  )}
                                  {lead.budget || lead.revenueRange || "N/A"}
                                </div>
                              </td>
                              <td className="px-6 py-4">
                                <span
                                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusBadgeClass(
                                    lead.status || "leads",
                                  )}`}
                                >
                                  {lead.status === "leads" && "Leads"}
                                  {lead.status === "contacted" && "Contacted"}
                                  {lead.status === "won" && "Won"}
                                  {lead.status === "lost" && "Lost"}
                                  {!lead.status && "Leads"}
                                </span>
                              </td>
                              <td className="px-6 py-4 text-muted-foreground whitespace-nowrap">
                                <div className="flex items-center gap-1.5">
                                  <Calendar size={14} />
                                  {formatDate(lead.createdAt || lead.timestamp)}
                                </div>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Mobile Card View */}
                <div className="lg:hidden space-y-4">
                  {filteredLeads.length === 0 ? (
                    <div className="rounded-xl border border-border bg-card p-8 text-center text-muted-foreground">
                      No leads found matching your criteria.
                    </div>
                  ) : (
                    filteredLeads.map((lead) => (
                      <div
                        key={lead.id}
                        className="rounded-xl border border-border bg-card shadow-sm p-4 space-y-3 cursor-pointer active:scale-[0.98] transition-transform"
                        onClick={() => setSelectedLead(lead)}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="font-semibold text-foreground text-base">
                              {lead.name}
                            </h3>
                            {(lead.workEmail || lead.email) && (
                              <div className="flex items-center gap-1.5 text-muted-foreground mt-1 text-sm">
                                <Mail size={14} />
                                <span className="truncate">
                                  {lead.workEmail || lead.email}
                                </span>
                              </div>
                            )}
                            {lead.phoneNumber && (
                              <div className="flex items-center gap-1.5 text-muted-foreground mt-1 text-sm">
                                <span className="text-xs font-bold">+91</span>
                                <span>{lead.phoneNumber}</span>
                              </div>
                            )}
                          </div>
                          <span
                            className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border shrink-0 ${
                              lead.formType === "book-demo"
                                ? "bg-white text-blue-600 border-blue-400"
                                : "bg-white text-blue-700 border-blue-500"
                            }`}
                          >
                            {lead.formType === "book-demo"
                              ? "Book Demo"
                              : "Contact"}
                          </span>
                        </div>

                        {lead.website && (
                          <a
                            href={lead.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 text-primary hover:opacity-80 text-sm"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <ExternalLink size={14} />
                            <span className="truncate">
                              {lead.website.replace(/^https?:\/\//, "")}
                            </span>
                          </a>
                        )}

                        {(lead.goals || lead.message || lead.category) && (
                          <div className="space-y-2">
                            {lead.category && (
                              <div className="flex items-center gap-2">
                                <span className="text-[10px] uppercase font-bold text-muted-foreground">
                                  Category:
                                </span>
                                <span className="text-xs font-medium bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                                  {lead.category}
                                </span>
                              </div>
                            )}
                            {lead.goals && (
                              <div className="flex items-start gap-2">
                                <Target
                                  size={14}
                                  className="mt-0.5 text-muted-foreground shrink-0"
                                />
                                <p className="text-foreground text-sm">
                                  {lead.goals}
                                </p>
                              </div>
                            )}
                            {lead.message && (
                              <div className="flex items-start gap-2">
                                <MessageSquare
                                  size={14}
                                  className="mt-0.5 text-muted-foreground shrink-0"
                                />
                                <p className="text-foreground text-sm">
                                  {lead.message}
                                </p>
                              </div>
                            )}
                          </div>
                        )}

                        <div className="flex items-center justify-between pt-2 border-t border-border">
                          <div className="flex items-center gap-1.5 text-foreground font-medium text-sm">
                            {(lead.budget || lead.revenueRange) && (
                              <DollarSign
                                size={14}
                                className="text-muted-foreground"
                              />
                            )}
                            {lead.budget || lead.revenueRange || "N/A"}
                          </div>
                          <div className="flex items-center gap-1.5 text-muted-foreground text-xs">
                            <Calendar size={12} />
                            {formatDate(lead.createdAt || lead.timestamp)}
                          </div>
                        </div>
                      </div>
                    ))
                  )}
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
