"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Search, Filter, ArrowUpDown, Calendar, CheckCircle, Clock, XCircle, Eye, Trash2, Edit } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { AddProjectModal } from "@/components/add-project-modal"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

// Sample project data
const initialProjects = [
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
  {
    id: "PRJ-007",
    name: "Customer Data Platform",
    segment: "Retail",
    owner: "Emily W.",
    completion: 25,
    targetRelease: "30-Sep",
    status: "On Track",
    teams: ["Team Kappa"],
    tags: ["Data", "Analytics"],
    priority: "P2",
    roi: "$1.9M",
    intake: "In Progress",
  },
  {
    id: "PRJ-008",
    name: "Fraud Detection System",
    segment: "Payments",
    owner: "James L.",
    completion: 40,
    targetRelease: "15-Oct",
    status: "On Track",
    teams: ["Team Lambda", "Team Mu"],
    tags: ["Security", "AI"],
    priority: "P1",
    roi: "$3.5M",
    intake: "Completed",
  },
  {
    id: "PRJ-009",
    name: "Wealth Management Dashboard",
    segment: "Wealth",
    owner: "Sophia C.",
    completion: 65,
    targetRelease: "01-Aug",
    status: "On Track",
    teams: ["Team Nu"],
    tags: ["Dashboard", "Analytics"],
    priority: "P2",
    roi: "$1.3M",
    intake: "Completed",
  },
  {
    id: "PRJ-010",
    name: "Commercial Loan Origination",
    segment: "Commercial",
    owner: "Daniel H.",
    completion: 15,
    targetRelease: "15-Nov",
    status: "At Risk",
    teams: ["Team Xi", "Team Omicron"],
    tags: ["Loan", "Workflow"],
    priority: "P1",
    roi: "$2.8M",
    intake: "In Progress",
  },
  {
    id: "PRJ-011",
    name: "Mobile Wallet Enhancement",
    segment: "Payments",
    owner: "Olivia M.",
    completion: 55,
    targetRelease: "20-Aug",
    status: "On Track",
    teams: ["Team Pi"],
    tags: ["Mobile", "Wallet"],
    priority: "P2",
    roi: "$1.6M",
    intake: "Completed",
  },
  {
    id: "PRJ-012",
    name: "Insurance Policy Management",
    segment: "Insurance",
    owner: "William B.",
    completion: 80,
    targetRelease: "10-Jul",
    status: "On Track",
    teams: ["Team Rho"],
    tags: ["Policy", "Management"],
    priority: "P2",
    roi: "$1.4M",
    intake: "Completed",
  },
]

export default function ProjectsPage() {
  const [projects, setProjects] = useState(initialProjects)
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [projectToDelete, setProjectToDelete] = useState<string | null>(null)
  const [projectToEdit, setProjectToEdit] = useState<any | null>(null)
  const router = useRouter()

  const itemsPerPage = 5

  // Filter projects based on search term
  const filteredProjects = projects.filter(
    (project) =>
      project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.segment.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.owner.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.id.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Calculate pagination
  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedProjects = filteredProjects.slice(startIndex, startIndex + itemsPerPage)

  // Navigate to project details page
  const handleViewProject = (projectId: string) => {
    router.push(`/projects/${projectId}`)
  }

  // Handle adding a new project
  const handleAddProject = (newProject: any) => {
    setProjects([newProject, ...projects])
  }

  // Handle deleting a project
  const handleDeleteProject = (projectId: string) => {
    setProjects(projects.filter((project) => project.id !== projectId))
    setProjectToDelete(null)
  }

  // Handle editing a project
  const handleEditProject = (updatedProject: any) => {
    setProjects(projects.map((project) => (project.id === updatedProject.id ? updatedProject : project)))
    setProjectToEdit(null)
  }

  // Generate pagination items
  const renderPaginationItems = () => {
    const items = []

    // Always show first page
    items.push(
      <PaginationItem key="first">
        <PaginationLink isActive={currentPage === 1} onClick={() => setCurrentPage(1)}>
          1
        </PaginationLink>
      </PaginationItem>,
    )

    // Show ellipsis if needed
    if (currentPage > 3) {
      items.push(
        <PaginationItem key="ellipsis-1">
          <span className="flex h-9 w-9 items-center justify-center">...</span>
        </PaginationItem>,
      )
    }

    // Show pages around current page
    for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
      if (i === 1 || i === totalPages) continue // Skip first and last as they're always shown
      items.push(
        <PaginationItem key={i}>
          <PaginationLink isActive={currentPage === i} onClick={() => setCurrentPage(i)}>
            {i}
          </PaginationLink>
        </PaginationItem>,
      )
    }

    // Show ellipsis if needed
    if (currentPage < totalPages - 2) {
      items.push(
        <PaginationItem key="ellipsis-2">
          <span className="flex h-9 w-9 items-center justify-center">...</span>
        </PaginationItem>,
      )
    }

    // Always show last page if there's more than one page
    if (totalPages > 1) {
      items.push(
        <PaginationItem key="last">
          <PaginationLink isActive={currentPage === totalPages} onClick={() => setCurrentPage(totalPages)}>
            {totalPages}
          </PaginationLink>
        </PaginationItem>,
      )
    }

    return items
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-col space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Projects</h1>
        </div>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xl font-bold">Project Portfolio</CardTitle>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search projects..."
                  className="w-[250px] pl-8"
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value)
                    setCurrentPage(1) // Reset to first page on search
                  }}
                />
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="gap-2">
                    <Filter className="h-4 w-4" />
                    Filter
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[200px]">
                  <DropdownMenuItem>Status</DropdownMenuItem>
                  <DropdownMenuItem>Segment</DropdownMenuItem>
                  <DropdownMenuItem>Priority</DropdownMenuItem>
                  <DropdownMenuItem>Team</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">ID</TableHead>
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
                  {paginatedProjects.map((project) => (
                    <TableRow
                      key={project.id}
                      className="cursor-pointer hover:bg-muted/50"
                      onClick={() => handleViewProject(project.id)}
                    >
                      <TableCell className="font-medium">{project.id}</TableCell>
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
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={(e) => {
                              e.stopPropagation()
                              handleViewProject(project.id)
                            }}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={(e) => {
                              e.stopPropagation()
                              setProjectToEdit(project)
                            }}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={(e) => {
                              e.stopPropagation()
                              setProjectToDelete(project.id)
                            }}
                          >
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Pagination */}
            <div className="mt-4">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                      className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                    />
                  </PaginationItem>

                  {renderPaginationItems()}

                  <PaginationItem>
                    <PaginationNext
                      onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                      className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Delete Confirmation Dialog */}
      {projectToDelete && (
        <Dialog open={!!projectToDelete} onOpenChange={() => setProjectToDelete(null)}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Confirm Deletion</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete this project? This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setProjectToDelete(null)}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={() => handleDeleteProject(projectToDelete)}>
                Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Add/Edit Project Modal */}
      <AddProjectModal
        open={isAddModalOpen || !!projectToEdit}
        onOpenChange={(open) => {
          if (!open) {
            setIsAddModalOpen(false)
            setProjectToEdit(null)
          }
        }}
        onSave={projectToEdit ? handleEditProject : handleAddProject}
        project={projectToEdit}
      />
    </div>
  )
}
