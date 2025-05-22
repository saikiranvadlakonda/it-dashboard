"use client"

import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Calendar, Users, DollarSign, GitBranch, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"

// Sample project data - in a real app, you would fetch this based on the ID
const projects = {
  "PRJ-001": {
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
    description:
      "A comprehensive retirement portal for wealth advisors to manage client portfolios and provide retirement planning services.",
    startDate: "15-Jan-2025",
    endDate: "15-Jun-2025",
    budget: "$450,000",
    risks: [
      {
        id: "RISK-001",
        description: "API Integration Delay",
        severity: "Medium",
        mitigation: "Working with vendor for early access",
      },
      {
        id: "RISK-002",
        description: "Resource Availability",
        severity: "Low",
        mitigation: "Cross-training team members",
      },
    ],
    milestones: [
      { id: "MS-001", name: "Requirements Finalized", date: "15-Feb-2025", status: "Completed" },
      { id: "MS-002", name: "Design Approval", date: "15-Mar-2025", status: "Completed" },
      { id: "MS-003", name: "Development Complete", date: "15-May-2025", status: "In Progress" },
      { id: "MS-004", name: "UAT Complete", date: "01-Jun-2025", status: "Planned" },
      { id: "MS-005", name: "Go-Live", date: "15-Jun-2025", status: "Planned" },
    ],
    dependencies: [
      { id: "DEP-001", name: "FAST Retirement API", status: "On Track" },
      { id: "DEP-002", name: "Identity Platform Upgrade", status: "At Risk" },
    ],
  },
  "PRJ-002": {
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
    description:
      "A new lending platform for commercial clients to streamline the loan application and approval process.",
    startDate: "01-Feb-2025",
    endDate: "30-Jul-2025",
    budget: "$650,000",
    risks: [
      {
        id: "RISK-001",
        description: "Integration with Legacy Systems",
        severity: "High",
        mitigation: "Additional resources allocated",
      },
      {
        id: "RISK-002",
        description: "Regulatory Compliance",
        severity: "Medium",
        mitigation: "Engaging compliance team early",
      },
    ],
    milestones: [
      { id: "MS-001", name: "Requirements Finalized", date: "01-Mar-2025", status: "Completed" },
      { id: "MS-002", name: "Design Approval", date: "15-Apr-2025", status: "Completed" },
      { id: "MS-003", name: "Development Complete", date: "30-Jun-2025", status: "In Progress" },
      { id: "MS-004", name: "UAT Complete", date: "15-Jul-2025", status: "Planned" },
      { id: "MS-005", name: "Go-Live", date: "30-Jul-2025", status: "Planned" },
    ],
    dependencies: [
      { id: "DEP-001", name: "Apex Core Services", status: "At Risk" },
      { id: "DEP-002", name: "Credit Scoring API", status: "On Track" },
    ],
  },
  "PRJ-003": {
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
    description:
      "A mobile banking application for retail customers with enhanced security features and improved user experience.",
    startDate: "10-Dec-2024",
    endDate: "10-Jun-2025",
    budget: "$380,000",
    risks: [
      { id: "RISK-001", description: "App Store Approval", severity: "Low", mitigation: "Early submission for review" },
      {
        id: "RISK-002",
        description: "Security Audit Findings",
        severity: "Medium",
        mitigation: "Weekly security reviews",
      },
    ],
    milestones: [
      { id: "MS-001", name: "Requirements Finalized", date: "10-Jan-2025", status: "Completed" },
      { id: "MS-002", name: "Design Approval", date: "15-Feb-2025", status: "Completed" },
      { id: "MS-003", name: "Development Complete", date: "15-May-2025", status: "Completed" },
      { id: "MS-004", name: "UAT Complete", date: "01-Jun-2025", status: "In Progress" },
      { id: "MS-005", name: "Go-Live", date: "10-Jun-2025", status: "Planned" },
    ],
    dependencies: [
      { id: "DEP-001", name: "Authentication Service", status: "On Track" },
      { id: "DEP-002", name: "Push Notification Service", status: "On Track" },
    ],
  },
  "PRJ-004": {
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
    description: "An automated claims processing system to reduce manual intervention and improve processing time.",
    startDate: "15-Mar-2025",
    endDate: "15-Aug-2025",
    budget: "$720,000",
    risks: [
      {
        id: "RISK-001",
        description: "OIPA Integration",
        severity: "High",
        mitigation: "Escalated to vendor management",
      },
      { id: "RISK-002", description: "Data Migration", severity: "High", mitigation: "Additional testing resources" },
    ],
    milestones: [
      { id: "MS-001", name: "Requirements Finalized", date: "15-Apr-2025", status: "Completed" },
      { id: "MS-002", name: "Design Approval", date: "15-May-2025", status: "Blocked" },
      { id: "MS-003", name: "Development Complete", date: "15-Jul-2025", status: "Planned" },
      { id: "MS-004", name: "UAT Complete", date: "01-Aug-2025", status: "Planned" },
      { id: "MS-005", name: "Go-Live", date: "15-Aug-2025", status: "Planned" },
    ],
    dependencies: [
      { id: "DEP-001", name: "OIPA Integration", status: "Blocked" },
      { id: "DEP-002", name: "Document Management System", status: "On Track" },
    ],
  },
  "PRJ-005": {
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
    description: "A new mortgage origination system to streamline the application and approval process for home loans.",
    startDate: "20-Jan-2025",
    endDate: "20-Jul-2025",
    budget: "$520,000",
    risks: [
      {
        id: "RISK-001",
        description: "Regulatory Changes",
        severity: "Medium",
        mitigation: "Regular compliance reviews",
      },
      { id: "RISK-002", description: "Integration Testing", severity: "Low", mitigation: "Early integration testing" },
    ],
    milestones: [
      { id: "MS-001", name: "Requirements Finalized", date: "20-Feb-2025", status: "Completed" },
      { id: "MS-002", name: "Design Approval", date: "20-Mar-2025", status: "Completed" },
      { id: "MS-003", name: "Development Complete", date: "20-Jun-2025", status: "In Progress" },
      { id: "MS-004", name: "UAT Complete", date: "10-Jul-2025", status: "Planned" },
      { id: "MS-005", name: "Go-Live", date: "20-Jul-2025", status: "Planned" },
    ],
    dependencies: [
      { id: "DEP-001", name: "Credit Check API", status: "On Track" },
      { id: "DEP-002", name: "Document Management System", status: "On Track" },
    ],
  },
  "PRJ-006": {
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
    description: "Integration with multiple payment gateways to provide customers with more payment options.",
    startDate: "05-Feb-2025",
    endDate: "05-Aug-2025",
    budget: "$480,000",
    risks: [
      { id: "RISK-001", description: "Security Compliance", severity: "High", mitigation: "External security audit" },
      {
        id: "RISK-002",
        description: "API Changes",
        severity: "Medium",
        mitigation: "Version control and fallback options",
      },
    ],
    milestones: [
      { id: "MS-001", name: "Requirements Finalized", date: "05-Mar-2025", status: "Completed" },
      { id: "MS-002", name: "Design Approval", date: "05-Apr-2025", status: "Completed" },
      { id: "MS-003", name: "Development Complete", date: "05-Jul-2025", status: "At Risk" },
      { id: "MS-004", name: "UAT Complete", date: "25-Jul-2025", status: "Planned" },
      { id: "MS-005", name: "Go-Live", date: "05-Aug-2025", status: "Planned" },
    ],
    dependencies: [
      { id: "DEP-001", name: "Security Framework Update", status: "At Risk" },
      { id: "DEP-002", name: "Vendor API Access", status: "On Track" },
    ],
  },
}

