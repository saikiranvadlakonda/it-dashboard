"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { AlertCircle, Bug, Shield } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Line,
} from "recharts"

// Mock data for incident trends
const incidentTrendData = [
  { week: "Week 1", newP1: 2, newP2: 5, resolved: 6 },
  { week: "Week 2", newP1: 1, newP2: 3, resolved: 3 },
  { week: "Week 3", newP1: 3, newP2: 6, resolved: 5 },
  { week: "Week 4", newP1: 2, newP2: 4, resolved: 7 },
  { week: "Week 5", newP1: 4, newP2: 7, resolved: 8 },
  { week: "Week 6", newP1: 2, newP2: 5, resolved: 6 },
  { week: "Week 7", newP1: 1, newP2: 4, resolved: 4 },
  { week: "Week 8", newP1: 3, newP2: 6, resolved: 7 },
  { week: "Week 9", newP1: 2, newP2: 5, resolved: 6 },
  { week: "Week 10", newP1: 3, newP2: 4, resolved: 5 },
  { week: "Week 11", newP1: 1, newP2: 3, resolved: 5 },
  { week: "Week 12", newP1: 2, newP2: 4, resolved: 6 },
]

// Mock data for top incident sources
const topIncidentSourcesData = [
  { name: "Core Banking Platform", p1: 5, p2: 12, total: 17 },
  { name: "Wealth Management Suite", p1: 3, p2: 8, total: 11 },
  { name: "Mobile App - Login Service", p1: 2, p2: 5, total: 7 },
  { name: "Payment Gateway API", p1: 1, p2: 5, total: 6 },
  { name: "Internal CRM", p1: 0, p2: 4, total: 4 },
]

// Mock data for application health
const applicationHealthData = [
  {
    name: "Online Banking Portal",
    p1Incidents: { value: 0, status: "good" },
    p2Incidents: { value: 1, status: "warning" },
    avgP1Resolve: { value: "2.5 hrs", status: "good" },
    deployIssues: { value: 0, status: "good" },
    uptime: { value: "99.98%", status: "good" },
    overallHealth: { value: "Good", status: "good" },
  },
  {
    name: "Trade Processing System",
    p1Incidents: { value: 1, status: "critical" },
    p2Incidents: { value: 3, status: "warning" },
    avgP1Resolve: { value: "8.0 hrs", status: "critical" },
    deployIssues: { value: 1, status: "warning" },
    uptime: { value: "99.90%", status: "warning" },
    overallHealth: { value: "Poor", status: "critical" },
  },
  {
    name: "Regulatory Reporting Engine",
    p1Incidents: { value: 0, status: "good" },
    p2Incidents: { value: 0, status: "good" },
    avgP1Resolve: { value: "N/A", status: "good" },
    deployIssues: { value: 0, status: "good" },
    uptime: { value: "99.99%", status: "good" },
    overallHealth: { value: "Excellent", status: "good" },
  },
  {
    name: "Mobile Banking App",
    p1Incidents: { value: 2, status: "critical" },
    p2Incidents: { value: 4, status: "critical" },
    avgP1Resolve: { value: "4.2 hrs", status: "warning" },
    deployIssues: { value: 2, status: "critical" },
    uptime: { value: "99.85%", status: "warning" },
    overallHealth: { value: "Poor", status: "critical" },
  },
  {
    name: "Payment Processing System",
    p1Incidents: { value: 0, status: "good" },
    p2Incidents: { value: 2, status: "warning" },
    avgP1Resolve: { value: "3.1 hrs", status: "good" },
    deployIssues: { value: 0, status: "good" },
    uptime: { value: "99.95%", status: "good" },
    overallHealth: { value: "Good", status: "good" },
  },
]

