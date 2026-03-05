"use client";

import React, { useEffect, useState } from "react";
import { fetchLeads, getLeadStats, updateLeadStatus, deleteLead } from "@/services/leadService";
import { LeadData } from "@/types/crm";
import { LeadDetail } from "@/components/crm/lead-detail";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import {
    Loader2,
    ExternalLink,
    Calendar,
    Mail,
    Users,
    TrendingUp,
    Clock,
    UserCheck,
    Target,
    Layout,
    Globe,
    Briefcase,
    DollarSign,
} from "lucide-react";

const toDate = (value: any) => {
    if (!value) return new Date();
    if (typeof value === "string") return new Date(value);
    if (value.seconds) return new Date(value.seconds * 1000);
    return new Date(value);
};

const formatDate = (timestamp: any) => {
    return toDate(timestamp).toLocaleString();
};

export default function CompanionPage() {
    const [leads, setLeads] = useState<LeadData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [stats, setStats] = useState({
        total: 0,
        new: 0,
        contacted: 0,
        won: 0,
    });

    const loadData = async () => {
        try {
            setLoading(true);
            const [leadsData, statsData] = await Promise.all([
                fetchLeads({ limit: 100 }),
                getLeadStats(),
            ]);
            setLeads(leadsData.data || []);
            setStats({
                total: statsData.total || 0,
                new: statsData.new || 0,
                contacted: statsData.contacted || 0,
                won: statsData.won || 0,
            });
            setError(null);
        } catch (err: any) {
            console.error("Error fetching companion data:", err);
            setError(`Failed to load data: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    const [selectedLead, setSelectedLead] = useState<LeadData | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);

    const handleStatusChange = async (leadId: string, newStatus: any) => {
        try {
            await updateLeadStatus(leadId, newStatus);
            setLeads((prevLeads) =>
                prevLeads.map((lead) =>
                    lead.id === leadId ? { ...lead, status: newStatus } : lead,
                ),
            );
            // Refresh stats after status change
            const statsData = await getLeadStats();
            setStats({
                total: statsData.total || 0,
                new: statsData.new || 0,
                contacted: statsData.contacted || 0,
                won: statsData.won || 0,
            });
        } catch (err) {
            console.error("Error updating status:", err);
        }
    };

    const handleDelete = async (leadId: string) => {
        try {
            setIsDeleting(true);
            await deleteLead(leadId);
            setLeads((prevLeads) => prevLeads.filter((lead) => lead.id !== leadId));
            setSelectedLead(null);
            // Refresh stats after deletion
            const statsData = await getLeadStats();
            setStats({
                total: statsData.total || 0,
                new: statsData.new || 0,
                contacted: statsData.contacted || 0,
                won: statsData.won || 0,
            });
        } catch (err) {
            console.error("Error deleting lead:", err);
        } finally {
            setIsDeleting(false);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

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
                                            Companion Overview
                                        </h1>
                                        <p className="text-sm sm:text-base text-muted-foreground mt-1">
                                            Business intelligence and lead acquisition insights from EvocLabs.
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground bg-accent/50 px-3 py-1.5 rounded-full">
                                        <span className="relative flex h-2 w-2">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                                        </span>
                                        Live Sync Active
                                    </div>
                                </div>

                                {/* Companion KPI Cards */}
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                    <div className="p-6 rounded-xl border border-border bg-card shadow-sm hover:shadow-md transition-shadow">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                                                    Total Acquisitions
                                                </p>
                                                <h3 className="text-3xl font-bold text-foreground mt-2">
                                                    {stats.total}
                                                </h3>
                                            </div>
                                            <div className="p-3 bg-blue-500/10 rounded-xl">
                                                <Users className="w-6 h-6 text-blue-500" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-6 rounded-xl border border-border bg-card shadow-sm hover:shadow-md transition-shadow">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                                                    Fresh Submissions
                                                </p>
                                                <h3 className="text-3xl font-bold text-foreground mt-2">
                                                    {stats.new}
                                                </h3>
                                            </div>
                                            <div className="p-3 bg-green-500/10 rounded-xl">
                                                <Clock className="w-6 h-6 text-green-500" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-6 rounded-xl border border-border bg-card shadow-sm hover:shadow-md transition-shadow">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                                                    Engagement Vol.
                                                </p>
                                                <h3 className="text-3xl font-bold text-foreground mt-2">
                                                    {stats.contacted}
                                                </h3>
                                            </div>
                                            <div className="p-3 bg-amber-500/10 rounded-xl">
                                                <Target className="w-6 h-6 text-amber-500" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-6 rounded-xl border border-border bg-card shadow-sm hover:shadow-md transition-shadow">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                                                    Conversion Index
                                                </p>
                                                <h3 className="text-3xl font-bold text-foreground mt-2">
                                                    {stats.total > 0 ? ((stats.won / stats.total) * 100).toFixed(1) : 0}%
                                                </h3>
                                            </div>
                                            <div className="p-3 bg-purple-500/10 rounded-xl">
                                                <TrendingUp className="w-6 h-6 text-purple-500" />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {error && (
                                    <div className="p-4 rounded-md bg-destructive/10 text-destructive-foreground border border-destructive/20">
                                        <p className="font-semibold mb-1 flex items-center gap-2 text-sm">
                                            <Loader2 className="h-4 w-4 animate-spin" /> System Sync Delay
                                        </p>
                                        <p className="text-xs opacity-80">{error}</p>
                                    </div>
                                )}

                                {/* Detailed Intelligence Matrix */}
                                <div className="rounded-2xl border border-border bg-card shadow-xl overflow-hidden ring-1 ring-border/50">
                                    <div className="p-6 border-b border-border bg-gray-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                        <div>
                                            <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
                                                <Layout className="w-5 h-5 text-blue-600" />
                                                Acquisition Matrix
                                            </h2>
                                            <p className="text-xs text-muted-foreground mt-0.5">Comprehensive lead data analysis per EvocLabs specifications.</p>
                                        </div>
                                    </div>
                                    <div className="overflow-x-auto">
                                        <table className="w-full text-sm text-left border-collapse">
                                            <thead className="bg-gray-50/80 border-b border-border">
                                                <tr>
                                                    <th className="px-6 py-4 text-xs font-bold text-gray-600 uppercase tracking-widest">Acquisition Name</th>
                                                    <th className="px-6 py-4 text-xs font-bold text-gray-600 uppercase tracking-widest">Business Context</th>
                                                    <th className="px-6 py-4 text-xs font-bold text-gray-600 uppercase tracking-widest">Acquisition Source</th>
                                                    <th className="px-6 py-4 text-xs font-bold text-gray-600 uppercase tracking-widest">Project Intensity</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-border bg-card">
                                                {leads.length === 0 ? (
                                                    <tr>
                                                        <td colSpan={4} className="px-6 py-16 text-center text-muted-foreground bg-accent/5">
                                                            <div className="flex flex-col items-center gap-2">
                                                                <Globe className="w-8 h-8 opacity-20" />
                                                                <span className="text-sm font-medium">No acquisition data currently available for processing.</span>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ) : (
                                                    leads.map((lead) => (
                                                        <tr
                                                            key={lead.id}
                                                            className="group hover:bg-blue-600/[0.02] transition-colors cursor-pointer border-l-2 border-l-transparent hover:border-l-blue-600"
                                                            onClick={() => setSelectedLead(lead)}
                                                        >
                                                            <td className="px-6 py-5">
                                                                <div className="font-bold text-foreground group-hover:text-blue-600 transition-colors uppercase tracking-tight">{lead.name}</div>
                                                                {lead.companyName && (
                                                                    <div className="text-[10px] text-muted-foreground flex items-center gap-1 mt-1 font-medium bg-muted w-fit px-1.5 py-0.5 rounded">
                                                                        <Briefcase size={10} /> {lead.companyName}
                                                                    </div>
                                                                )}
                                                            </td>
                                                            <td className="px-6 py-5">
                                                                <div className="space-y-1.5">
                                                                    {lead.category && (
                                                                        <span className="text-[10px] bg-blue-500/10 text-blue-700 px-2 py-0.5 rounded-full font-bold uppercase border border-blue-500/20">
                                                                            {lead.category}
                                                                        </span>
                                                                    )}
                                                                    {lead.website && (
                                                                        <a
                                                                            href={lead.website}
                                                                            target="_blank"
                                                                            rel="noopener noreferrer"
                                                                            className="flex items-center gap-1.5 text-blue-600 hover:text-blue-800 text-[11px] font-medium group-hover:underline underline-offset-4"
                                                                            onClick={(e) => e.stopPropagation()}
                                                                        >
                                                                            <Globe size={11} />
                                                                            <span className="truncate max-w-[180px]">
                                                                                {lead.website.replace(/^https?:\/\//, "")}
                                                                            </span>
                                                                        </a>
                                                                    )}
                                                                </div>
                                                            </td>
                                                            <td className="px-6 py-5">
                                                                <div className="inline-flex items-center gap-1.5 bg-accent/50 px-2.5 py-1 rounded-md border border-border shadow-sm">
                                                                    <div className="h-1.5 w-1.5 rounded-full bg-blue-600 animate-pulse"></div>
                                                                    <span className="text-[11px] font-bold text-foreground/80 uppercase tracking-wider truncate max-w-[120px]">
                                                                        {lead.formType || "Direct Entry"}
                                                                    </span>
                                                                </div>
                                                                <div className="text-[10px] text-muted-foreground mt-2 font-mono flex items-center gap-1">
                                                                    <Calendar size={10} />
                                                                    {formatDate(lead.createdAt || lead.timestamp)}
                                                                </div>
                                                            </td>
                                                            <td className="px-6 py-5">
                                                                <div className="flex flex-col gap-1.5">
                                                                    {(lead.budget || lead.revenueRange) ? (
                                                                        <div className="flex items-center gap-1.5 text-xs font-bold text-foreground bg-green-500/5 px-2 py-1 rounded border border-green-500/10 w-fit">
                                                                            <DollarSign size={12} className="text-green-600" />
                                                                            {lead.budget || lead.revenueRange}
                                                                        </div>
                                                                    ) : (
                                                                        <span className="text-[10px] text-muted-foreground italic">No fiscal data provided</span>
                                                                    )}
                                                                    {lead.target && (
                                                                        <div className="text-[10px] text-muted-foreground flex items-center gap-1 font-medium bg-muted w-fit px-1.5 py-0.5 rounded italic">
                                                                            Target: {lead.target}
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    ))
                                                )}
                                            </tbody>
                                        </table>
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
