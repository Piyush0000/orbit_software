"use client";

import React, { useState } from "react";
import { LeadData, LeadStatus } from "@/types/crm";
import {
  X,
  Mail,
  Calendar,
  ExternalLink,
  Target,
  MessageSquare,
  Trash2,
  DollarSign,
} from "lucide-react";

interface LeadDetailProps {
  lead: LeadData | null;
  isOpen: boolean;
  onClose: () => void;
  onStatusChange: (leadId: string, newStatus: LeadStatus) => void;
  onDelete: (leadId: string) => void;
}

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

const toDate = (value: any) => {
  if (!value) return new Date(0);
  if (typeof value === "string" || typeof value === "number")
    return new Date(value);
  if ((value as any).seconds) return new Date((value as any).seconds * 1000);
  return new Date(value);
};

const formatDateLong = (value: any) => toDate(value).toLocaleString();

export function LeadDetail({
  lead,
  isOpen,
  onClose,
  onStatusChange,
  onDelete,
}: LeadDetailProps) {
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
                      className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors border ${
                        lead.status === option.value
                          ? getStatusBadgeClass(option.value)
                          : "bg-white text-muted-foreground border-border hover:bg-accent"
                      }`}
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
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                      lead.formType === "book-demo"
                        ? "bg-white text-orange-600 border-orange-400"
                        : "bg-white text-orange-700 border-orange-500"
                    }`}
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
