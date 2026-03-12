"use client"

import * as React from "react"
type Communication = {
    id: string
    channel: string
    subject: string
    summary: string
    occurredAt: string
    admin_name: string
}
type CommunicationResponse = {
    logs: any[]
}
import {
    MessageSquare,
    Phone,
    Send,
    Clock,
    User,
    History,
    Mail,
    Smartphone,
    MessageCircle,
    CheckCircle2,
    Calendar,
    Trash2
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    CardFooter,
} from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import {
    createBrandCommunication,
    getBrandCommunications,
    getBrands,
    deleteCommunication
} from "@/lib/admin-api"
import { channel } from "diagnostics_channel"

export default function CommunicationPage() {
    const [selectedBrandId, setSelectedBrandId] = React.useState<string>("")
    const [brands, setBrands] = React.useState<Array<{ id: string; name: string }>>([])
    const [messageChannel, setMessageChannel] = React.useState<string>("email")
    const [messageContent, setMessageContent] = React.useState("")
    const [communications, setCommunications] = React.useState<Communication[]>([])
    const [loading, setLoading] = React.useState(true)
    const [error, setError] = React.useState<string | null>(null)
    const [sending, setSending] = React.useState(false)
    const [saving, setSaving] = React.useState(false)
    const [channel, setChannel] = React.useState("EMAIL")
    const [showAll, setShowAll] = React.useState(false);
    const [subject, setSubject] = React.useState("");

    React.useEffect(() => {
        let isMounted = true
        const loadBrands = async () => {
            try {
                const res = await getBrands()
                if (!isMounted) return
                const mapped = (res.stores || []).map((store: any) => ({
                    id: store.id,
                    name: store.name
                }))
                console.log("Mapped brands:", mapped);
                setBrands(mapped)
                if (mapped.length > 0) {
                    setSelectedBrandId(mapped[0].id)
                }
            } catch (err) {
                if (!isMounted) return
                setError(err instanceof Error ? err.message : "Unable to load brands")
            }
        }
        loadBrands()
        return () => {
            isMounted = false
        }
    }, [])

    React.useEffect(() => {
        let isMounted = true
        const load = async () => {
            if (!selectedBrandId) return
            setLoading(true)
            setError(null)
            try {
                const messagesRes = await getBrandCommunications(selectedBrandId) as CommunicationResponse
                console.log(messagesRes)

                if (!isMounted) return
                setCommunications(
                    (messagesRes.logs || []).map((item: any) => ({
                        id: item.id,
                        channel: item.channel.toLowerCase(),
                        subject: item.subject,
                        summary: item.summary,
                        occurredAt: item.occurredAt,
                        admin_name: "Admin",
                    }))
                )
            } catch (err) {
                if (!isMounted) return
                setError(err instanceof Error ? err.message : "Unable to load communication logs")
            } finally {
                if (isMounted) setLoading(false)
            }
        }
        load()
        return () => {
            isMounted = false
        }
    }, [selectedBrandId])

    const selectedBrand = brands.find(b => b.id === selectedBrandId)

    const history = [
        ...communications.map(m => ({ ...m, type: "message" as const })),
    ].sort((a, b) => {
        const dateA = new Date(a.occurredAt).getTime()
        const dateB = new Date(b.occurredAt).getTime()
        return dateB - dateA
    })

    const handleSendMessage = async () => {
        if (!selectedBrandId || !messageContent.trim()) return;

        const tempMessage = {
            id: crypto.randomUUID(),
            channel: channel.toLowerCase(),
            summary: messageContent,
            subject: subject,
            occurredAt: new Date().toISOString(),
            admin_name: "Admin",
        };

        // instantly show message in UI
        setCommunications(prev => [tempMessage, ...prev]);

        setMessageContent("");
        setSubject("");
        setSending(true);

        try {
            await createBrandCommunication(selectedBrandId, {
                channel,
                summary: tempMessage.summary,
                direction: "OUTBOUND",
                subject: subject
            });

        } catch (err) {
            console.error(err);
        } finally {
            setSending(false);
        }
    };

    const handleDelete = async (id: string) => {
        const oldData = communications;

        // remove instantly
        setCommunications(prev => prev.filter(item => item.id !== id));

        try {
            await deleteCommunication(id);
        } catch (err) {
            console.error(err);

            // rollback if delete fails
            setCommunications(oldData);
        }
    };

    const handleViewHistory = async () => {
        setShowAll(prev => !prev);
        try {
            const messagesRes = await getBrandCommunications(selectedBrandId)
            setCommunications((messagesRes as any).logs || [])
        }
        catch (err) {
            console.error(err)
        }

    }

    return (
        <SidebarProvider>
            <AppSidebar variant="inset" />
            <SidebarInset>
                <SiteHeader />
                <div className="flex flex-1 flex-col p-4 md:p-8 pt-6">
                    <div className="flex items-center justify-between space-y-2 mb-6">
                        <div>
                            <h2 className="text-3xl font-bold tracking-tight">Communication</h2>
                            <p className="text-muted-foreground">
                                Manage direct interactions with brands
                            </p>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-muted-foreground">Select Brand:</span>
                            <Select value={selectedBrandId} onValueChange={setSelectedBrandId}>
                                <SelectTrigger className="w-[200px]">
                                    <SelectValue placeholder="Select brand" />
                                </SelectTrigger>
                                <SelectContent>
                                    {brands.map((brand) => (
                                        <SelectItem key={brand.id} value={brand.id}>
                                            {brand.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* LEFT: INTERACTION FORMS */}
                        <div className="lg:col-span-2">
                            <Card className="h-full">
                                <CardHeader>
                                    <CardTitle>Engage with {selectedBrand?.name}</CardTitle>
                                    <CardDescription>
                                        Send a new message and maintain the conversation.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    {/* MESSAGING TAB */}
                                    <div id="message" className="space-y-4 pt-2">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium">Channel</label>
                                                <div className="space-y-2">
                                                    <Input value={"Email"} disabled />
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium">To</label>
                                                <Input value={selectedBrand?.name || ""} disabled />
                                            </div>
                                        </div>
                                        <div className="space-y-6">
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium">Subject</label>
                                                <Input
                                                    placeholder="Enter email subject"
                                                    value={subject}
                                                    onChange={(event) => setSubject(event.target.value)}
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium">Message Content</label>
                                                <Textarea
                                                    placeholder="Type your message here..."
                                                    className="min-h-[150px]"
                                                    value={messageContent}
                                                    onChange={(event) => setMessageContent(event.target.value)}
                                                />
                                            </div>
                                        </div>
                                        <Button className="w-full" onClick={handleSendMessage} disabled={sending}>
                                            <Send className="mr-2 h-4 w-4" />
                                            {sending ? "Sending..." : "Send Outgoing Message"}
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* RIGHT: INTERACTION HISTORY */}
                        <div className="space-y-6">
                            <Card className="flex flex-col h-full">
                                <CardHeader className="pb-3">
                                    <CardTitle className="text-lg flex items-center gap-2">
                                        <History className="h-5 w-5" />
                                        Interaction History
                                    </CardTitle>
                                    <CardDescription>
                                        Unified feed of messages logs
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="flex-1 overflow-y-auto max-h-[450px]">
                                    <div className="space-y-4 relative pl-2 before:absolute before:top-0 before:bottom-0 before:left-1 before:w-[2px] before:bg-muted">
                                        {history.length > 0 ? (
                                            (showAll ? history : history.slice(0, 4)).map((item, id) => (
                                                <div
                                                    key={item.id}
                                                    className="group relative border rounded-lg px-5 py-4 bg-muted/20 max-w-md ml-4 hover:bg-muted/30 transition-colors"
                                                >
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-[11px] text-muted-foreground">
                                                            {new Date(item.occurredAt).toLocaleDateString("en-US")}
                                                        </span>

                                                        <button
                                                            className="text-red-400 hover:text-red-600 opacity-70 group-hover:opacity-100"
                                                            onClick={() => handleDelete(item.id)}
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                        </button>
                                                    </div>

                                                    <div className="space-y-0.5 pt-3">
                                                        <p className="text-[15px] font-semibold text-foreground/90 leading-tight">
                                                            {item.subject}
                                                        </p>

                                                        <p className="text-sm text-muted-foreground/80 leading-snug line-clamp-1">
                                                            {item.summary}
                                                        </p>
                                                    </div>

                                                    {/* Admin */}
                                                    <p className="text-[11px] text-muted-foreground/70 mt-1">                                                        {item.admin_name}
                                                    </p>
                                                </div>
                                            ))
                                        ) : (
                                            <div className="text-center py-10">
                                                <History className="h-8 w-8 text-muted-foreground/30 mx-auto mb-2" />
                                                <p className="text-xs text-muted-foreground">
                                                    {loading ? "Loading history..." : "No records found for this brand"}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </CardContent>
                                <Separator />
                                <CardFooter className="py-4">
                                    <Button variant="ghost" size="sm" className="w-full text-xs" onClick={handleViewHistory}>
                                        {showAll ? "Show Less" : "View Full History"}
                                    </Button>
                                </CardFooter>
                            </Card>
                        </div>
                    </div>
                </div >
            </SidebarInset >
        </SidebarProvider >
    )
}
