"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Filter, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { DatePicker } from "@/components/ui/date-picker"

// Sample project data
const projects = [
  {
    id: "PRJ-001",
    name: "WealthSync Retirement Portal",
    segment: "Wealth",
    duration: "2 months",
    barStart: 0,
    barWidth: 33.3,
    startDate: new Date(2025, 4, 1),
    endDate: new Date(2025, 5, 30),
    milestones: [
      { position: 5, label: "Dev Started", date: "May 5, 2025", status: "Completed" },
      { position: 20, label: "UAT", date: "May 20, 2025", status: "In Progress" },
      { position: 30, label: "Release", date: "Jun 15, 2025", status: "Upcoming" },
    ],
  },
  {
    id: "PRJ-002",
    name: "Commercial Lending Platform",
    segment: "Commercial",
    duration: "3 months",
    barStart: 16.7,
    barWidth: 50,
    startDate: new Date(2025, 5, 15),
    endDate: new Date(2025, 8, 15),
    milestones: [
      { position: 25, label: "Dev Started", date: "Jun 25, 2025", status: "Completed" },
      { position: 50, label: "UAT", date: "Jul 30, 2025", status: "Upcoming" },
      { position: 65, label: "Release", date: "Aug 15, 2025", status: "Upcoming" },
    ],
  },
  {
    id: "PRJ-003",
    name: "Retail Mobile Banking App",
    segment: "Retail",
    duration: "1.5 months",
    barStart: 0,
    barWidth: 25,
    startDate: new Date(2025, 4, 1),
    endDate: new Date(2025, 5, 15),
    milestones: [
      { position: 5, label: "Dev Started", date: "May 5, 2025", status: "Completed" },
      { position: 15, label: "UAT", date: "May 25, 2025", status: "In Progress" },
      { position: 23, label: "Release", date: "Jun 10, 2025", status: "Upcoming" },
    ],
  },
  {
    id: "PRJ-004",
    name: "Insurance Claims Processing",
    segment: "Insurance",
    duration: "3 months",
    barStart: 50,
    barWidth: 50,
    startDate: new Date(2025, 7, 1),
    endDate: new Date(2025, 10, 1),
    milestones: [
      { position: 55, label: "Dev Started", date: "Aug 10, 2025", status: "Upcoming" },
      { position: 75, label: "UAT", date: "Sep 15, 2025", status: "Upcoming" },
      { position: 90, label: "Release", date: "Oct 1, 2025", status: "Upcoming" },
    ],
  },
  {
    id: "PRJ-005",
    name: "Mortgage Origination System",
    segment: "Lending",
    duration: "2 months",
    barStart: 33.3,
    barWidth: 33.3,
    startDate: new Date(2025, 6, 1),
    endDate: new Date(2025, 8, 1),
    milestones: [
      { position: 40, label: "Dev Started", date: "Jul 10, 2025", status: "Completed" },
      { position: 55, label: "UAT", date: "Jul 25, 2025", status: "Upcoming" },
      { position: 65, label: "Release", date: "Aug 1, 2025", status: "Upcoming" },
    ],
  },
  {
    id: "PRJ-006",
    name: "Payment Gateway Integration",
    segment: "Payments",
    duration: "2.5 months",
    barStart: 33.3,
    barWidth: 41.7,
    startDate: new Date(2025, 6, 1),
    endDate: new Date(2025, 8, 15),
    milestones: [
      { position: 40, label: "Dev Started", date: "Jul 10, 2025", status: "Upcoming" },
      { position: 55, label: "UAT", date: "Jul 30, 2025", status: "Upcoming" },
      { position: 70, label: "Release", date: "Aug 15, 2025", status: "Upcoming" },
    ],
  },
  {
    id: "PRJ-007",
    name: "Customer Data Platform",
    segment: "Retail",
    duration: "4 months",
    barStart: 50,
    barWidth: 66.7,
    startDate: new Date(2025, 7, 1),
    endDate: new Date(2025, 11, 1),
    milestones: [
      { position: 55, label: "Dev Started", date: "Aug 10, 2025", status: "Upcoming" },
      { position: 75, label: "UAT", date: "Oct 1, 2025", status: "Upcoming" },
      { position: 95, label: "Release", date: "Nov 1, 2025", status: "Upcoming" },
    ],
  },
]

