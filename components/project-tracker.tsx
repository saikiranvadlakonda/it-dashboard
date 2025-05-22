"use client"

import { useState } from "react"
import { ArrowUpDown, Calendar, CheckCircle, Clock, Filter, Search, XCircle, Eye, MoreHorizontal } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ProjectDetailModal } from "@/components/project-detail-modal"

const projects = [
  {
    id: "PRJ-001",
    name: "WealthSync Retirement Portal",
    segment: "Wealth",
    owner: "Priya K.",
    completion: 70,
    targetRelease: "15-Jun",
    status: "On Track",
    teams: ["Team Alpha"],
    tags: ["FAST", "Advisor"],
    priority: "P1",
    roi: "$1.2M",
    intake: "Completed",
  },
  {
    id: "PRJ-002",
    name: "Commercial Lending Platform",
    segment: "Commercial",
    owner: "Michael T.",
    completion: 45,
    targetRelease: "30-Jul",
    status: "At Risk",
    teams: ["Team Beta", "Team Gamma"],
    tags: ["Apex", "Integration"],
    priority: "P1",
    roi: "$2.5M",
    intake: "Completed",
  },
  {
    id: "PRJ-003",
    name: "Retail Mobile Banking App",
    segment: "Retail",
    owner: "Sarah L.",
    completion: 85,
    targetRelease: "10-Jun",
    status: "On Track",
    teams: ["Team Delta"],
    tags: ["Mobile", "Security"],
    priority: "P2",
    roi: "$1.8M",
    intake: "Completed",
  },
  {
    id: "PRJ-004",
    name: "Insurance Claims Processing",
    segment: "Insurance",
    owner: "David R.",
    completion: 30,
    targetRelease: "15-Aug",
    status: "Blocked",
    teams: ["Team Epsilon", "Team Zeta"],
    tags: ["OIPA", "Claims"],
    priority: "P1",
    roi: "$3.2M",
    intake: "In Progress",
  },
  {
    id: "PRJ-005",
    name: "Mortgage Origination System",
    segment: "Lending",
    owner: "Jennifer P.",
    completion: 60,
    targetRelease: "20-Jul",
    status: "On Track",
    teams: ["Team Eta"],
    tags: ["Mortgage", "Workflow"],
    priority: "P2",
    roi: "$1.5M",
    intake: "Completed",
  },
  {
    id: "PRJ-006",
    name: "Payment Gateway Integration",
    segment: "Payments",
    owner: "Robert K.",
    completion: 50,
    targetRelease: "05-Aug",
    status: "At Risk",
    teams: ["Team Theta", "Team Iota"],
    tags: ["API", "Security"],
    priority: "P1",
    roi: "$2.1M",
    intake: "Completed",
  },
]

export function ProjectTracker() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedProject, setSelectedProject] = useState(null)
  const [showModal, setShowModal] = useState(false)

  const filteredProjects = projects.filter(
    (project) =>
      project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.segment.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.owner.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleViewProject = (project) => {
    setSelectedProject(project)
    setShowModal(true)
  }

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-xl font-bold">Project Portfolio View</CardTitle>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search projects..."
                className="w-[200px] pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[250px]">
                    <Button variant="ghost" className="p-0 font-medium">
                      Project Name <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </TableHead>
                  <TableHead>Segment</TableHead>
                  <TableHead>Owner</TableHead>
                  <TableHead>Completion</TableHead>
                  <TableHead>
                    <div className="flex items-center">
                      <Calendar className="mr-2 h-4 w-4" />
                      Target
                    </div>
                  </TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Est. ROI</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProjects.map((project) => (
                  <TableRow key={project.id}>
                    <TableCell className="font-medium">{project.name}</TableCell>
                    <TableCell>{project.segment}</TableCell>
                    <TableCell>{project.owner}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-full max-w-24 overflow-hidden rounded-full bg-muted">
                          <div className="h-full bg-primary" style={{ width: `${project.completion}%` }} />
                        </div>
                        <span className="text-xs">{project.completion}%</span>
                      </div>
                    </TableCell>
                    <TableCell>{project.targetRelease}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        {project.status === "On Track" && <CheckCircle className="h-4 w-4 text-green-500" />}
                        {project.status === "At Risk" && <Clock className="h-4 w-4 text-amber-500" />}
                        {project.status === "Blocked" && <XCircle className="h-4 w-4 text-red-500" />}
                        <span
                          className={
                            project.status === "On Track"
                              ? "text-green-500"
                              : project.status === "At Risk"
                                ? "text-amber-500"
                                : "text-red-500"
                          }
                        >
                          {project.status}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={project.priority === "P1" ? "default" : "secondary"}>{project.priority}</Badge>
                    </TableCell>
                    <TableCell className="font-medium text-green-600">{project.roi}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="icon" onClick={() => handleViewProject(project)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>Edit</DropdownMenuItem>
                            <DropdownMenuItem>View Timeline</DropdownMenuItem>
                            <DropdownMenuItem>View Dependencies</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {showModal && selectedProject && (
        <ProjectDetailModal project={selectedProject} onClose={() => setShowModal(false)} />
      )}
    </>
  )
}
