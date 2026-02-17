"use client"

import * as React from "react"
import { X, Calendar, User, CheckCircle, Clock, AlertCircle, XCircle, FileText, Users, TrendingUp } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"

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
  milestones?: {
    id: string
    title: string
    completed: boolean
    dueDate: string
  }[]
  teamMembers?: string[]
}

interface ProjectDetailsModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  project: Project | null
}

export function ProjectDetailsModal({ open, onOpenChange, project }: ProjectDetailsModalProps) {
  const getStatusInfo = (status: string) => {
    switch (status) {
      case "completed": return { icon: CheckCircle, color: "text-green-500", label: "Completed" }
      case "in_progress": return { icon: Clock, color: "text-blue-500", label: "In Progress" }
      case "on_hold": return { icon: XCircle, color: "text-yellow-500", label: "On Hold" }
      default: return { icon: AlertCircle, color: "text-gray-500", label: "Planned" }
    }
  }

  const getPriorityInfo = (priority: string) => {
    switch (priority) {
      case "critical": return { variant: "destructive" as const, label: "Critical" }
      case "high": return { variant: "default" as const, label: "High" }
      case "medium": return { variant: "secondary" as const, label: "Medium" }
      default: return { variant: "outline" as const, label: "Low" }
    }
  }

  if (!project) return null

  const { icon: StatusIcon, color, label: statusLabel } = getStatusInfo(project.status)
  const { variant: priorityVariant, label: priorityLabel } = getPriorityInfo(project.priority)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <div>
              <DialogTitle className="text-2xl">{project.name}</DialogTitle>
              <p className="text-muted-foreground mt-2">{project.description}</p>
            </div>
            <Button variant="ghost" size="sm" onClick={() => onOpenChange(false)}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Project Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Overview Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Project Overview
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-muted-foreground">Status</div>
                    <div className="flex items-center gap-2 mt-1">
                      <StatusIcon className={`h-4 w-4 ${color}`} />
                      <Badge variant="outline">{statusLabel}</Badge>
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Priority</div>
                    <div className="mt-1">
                      <Badge variant={priorityVariant}>{priorityLabel}</Badge>
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Progress</div>
                    <div className="mt-1">
                      <div className="flex items-center gap-2">
                        <Progress value={project.progress} className="w-full" />
                        <span className="text-sm font-medium">{project.progress}%</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Assigned To</div>
                    <div className="flex items-center gap-2 mt-1">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span>{project.assignedTo}</span>
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-muted-foreground">Start Date</div>
                    <div className="flex items-center gap-2 mt-1">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>{new Date(project.startDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">End Date</div>
                    <div className="flex items-center gap-2 mt-1">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>{new Date(project.endDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Milestones */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Milestones
                </CardTitle>
                <CardDescription>Key project milestones and deliverables</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {(project.milestones || [
                    { id: "1", title: "Project Kickoff", completed: true, dueDate: "2024-01-20" },
                    { id: "2", title: "Requirements Finalized", completed: true, dueDate: "2024-01-25" },
                    { id: "3", title: "Design Phase", completed: false, dueDate: "2024-02-10" },
                    { id: "4", title: "Development", completed: false, dueDate: "2024-03-01" },
                    { id: "5", title: "Testing & QA", completed: false, dueDate: "2024-03-10" },
                    { id: "6", title: "Deployment", completed: false, dueDate: "2024-03-15" }
                  ]).map((milestone) => (
                    <div key={milestone.id} className="flex items-center justify-between p-3 rounded-lg border bg-muted/30">
                      <div className="flex items-center gap-3">
                        <div className={`h-5 w-5 rounded-full flex items-center justify-center ${milestone.completed ? 'bg-green-500' : 'bg-muted border'}`}>
                          {milestone.completed && <CheckCircle className="h-3 w-3 text-white" />}
                        </div>
                        <span className={milestone.completed ? 'line-through text-muted-foreground' : ''}>
                          {milestone.title}
                        </span>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Due: {new Date(milestone.dueDate).toLocaleDateString()}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Team and Actions */}
          <div className="space-y-6">
            {/* Team Members */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Team Members
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-2 rounded-lg border">
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
                      {project.assignedTo.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <div className="font-medium">{project.assignedTo}</div>
                      <div className="text-xs text-muted-foreground">Project Lead</div>
                    </div>
                  </div>
                  
                  {(project.teamMembers || ["Piyush Rathore", "Shreya Singh Chauhan", "Priya Mahato"]).map((member, index) => (
                    <div key={index} className="flex items-center gap-3 p-2 rounded-lg border">
                      <div className="h-8 w-8 rounded-full bg-secondary/10 flex items-center justify-center text-secondary font-semibold">
                        {member.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <div className="font-medium">{member}</div>
                        <div className="text-xs text-muted-foreground">Developer</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button className="w-full" variant="outline">
                  Edit Project
                </Button>
                <Button className="w-full" variant="outline">
                  View Documents
                </Button>
                <Button className="w-full" variant="outline">
                  Add Milestone
                </Button>
                <Button className="w-full" variant="outline">
                  Update Progress
                </Button>
              </CardContent>
            </Card>

            {/* Timeline Info */}
            <Card>
              <CardHeader>
                <CardTitle>Project Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Created</span>
                    <span>{new Date(project.createdAt).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Days Elapsed</span>
                    <span>{Math.floor((new Date().getTime() - new Date(project.startDate).getTime()) / (1000 * 60 * 60 * 24))} days</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Days Remaining</span>
                    <span>{Math.floor((new Date(project.endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} days</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}