// Helper function to get status color
const getStatusColor = (status) => {
  switch (status) {
    case "good":
      return "bg-green-100 text-green-800"
    case "warning":
      return "bg-amber-100 text-amber-800"
    case "critical":
      return "bg-red-100 text-red-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

export default function OperationalStabilityRiskPage() {
  const [activeTab, setActiveTab] = useState("overview")
  const router = useRouter()

  return (
    <div className="flex-1 overflow-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold tracking-tight">Operational Stability & Risk</h1>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full max-w-md grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="incidents">Incidents</TabsTrigger>
          <TabsTrigger value="tech-debt">Tech Debt</TabsTrigger>
          <TabsTrigger value="risk-register">Risk Register</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card className="col-span-1">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Open P1 Incidents</CardTitle>
                <AlertCircle className="h-4 w-4 text-red-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-500">3</div>
                <p className="text-xs text-muted-foreground">Avg age: 6.2 hours</p>
                <Button variant="link" className="px-0 text-xs" onClick={() => setActiveTab("incidents")}>
                  View incidents
                </Button>
              </CardContent>
            </Card>

            <Card className="col-span-1">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">High Risk Tech Debt</CardTitle>
                <Bug className="h-4 w-4 text-amber-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-amber-500">12</div>
                <p className="text-xs text-muted-foreground">4 critical, 8 high</p>
                <Button variant="link" className="px-0 text-xs" onClick={() => setActiveTab("tech-debt")}>
                  View tech debt
                </Button>
              </CardContent>
            </Card>

            <Card className="col-span-1">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Open Risks</CardTitle>
                <Shield className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">18</div>
                <p className="text-xs text-muted-foreground">6 high, 8 medium, 4 low</p>
                <Button variant="link" className="px-0 text-xs" onClick={() => setActiveTab("risk-register")}>
                  View risk register
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>P1/P2 Incident Trends (Last 90 Days)</CardTitle>
                <CardDescription>Volume of incoming and resolved incidents over time</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={incidentTrendData}
                    margin={{
                      top: 10,
                      right: 30,
                      left: 0,
                      bottom: 0,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="week" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Area
                      type="monotone"
                      dataKey="newP1"
                      stackId="1"
                      name="New P1 Incidents"
                      stroke="#ef4444"
                      fill="#ef4444"
                    />
                    <Area
                      type="monotone"
                      dataKey="newP2"
                      stackId="1"
                      name="New P2 Incidents"
                      stroke="#f97316"
                      fill="#f97316"
                    />
                    <Line
                      type="monotone"
                      dataKey="resolved"
                      name="Resolved P1/P2"
                      stroke="#3b82f6"
                      strokeWidth={2}
                      dot={{ r: 3 }}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Top Incident-Generating Applications (P1/P2, Last 30 Days)</CardTitle>
                <CardDescription>Applications with the highest number of critical incidents</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={topIncidentSourcesData}
                    layout="vertical"
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="name" type="category" width={150} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="p1" name="P1 Incidents" stackId="a" fill="#ef4444" />
                    <Bar dataKey="p2" name="P2 Incidents" stackId="a" fill="#f97316" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Key Application Stability Scorecard</CardTitle>
              <CardDescription>Health metrics for business-critical applications</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[200px]">Application Name</TableHead>
                    <TableHead>P1s (7d)</TableHead>
                    <TableHead>P2s (7d)</TableHead>
                    <TableHead>Avg. P1 Resolve (30d)</TableHead>
                    <TableHead>Deploy w/ Issues (30d)</TableHead>
                    <TableHead>Uptime</TableHead>
                    <TableHead>Overall Health</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {applicationHealthData.map((app) => (
                    <TableRow key={app.name}>
                      <TableCell className="font-medium">{app.name}</TableCell>
                      <TableCell>
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusColor(app.p1Incidents.status)}`}
                        >
                          {app.p1Incidents.value}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusColor(app.p2Incidents.status)}`}
                        >
                          {app.p2Incidents.value}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusColor(app.avgP1Resolve.status)}`}
                        >
                          {app.avgP1Resolve.value}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusColor(app.deployIssues.status)}`}
                        >
                          {app.deployIssues.value}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusColor(app.uptime.status)}`}
                        >
                          {app.uptime.value}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusColor(app.overallHealth.status)}`}
                        >
                          {app.overallHealth.value}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="incidents">
          <Card>
            <CardHeader>
              <CardTitle>Production Incidents</CardTitle>
              <CardDescription>View and manage all production incidents</CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={() => router.push("/operational-stability")} className="mb-4">
                Go to Operational Stability Dashboard
              </Button>
              <div className="h-[400px] flex items-center justify-center border rounded-md">
                <div className="text-center text-muted-foreground">
                  <p>Incidents will be displayed here</p>
                  <p className="text-sm">Click the button above to access the full Operational Stability dashboard</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tech-debt">
          <Card>
            <CardHeader>
              <CardTitle>Technical Debt</CardTitle>
              <CardDescription>Inventory of technical debt items across applications</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Application</TableHead>
                    <TableHead>Risk Level</TableHead>
                    <TableHead>Business Impact</TableHead>
                    <TableHead>Remediation Plan</TableHead>
                    <TableHead>Estimated Effort</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>TD-001</TableCell>
                    <TableCell>Legacy authentication system</TableCell>
                    <TableCell>LifePro</TableCell>
                    <TableCell>
                      <Badge className="bg-red-500">Critical</Badge>
                    </TableCell>
                    <TableCell>Security vulnerability, compliance risk</TableCell>
                    <TableCell>Upgrade to OAuth 2.0</TableCell>
                    <TableCell>8 weeks</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>TD-002</TableCell>
                    <TableCell>Outdated database version</TableCell>
                    <TableCell>Claims Processing</TableCell>
                    <TableCell>
                      <Badge className="bg-red-500">Critical</Badge>
                    </TableCell>
                    <TableCell>Performance issues, no vendor support</TableCell>
                    <TableCell>Database migration project</TableCell>
                    <TableCell>12 weeks</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>TD-003</TableCell>
                    <TableCell>Monolithic architecture</TableCell>
                    <TableCell>Policy Management</TableCell>
                    <TableCell>
                      <Badge className="bg-amber-500">High</Badge>
                    </TableCell>
                    <TableCell>Slow release cycles, scalability issues</TableCell>
                    <TableCell>Microservices transformation</TableCell>
                    <TableCell>24 weeks</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>TD-004</TableCell>
                    <TableCell>Insufficient test automation</TableCell>
                    <TableCell>Customer Portal</TableCell>
                    <TableCell>
                      <Badge className="bg-amber-500">High</Badge>
                    </TableCell>
                    <TableCell>Regression issues, slow releases</TableCell>
                    <TableCell>Implement test automation framework</TableCell>
                    <TableCell>6 weeks</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>TD-005</TableCell>
                    <TableCell>Outdated frontend framework</TableCell>
                    <TableCell>Advisor Dashboard</TableCell>
                    <TableCell>
                      <Badge className="bg-amber-500">High</Badge>
                    </TableCell>
                    <TableCell>Poor performance, maintenance challenges</TableCell>
                    <TableCell>Frontend modernization</TableCell>
                    <TableCell>10 weeks</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="risk-register">
          <Card>
            <CardHeader>
              <CardTitle>Comprehensive Risk Register</CardTitle>
              <CardDescription>Consolidated view of risks across delivery, operations, and compliance</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Risk ID</TableHead>
                    <TableHead>Risk Description</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Source</TableHead>
                    <TableHead>Impact</TableHead>
                    <TableHead>Probability</TableHead>
                    <TableHead>Mitigation Plan</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>RISK-001</TableCell>
                    <TableCell>LifePro upgrade timeline at risk due to vendor delays</TableCell>
                    <TableCell>Delivery</TableCell>
                    <TableCell>Wave</TableCell>
                    <TableCell>
                      <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-red-100 text-red-800">
                        High
                      </span>
                    </TableCell>
                    <TableCell>Medium</TableCell>
                    <TableCell>Escalate to vendor management; consider phased approach</TableCell>
                    <TableCell>Open</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>RISK-002</TableCell>
                    <TableCell>Legacy authentication system vulnerability</TableCell>
                    <TableCell>Security</TableCell>
                    <TableCell>ServiceNow</TableCell>
                    <TableCell>
                      <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-red-100 text-red-800">
                        High
                      </span>
                    </TableCell>
                    <TableCell>High</TableCell>
                    <TableCell>Implement temporary security controls; expedite upgrade</TableCell>
                    <TableCell>In Progress</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>RISK-003</TableCell>
                    <TableCell>Resource constraints for Data Lake implementation</TableCell>
                    <TableCell>Resourcing</TableCell>
                    <TableCell>ADO</TableCell>
                    <TableCell>
                      <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-amber-100 text-amber-800">
                        Medium
                      </span>
                    </TableCell>
                    <TableCell>High</TableCell>
                    <TableCell>Reallocate resources from lower priority initiatives</TableCell>
                    <TableCell>Open</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>RISK-004</TableCell>
                    <TableCell>Regulatory compliance deadline for new privacy requirements</TableCell>
                    <TableCell>Compliance</TableCell>
                    <TableCell>Wave</TableCell>
                    <TableCell>
                      <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-red-100 text-red-800">
                        High
                      </span>
                    </TableCell>
                    <TableCell>Medium</TableCell>
                    <TableCell>Dedicated compliance team; bi-weekly progress reviews</TableCell>
                    <TableCell>In Progress</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>RISK-005</TableCell>
                    <TableCell>Claims system performance degradation</TableCell>
                    <TableCell>Operational</TableCell>
                    <TableCell>ServiceNow</TableCell>
                    <TableCell>
                      <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-amber-100 text-amber-800">
                        Medium
                      </span>
                    </TableCell>
                    <TableCell>Medium</TableCell>
                    <TableCell>Performance tuning; infrastructure scaling</TableCell>
                    <TableCell>Open</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
