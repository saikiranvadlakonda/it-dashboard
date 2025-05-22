"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Download, Filter, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Sample data for team composition
const resourceData = {
  total: 350,
  composition: {
    employees: 140, // 40%
    onshoreContractors: 87, // 25%
    offshoreContractors: 123, // 35%
  },
  workstreams: [
    {
      name: "Wealth Management",
      total: 75,
      employees: 22, // 30%
      onshoreContractors: 19, // 25%
      offshoreContractors: 34, // 45%
      teams: [
        {
          name: "Wealth Sprint Team Alpha",
          total: 15,
          employees: 5, // 33%
          onshoreContractors: 3, // 20%
          offshoreContractors: 7, // 47%
          initiatives: ["Wealth Portal Redesign", "Advisor Dashboard"],
        },
        {
          name: "Wealth Sprint Team Bravo",
          total: 14,
          employees: 4, // 29%
          onshoreContractors: 4, // 29%
          offshoreContractors: 6, // 42%
          initiatives: ["Client Onboarding Automation", "Reporting Engine"],
        },
        {
          name: "Wealth Platform Team",
          total: 16,
          employees: 6, // 38%
          onshoreContractors: 4, // 25%
          offshoreContractors: 6, // 37%
          initiatives: ["Platform Modernization", "API Gateway"],
        },
        {
          name: "Wealth Data Squad",
          total: 15,
          employees: 4, // 27%
          onshoreContractors: 4, // 27%
          offshoreContractors: 7, // 46%
          initiatives: ["Data Lake Implementation", "Analytics Dashboard"],
        },
        {
          name: "Wealth Innovation Pod",
          total: 15,
          employees: 5, // 33%
          onshoreContractors: 4, // 27%
          offshoreContractors: 6, // 40%
          initiatives: ["AI Advisor", "Client Insights Engine"],
        },
      ],
    },
    {
      name: "Commercial Lending",
      total: 65,
      employees: 29, // 45%
      onshoreContractors: 16, // 25%
      offshoreContractors: 20, // 30%
      teams: [
        {
          name: "Commercial Lending Team A",
          total: 13,
          employees: 6,
          onshoreContractors: 3,
          offshoreContractors: 4,
          initiatives: ["Loan Origination System", "Credit Decisioning"],
        },
        {
          name: "Commercial Lending Team B",
          total: 14,
          employees: 7,
          onshoreContractors: 3,
          offshoreContractors: 4,
          initiatives: ["Document Management", "Workflow Automation"],
        },
        {
          name: "Commercial Lending Team C",
          total: 12,
          employees: 5,
          onshoreContractors: 3,
          offshoreContractors: 4,
          initiatives: ["Pricing Engine", "Risk Assessment"],
        },
        {
          name: "Commercial Lending Team D",
          total: 13,
          employees: 6,
          onshoreContractors: 3,
          offshoreContractors: 4,
          initiatives: ["Regulatory Compliance", "Reporting"],
        },
        {
          name: "Commercial Lending Team E",
          total: 13,
          employees: 5,
          onshoreContractors: 4,
          offshoreContractors: 4,
          initiatives: ["Integration Services", "API Development"],
        },
      ],
    },
    {
      name: "Retail Banking",
      total: 85,
      employees: 34, // 40%
      onshoreContractors: 21, // 25%
      offshoreContractors: 30, // 35%
      teams: [
        {
          name: "Retail Digital Team",
          total: 18,
          employees: 7,
          onshoreContractors: 5,
          offshoreContractors: 6,
          initiatives: ["Mobile Banking App", "Online Banking"],
        },
        {
          name: "Retail Core Team",
          total: 17,
          employees: 7,
          onshoreContractors: 4,
          offshoreContractors: 6,
          initiatives: ["Core Banking Integration", "Account Services"],
        },
        {
          name: "Retail Payments Team",
          total: 16,
          employees: 6,
          onshoreContractors: 4,
          offshoreContractors: 6,
          initiatives: ["Payment Processing", "P2P Transfers"],
        },
        {
          name: "Retail CX Team",
          total: 17,
          employees: 7,
          onshoreContractors: 4,
          offshoreContractors: 6,
          initiatives: ["Customer Experience", "Omnichannel"],
        },
        {
          name: "Retail Security Team",
          total: 17,
          employees: 7,
          onshoreContractors: 4,
          offshoreContractors: 6,
          initiatives: ["Authentication", "Fraud Prevention"],
        },
      ],
    },
    {
      name: "Core Modernization",
      total: 70,
      employees: 28, // 40%
      onshoreContractors: 21, // 30%
      offshoreContractors: 21, // 30%
      teams: [
        {
          name: "Core Platform Team",
          total: 15,
          employees: 6,
          onshoreContractors: 5,
          offshoreContractors: 4,
          initiatives: ["Core Banking Replacement", "System Integration"],
        },
        {
          name: "Data Migration Team",
          total: 14,
          employees: 6,
          onshoreContractors: 4,
          offshoreContractors: 4,
          initiatives: ["Data Migration", "Data Validation"],
        },
        {
          name: "API & Services Team",
          total: 14,
          employees: 5,
          onshoreContractors: 4,
          offshoreContractors: 5,
          initiatives: ["API Gateway", "Microservices"],
        },
        {
          name: "Testing & QA Team",
          total: 13,
          employees: 5,
          onshoreContractors: 4,
          offshoreContractors: 4,
          initiatives: ["Automated Testing", "Performance Testing"],
        },
        {
          name: "DevOps Team",
          total: 14,
          employees: 6,
          onshoreContractors: 4,
          offshoreContractors: 4,
          initiatives: ["CI/CD Pipeline", "Infrastructure Automation"],
        },
      ],
    },
    {
      name: "Data & Analytics",
      total: 55,
      employees: 22, // 40%
      onshoreContractors: 11, // 20%
      offshoreContractors: 22, // 40%
      teams: [
        {
          name: "Data Engineering Team",
          total: 12,
          employees: 5,
          onshoreContractors: 2,
          offshoreContractors: 5,
          initiatives: ["Data Lake", "ETL Processes"],
        },
        {
          name: "Business Intelligence Team",
          total: 11,
          employees: 4,
          onshoreContractors: 2,
          offshoreContractors: 5,
          initiatives: ["Reporting Dashboards", "KPI Tracking"],
        },
        {
          name: "Data Science Team",
          total: 11,
          employees: 5,
          onshoreContractors: 2,
          offshoreContractors: 4,
          initiatives: ["Predictive Models", "Customer Segmentation"],
        },
        {
          name: "Data Governance Team",
          total: 10,
          employees: 4,
          onshoreContractors: 2,
          offshoreContractors: 4,
          initiatives: ["Data Quality", "Metadata Management"],
        },
        {
          name: "Analytics Platform Team",
          total: 11,
          employees: 4,
          onshoreContractors: 3,
          offshoreContractors: 4,
          initiatives: ["Self-Service Analytics", "Data Visualization"],
        },
      ],
    },
  ],
}

