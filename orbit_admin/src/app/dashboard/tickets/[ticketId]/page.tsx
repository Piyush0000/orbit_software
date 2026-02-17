"use client";

import * as React from "react";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  CheckCircle2,
  Clock,
  MessageSquare,
  Send,
  User,
  ShieldAlert,
  UserPlus,
  CheckCircle,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import {
  addTicketNote,
  getTicket,
  respondToTicket,
  resolveTicket,
} from "@/lib/admin-api";

export default function TicketDetailPage() {
  const router = useRouter();
  const { ticketId } = useParams();
  const [ticket, setTicket] = React.useState<{
    id: string;
    brand_name: string;
    category: string;
    status: string;
    assigned_admin_name?: string;
    created_at: string;
  } | null>(null);
  const [messages, setMessages] = React.useState<
    Array<{
      id: string;
      sender_type: "admin" | "user" | "system";
      sender_name: string;
      content: string;
      timestamp: string;
    }>
  >([]);
  const [notes, setNotes] = React.useState<
    Array<{
      id: string;
      admin_name: string;
      text: string;
      timestamp: string;
    }>
  >([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [messageInput, setMessageInput] = React.useState("");
  const [noteInput, setNoteInput] = React.useState("");
  const [isSending, setIsSending] = React.useState(false);
  const [isNoting, setIsNoting] = React.useState(false);
  const [isResolving, setIsResolving] = React.useState(false);

  React.useEffect(() => {
    let isMounted = true;
    const load = async () => {
      if (!ticketId) return;
      setLoading(true);
      setError(null);
      try {
        const data = await getTicket(String(ticketId));
        if (!isMounted) return;
        setTicket({
          id: data.ticket.id,
          brand_name: data.ticket.store?.name || "Unknown Store",
          category: data.ticket.source || "General",
          status: data.ticket.status || "OPEN",
          assigned_admin_name: data.ticket.assignedAdmin?.fullName || undefined,
          created_at: data.ticket.createdAt,
        });
        setMessages(
          (data.messages || []).map((msg) => {
            const senderType =
              msg.senderType === "ADMIN"
                ? "admin"
                : msg.senderType === "BOT"
                  ? "system"
                  : "user";
            return {
              id: msg.id,
              sender_type: senderType,
              sender_name:
                senderType === "admin"
                  ? "Admin"
                  : senderType === "system"
                    ? "System"
                    : "Customer",
              content: msg.message,
              timestamp: msg.createdAt,
            };
          }),
        );
        setNotes(
          (data.notes || []).map((note) => ({
            id: note.id,
            admin_name: note.adminId,
            text: note.note,
            timestamp: note.createdAt,
          })),
        );
      } catch (err) {
        if (!isMounted) return;
        setError(err instanceof Error ? err.message : "Unable to load ticket");
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    load();
    return () => {
      isMounted = false;
    };
  }, [ticketId]);

  const handleSend = async () => {
    if (!ticketId || !messageInput.trim()) return;
    setIsSending(true);
    try {
      await respondToTicket(String(ticketId), messageInput.trim());
      setMessageInput("");
      const data = await getTicket(String(ticketId));
      setMessages(
        (data.messages || []).map((msg) => {
          const senderType =
            msg.senderType === "ADMIN"
              ? "admin"
              : msg.senderType === "BOT"
                ? "system"
                : "user";
          return {
            id: msg.id,
            sender_type: senderType,
            sender_name:
              senderType === "admin"
                ? "Admin"
                : senderType === "system"
                  ? "System"
                  : "Customer",
            content: msg.message,
            timestamp: msg.createdAt,
          };
        }),
      );
    } finally {
      setIsSending(false);
    }
  };

  const handleAddNote = async () => {
    if (!ticketId || !noteInput.trim()) return;
    setIsNoting(true);
    try {
      await addTicketNote(String(ticketId), noteInput.trim());
      setNoteInput("");
      const data = await getTicket(String(ticketId));
      setNotes(
        (data.notes || []).map((note) => ({
          id: note.id,
          admin_name: note.adminId,
          text: note.note,
          timestamp: note.createdAt,
        })),
      );
    } finally {
      setIsNoting(false);
    }
  };

  const handleResolve = async () => {
    if (!ticketId) return;
    setIsResolving(true);
    try {
      await resolveTicket(String(ticketId));
      const data = await getTicket(String(ticketId));
      setTicket({
        id: data.ticket.id,
        brand_name: data.ticket.store?.name || "Unknown Store",
        category: data.ticket.source || "General",
        status: data.ticket.status || "OPEN",
        assigned_admin_name: data.ticket.assignedAdmin?.fullName || undefined,
        created_at: data.ticket.createdAt,
      });
    } finally {
      setIsResolving(false);
    }
  };

  if (loading && !ticket) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-muted-foreground">Loading ticket...</p>
      </div>
    );
  }

  if (!ticket) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-muted-foreground">{error || "Ticket not found."}</p>
      </div>
    );
  }

  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col p-4 md:p-8 pt-6">
          <div className="flex items-center gap-4 mb-6">
            <Button
              variant="outline"
              size="icon"
              onClick={() => router.back()}
              className="h-8 w-8"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div className="flex flex-1 items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold tracking-tight">
                  Ticket: {ticket.id}
                </h2>
                <p className="text-muted-foreground text-sm">
                  {ticket.brand_name} • {ticket.category}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <UserPlus className="mr-2 h-4 w-4" />
                  Assign
                </Button>
                <Button
                  variant="default"
                  size="sm"
                  className="bg-green-600 hover:bg-green-700"
                  onClick={handleResolve}
                  disabled={isResolving}
                >
                  <CheckCircle className="mr-2 h-4 w-4" />
                  {isResolving ? "Resolving..." : "Mark Resolved"}
                </Button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* LEFT COLUMN: CHAT HISTORY */}
            <div className="lg:col-span-2 space-y-6">
              <Card className="flex flex-col h-[600px]">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <MessageSquare className="h-5 w-5" />
                    Chat History
                  </CardTitle>
                  <CardDescription>
                    Conversation between brand and support admin
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-1 overflow-y-auto space-y-4">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex flex-col ${msg.sender_type === "admin" ? "items-end" : "items-start"}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-lg p-3 ${
                          msg.sender_type === "admin"
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted"
                        }`}
                      >
                        <p className="text-sm">{msg.content}</p>
                      </div>
                      <div className="flex items-center gap-2 mt-1 px-1">
                        <span className="text-[10px] text-muted-foreground font-medium">
                          {msg.sender_name}
                        </span>
                        <span className="text-[10px] text-muted-foreground">
                          {new Date(msg.timestamp).toLocaleTimeString("en-US", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>
                    </div>
                  ))}
                </CardContent>
                <CardFooter className="border-t p-4">
                  <div className="flex w-full items-center gap-2">
                    <Input
                      placeholder="Type a message..."
                      className="flex-1"
                      value={messageInput}
                      onChange={(event) => setMessageInput(event.target.value)}
                    />
                    <Button
                      size="icon"
                      onClick={handleSend}
                      disabled={isSending}
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            </div>

            {/* RIGHT COLUMN: TICKET INFO & INTERNAL NOTES */}
            <div className="space-y-6">
              {/* TICKET INFO */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Ticket Info</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground font-medium">
                      Status
                    </span>
                    <Badge
                      variant={
                        ticket.status === "OPEN" ? "default" : "secondary"
                      }
                    >
                      {ticket.status.toLowerCase()}
                    </Badge>
                  </div>
                  <Separator />
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground font-medium">
                      Category
                    </span>
                    <Badge variant="outline">{ticket.category}</Badge>
                  </div>
                  <Separator />
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground font-medium">
                      Assigned To
                    </span>
                    <div className="flex items-center gap-1">
                      <User className="h-3 w-3" />
                      <span>{ticket.assigned_admin_name || "Unassigned"}</span>
                    </div>
                  </div>
                  <Separator />
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground font-medium">
                      Created
                    </span>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      <span>
                        {new Date(ticket.created_at).toLocaleDateString(
                          "en-US",
                        )}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* INTERNAL NOTES */}
              <Card className="border-amber-200 dark:border-amber-900 bg-amber-50/50 dark:bg-amber-950/20">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2 text-amber-700 dark:text-amber-500">
                    <ShieldAlert className="h-5 w-5" />
                    Internal Notes
                  </CardTitle>
                  <CardDescription>Only visible to admins</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {notes.map((note) => (
                    <div
                      key={note.id}
                      className="bg-card p-3 rounded-md border text-sm shadow-sm"
                    >
                      <p>{note.text}</p>
                      <div className="mt-2 flex items-center justify-between text-[10px] text-muted-foreground">
                        <span className="font-semibold">{note.admin_name}</span>
                        <span>
                          {new Date(note.timestamp).toLocaleString("en-US")}
                        </span>
                      </div>
                    </div>
                  ))}
                  <Textarea
                    placeholder="Add an internal note..."
                    className="min-h-[100px] text-sm"
                    value={noteInput}
                    onChange={(event) => setNoteInput(event.target.value)}
                  />
                </CardContent>
                <CardFooter className="pt-0">
                  <Button
                    size="sm"
                    variant="outline"
                    className="w-full"
                    onClick={handleAddNote}
                    disabled={isNoting}
                  >
                    {isNoting ? "Saving..." : "Add Note"}
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