export default function ProjectDetailsPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const projectId = params.id
  const project = projects[projectId]

  if (!project) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" onClick={() => router.push("/projects")}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Projects
          </Button>
        </div>
        <div className="mt-8 text-center">
          <h1 className="text-2xl font-bold">Project Not Found</h1>
          <p className="mt-2">The project you're looking for doesn't exist or has been removed.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-6">
      {/* Breadcrumb */}
      <div className="flex items-center space-x-2 mb-6">
        <Link href="/projects" className="text-sm text-muted-foreground hover:text-foreground">
          Projects
        </Link>
        <span className="text-sm text-muted-foreground">/</span>
        <span className="text-sm font-medium">{project.name}</span>
      </div>

      {/* Project Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-bold">{project.name}</h1>
            <Badge>{project.id}</Badge>
          </div>
          <div className="mt-2 flex items-center gap-2">
            <Badge variant="outline">{project.segment} Segment</Badge>
            <Badge
              variant={
                project.status === "On Track" ? "default" : project.status === "At Risk" ? "outline" : "destructive"
              }
              className={project.status === "At Risk" ? "border-amber-500 text-amber-500" : ""}
            >
              {project.status}
            </Badge>
            <Badge variant={project.priority === "P1" ? "default" : "secondary"}>{project.priority}</Badge>
          </div>
        </div>
        <div className="mt-4 md:mt-0">
          <Button variant="outline" className="mr-2" onClick={() => router.push("/projects")}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Projects
          </Button>
          <Button>Edit Project</Button>
        </div>
      </div>

      {/* Project Overview */}
      <div className="grid gap-6 md:grid-cols-3 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Completion</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{project.completion}%</div>
            <Progress value={project.completion} className="h-2 mt-2" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Timeline</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between text-sm">
              <div>
                <div className="font-medium">Start Date</div>
                <div>{project.startDate}</div>
              </div>
              <div>
                <div className="font-medium">Target Release</div>
                <div>{project.targetRelease}</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Financial</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between text-sm">
              <div>
                <div className="font-medium">Budget</div>
                <div>{project.budget}</div>
              </div>
              <div>
                <div className="font-medium">Est. ROI</div>
                <div className="text-green-600">{project.roi}</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Project Details Tabs */}
      <Tabs defaultValue="overview" className="mt-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
          <TabsTrigger value="dependencies">Dependencies</TabsTrigger>
          <TabsTrigger value="risks">Risks</TabsTrigger>
          <TabsTrigger value="team">Team</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Project Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Description</h3>
                  <p className="mt-1">{project.description}</p>
                </div>
                <Separator />
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Owner</h3>
                    <p className="mt-1">{project.owner}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Teams</h3>
                    <div className="mt-1 flex flex-wrap gap-1">
                      {project.teams.map((team) => (
                        <Badge key={team} variant="outline">
                          {team}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
                <Separator />
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Tags</h3>
                  <div className="mt-1 flex flex-wrap gap-1">
                    {project.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Key Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="mr-4 rounded-full bg-blue-100 p-2 dark:bg-blue-900">
                      <Calendar className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <div className="text-sm font-medium">Timeline</div>
                      <div className="text-sm text-muted-foreground">
                        {project.startDate} to {project.endDate}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div className="mr-4 rounded-full bg-green-100 p-2 dark:bg-green-900">
                      <DollarSign className="h-4 w-4 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <div className="text-sm font-medium">Budget & ROI</div>
                      <div className="text-sm text-muted-foreground">
                        Budget: {project.budget} | Est. ROI: {project.roi}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div className="mr-4 rounded-full bg-purple-100 p-2 dark:bg-purple-900">
                      <Users className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                      <div className="text-sm font-medium">Teams</div>
                      <div className="text-sm text-muted-foreground">{project.teams.join(", ")}</div>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div className="mr-4 rounded-full bg-amber-100 p-2 dark:bg-amber-900">
                      <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                    </div>
                    <div>
                      <div className="text-sm font-medium">Risks</div>
                      <div className="text-sm text-muted-foreground">{project.risks.length} identified risks</div>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div className="mr-4 rounded-full bg-red-100 p-2 dark:bg-red-900">
                      <GitBranch className="h-4 w-4 text-red-600 dark:text-red-400" />
                    </div>
                    <div>
                      <div className="text-sm font-medium">Dependencies</div>
                      <div className="text-sm text-muted-foreground">{project.dependencies.length} dependencies</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="timeline" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Project Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <div className="absolute left-2 top-0 h-full w-0.5 bg-muted"></div>
                <div className="space-y-8">
                  {project.milestones.map((milestone) => (
                    <div key={milestone.id} className="relative pl-8">
                      <div
                        className={`absolute left-0 top-1 h-4 w-4 rounded-full border-2 ${
                          milestone.status === "Completed"
                            ? "border-green-500 bg-green-500"
                            : milestone.status === "In Progress"
                              ? "border-amber-500 bg-amber-500"
                              : milestone.status === "Blocked"
                                ? "border-red-500 bg-red-500"
                                : "border-muted-foreground bg-background"
                        }`}
                      ></div>
                      <div className="font-medium">{milestone.name}</div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">{milestone.date}</span>
                        <Badge
                          variant={
                            milestone.status === "Completed"
                              ? "default"
                              : milestone.status === "In Progress"
                                ? "outline"
                                : milestone.status === "Blocked"
                                  ? "destructive"
                                  : "secondary"
                          }
                          className={milestone.status === "In Progress" ? "border-amber-500 text-amber-500" : ""}
                        >
                          {milestone.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="dependencies" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Project Dependencies</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {project.dependencies.map((dependency) => (
                  <div key={dependency.id} className="flex items-center justify-between rounded-md border p-4">
                    <div>
                      <div className="font-medium">{dependency.name}</div>
                      <div className="text-sm text-muted-foreground">{dependency.id}</div>
                    </div>
                    <Badge
                      variant={
                        dependency.status === "On Track"
                          ? "default"
                          : dependency.status === "At Risk"
                            ? "outline"
                            : "destructive"
                      }
                      className={dependency.status === "At Risk" ? "border-amber-500 text-amber-500" : ""}
                    >
                      {dependency.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="risks" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Project Risks</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {project.risks.map((risk) => (
                  <div key={risk.id} className="rounded-md border p-4">
                    <div className="flex items-center justify-between">
                      <div className="font-medium">{risk.description}</div>
                      <Badge
                        variant="outline"
                        className={
                          risk.severity === "High"
                            ? "border-red-500 text-red-500"
                            : risk.severity === "Medium"
                              ? "border-amber-500 text-amber-500"
                              : "border-green-500 text-green-500"
                        }
                      >
                        {risk.severity}
                      </Badge>
                    </div>
                    <div className="mt-2 text-sm">
                      <span className="font-medium">Mitigation: </span>
                      {risk.mitigation}
                    </div>
                    <div className="mt-1 text-xs text-muted-foreground">{risk.id}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="team" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Project Team</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Project Owner</h3>
                  <div className="mt-2 flex items-center gap-3 rounded-md border p-3">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-primary font-medium">
                        {project.owner.split(" ")[0][0]}
                        {project.owner.split(" ")[1][0]}
                      </span>
                    </div>
                    <div>
                      <div className="font-medium">{project.owner}</div>
                      <div className="text-sm text-muted-foreground">Project Owner</div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Teams Involved</h3>
                  <div className="mt-2 grid gap-3 md:grid-cols-2">
                    {project.teams.map((team) => (
                      <div key={team} className="flex items-center gap-3 rounded-md border p-3">
                        <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                          <Users className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <div className="font-medium">{team}</div>
                          <div className="text-sm text-muted-foreground">Development Team</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
