"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertCircle, AlertTriangle, ArrowDown, ArrowUp, Server } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts"

// Mock data for ServiceNow incidents
const incidentTrendData = [
  { date: "Jan 1", p1: 3, p2: 7 },
  { date: "Jan 8", p1: 4, p2: 6 },
  { date: "Jan 15", p1: 2, p2: 8 },
  { date: "Jan 22", p1: 5, p2: 9 },
  { date: "Jan 29", p1: 3, p2: 7 },
  { date: "Feb 5", p1: 2, p2: 5 },
  { date: "Feb 12", p1: 1, p2: 4 },
  { date: "Feb 19", p1: 3, p2: 6 },
  { date: "Feb 26", p1: 2, p2: 5 },
  { date: "Mar 5", p1: 4, p2: 8 },
  { date: "Mar 12", p1: 3, p2: 6 },
  { date: "Mar 19", p1: 2, p2: 4 },
]

const incidentsByAppData = [
  { name: "LifePro", value: 5, color: "#ff4d4f" },
  { name: "Member Portal", value: 3, color: "#faad14" },
  { name: "Claims System", value: 4, color: "#1890ff" },
  { name: "Payment Gateway", value: 2, color: "#52c41a" },
  { name: "CRM", value: 3, color: "#722ed1" },
]

const topIncidentAppsData = [
  {
    app: "LifePro",
    p1Count: 3,
    p2Count: 7,
    totalCount: 10,
    mttr: "4h 12m",
    trend: "up",
  },
  {
    app: "Member Portal",
    p1Count: 2,
    p2Count: 5,
    totalCount: 7,
    mttr: "3h 45m",
    trend: "down",
  },
  {
    app: "Claims System",
    p1Count: 2,
    p2Count: 6,
    totalCount: 8,
    mttr: "5h 30m",
    trend: "up",
  },
  {
    app: "Payment Gateway",
    p1Count: 1,
    p2Count: 4,
    totalCount: 5,
    mttr: "2h 15m",
    trend: "down",
  },
  {
    app: "CRM",
    p1Count: 1,
    p2Count: 5,
    totalCount: 6,
    mttr: "3h 50m",
    trend: "up",
  },
]

const recentIncidentsData = [
  {
    id: "INC0012345",
    title: "LifePro Authentication Service Outage",
    priority: "P1",
    status: "Open",
    created: "2023-03-15 08:23",
    assignedTo: "Infrastructure Team",
    impact: "High",
  },
  {
    id: "INC0012346",
    title: "Member Portal Slow Response Time",
    priority: "P2",
    status: "In Progress",
    created: "2023-03-14 14:45",
    assignedTo: "Web Team",
    impact: "Medium",
  },
  {
    id: "INC0012347",
    title: "Claims Processing Delay",
    priority: "P1",
    status: "In Progress",
    created: "2023-03-14 10:12",
    assignedTo: "Claims Team",
    impact: "High",
  },
  {
    id: "INC0012348",
    title: "Payment Gateway Timeout",
    priority: "P2",
    status: "Open",
    created: "2023-03-13 16:30",
    assignedTo: "Payments Team",
    impact: "Medium",
  },
  {
    id: "INC0012349",
    title: "CRM Data Sync Failure",
    priority: "P2",
    status: "Open",
    created: "2023-03-13 09:15",
    assignedTo: "Data Team",
    impact: "Medium",
  },
]