export function TeamComposition() {
  const [selectedWorkstream, setSelectedWorkstream] = useState("Wealth Management")
  const [searchTerm, setSearchTerm] = useState("")
  const [view, setView] = useState("overview")

  // Find the selected workstream data
  const workstreamData =
    resourceData.workstreams.find((ws) => ws.name === selectedWorkstream) || resourceData.workstreams[0]

  // Filter teams based on search term
  const filteredTeams = workstreamData.teams.filter(
    (team) =>
      team.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      team.initiatives.some((init) => init.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Team Composition & Allocation</h2>
          <p className="text-muted-foreground">Resource allocation across workstreams and teams</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="h-8 gap-1">
            <Filter className="h-3.5 w-3.5" />
            <span>Filter</span>
          </Button>
          <Button variant="outline" size="sm" className="h-8 gap-1">
            <Download className="h-3.5 w-3.5" />
            <span>Export</span>
          </Button>
        </div>
      </div>

      <Tabs value={view} onValueChange={setView} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="overview">Portfolio Overview</TabsTrigger>
          <TabsTrigger value="teams">Team Details</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Portfolio Staffing Overview */}
          <div className="grid gap-4 md:grid-cols-4">
            <Card className="md:col-span-1">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Active Resources</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{resourceData.total}</div>
                <p className="text-xs text-muted-foreground">Across all workstreams</p>
              </CardContent>
            </Card>

            <Card className="md:col-span-3">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Overall Portfolio Resource Mix</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center md:flex-row md:justify-between">
                  <div className="relative h-40 w-40 flex-shrink-0">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-xl font-bold">{resourceData.total}</div>
                    </div>
                    <PortfolioDonutChart data={resourceData.composition} />
                  </div>

                  <div className="mt-4 md:mt-0 flex flex-row flex-wrap justify-center gap-4 md:gap-6">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-blue-500"></div>
                      <span className="text-sm whitespace-nowrap">
                        Employees ({Math.round((resourceData.composition.employees / resourceData.total) * 100)}%)
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-green-500"></div>
                      <span className="text-sm whitespace-nowrap">
                        Onshore Contractors (
                        {Math.round((resourceData.composition.onshoreContractors / resourceData.total) * 100)}%)
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-amber-500"></div>
                      <span className="text-sm whitespace-nowrap">
                        Offshore Contractors (
                        {Math.round((resourceData.composition.offshoreContractors / resourceData.total) * 100)}%)
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Workstream Selector and Donut Chart */}
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Workstream Resource Mix</CardTitle>
                <CardDescription>
                  <Select value={selectedWorkstream} onValueChange={setSelectedWorkstream}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Workstream" />
                    </SelectTrigger>
                    <SelectContent>
                      {resourceData.workstreams.map((ws) => (
                        <SelectItem key={ws.name} value={ws.name}>
                          {ws.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center">
                  <div className="relative h-40 w-40">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-xl font-bold">{workstreamData.total}</div>
                    </div>
                    <WorkstreamDonutChart
                      data={{
                        employees: workstreamData.employees,
                        onshoreContractors: workstreamData.onshoreContractors,
                        offshoreContractors: workstreamData.offshoreContractors,
                      }}
                    />
                  </div>

                  <div className="mt-4 grid grid-cols-1 gap-2">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-blue-500"></div>
                      <span className="text-sm">
                        Employees ({Math.round((workstreamData.employees / workstreamData.total) * 100)}%)
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-green-500"></div>
                      <span className="text-sm">
                        Onshore Contractors (
                        {Math.round((workstreamData.onshoreContractors / workstreamData.total) * 100)}%)
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-amber-500"></div>
                      <span className="text-sm">
                        Offshore Contractors (
                        {Math.round((workstreamData.offshoreContractors / workstreamData.total) * 100)}%)
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Staffing Composition by Workstream</CardTitle>
                <CardDescription>Total headcount and resource mix by workstream</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] w-full">
                  <WorkstreamBarChart data={resourceData.workstreams} onSelect={setSelectedWorkstream} />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="teams" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex flex-col space-y-2 md:flex-row md:items-center md:justify-between md:space-y-0">
                <div>
                  <CardTitle>Team Drill-Down: {selectedWorkstream}</CardTitle>
                  <CardDescription>Detailed view of team composition</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Select value={selectedWorkstream} onValueChange={setSelectedWorkstream}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select Workstream" />
                    </SelectTrigger>
                    <SelectContent>
                      {resourceData.workstreams.map((ws) => (
                        <SelectItem key={ws.name} value={ws.name}>
                          {ws.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search teams or initiatives..."
                      className="w-full pl-8 md:w-[200px]"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Team Name</TableHead>
                    <TableHead className="text-right">Total HC</TableHead>
                    <TableHead className="text-right">% Emp</TableHead>
                    <TableHead className="text-right">% Onshore</TableHead>
                    <TableHead className="text-right">% Offshore</TableHead>
                    <TableHead className="text-right">Emp #</TableHead>
                    <TableHead className="text-right">Onshore #</TableHead>
                    <TableHead className="text-right">Offshore #</TableHead>
                    <TableHead>Key Initiatives</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTeams.map((team) => (
                    <TableRow key={team.name}>
                      <TableCell className="font-medium">{team.name}</TableCell>
                      <TableCell className="text-right">{team.total}</TableCell>
                      <TableCell className="text-right">{Math.round((team.employees / team.total) * 100)}%</TableCell>
                      <TableCell className="text-right">
                        {Math.round((team.onshoreContractors / team.total) * 100)}%
                      </TableCell>
                      <TableCell className="text-right">
                        {Math.round((team.offshoreContractors / team.total) * 100)}%
                      </TableCell>
                      <TableCell className="text-right">{team.employees}</TableCell>
                      <TableCell className="text-right">{team.onshoreContractors}</TableCell>
                      <TableCell className="text-right">{team.offshoreContractors}</TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {team.initiatives.map((initiative) => (
                            <Badge key={initiative} variant="outline" className="whitespace-nowrap">
                              {initiative}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {filteredTeams.length === 0 && (
                <div className="flex h-[200px] items-center justify-center">
                  <p className="text-muted-foreground">No teams found matching your search criteria.</p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Resource Allocation Analysis</CardTitle>
              <CardDescription>Insights and recommendations based on current staffing</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="rounded-md bg-muted p-4">
                  <h4 className="mb-2 font-medium">Key Observations</h4>
                  <ul className="list-disc pl-5 text-sm">
                    <li className="mb-1">
                      {selectedWorkstream} has{" "}
                      {Math.round((workstreamData.offshoreContractors / workstreamData.total) * 100)}% offshore
                      contractors,
                      {Math.round((workstreamData.offshoreContractors / workstreamData.total) * 100) > 40
                        ? " which is higher than the portfolio average of 35%."
                        : " which is in line with the portfolio average of 35%."}
                    </li>
                    <li className="mb-1">
                      Employee ratio is {Math.round((workstreamData.employees / workstreamData.total) * 100)}%,
                      {Math.round((workstreamData.employees / workstreamData.total) * 100) < 35
                        ? " which is below the target of 40% for knowledge retention."
                        : " which meets the target of 40% for knowledge retention."}
                    </li>
                    <li className="mb-1">
                      {workstreamData.teams.some((t) => Math.round((t.offshoreContractors / t.total) * 100) > 45)
                        ? `Some teams have more than 45% offshore contractors, which may impact collaboration efficiency.`
                        : `All teams have a balanced distribution of resource types.`}
                    </li>
                  </ul>
                </div>

                <div className="rounded-md bg-muted p-4">
                  <h4 className="mb-2 font-medium">Recommendations</h4>
                  <ul className="list-disc pl-5 text-sm">
                    {Math.round((workstreamData.employees / workstreamData.total) * 100) < 35 ? (
                      <li className="mb-1">
                        Consider converting {Math.ceil(0.4 * workstreamData.total - workstreamData.employees)}{" "}
                        contractor positions to employees to reach the 40% employee target for {selectedWorkstream}.
                      </li>
                    ) : null}

                    {workstreamData.teams.some((t) => Math.round((t.offshoreContractors / t.total) * 100) > 45) ? (
                      <li className="mb-1">
                        Rebalance teams with high offshore percentages to improve collaboration and knowledge transfer.
                      </li>
                    ) : null}

                    <li className="mb-1">
                      Implement cross-training between employees and contractors to ensure knowledge retention.
                    </li>

                    <li className="mb-1">
                      Review resource allocation for key initiatives to ensure critical projects have appropriate
                      employee representation.
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function PortfolioDonutChart({ data }) {
  // Calculate percentages
  const total = data.employees + data.onshoreContractors + data.offshoreContractors
  const empPercent = (data.employees / total) * 100
  const onshorePercent = (data.onshoreContractors / total) * 100
  const offshorePercent = (data.offshoreContractors / total) * 100

  // Calculate stroke dasharray values
  const circumference = 2 * Math.PI * 50 // r = 50
  const empDash = (empPercent / 100) * circumference
  const onshoreDash = (onshorePercent / 100) * circumference
  const offshoreDash = (offshorePercent / 100) * circumference

  return (
    <svg width="100%" height="100%" viewBox="0 0 100 100">
      <circle cx="50" cy="50" r="40" fill="transparent" stroke="#e2e8f0" strokeWidth="15" />

      {/* Employees segment */}
      <circle
        cx="50"
        cy="50"
        r="40"
        fill="transparent"
        stroke="#3b82f6"
        strokeWidth="15"
        strokeDasharray={`${empDash} ${circumference}`}
        transform="rotate(-90 50 50)"
      />

      {/* Onshore Contractors segment */}
      <circle
        cx="50"
        cy="50"
        r="40"
        fill="transparent"
        stroke="#22c55e"
        strokeWidth="15"
        strokeDasharray={`${onshoreDash} ${circumference}`}
        strokeDashoffset={-empDash}
        transform="rotate(-90 50 50)"
      />

      {/* Offshore Contractors segment */}
      <circle
        cx="50"
        cy="50"
        r="40"
        fill="transparent"
        stroke="#f59e0b"
        strokeWidth="15"
        strokeDasharray={`${offshoreDash} ${circumference}`}
        strokeDashoffset={-(empDash + onshoreDash)}
        transform="rotate(-90 50 50)"
      />
    </svg>
  )
}

function WorkstreamDonutChart({ data }) {
  // Calculate percentages
  const total = data.employees + data.onshoreContractors + data.offshoreContractors
  const empPercent = (data.employees / total) * 100
  const onshorePercent = (data.onshoreContractors / total) * 100
  const offshorePercent = (data.offshoreContractors / total) * 100

  // Calculate stroke dasharray values
  const circumference = 2 * Math.PI * 50 // r = 50
  const empDash = (empPercent / 100) * circumference
  const onshoreDash = (onshorePercent / 100) * circumference
  const offshoreDash = (offshorePercent / 100) * circumference

  return (
    <svg width="100%" height="100%" viewBox="0 0 100 100">
      <circle cx="50" cy="50" r="40" fill="transparent" stroke="#e2e8f0" strokeWidth="15" />

      {/* Employees segment */}
      <circle
        cx="50"
        cy="50"
        r="40"
        fill="transparent"
        stroke="#3b82f6"
        strokeWidth="15"
        strokeDasharray={`${empDash} ${circumference}`}
        transform="rotate(-90 50 50)"
      />

      {/* Onshore Contractors segment */}
      <circle
        cx="50"
        cy="50"
        r="40"
        fill="transparent"
        stroke="#22c55e"
        strokeWidth="15"
        strokeDasharray={`${onshoreDash} ${circumference}`}
        strokeDashoffset={-empDash}
        transform="rotate(-90 50 50)"
      />

      {/* Offshore Contractors segment */}
      <circle
        cx="50"
        cy="50"
        r="40"
        fill="transparent"
        stroke="#f59e0b"
        strokeWidth="15"
        strokeDasharray={`${offshoreDash} ${circumference}`}
        strokeDashoffset={-(empDash + onshoreDash)}
        transform="rotate(-90 50 50)"
      />
    </svg>
  )
}

function WorkstreamBarChart({ data, onSelect }) {
  const maxHeight = 200
  const barWidth = 60
  const gap = 40
  const totalWidth = data.length * (barWidth + gap)

  // Find the maximum total for scaling
  const maxTotal = Math.max(...data.map((ws) => ws.total))

  return (
    <div className="h-full w-full overflow-x-auto">
      <svg width={totalWidth} height={maxHeight + 50} className="mx-auto">
        {/* X-axis */}
        <line x1="0" y1={maxHeight} x2={totalWidth} y2={maxHeight} stroke="#e2e8f0" strokeWidth="1" />

        {data.map((ws, index) => {
          const x = index * (barWidth + gap) + gap / 2
          const totalHeight = (ws.total / maxTotal) * maxHeight

          // Calculate segment heights
          const empHeight = (ws.employees / ws.total) * totalHeight
          const onshoreHeight = (ws.onshoreContractors / ws.total) * totalHeight
          const offshoreHeight = (ws.offshoreContractors / ws.total) * totalHeight

          return (
            <g key={ws.name} onClick={() => onSelect(ws.name)} style={{ cursor: "pointer" }}>
              {/* Employees segment */}
              <rect x={x} y={maxHeight - empHeight} width={barWidth} height={empHeight} fill="#3b82f6" rx="2" />

              {/* Onshore Contractors segment */}
              <rect
                x={x}
                y={maxHeight - empHeight - onshoreHeight}
                width={barWidth}
                height={onshoreHeight}
                fill="#22c55e"
                rx="2"
              />

              {/* Offshore Contractors segment */}
              <rect
                x={x}
                y={maxHeight - empHeight - onshoreHeight - offshoreHeight}
                width={barWidth}
                height={offshoreHeight}
                fill="#f59e0b"
                rx="2"
              />

              {/* Total label */}
              <text
                x={x + barWidth / 2}
                y={maxHeight - totalHeight - 10}
                textAnchor="middle"
                fontSize="12"
                fontWeight="bold"
              >
                {ws.total}
              </text>

              {/* Workstream name */}
              <text
                x={x + barWidth / 2}
                y={maxHeight + 20}
                textAnchor="middle"
                fontSize="10"
                transform={`rotate(45, ${x + barWidth / 2}, ${maxHeight + 20})`}
              >
                {ws.name}
              </text>
            </g>
          )
        })}
      </svg>
    </div>
  )
}
