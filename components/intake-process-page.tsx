"use client"

import { useState } from "react"
import { ArrowUpDown, Check, Clock, Download, Filter, Search, SlidersHorizontal, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { ScrollArea } from "@/components/ui/scroll-area"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Progress } from "@/components/ui/progress"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { IntakeProcess } from "./intake-process"

// Define types for our intake process
type IntakeStatus = "Draft" | "Submitted" | "In Review" | "Approved" | "Rejected" | "On Hold"
type Priority = "P1" | "P2" | "P3" | "P4"
type IntakeType = "Feature" | "Enhancement" | "Bug Fix" | "Infrastructure" | "Security" | "Compliance"
type Segment = "Retail" | "Commercial" | "Wealth" | "Insurance" | "Enterprise"

interface Intake {
  id: string
  title: string
  description: string
  status: IntakeStatus
  priority: Priority
  type: IntakeType
  segment: Segment
  submitter: string
  submittedDate: string
  reviewDate?: string
  decisionDate?: string
  decisionOwner?: string
  estimatedEffort?: number
  estimatedValue?: number
  readinessScore?: number
  tags: string[]
  attachments: number
  comments: number
}

// Sample data
const initialIntakes: Intake[] = [
  {
    id: "INT-2025-001",
    title: "Mobile Check Deposit Enhancement",
    description:
      "Enhance the mobile check deposit feature to include multi-check deposits and improved OCR for faster processing.",
    status: "Approved",
    priority: "P2",
    type: "Enhancement",
    segment: "Retail",
    submitter: "Sarah Johnson",
    submittedDate: "2025-04-28",
    reviewDate: "2025-05-02",
    decisionDate: "2025-05-10",
    decisionOwner: "Digital Banking Committee",
    estimatedEffort: 45,
    estimatedValue: 80,
    readinessScore: 92,
    tags: ["mobile", "deposits", "customer-experience"],
    attachments: 3,
    comments: 8,
  },
  {
    id: "INT-2025-002",
    title: "Commercial Loan Application Portal",
    description:
      "Create a new portal for commercial clients to apply for loans, upload documents, and track application status.",
    status: "In Review",
    priority: "P1",
    type: "Feature",
    segment: "Commercial",
    submitter: "Michael Chen",
    submittedDate: "2025-05-01",
    reviewDate: "2025-05-08",
    estimatedEffort: 120,
    estimatedValue: 95,
    readinessScore: 78,
    tags: ["commercial", "loans", "portal"],
    attachments: 5,
    comments: 12,
  },
  {
    id: "INT-2025-003",
    title: "Wealth Management Dashboard Redesign",
    description: "Redesign the wealth management dashboard to improve usability and add new analytics features.",
    status: "Submitted",
    priority: "P2",
    type: "Enhancement",
    segment: "Wealth",
    submitter: "Jennifer Lee",
    submittedDate: "2025-05-05",
    tags: ["wealth", "dashboard", "UX"],
    attachments: 2,
    comments: 4,
  },
  {
    id: "INT-2025-004",
    title: "Insurance Claims API Integration",
    description: "Integrate with third-party insurance claims processing API to streamline claims handling.",
    status: "Draft",
    priority: "P3",
    type: "Integration",
    segment: "Insurance",
    submitter: "Robert Martinez",
    submittedDate: "2025-05-06",
    estimatedEffort: 60,
    estimatedValue: 70,
    tags: ["insurance", "claims", "API"],
    attachments: 1,
    comments: 2,
  },
  {
    id: "INT-2025-005",
    title: "Regulatory Compliance Reporting Module",
    description:
      "Develop a new module for automated regulatory compliance reporting to meet updated federal requirements.",
    status: "Submitted",
    priority: "P1",
    type: "Compliance",
    segment: "Enterprise",
    submitter: "Patricia Wong",
    submittedDate: "2025-05-03",
    reviewDate: "2025-05-09",
    estimatedEffort: 90,
    estimatedValue: 85,
    readinessScore: 65,
    tags: ["compliance", "regulatory", "reporting"],
    attachments: 7,
    comments: 15,
  },
  {
    id: "INT-2025-006",
    title: "Security Authentication Enhancement",
    description: "Implement multi-factor authentication across all customer-facing applications.",
    status: "Approved",
    priority: "P1",
    type: "Security",
    segment: "Enterprise",
    submitter: "David Wilson",
    submittedDate: "2025-04-20",
    reviewDate: "2025-04-25",
    decisionDate: "2025-05-01",
    decisionOwner: "Security Council",
    estimatedEffort: 75,
    estimatedValue: 95,
    readinessScore: 88,
    tags: ["security", "authentication", "MFA"],
    attachments: 4,
    comments: 9,
  },
  {
    id: "INT-2025-007",
    title: "ATM Locator Feature Enhancement",
    description: "Enhance the ATM locator feature to include real-time status updates and improved filtering options.",
    status: "Rejected",
    priority: "P3",
    type: "Enhancement",
    segment: "Retail",
    submitter: "James Thompson",
    submittedDate: "2025-04-15",
    reviewDate: "2025-04-22",
    decisionDate: "2025-04-30",
    decisionOwner: "Digital Banking Committee",
    estimatedEffort: 30,
    estimatedValue: 40,
    readinessScore: 72,
    tags: ["ATM", "locator", "mobile"],
    attachments: 2,
    comments: 6,
  },
]

