"use client"

import * as React from "react"
import { Plus, Search, Filter, Calendar, User, CheckCircle, Clock, AlertCircle, XCircle } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { ProjectDetailsModal } from "@/components/project-details-modal"

type Project = {
  id: string
  name: string
  description: string
  status: "planned" | "in_progress" | "completed" | "on_hold"
  priority: "low" | "medium" | "high" | "critical"
  progress: number
  startDate: string
  endDate: string
  assignedTo: string
  createdAt: string
}

const mockProjects: Project[] = [
  {
    id: "1",
    name: "Merchant Onboarding Optimization",
    description: "Improve the merchant onboarding flow and reduce drop-off rates",
    status: "in_progress",
    priority: "high",
    progress: 75,
    startDate: "2024-01-15",
    endDate: "2024-03-15",
    assignedTo: "Nishant Raj",
    createdAt: "2024-01-10"
  },
  {
    id: "2",
    name: "Analytics Dashboard Enhancement",
    description: "Add advanced analytics and reporting features to the admin dashboard",
    status: "planned",
    priority: "medium",
    progress: 0,
    startDate: "2024-03-01",
    endDate: "2024-05-01",
    assignedTo: "Piyush Rathore",
    createdAt: "2024-02-20"
  },
  {
    id: "3",
    name: "Payment Gateway Integration",
    description: "Integrate additional payment gateways for international merchants",
    status: "completed",
    priority: "high",
    progress: 100,
    startDate: "2023-11-01",
    endDate: "2024-01-31",
    assignedTo: "Shreya Singh Chauhan",
    createdAt: "2023-10-25"
  },
  {
    id: "4",
    name: "Mobile App Development",
    description: "Develop mobile applications for iOS and Android platforms",
    status: "on_hold",
    priority: "low",
    progress: 30,
    startDate: "2024-02-01",
    endDate: "2024-08-01",
    assignedTo: "Priya Mahato",
    createdAt: "2024-01-20"
  }
]

export default function ProjectsPage() {
  const [projects] = React.useState<Project[]>(mockProjects)
  const [searchQuery, setSearchQuery] = React.useState("")
  const [statusFilter, setStatusFilter] = React.useState("all")
  const [priorityFilter, setPriorityFilter] = React.useState("all")
  const [selectedProject, setSelectedProject] = React.useState<Project | null>(null)
  const [modalOpen, setModalOpen] = React.useState(false)

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed": return { icon: CheckCircle, color: "text-green-500" }
      case "in_progress": return { icon: Clock, color: "text-blue-500" }
      case "on_hold": return { icon: XCircle, color: "text-yellow-500" }
      default: return { icon: AlertCircle, color: "text-gray-500" }
    }
  }

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "critical": return <Badge variant="destructive">Critical</Badge>
      case "high": return <Badge variant="default">High</Badge>
      case "medium": return <Badge variant="secondary">Medium</Badge>
      default: return <Badge variant="outline">Low</Badge>
    }
  }

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         project.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || project.status === statusFilter
    const matchesPriority = priorityFilter === "all" || project.priority === priorityFilter
    return matchesSearch && matchesStatus && matchesPriority
  })

  return (
    <SidebarProvider suppressHydrationWarning>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col p-4 md:p-8 pt-6" suppressHydrationWarning>
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold tracking-tight text-foreground">Projects</h2>
                <p className="text-muted-foreground">
                  Track initiatives, milestones, and delivery status.
                </p>
              </div>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                New Project
              </Button>
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-4 mb-6">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search projects..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="planned">Planned</SelectItem>
                <SelectItem value="in_progress">In Progress</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="on_hold">On Hold</SelectItem>
              </SelectContent>
            </Select>
            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priorities</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Total Projects</CardDescription>
                <CardTitle className="text-2xl">{projects.length}</CardTitle>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>In Progress</CardDescription>
                <CardTitle className="text-2xl text-blue-500">
                  {projects.filter(p => p.status === "in_progress").length}
                </CardTitle>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Completed</CardDescription>
                <CardTitle className="text-2xl text-green-500">
                  {projects.filter(p => p.status === "completed").length}
                </CardTitle>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>High Priority</CardDescription>
                <CardTitle className="text-2xl text-red-500">
                  {projects.filter(p => p.priority === "high" || p.priority === "critical").length}
                </CardTitle>
              </CardHeader>
            </Card>
          </div>

          {/* Projects Table */}
          <Card>
            <CardHeader>
              <CardTitle>Project List</CardTitle>
              <CardDescription>Manage and track all ongoing projects</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Project</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Progress</TableHead>
                    <TableHead>Assigned To</TableHead>
                    <TableHead>Timeline</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProjects.map((project) => {
                    const { icon: StatusIcon, color } = getStatusIcon(project.status)
                    return (
                      <TableRow key={project.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{project.name}</div>
                            <div className="text-sm text-muted-foreground line-clamp-2">
                              {project.description}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <StatusIcon className={`h-4 w-4 ${color}`} />
                            <Badge variant="outline" className="capitalize">
                              {project.status.replace("_", " ")}
                            </Badge>
                          </div>
                        </TableCell>
                        <TableCell>
                          {getPriorityBadge(project.priority)}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className="h-2 w-24 rounded-full bg-secondary overflow-hidden">
                              <div 
                                className="h-full bg-primary" 
                                style={{ width: `${project.progress}%` }}
                              />
                            </div>
                            <span className="text-sm text-muted-foreground">{project.progress}%</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <User className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">{project.assignedTo}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <div className="text-sm">
                              <div>{new Date(project.startDate).toLocaleDateString()}</div>
                              <div className="text-muted-foreground">to {new Date(project.endDate).toLocaleDateString()}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => {
                              setSelectedProject(project)
                              setModalOpen(true)
                            }}
                          >
                            View Details
                          </Button>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
              
              {filteredProjects.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  No projects found matching your criteria
                </div>
              )}
            </CardContent>
          </Card>
        </div>
        
        <ProjectDetailsModal 
          open={modalOpen} 
          onOpenChange={setModalOpen} 
          project={selectedProject} 
        />
      </SidebarInset>
    </SidebarProvider>
  )
}