export default function TimelinePage() {
  const [timeframe, setTimeframe] = useState("quarter")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedSegment, setSelectedSegment] = useState("all")
  const [currentMonth, setCurrentMonth] = useState(4) // May (0-indexed)
  const [isAddMilestoneOpen, setIsAddMilestoneOpen] = useState(false)
  const [selectedProject, setSelectedProject] = useState<any>(null)
  const [newMilestone, setNewMilestone] = useState({
    label: "",
    date: new Date(),
    status: "Upcoming",
  })

  // Filter projects based on search term and segment
  const filteredProjects = projects.filter(
    (project) =>
      project.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedSegment === "all" || project.segment === selectedSegment),
  )

  const handlePreviousMonth = () => {
    setCurrentMonth((prev) => (prev > 0 ? prev - 1 : 11))
  }

  const handleNextMonth = () => {
    setCurrentMonth((prev) => (prev < 11 ? prev + 1 : 0))
  }

  const handleAddMilestone = (project: any) => {
    setSelectedProject(project)
    setIsAddMilestoneOpen(true)
  }

  const handleSaveMilestone = () => {
    // In a real app, you would update the project with the new milestone
    console.log("Adding milestone to project:", selectedProject?.id, newMilestone)

    // Reset form and close dialog
    setNewMilestone({
      label: "",
      date: new Date(),
      status: "Upcoming",
    })
    setIsAddMilestoneOpen(false)
    setSelectedProject(null)
  }

  // Generate month headers based on current month
  const generateMonthHeaders = () => {
    const months = []
    for (let i = 0; i < 6; i++) {
      const monthIndex = (currentMonth + i) % 12
      const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ]
      months.push(monthNames[monthIndex])
    }
    return months
  }

  const monthHeaders = generateMonthHeaders()

  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-col space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Project Timeline</h1>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={handlePreviousMonth}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" onClick={handleNextMonth}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:items-center gap-4 justify-between">
          <div className="flex flex-wrap items-center gap-2">
            <Select value={timeframe} onValueChange={setTimeframe}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Timeframe" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="month">This Month</SelectItem>
                <SelectItem value="quarter">This Quarter</SelectItem>
                <SelectItem value="year">This Year</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedSegment} onValueChange={setSelectedSegment}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Segment" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Segments</SelectItem>
                <SelectItem value="Wealth">Wealth</SelectItem>
                <SelectItem value="Commercial">Commercial</SelectItem>
                <SelectItem value="Retail">Retail</SelectItem>
                <SelectItem value="Insurance">Insurance</SelectItem>
                <SelectItem value="Lending">Lending</SelectItem>
                <SelectItem value="Payments">Payments</SelectItem>
              </SelectContent>
            </Select>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <Filter className="h-4 w-4" />
                  <span>Filters</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px]">
                <DropdownMenuItem>Show Completed</DropdownMenuItem>
                <DropdownMenuItem>Show In Progress</DropdownMenuItem>
                <DropdownMenuItem>Show Upcoming</DropdownMenuItem>
                <DropdownMenuItem>Show Milestones</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="relative w-full md:w-auto">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search projects..."
              className="w-full pl-8 md:w-[250px]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <Tabs defaultValue="gantt" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="gantt">Gantt View</TabsTrigger>
            <TabsTrigger value="calendar">Calendar View</TabsTrigger>
          </TabsList>

          <TabsContent value="gantt" className="mt-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-xl font-bold">Project Timeline (Gantt View)</CardTitle>
              </CardHeader>
              <CardContent className="overflow-auto">
                <div className="min-w-[800px]">
                  {/* Month Headers */}
                  <div className="mb-6 grid grid-cols-6 text-center text-xs font-medium text-muted-foreground px-2">
                    {monthHeaders.map((month, index) => (
                      <div key={index}>{month}</div>
                    ))}
                  </div>

                  <div className="space-y-28">
                    {filteredProjects.map((project) => (
                      <div key={project.id} className="relative">
                        {/* Project header */}
                        <div className="mb-2 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{project.name}</span>
                            <Badge variant="outline" className="text-xs">
                              {project.segment}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="text-xs text-muted-foreground">{project.duration}</div>
                          </div>
                        </div>

                        {/* Timeline bar */}
                        <div className="relative h-8 rounded-md bg-muted">
                          <div
                            className="absolute h-full rounded-md bg-primary/20"
                            style={{
                              left: `${project.barStart}%`,
                              width: `${project.barWidth}%`,
                            }}
                          ></div>

                          {/* Milestones */}
                          {project.milestones.map((milestone, index) => (
                            <div key={index} className="absolute top-0" style={{ left: `${milestone.position}%` }}>
                              {/* Milestone line */}
                              <div
                                className={`h-8 w-0.5 ${
                                  milestone.status === "Completed"
                                    ? "bg-green-500"
                                    : milestone.status === "In Progress"
                                      ? "bg-amber-500"
                                      : "bg-muted-foreground"
                                }`}
                              ></div>

                              {/* Milestone label - positioned below with enough space */}
                              <div className="absolute top-12 transform -translate-x-1/2 w-24 text-center z-10">
                                <div className="text-xs font-medium">{milestone.label}</div>
                                <div className="text-xs text-muted-foreground">{milestone.date}</div>
                                <Badge
                                  variant="outline"
                                  className={`mt-1 text-[10px] z-10 ${
                                    milestone.status === "Completed"
                                      ? "border-green-500 text-green-500"
                                      : milestone.status === "In Progress"
                                        ? "border-amber-500 text-amber-500"
                                        : ""
                                  }`}
                                >
                                  {milestone.status}
                                </Badge>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="calendar" className="mt-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-xl font-bold">Project Calendar View</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-8 md:grid-cols-2">
                  {filteredProjects.map((project) => (
                    <Card key={project.id} className="overflow-hidden">
                      <CardHeader className="bg-muted/50 pb-2">
                        <CardTitle className="flex items-center justify-between text-lg">
                          {project.name}
                          <Badge variant="outline" className="text-xs">
                            {project.segment}
                          </Badge>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-6">
                        <div className="space-y-4">
                          <div className="flex justify-between text-sm">
                            <div>
                              <span className="font-medium">Start Date:</span>{" "}
                              {project.startDate.toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              })}
                            </div>
                            <div>
                              <span className="font-medium">End Date:</span>{" "}
                              {project.endDate.toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              })}
                            </div>
                          </div>

                          <div>
                            <h3 className="text-sm font-medium mb-2">Milestones</h3>
                            <div className="space-y-2">
                              {project.milestones.map((milestone, index) => (
                                <div key={index} className="flex items-center justify-between rounded-md border p-2">
                                  <div>
                                    <div className="font-medium text-sm">{milestone.label}</div>
                                    <div className="text-xs text-muted-foreground">{milestone.date}</div>
                                  </div>
                                  <Badge
                                    variant="outline"
                                    className={
                                      milestone.status === "Completed"
                                        ? "border-green-500 text-green-500"
                                        : milestone.status === "In Progress"
                                          ? "border-amber-500 text-amber-500"
                                          : ""
                                    }
                                  >
                                    {milestone.status}
                                  </Badge>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="mt-4 rounded-md bg-muted p-3">
                            <p className="font-medium">
                              {/*selectedTeam*/} – {/*teamData.currentSprint*/}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {/*Burn Down: {teamData.burndown[0].remaining} →{" "}*/}
                              {/*{teamData.burndown[teamData.burndown.length - 1].remaining} points over 10 days*/}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {/*{teamData.burndown[teamData.burndown.length - 1].remaining <=*/}
                              {/*teamData.burndown[teamData.burndown.length - 1].ideal*/}
                              {/*? "Team is ahead of schedule"*/}
                              {/*: "Team is behind schedule"}*/}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Add Milestone Dialog */}
      <Dialog open={isAddMilestoneOpen} onOpenChange={setIsAddMilestoneOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Milestone</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="milestone-name">Milestone Name</Label>
              <Input
                id="milestone-name"
                placeholder="Enter milestone name"
                value={newMilestone.label}
                onChange={(e) => setNewMilestone({ ...newMilestone, label: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="milestone-date">Date</Label>
              <DatePicker
                date={newMilestone.date}
                setDate={(date) => setNewMilestone({ ...newMilestone, date: date || new Date() })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="milestone-status">Status</Label>
              <Select
                value={newMilestone.status}
                onValueChange={(value) => setNewMilestone({ ...newMilestone, status: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Upcoming">Upcoming</SelectItem>
                  <SelectItem value="In Progress">In Progress</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddMilestoneOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveMilestone} disabled={!newMilestone.label}>
              Save Milestone
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