export function OperationalStability() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Open P1 Incidents</CardTitle>
            <AlertCircle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-500">3</div>
            <p className="text-xs text-muted-foreground">+1 from last week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Open P2 Incidents</CardTitle>
            <AlertTriangle className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-500">12</div>
            <p className="text-xs text-muted-foreground">-2 from last week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. MTTR (P1)</CardTitle>
            <Server className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4h 12m</div>
            <p className="text-xs text-muted-foreground">+22m from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. MTTR (P2)</CardTitle>
            <Server className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">6h 45m</div>
            <p className="text-xs text-muted-foreground">-15m from last month</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Open P1/P2 Incidents by Application</CardTitle>
            <CardDescription>Distribution of current open incidents across applications</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={incidentsByAppData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {incidentsByAppData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>P1/P2 Incident Trend (Last 90 Days)</CardTitle>
            <CardDescription>Historical view of incident volume over time</CardDescription>
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
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="p1" stackId="1" stroke="#ff4d4f" fill="#ff4d4f" />
                <Area type="monotone" dataKey="p2" stackId="1" stroke="#faad14" fill="#faad14" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="top-apps">
        <TabsList>
          <TabsTrigger value="top-apps">Top Applications by Incidents</TabsTrigger>
          <TabsTrigger value="recent">Recent Incidents</TabsTrigger>
          <TabsTrigger value="tech-debt">Application Health & Tech Debt</TabsTrigger>
        </TabsList>
        <TabsContent value="top-apps">
          <Card>
            <CardHeader>
              <CardTitle>Top 5 Applications by P1/P2 Incident Volume (Last 30 Days)</CardTitle>
              <CardDescription>Applications with the highest number of critical incidents</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Application</TableHead>
                    <TableHead>P1 Count</TableHead>
                    <TableHead>P2 Count</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Avg. MTTR</TableHead>
                    <TableHead>Trend</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {topIncidentAppsData.map((app) => (
                    <TableRow key={app.app}>
                      <TableCell className="font-medium">{app.app}</TableCell>
                      <TableCell className="text-red-500">{app.p1Count}</TableCell>
                      <TableCell className="text-amber-500">{app.p2Count}</TableCell>
                      <TableCell>{app.totalCount}</TableCell>
                      <TableCell>{app.mttr}</TableCell>
                      <TableCell>
                        {app.trend === "up" ? (
                          <ArrowUp className="h-4 w-4 text-red-500" />
                        ) : (
                          <ArrowDown className="h-4 w-4 text-green-500" />
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="recent">
          <Card>
            <CardHeader>
              <CardTitle>Recent Incidents</CardTitle>
              <CardDescription>Latest P1 and P2 incidents reported in the system</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead>Assigned To</TableHead>
                    <TableHead>Impact</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentIncidentsData.map((incident) => (
                    <TableRow key={incident.id}>
                      <TableCell className="font-medium">{incident.id}</TableCell>
                      <TableCell>{incident.title}</TableCell>
                      <TableCell>
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            incident.priority === "P1" ? "bg-red-100 text-red-800" : "bg-amber-100 text-amber-800"
                          }`}
                        >
                          {incident.priority}
                        </span>
                      </TableCell>
                      <TableCell>{incident.status}</TableCell>
                      <TableCell>{incident.created}</TableCell>
                      <TableCell>{incident.assignedTo}</TableCell>
                      <TableCell>{incident.impact}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="tech-debt">
          <Card>
            <CardHeader>
              <CardTitle>Application Health & Tech Debt</CardTitle>
              <CardDescription>Linking incident hotspots to modernization initiatives</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-3">Incident Hotspots & Modernization Initiatives</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Application</TableHead>
                      <TableHead>P1/P2 Incidents (90d)</TableHead>
                      <TableHead>Avg. MTTR</TableHead>
                      <TableHead>Linked Modernization Initiative</TableHead>
                      <TableHead>Initiative Status</TableHead>
                      <TableHead>Est. Completion</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">LifePro</TableCell>
                      <TableCell>10</TableCell>
                      <TableCell>4h 12m</TableCell>
                      <TableCell>LifePro Version 20 Upgrade</TableCell>
                      <TableCell>
                        <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-amber-100 text-amber-800">
                          In Progress
                        </span>
                      </TableCell>
                      <TableCell>Oct 2025</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Member Portal</TableCell>
                      <TableCell>7</TableCell>
                      <TableCell>3h 45m</TableCell>
                      <TableCell>Digital Customer Experience</TableCell>
                      <TableCell>
                        <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-green-100 text-green-800">
                          On Track
                        </span>
                      </TableCell>
                      <TableCell>Dec 2025</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Claims System</TableCell>
                      <TableCell>8</TableCell>
                      <TableCell>5h 30m</TableCell>
                      <TableCell>Claims Processing Modernization</TableCell>
                      <TableCell>
                        <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-red-100 text-red-800">
                          Delayed
                        </span>
                      </TableCell>
                      <TableCell>Mar 2026</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Payment Gateway</TableCell>
                      <TableCell>5</TableCell>
                      <TableCell>2h 15m</TableCell>
                      <TableCell>Payment Services Upgrade</TableCell>
                      <TableCell>
                        <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-green-100 text-green-800">
                          On Track
                        </span>
                      </TableCell>
                      <TableCell>Aug 2025</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">CRM</TableCell>
                      <TableCell>6</TableCell>
                      <TableCell>3h 50m</TableCell>
                      <TableCell>CRM Consolidation</TableCell>
                      <TableCell>
                        <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-amber-100 text-amber-800">
                          In Progress
                        </span>
                      </TableCell>
                      <TableCell>Nov 2025</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-3">Key Technical Debt Items</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Item</TableHead>
                      <TableHead>Application/System</TableHead>
                      <TableHead>Risk Level</TableHead>
                      <TableHead>Impact</TableHead>
                      <TableHead>Remediation Plan</TableHead>
                      <TableHead>Est. Effort</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Legacy Authentication System</TableCell>
                      <TableCell>LifePro</TableCell>
                      <TableCell>
                        <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-red-100 text-red-800">
                          High
                        </span>
                      </TableCell>
                      <TableCell>Security vulnerability, frequent outages</TableCell>
                      <TableCell>Part of LifePro V20 Upgrade</TableCell>
                      <TableCell>3 months</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Outdated Database Version</TableCell>
                      <TableCell>Claims System</TableCell>
                      <TableCell>
                        <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-red-100 text-red-800">
                          High
                        </span>
                      </TableCell>
                      <TableCell>Performance issues, no vendor support</TableCell>
                      <TableCell>Database Migration Project</TableCell>
                      <TableCell>4 months</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Monolithic Architecture</TableCell>
                      <TableCell>Member Portal</TableCell>
                      <TableCell>
                        <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-amber-100 text-amber-800">
                          Medium
                        </span>
                      </TableCell>
                      <TableCell>Slow deployments, scaling issues</TableCell>
                      <TableCell>Microservices Transformation</TableCell>
                      <TableCell>6 months</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">End-of-Life Hardware</TableCell>
                      <TableCell>Payment Gateway</TableCell>
                      <TableCell>
                        <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-amber-100 text-amber-800">
                          Medium
                        </span>
                      </TableCell>
                      <TableCell>Reliability concerns, no replacement parts</TableCell>
                      <TableCell>Cloud Migration</TableCell>
                      <TableCell>2 months</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Custom Code Without Tests</TableCell>
                      <TableCell>CRM</TableCell>
                      <TableCell>
                        <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-amber-100 text-amber-800">
                          Medium
                        </span>
                      </TableCell>
                      <TableCell>Regression issues, slow feature delivery</TableCell>
                      <TableCell>Test Automation Initiative</TableCell>
                      <TableCell>3 months</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
