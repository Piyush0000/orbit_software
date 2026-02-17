"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import {
    Palette,
    Eye,
    MoreHorizontal,
    Plus,
    Search,
    Store,
    Layers,
    Activity,
    Settings,
    Loader2,
    Tag
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
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { getThemes } from "@/lib/admin-api"

type Theme = {
    id: string
    name: string
    slug: string
    description?: string
    category?: string
    repository?: string
    primaryColor?: string
    secondaryColor?: string
    fontFamily?: string
    isActive: boolean
    categoryId?: string
}

type ThemesByCategory = {
    [category: string]: Theme[]
}

export default function ThemesPage() {
    const router = useRouter()
    const [searchQuery, setSearchQuery] = React.useState("")
    const [themes, setThemes] = React.useState<Theme[]>([])
    const [loading, setLoading] = React.useState(true)
    const [selectedCategory, setSelectedCategory] = React.useState<string>("all")

    React.useEffect(() => {
        loadThemes()
    }, [])

    const loadThemes = async () => {
        try {
            setLoading(true)
            const response = await getThemes()
            setThemes(response.themes as Theme[])
        } catch (error) {
            console.error("Failed to load themes:", error)
        } finally {
            setLoading(false)
        }
    }

    // Group themes by category
    const themesByCategory = React.useMemo(() => {
        const grouped: ThemesByCategory = {}
        themes.forEach(theme => {
            const category = theme.category || "Uncategorized"
            if (!grouped[category]) {
                grouped[category] = []
            }
            grouped[category].push(theme)
        })
        return grouped
    }, [themes])

    const categories = ["all", ...Object.keys(themesByCategory)]

    const filteredThemes = React.useMemo(() => {
        let filtered = themes
        
        // Filter by category
        if (selectedCategory !== "all") {
            filtered = filtered.filter(theme => theme.category === selectedCategory)
        }
        
        // Filter by search query
        if (searchQuery) {
            const query = searchQuery.toLowerCase()
            filtered = filtered.filter(theme => 
                theme.name.toLowerCase().includes(query) ||
                theme.description?.toLowerCase().includes(query) ||
                theme.category?.toLowerCase().includes(query)
            )
        }
        
        return filtered
    }, [themes, selectedCategory, searchQuery])

    return (
        <SidebarProvider>
            <AppSidebar variant="inset" />
            <SidebarInset>
                <SiteHeader />
                <div className="flex flex-1 flex-col p-4 md:p-8 pt-6">
                    <div className="flex items-center justify-between space-y-2 mb-8">
                        <div>
                            <h2 className="text-3xl font-bold tracking-tight text-foreground">Theme Management</h2>
                            <p className="text-muted-foreground">
                                Manage and deploy storefront themes across the platform
                            </p>
                        </div>
                        <Button className="font-medium">
                            <Plus className="mr-2 h-4 w-4" />
                            Create New Theme
                        </Button>
                    </div>

                    <div className="flex items-center gap-4 mb-6">
                        <div className="relative flex-1 max-w-sm">
                            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                                placeholder="Search themes..."
                                className="pl-9"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Category Filter */}
                    <div className="flex flex-wrap gap-2 mb-8">
                        {categories.map((category) => (
                            <Button
                                key={category}
                                variant={selectedCategory === category ? "default" : "outline"}
                                size="sm"
                                onClick={() => setSelectedCategory(category)}
                                className="capitalize"
                            >
                                <Tag className="mr-2 h-3.5 w-3.5" />
                                {category}
                                {category !== "all" && themesByCategory[category] && (
                                    <Badge variant="secondary" className="ml-2">
                                        {themesByCategory[category].length}
                                    </Badge>
                                )}
                            </Button>
                        ))}
                    </div>

                    {loading ? (
                        <div className="flex items-center justify-center py-16">
                            <Loader2 className="h-8 w-8 animate-spin text-primary" />
                            <span className="ml-2 text-muted-foreground">Loading themes...</span>
                        </div>
                    ) : filteredThemes.length === 0 ? (
                        <Card className="py-16">
                            <CardContent className="flex flex-col items-center justify-center text-center">
                                <Palette className="h-16 w-16 text-muted-foreground mb-4" />
                                <p className="text-lg font-medium text-foreground mb-2">
                                    No themes found
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    {searchQuery 
                                        ? "Try adjusting your search or filter"
                                        : "No themes available. Create your first theme to get started."}
                                </p>
                            </CardContent>
                        </Card>
                    ) : null}
                    
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {filteredThemes.map((theme) => (
                            <Card key={theme.id} className="group overflow-hidden border-border/50 transition-all hover:border-primary/20 hover:shadow-lg">
                                <div className="aspect-video relative overflow-hidden bg-gradient-to-br from-primary/10 to-secondary/10">
                                    {/* Color Preview */}
                                    <div className="h-full w-full flex items-center justify-center">
                                        <div className="flex gap-2">
                                            <div 
                                                className="w-16 h-16 rounded-lg shadow-lg"
                                                style={{ backgroundColor: theme.primaryColor || '#6366f1' }}
                                            />
                                            <div 
                                                className="w-16 h-16 rounded-lg shadow-lg"
                                                style={{ backgroundColor: theme.secondaryColor || '#ec4899' }}
                                            />
                                        </div>
                                    </div>
                                    <div className="absolute inset-0 bg-black/40 opacity-0 transition-opacity group-hover:opacity-100 flex items-center justify-center">
                                        {theme.repository && (
                                            <Button 
                                                variant="secondary" 
                                                size="sm" 
                                                className="font-medium"
                                                onClick={() => window.open(theme.repository, '_blank')}
                                            >
                                                <Eye className="mr-2 h-3.5 w-3.5" />
                                                View Repository
                                            </Button>
                                        )}
                                    </div>
                                    <div className="absolute top-2 right-2">
                                        <Badge variant={theme.isActive ? "default" : "secondary"} className="shadow-sm">
                                            {theme.isActive ? "Active" : "Inactive"}
                                        </Badge>
                                    </div>
                                    {theme.category && (
                                        <div className="absolute top-2 left-2">
                                            <Badge variant="outline" className="bg-background/80 backdrop-blur-sm">
                                                {theme.category}
                                            </Badge>
                                        </div>
                                    )}
                                </div>
                                <CardHeader className="p-4 pb-2">
                                    <CardTitle className="text-lg font-bold">{theme.name}</CardTitle>
                                    <CardDescription className="line-clamp-2">
                                        {theme.description || `Beautiful ${theme.category || 'e-commerce'} template`}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="p-4 pt-0 space-y-3">
                                    <div className="flex flex-wrap gap-1.5 mt-2">
                                        <Badge variant="secondary" className="text-xs">
                                            <Palette className="mr-1 h-3 w-3" />
                                            {theme.fontFamily || 'Inter'}
                                        </Badge>
                                    </div>
                                    <div className="text-xs text-muted-foreground">
                                        <code className="bg-muted px-1.5 py-0.5 rounded">{theme.slug}</code>
                                    </div>
                                </CardContent>
                                <Separator />
                                <CardFooter className="p-2 pt-2 px-3 flex justify-between gap-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="w-full text-xs font-semibold"
                                        onClick={() => router.push(`/dashboard/themes/${theme.id}`)}
                                    >
                                        <Settings className="mr-1.5 h-3.5 w-3.5" />
                                        Details
                                    </Button>
                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
                                        <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}