export function IntakeProcessPage() {
  const [intakes, setIntakes] = useState<Intake[]>(initialIntakes)
  const [selectedIntake, setSelectedIntake] = useState<Intake | null>(null)
  const [isNewIntakeOpen, setIsNewIntakeOpen] = useState(false)
  const [isDetailOpen, setIsDetailOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<IntakeStatus | "All">("All")
  const [priorityFilter, setPriorityFilter] = useState<Priority | "All">("All")
  const [segmentFilter, setSegmentFilter] = useState<Segment | "All">("All")

  // New intake form state
  const [newIntake, setNewIntake] = useState<Partial<Intake>>({
    title: "",
    description: "",
    status: "Draft",
    priority: "P3",
    type: "Feature",
    segment: "Retail",
    submitter: "Current User",
    submittedDate: new Date().toISOString().split("T")[0],
    tags: [],
    attachments: 0,
    comments: 0,
  })

  // Filter intakes based on search and filters
  const filteredIntakes = intakes.filter((intake) => {
    const matchesSearch =
      searchQuery === "" ||
      intake.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      intake.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      intake.id.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === "All" || intake.status === statusFilter
    const matchesPriority = priorityFilter === "All" || intake.priority === priorityFilter
    const matchesSegment = segmentFilter === "All" || intake.segment === segmentFilter

    return matchesSearch && matchesStatus && matchesPriority && matchesSegment
  })

  // Handle creating a new intake
  const handleCreateIntake = () => {
    const id = `INT-2025-${String(intakes.length + 1).padStart(3, "0")}`
    const createdIntake = {
      ...newIntake,
      id,
      tags: newIntake.tags || [],
      attachments: 0,
      comments: 0,
    } as Intake

    setIntakes([createdIntake, ...intakes])
    setIsNewIntakeOpen(false)
    setNewIntake({
      title: "",
      description: "",
      status: "Draft",
      priority: "P3",
      type: "Feature",
      segment: "Retail",
      submitter: "Current User",
      submittedDate: new Date().toISOString().split("T")[0],
      tags: [],
      attachments: 0,
      comments: 0,
    })
  }

  // Handle updating an intake status
  const handleStatusChange = (id: string, newStatus: IntakeStatus) => {
    setIntakes(intakes.map((intake) => (intake.id === id ? { ...intake, status: newStatus } : intake)))

    if (selectedIntake && selectedIntake.id === id) {
      setSelectedIntake({ ...selectedIntake, status: newStatus })
    }
  }

  // Handle viewing intake details
  const handleViewDetails = (intake: Intake) => {
    setSelectedIntake(intake)
    setIsDetailOpen(true)
  }

  // Calculate readiness score based on completeness
  const calculateReadiness = (intake: Partial<Intake>): number => {
    let score = 0
    const fields = [
      intake.title,
      intake.description,
      intake.priority,
      intake.type,
      intake.segment,
      intake.estimatedEffort,
      intake.estimatedValue,
    ]

    const totalFields = fields.length
    const completedFields = fields.filter((field) => field !== undefined && field !== "").length

    score = Math.round((completedFields / totalFields) * 100)
    return score
  }

  // Get status badge color
  const getStatusColor = (status: IntakeStatus) => {
    switch (status) {
      case "Draft":
        return "bg-gray-200 text-gray-800"
      case "Submitted":
        return "bg-blue-100 text-blue-800"
      case "In Review":
        return "bg-amber-100 text-amber-800"
      case "Approved":
        return "bg-green-100 text-green-800"
      case "Rejected":
        return "bg-red-100 text-red-800"
      case "On Hold":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  // Get priority badge color
  const getPriorityColor = (priority: Priority) => {
    switch (priority) {
      case "P1":
        return "bg-red-100 text-red-800"
      case "P2":
        return "bg-orange-100 text-orange-800"
      case "P3":
        return "bg-blue-100 text-blue-800"
      case "P4":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="container mx-auto p-6 space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Intake Process</h1>
          <p className="text-muted-foreground mt-1">Manage and track project intake processes</p>
        </div>
      </div>

      <Tabs defaultValue="list" className="w-full">
        <div className="flex justify-between items-center mb-4">
          <TabsList>
            <TabsTrigger value="list">List View</TabsTrigger>
            <TabsTrigger value="board">Board View</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <div className="flex items-center space-x-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search intakes..."
                className="pl-8 w-[250px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="sm">
                  <Filter className="mr-2 h-4 w-4" /> Filters
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="space-y-4">
                  <h4 className="font-medium">Filter Intakes</h4>
                  <div className="space-y-2">
                    <Label htmlFor="status-filter">Status</Label>
                    <Select
                      value={statusFilter}
                      onValueChange={(value) => setStatusFilter(value as IntakeStatus | "All")}
                    >
                      <SelectTrigger id="status-filter">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="All">All Statuses</SelectItem>
                        <SelectItem value="Draft">Draft</SelectItem>
                        <SelectItem value="Submitted">Submitted</SelectItem>
                        <SelectItem value="In Review">In Review</SelectItem>
                        <SelectItem value="Approved">Approved</SelectItem>
                        <SelectItem value="Rejected">Rejected</SelectItem>
                        <SelectItem value="On Hold">On Hold</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="priority-filter">Priority</Label>
                    <Select
                      value={priorityFilter}
                      onValueChange={(value) => setPriorityFilter(value as Priority | "All")}
                    >
                      <SelectTrigger id="priority-filter">
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="All">All Priorities</SelectItem>
                        <SelectItem value="P1">P1 (Critical)</SelectItem>
                        <SelectItem value="P2">P2 (High)</SelectItem>
                        <SelectItem value="P3">P3 (Medium)</SelectItem>
                        <SelectItem value="P4">P4 (Low)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="segment-filter">Segment</Label>
                    <Select value={segmentFilter} onValueChange={(value) => setSegmentFilter(value as Segment | "All")}>
                      <SelectTrigger id="segment-filter">
                        <SelectValue placeholder="Select segment" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="All">All Segments</SelectItem>
                        <SelectItem value="Retail">Retail</SelectItem>
                        <SelectItem value="Commercial">Commercial</SelectItem>
                        <SelectItem value="Wealth">Wealth</SelectItem>
                        <SelectItem value="Insurance">Insurance</SelectItem>
                        <SelectItem value="Enterprise">Enterprise</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex justify-between">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setStatusFilter("All")
                        setPriorityFilter("All")
                        setSegmentFilter("All")
                      }}
                    >
                      Reset
                    </Button>
                    <Button size="sm">Apply Filters</Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>

            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" /> Export
            </Button>
          </div>
        </div>

        <TabsContent value="list" className="mt-0">
          <Card>
            <CardContent className="p-0">
              <div className="rounded-md border">
                <div className="relative w-full overflow-auto">
                  <table className="w-full caption-bottom text-sm">
                    <thead>
                      <tr className="border-b bg-muted/50 transition-colors">
                        <th className="h-12 px-4 text-left align-middle font-medium">
                          <div className="flex items-center space-x-2">
                            <span>ID</span>
                            <ArrowUpDown className="h-4 w-4" />
                          </div>
                        </th>
                        <th className="h-12 px-4 text-left align-middle font-medium">
                          <div className="flex items-center space-x-2">
                            <span>Title</span>
                            <ArrowUpDown className="h-4 w-4" />
                          </div>
                        </th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Status</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Priority</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Segment</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">
                          <div className="flex items-center space-x-2">
                            <span>Submitted</span>
                            <ArrowUpDown className="h-4 w-4" />
                          </div>
                        </th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Readiness</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredIntakes.length === 0 ? (
                        <tr>
                          <td colSpan={8} className="h-24 text-center">
                            No intakes found matching your criteria
                          </td>
                        </tr>
                      ) : (
                        filteredIntakes.map((intake) => (
                          <tr
                            key={intake.id}
                            className="border-b transition-colors hover:bg-muted/50 cursor-pointer"
                            onClick={() => handleViewDetails(intake)}
                          >
                            <td className="p-4 align-middle">{intake.id}</td>
                            <td className="p-4 align-middle font-medium">{intake.title}</td>
                            <td className="p-4 align-middle">
                              <Badge className={`${getStatusColor(intake.status)}`}>{intake.status}</Badge>
                            </td>
                            <td className="p-4 align-middle">
                              <Badge className={`${getPriorityColor(intake.priority)}`}>{intake.priority}</Badge>
                            </td>
                            <td className="p-4 align-middle">{intake.segment}</td>
                            <td className="p-4 align-middle">{new Date(intake.submittedDate).toLocaleDateString()}</td>
                            <td className="p-4 align-middle">
                              <div className="flex items-center gap-2">
                                <Progress
                                  value={intake.readinessScore || calculateReadiness(intake)}
                                  className="h-2 w-[60px]"
                                />
                                <span className="text-xs">{intake.readinessScore || calculateReadiness(intake)}%</span>
                              </div>
                            </td>
                            <td className="p-4 align-middle">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                                  <Button variant="ghost" size="sm">
                                    <SlidersHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      handleViewDetails(intake)
                                    }}
                                  >
                                    View Details
                                  </DropdownMenuItem>
                                  {intake.status === "Draft" && (
                                    <DropdownMenuItem
                                      onClick={(e) => {
                                        e.stopPropagation()
                                        handleStatusChange(intake.id, "Submitted")
                                      }}
                                    >
                                      Submit for Review
                                    </DropdownMenuItem>
                                  )}
                                  {intake.status === "Submitted" && (
                                    <DropdownMenuItem
                                      onClick={(e) => {
                                        e.stopPropagation()
                                        handleStatusChange(intake.id, "In Review")
                                      }}
                                    >
                                      Move to Review
                                    </DropdownMenuItem>
                                  )}
                                  {intake.status === "In Review" && (
                                    <>
                                      <DropdownMenuItem
                                        onClick={(e) => {
                                          e.stopPropagation()
                                          handleStatusChange(intake.id, "Approved")
                                        }}
                                      >
                                        Approve
                                      </DropdownMenuItem>
                                      <DropdownMenuItem
                                        onClick={(e) => {
                                          e.stopPropagation()
                                          handleStatusChange(intake.id, "Rejected")
                                        }}
                                      >
                                        Reject
                                      </DropdownMenuItem>
                                      <DropdownMenuItem
                                        onClick={(e) => {
                                          e.stopPropagation()
                                          handleStatusChange(intake.id, "On Hold")
                                        }}
                                      >
                                        Put On Hold
                                      </DropdownMenuItem>
                                    </>
                                  )}
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="board" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {["Draft", "Submitted", "In Review", "Approved"].map((status) => (
              <Card key={status} className="overflow-hidden">
                <CardHeader
                  className={`p-4 ${status === "Approved" ? "bg-green-50" : status === "In Review" ? "bg-amber-50" : status === "Submitted" ? "bg-blue-50" : "bg-gray-50"}`}
                >
                  <CardTitle className="text-lg flex justify-between items-center">
                    <span>{status}</span>
                    <Badge variant="outline">{intakes.filter((i) => i.status === status).length}</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-3">
                  <ScrollArea className="h-[calc(100vh-300px)]">
                    <div className="space-y-3 pr-3">
                      {intakes
                        .filter((intake) => intake.status === status)
                        .map((intake) => (
                          <Card
                            key={intake.id}
                            className="p-3 cursor-pointer hover:bg-muted/50"
                            onClick={() => handleViewDetails(intake)}
                          >
                            <div className="flex justify-between items-start mb-2">
                              <span className="text-xs text-muted-foreground">{intake.id}</span>
                              <Badge className={`${getPriorityColor(intake.priority)}`}>{intake.priority}</Badge>
                            </div>
                            <h4 className="font-medium mb-1">{intake.title}</h4>
                            <p className="text-sm text-muted-foreground line-clamp-2 mb-2">{intake.description}</p>
                            <div className="flex justify-between items-center text-xs text-muted-foreground">
                              <span>{intake.segment}</span>
                              <span>{new Date(intake.submittedDate).toLocaleDateString()}</span>
                            </div>
                          </Card>
                        ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="mt-0">
          <IntakeProcess />
        </TabsContent>
      </Tabs>

      {/* New Intake Dialog */}
      <Dialog open={isNewIntakeOpen} onOpenChange={setIsNewIntakeOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Create New Intake Request</DialogTitle>
            <DialogDescription>Fill out the form below to submit a new project intake request.</DialogDescription>
          </DialogHeader>

          <div className="grid gap-6 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  placeholder="Enter intake title"
                  value={newIntake.title}
                  onChange={(e) => setNewIntake({ ...newIntake, title: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="segment">Segment</Label>
                <Select
                  value={newIntake.segment}
                  onValueChange={(value) => setNewIntake({ ...newIntake, segment: value as Segment })}
                >
                  <SelectTrigger id="segment">
                    <SelectValue placeholder="Select segment" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Retail">Retail</SelectItem>
                    <SelectItem value="Commercial">Commercial</SelectItem>
                    <SelectItem value="Wealth">Wealth</SelectItem>
                    <SelectItem value="Insurance">Insurance</SelectItem>
                    <SelectItem value="Enterprise">Enterprise</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Describe the project intake request"
                className="min-h-[100px]"
                value={newIntake.description}
                onChange={(e) => setNewIntake({ ...newIntake, description: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="type">Request Type</Label>
                <Select
                  value={newIntake.type}
                  onValueChange={(value) => setNewIntake({ ...newIntake, type: value as IntakeType })}
                >
                  <SelectTrigger id="type">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Feature">Feature</SelectItem>
                    <SelectItem value="Enhancement">Enhancement</SelectItem>
                    <SelectItem value="Bug Fix">Bug Fix</SelectItem>
                    <SelectItem value="Infrastructure">Infrastructure</SelectItem>
                    <SelectItem value="Security">Security</SelectItem>
                    <SelectItem value="Compliance">Compliance</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="priority">Priority</Label>
                <Select
                  value={newIntake.priority}
                  onValueChange={(value) => setNewIntake({ ...newIntake, priority: value as Priority })}
                >
                  <SelectTrigger id="priority">
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="P1">P1 (Critical)</SelectItem>
                    <SelectItem value="P2">P2 (High)</SelectItem>
                    <SelectItem value="P3">P3 (Medium)</SelectItem>
                    <SelectItem value="P4">P4 (Low)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="effort">Estimated Effort (Story Points)</Label>
                <Input
                  id="effort"
                  type="number"
                  placeholder="Enter estimated effort"
                  value={newIntake.estimatedEffort || ""}
                  onChange={(e) =>
                    setNewIntake({ ...newIntake, estimatedEffort: Number.parseInt(e.target.value) || undefined })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="value">Business Value (1-100)</Label>
                <Input
                  id="value"
                  type="number"
                  placeholder="Enter business value"
                  min="1"
                  max="100"
                  value={newIntake.estimatedValue || ""}
                  onChange={(e) =>
                    setNewIntake({ ...newIntake, estimatedValue: Number.parseInt(e.target.value) || undefined })
                  }
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Readiness Checklist</Label>
              <div className="grid grid-cols-2 gap-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="requirements" />
                  <label
                    htmlFor="requirements"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Requirements Defined
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="stakeholders" />
                  <label
                    htmlFor="stakeholders"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Stakeholders Identified
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="roi" />
                  <label
                    htmlFor="roi"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    ROI Calculated
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="dependencies" />
                  <label
                    htmlFor="dependencies"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Dependencies Mapped
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="security" />
                  <label
                    htmlFor="security"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Security Assessment
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="architecture" />
                  <label
                    htmlFor="architecture"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Architecture Review
                  </label>
                </div>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsNewIntakeOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateIntake}>Create Intake</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Intake Detail Dialog */}
      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-auto">
          {selectedIntake && (
            <>
              <DialogHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <DialogTitle>{selectedIntake.title}</DialogTitle>
                    <Badge className={`${getStatusColor(selectedIntake.status)}`}>{selectedIntake.status}</Badge>
                  </div>
                  <Badge variant="outline">{selectedIntake.id}</Badge>
                </div>
                <DialogDescription>
                  Submitted by {selectedIntake.submitter} on{" "}
                  {new Date(selectedIntake.submittedDate).toLocaleDateString()}
                </DialogDescription>
              </DialogHeader>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2 space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-2">Description</h3>
                    <p className="text-sm text-muted-foreground">{selectedIntake.description}</p>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-2">Tags</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedIntake.tags.map((tag) => (
                        <Badge key={tag} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-2">Comments ({selectedIntake.comments})</h3>
                    <div className="space-y-4">
                      <div className="bg-muted/50 p-3 rounded-md">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium">Technical Review</span>
                          <span className="text-xs text-muted-foreground">2 days ago</span>
                        </div>
                        <p className="text-sm">
                          This looks feasible from a technical perspective. We should consider integrating with the
                          existing authentication system rather than building a new one.
                        </p>
                      </div>

                      <div className="bg-muted/50 p-3 rounded-md">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium">Business Analyst</span>
                          <span className="text-xs text-muted-foreground">3 days ago</span>
                        </div>
                        <p className="text-sm">
                          Requirements look good. I've added some additional user stories to the attached document.
                        </p>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Input placeholder="Add a comment..." />
                        <Button size="sm">Post</Button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Details</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="text-muted-foreground">Segment</div>
                        <div className="font-medium">{selectedIntake.segment}</div>

                        <div className="text-muted-foreground">Type</div>
                        <div className="font-medium">{selectedIntake.type}</div>

                        <div className="text-muted-foreground">Priority</div>
                        <div>
                          <Badge className={`${getPriorityColor(selectedIntake.priority)}`}>
                            {selectedIntake.priority}
                          </Badge>
                        </div>

                        {selectedIntake.estimatedEffort && (
                          <>
                            <div className="text-muted-foreground">Est. Effort</div>
                            <div className="font-medium">{selectedIntake.estimatedEffort} points</div>
                          </>
                        )}

                        {selectedIntake.estimatedValue && (
                          <>
                            <div className="text-muted-foreground">Business Value</div>
                            <div className="font-medium">{selectedIntake.estimatedValue}/100</div>
                          </>
                        )}

                        {selectedIntake.decisionOwner && (
                          <>
                            <div className="text-muted-foreground">Decision Owner</div>
                            <div className="font-medium">{selectedIntake.decisionOwner}</div>
                          </>
                        )}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Timeline</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-3">
                        <div className="flex items-start gap-3">
                          <div className="mt-0.5">
                            <div className="size-2 rounded-full bg-green-500" />
                          </div>
                          <div>
                            <div className="font-medium">Submitted</div>
                            <div className="text-xs text-muted-foreground">
                              {new Date(selectedIntake.submittedDate).toLocaleDateString()}
                            </div>
                          </div>
                        </div>

                        {selectedIntake.reviewDate && (
                          <div className="flex items-start gap-3">
                            <div className="mt-0.5">
                              <div className="size-2 rounded-full bg-green-500" />
                            </div>
                            <div>
                              <div className="font-medium">Review Started</div>
                              <div className="text-xs text-muted-foreground">
                                {new Date(selectedIntake.reviewDate).toLocaleDateString()}
                              </div>
                            </div>
                          </div>
                        )}

                        {selectedIntake.decisionDate && (
                          <div className="flex items-start gap-3">
                            <div className="mt-0.5">
                              <div className="size-2 rounded-full bg-green-500" />
                            </div>
                            <div>
                              <div className="font-medium">Decision Made</div>
                              <div className="text-xs text-muted-foreground">
                                {new Date(selectedIntake.decisionDate).toLocaleDateString()}
                              </div>
                            </div>
                          </div>
                        )}

                        {!selectedIntake.decisionDate && selectedIntake.status !== "Rejected" && (
                          <div className="flex items-start gap-3">
                            <div className="mt-0.5">
                              <div className="size-2 rounded-full bg-gray-300" />
                            </div>
                            <div>
                              <div className="font-medium text-muted-foreground">Decision Pending</div>
                              <div className="text-xs text-muted-foreground">
                                <Clock className="inline h-3 w-3 mr-1" />
                                Estimated: {new Date(new Date().setDate(new Date().getDate() + 7)).toLocaleDateString()}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Readiness Score</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">
                            {selectedIntake.readinessScore || calculateReadiness(selectedIntake)}%
                          </span>
                          <Badge
                            variant={
                              (selectedIntake.readinessScore || calculateReadiness(selectedIntake)) >= 80
                                ? "success"
                                : (selectedIntake.readinessScore || calculateReadiness(selectedIntake)) >= 60
                                  ? "warning"
                                  : "destructive"
                            }
                          >
                            {(selectedIntake.readinessScore || calculateReadiness(selectedIntake)) >= 80
                              ? "Ready"
                              : (selectedIntake.readinessScore || calculateReadiness(selectedIntake)) >= 60
                                ? "Needs Work"
                                : "Not Ready"}
                          </Badge>
                        </div>
                        <Progress
                          value={selectedIntake.readinessScore || calculateReadiness(selectedIntake)}
                          className="h-2"
                        />
                      </div>
                    </CardContent>
                  </Card>

                  {selectedIntake.status === "Draft" && (
                    <Button
                      className="w-full"
                      onClick={() => {
                        handleStatusChange(selectedIntake.id, "Submitted")
                        setIsDetailOpen(false)
                      }}
                    >
                      Submit for Review
                    </Button>
                  )}

                  {selectedIntake.status === "Submitted" && (
                    <Button
                      className="w-full"
                      onClick={() => {
                        handleStatusChange(selectedIntake.id, "In Review")
                        setIsDetailOpen(false)
                      }}
                    >
                      Move to Review
                    </Button>
                  )}

                  {selectedIntake.status === "In Review" && (
                    <div className="space-y-2">
                      <Button
                        className="w-full"
                        variant="default"
                        onClick={() => {
                          handleStatusChange(selectedIntake.id, "Approved")
                          setIsDetailOpen(false)
                        }}
                      >
                        <Check className="mr-2 h-4 w-4" /> Approve
                      </Button>
                      <Button
                        className="w-full"
                        variant="destructive"
                        onClick={() => {
                          handleStatusChange(selectedIntake.id, "Rejected")
                          setIsDetailOpen(false)
                        }}
                      >
                        <X className="mr-2 h-4 w-4" /> Reject
                      </Button>
                      <Button
                        className="w-full"
                        variant="outline"
                        onClick={() => {
                          handleStatusChange(selectedIntake.id, "On Hold")
                          setIsDetailOpen(false)
                        }}
                      >
                        Put On Hold
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
