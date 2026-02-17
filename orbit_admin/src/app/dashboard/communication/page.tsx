"use client"

import * as React from "react"
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
    Calendar
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
    createBrandCall,
    createBrandCommunication,
    getBrandCalls,
    getBrandCommunications,
    getBrands,
} from "@/lib/admin-api"

export default function CommunicationPage() {
    const [selectedBrandId, setSelectedBrandId] = React.useState<string>("")
    const [brands, setBrands] = React.useState<Array<{ id: string; name: string }>>([])
    const [messageChannel, setMessageChannel] = React.useState<string>("email")
    const [messageContent, setMessageContent] = React.useState("")
    const [callNotes, setCallNotes] = React.useState("")
    const [communications, setCommunications] = React.useState<
        Array<{ id: string; channel: string; summary: string; occurredAt: string; admin_name: string }>
    >([])
    const [calls, setCalls] = React.useState<
        Array<{ id: string; channel: string; notes: string; occurredAt: string; admin_name: string }>
    >([])
    const [loading, setLoading] = React.useState(true)
    const [error, setError] = React.useState<string | null>(null)
    const [sending, setSending] = React.useState(false)
    const [saving, setSaving] = React.useState(false)

    React.useEffect(() => {
        let isMounted = true
        const loadBrands = async () => {
            try {
                const { stores } = await getBrands()
                if (!isMounted) return
                const mapped = stores.map((store) => ({ id: store.id, name: store.name }))
                setBrands(mapped)
                setSelectedBrandId(mapped[0]?.id || "")
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
                const [messagesRes, callsRes] = await Promise.all([
                    getBrandCommunications(selectedBrandId),
                    getBrandCalls(selectedBrandId),
                ])
                if (!isMounted) return
                setCommunications(
                    (messagesRes.communications || []).map((item) => ({
                        id: item.id,
                        channel: item.channel.toLowerCase(),
                        summary: item.summary,
                        occurredAt: item.occurredAt,
                        admin_name: "Admin",
                    }))
                )
                setCalls(
                    (callsRes.calls || []).map((item) => ({
                        id: item.id,
                        channel: item.channel.toLowerCase(),
                        notes: item.notes,
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
        ...calls.map(c => ({ ...c, type: "call" as const })),
    ].sort((a, b) => {
        const dateA = new Date(a.occurredAt).getTime()
        const dateB = new Date(b.occurredAt).getTime()
        return dateB - dateA
    })

    const handleSendMessage = async () => {
        if (!selectedBrandId || !messageContent.trim()) return
        setSending(true)
        try {
            await createBrandCommunication(selectedBrandId, {
                channel: messageChannel.toUpperCase(),
                summary: messageContent.trim(),
            })
            setMessageContent("")
            const { communications } = await getBrandCommunications(selectedBrandId)
            setCommunications(
                (communications || []).map((item) => ({
                    id: item.id,
                    channel: item.channel.toLowerCase(),
                    summary: item.summary,
                    occurredAt: item.occurredAt,
                    admin_name: "Admin",
                }))
            )
        } finally {
            setSending(false)
        }
    }

    const handleSaveCall = async () => {
        if (!selectedBrandId || !callNotes.trim()) return
        setSaving(true)
        try {
            await createBrandCall(selectedBrandId, {
                channel: "PHONE",
                notes: callNotes.trim(),
            })
            setCallNotes("")
            const { calls } = await getBrandCalls(selectedBrandId)
            setCalls(
                (calls || []).map((item) => ({
                    id: item.id,
                    channel: item.channel.toLowerCase(),
                    notes: item.notes,
                    occurredAt: item.occurredAt,
                    admin_name: "Admin",
                }))
            )
        } finally {
            setSaving(false)
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
                                Manage direct interactions and call logs with brands
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
                    {error && <p className="text-sm text-muted-foreground mb-4">{error}</p>}

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* LEFT: INTERACTION FORMS */}
                        <div className="lg:col-span-2">
                            <Card className="h-full">
                                <CardHeader>
                                    <CardTitle>Engage with {selectedBrand?.name}</CardTitle>
                                    <CardDescription>
                                        Send a new message or log a recent phone conversation.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <Tabs defaultValue="message" className="space-y-4">
                                        <TabsList className="grid w-full grid-cols-2">
                                            <TabsTrigger value="message" className="flex items-center gap-2">
                                                <Send className="h-4 w-4" />
                                                Send Message
                                            </TabsTrigger>
                                            <TabsTrigger value="call" className="flex items-center gap-2">
                                                <Phone className="h-4 w-4" />
                                                Log Call
                                            </TabsTrigger>
                                        </TabsList>

                                        {/* MESSAGING TAB */}
                                        <TabsContent value="message" className="space-y-4 pt-2">
                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="space-y-2">
                                                    <label className="text-sm font-medium">Channel</label>
                                                    <Select value={messageChannel} onValueChange={setMessageChannel}>
                                                        <SelectTrigger>
                                                            <SelectValue />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="email">Email</SelectItem>
                                                            <SelectItem value="in-app">In-App Messaging</SelectItem>
                                                            <SelectItem value="whatsapp">WhatsApp</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-sm font-medium">To</label>
                                                    <Input value={selectedBrand?.name || ""} disabled />
                                                </div>
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
                                            <Button className="w-full" onClick={handleSendMessage} disabled={sending}>
                                                <Send className="mr-2 h-4 w-4" />
                                                {sending ? "Sending..." : "Send Outgoing Message"}
                                            </Button>
                                        </TabsContent>

                                        {/* CALL LOG TAB */}
                                        <TabsContent value="call" className="space-y-4 pt-2">
                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="space-y-2">
                                                    <label className="text-sm font-medium">Call Date</label>
                                                    <div className="flex items-center gap-2 h-10 px-3 rounded-md border bg-muted/30 text-sm text-muted-foreground">
                                                        <Calendar className="h-4 w-4" />
                                                        {new Date().toLocaleDateString("en-US")}
                                                    </div>
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-sm font-medium">Admin Participating</label>
                                                    <Input value="Admin User" disabled />
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium">Call Notes</label>
                                                <Textarea
                                                    placeholder="Summarize the phone conversation details..."
                                                    className="min-h-[150px]"
                                                    value={callNotes}
                                                    onChange={(event) => setCallNotes(event.target.value)}
                                                />
                                            </div>
                                            <Button
                                                variant="outline"
                                                className="w-full border-primary/20 text-primary"
                                                onClick={handleSaveCall}
                                                disabled={saving}
                                            >
                                                <CheckCircle2 className="mr-2 h-4 w-4" />
                                                {saving ? "Saving..." : "Save Call Log"}
                                            </Button>
                                        </TabsContent>
                                    </Tabs>
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
                                        Unified feed of messages and call logs
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="flex-1 overflow-y-auto">
                                    <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent">
                                        {history.length > 0 ? (
                                            history.map((item, idx) => (
                                                <div key={idx} className="relative flex items-start gap-4">
                                                    <div className={`mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border bg-background shadow-sm z-10 ${item.type === 'call' ? 'text-blue-500' : 'text-primary'
                                                        }`}>
                                                        {item.type === 'message' && (
                                                            item.channel === 'email' ? <Mail className="h-5 w-5" /> :
                                                                item.channel === 'whatsapp' ? <MessageCircle className="h-5 w-5" /> :
                                                                    <Smartphone className="h-5 w-5" />
                                                        )}
                                                        {item.type === 'call' && <Phone className="h-5 w-5" />}
                                                    </div>
                                                    <div className="flex flex-col gap-1 pt-0.5">
                                                        <div className="flex items-center gap-2">
                                                            <span className="text-sm font-semibold">
                                                                {item.type === 'message' ? `Sent ${item.channel}` : 'Phone Call Log'}
                                                            </span>
                                                            <span className="text-[10px] text-muted-foreground">
                                                                {new Date(item.occurredAt).toLocaleDateString("en-US")}
                                                            </span>
                                                        </div>
                                                        <p className="text-sm text-muted-foreground line-clamp-2">
                                                            {item.type === 'message' ? item.summary : item.notes}
                                                        </p>
                                                        <div className="flex items-center gap-2 mt-1">
                                                            <Badge variant="outline" className="text-[10px] h-4">
                                                                {item.admin_name}
                                                            </Badge>
                                                        </div>
                                                    </div>
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
                                    <Button variant="ghost" size="sm" className="w-full text-xs" onClick={() => { }}>
                                        View Full History
                                    </Button>
                                </CardFooter>
                            </Card>
                        </div>
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}
