"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { ClipboardList, Filter, PlusCircle } from "lucide-react"
import { PieChart as RechartsPieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts"

export default function GovernanceIntakePage() {
  const [activeTab, setActiveTab] = useState("overview")
  const router = useRouter()

  // Data for Intake Pipeline Funnel
  const funnelData = [
    { name: "New Request Submitted", value: 15, color: "#4f46e5" },
    { name: "Initial Triage", value: 12, color: "#6366f1" },
    { name: "Business Case Review", value: 10, color: "#818cf8" },
    { name: "Technical Review", value: 8, color: "#a5b4fc" },
    { name: "Financial Review", value: 6, color: "#c7d2fe" },
    { name: "Approved", value: 5, color: "#e0e7ff" },
  ]

  // Data for Request Distribution by Segment
  const segmentData = [
    { name: "Wealth Management", value: 5, color: "#4f46e5" },
    { name: "Commercial Lending", value: 3, color: "#6366f1" },
    { name: "Retail Banking", value: 4, color: "#818cf8" },
    { name: "Corporate Functions", value: 2, color: "#a5b4fc" },
    { name: "IT Internal", value: 1, color: "#c7d2fe" },
  ]

  // Data for Request Distribution by Strategic Driver
  const driverData = [
    { name: "New Product/Service", value: 4, color: "#0891b2" },
    { name: "Operational Efficiency", value: 3, color: "#06b6d4" },
    { name: "Regulatory/Compliance", value: 5, color: "#22d3ee" },
    { name: "Technology Upgrade", value: 2, color: "#67e8f9" },
    { name: "Maintain the Business", value: 1, color: "#a5f3fc" },
  ]

  // Data for Governance Calendar
  const calendarData = [
    {
      date: "May 22, 2025",
      event: "IT Steering Committee",
      topics: "Q3 Portfolio Prioritization, 'Project Phoenix' Go/No-Go",
    },
    {
      date: "May 29, 2025",
      event: "Architecture Review Board",
      topics: "'New Data Lake Architecture' Proposal",
    },
    {
      date: "Jun 05, 2025",
      event: "Finance Review Meeting",
      topics: "Budget allocation for approved initiatives",
    },
    {
      date: "Jun 12, 2025",
      event: "Security & Compliance Review",
      topics: "'Cloud Migration - Phase 2' Security Plan",
    },
    {
      date: "Jun 18, 2025",
      event: "Change Advisory Board",
      topics: "Production deployment approvals for Q3 initiatives",
    },
  ]

  // Custom tooltip for pie charts
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 border rounded shadow-sm">
          <p className="font-medium">{payload[0].name}</p>
          <p className="text-sm">Count: {payload[0].value}</p>
          <p className="text-sm">Percentage: {((payload[0].value / 15) * 100).toFixed(1)}%</p>
        </div>
      )
    }
    return null
  }

  return (
    <div className="flex-1 overflow-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold tracking-tight">Governance & Intake</h1>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="intake">Intake Process</TabsTrigger>
          <TabsTrigger value="governance">Governance</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card className="col-span-1">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">New Requests</CardTitle>
                <PlusCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">15</div>
                <p className="text-xs text-muted-foreground">5 high priority, 10 standard</p>
                <Button variant="link" className="px-0 text-xs" onClick={() => setActiveTab("intake")}>
                  View intake process
                </Button>
              </CardContent>
            </Card>

            <Card className="col-span-1">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">In Review</CardTitle>
                <ClipboardList className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">8</div>
                <p className="text-xs text-muted-foreground">3 business case, 5 technical review</p>
                <Button variant="link" className="px-0 text-xs" onClick={() => setActiveTab("intake")}>
                  View in-review items
                </Button>
              </CardContent>
            </Card>

            <Card className="col-span-1">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Upcoming Reviews</CardTitle>
                <Filter className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">6</div>
                <p className="text-xs text-muted-foreground">Next review: May 22, 2025</p>
                <Button variant="link" className="px-0 text-xs" onClick={() => setActiveTab("governance")}>
                  View governance calendar
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Intake Request Funnel</CardTitle>
                <CardDescription>Current status of initiative requests in the pipeline</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex flex-col items-center justify-center">
                  {/* Custom Funnel Chart */}
                  <div className="w-full max-w-md">
                    {funnelData.map((stage, index) => (
                      <div key={index} className="relative mb-2">
                        <div
                          className="mx-auto rounded-sm flex items-center justify-center py-2 text-white font-medium"
                          style={{
                            width: `${100 - (index * (100 / funnelData.length)) / 2}%`,
                            backgroundColor: stage.color,
                            marginLeft: `${(index * (100 / funnelData.length)) / 4}%`,
                          }}
                        >
                          {stage.name}: {stage.value}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 text-sm text-muted-foreground">
                    <p>Click on a stage to view detailed requests</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Request Distribution</CardTitle>
                <CardDescription>Distribution of requests by business segment and type</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-center mb-2">By Sponsoring Segment</h3>
                    <ResponsiveContainer width="100%" height={150}>
                      <RechartsPieChart>
                        <Pie
                          data={segmentData}
                          cx="50%"
                          cy="50%"
                          innerRadius={30}
                          outerRadius={50}
                          paddingAngle={2}
                          dataKey="value"
                        >
                          {segmentData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip content={<CustomTooltip />} />
                      </RechartsPieChart>
                    </ResponsiveContainer>
                    <div className="text-xs space-y-1 mt-2">
                      {segmentData.map((entry, index) => (
                        <div key={index} className="flex items-center">
                          <div className="w-3 h-3 mr-2" style={{ backgroundColor: entry.color }}></div>
                          <span>
                            {entry.name} ({entry.value})
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-center mb-2">By Strategic Driver</h3>
                    <ResponsiveContainer width="100%" height={150}>
                      <RechartsPieChart>
                        <Pie
                          data={driverData}
                          cx="50%"
                          cy="50%"
                          innerRadius={30}
                          outerRadius={50}
                          paddingAngle={2}
                          dataKey="value"
                        >
                          {driverData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip content={<CustomTooltip />} />
                      </RechartsPieChart>
                    </ResponsiveContainer>
                    <div className="text-xs space-y-1 mt-2">
                      {driverData.map((entry, index) => (
                        <div key={index} className="flex items-center">
                          <div className="w-3 h-3 mr-2" style={{ backgroundColor: entry.color }}></div>
                          <span>
                            {entry.name} ({entry.value})
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Upcoming Governance Reviews & Deadlines</CardTitle>
              <CardDescription>Calendar of upcoming governance meetings and review sessions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2 px-4 font-medium">Date</th>
                      <th className="text-left py-2 px-4 font-medium">Event / Meeting</th>
                      <th className="text-left py-2 px-4 font-medium">Key Topics / Initiatives</th>
                    </tr>
                  </thead>
                  <tbody>
                    {calendarData.map((item, index) => (
                      <tr key={index} className={index % 2 === 0 ? "bg-muted/50" : ""}>
                        <td className="py-3 px-4">{item.date}</td>
                        <td className="py-3 px-4 font-medium">{item.event}</td>
                        <td className="py-3 px-4">{item.topics}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-4 text-sm text-muted-foreground text-center">
                <p>Click on an event to view meeting materials</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="intake">
          <Card>
            <CardHeader>
              <CardTitle>Intake Process</CardTitle>
              <CardDescription>View and manage the initiative intake process</CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={() => router.push("/intake-process")} className="mb-4">
                Go to Intake Process Dashboard
              </Button>
              <div className="h-[400px] flex items-center justify-center border rounded-md">
                <div className="text-center text-muted-foreground">
                  <p>Intake process will be displayed here</p>
                  <p className="text-sm">Click the button above to access the full Intake Process dashboard</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="governance">
          <Card>
            <CardHeader>
              <CardTitle>Governance Framework</CardTitle>
              <CardDescription>IT governance structure, policies, and processes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="rounded-md border p-4">
                  <h3 className="text-lg font-medium mb-2">Governance Bodies</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>IT Steering Committee</li>
                    <li>Architecture Review Board</li>
                    <li>Change Advisory Board</li>
                    <li>Security Council</li>
                    <li>Data Governance Committee</li>
                  </ul>
                </div>

                <div className="rounded-md border p-4">
                  <h3 className="text-lg font-medium mb-2">Upcoming Governance Meetings</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">IT Steering Committee</p>
                        <p className="text-sm text-muted-foreground">Quarterly portfolio review</p>
                      </div>
                      <p className="text-sm">May 25, 2025</p>
                    </div>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">Architecture Review Board</p>
                        <p className="text-sm text-muted-foreground">New initiative reviews</p>
                      </div>
                      <p className="text-sm">May 22, 2025</p>
                    </div>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">Change Advisory Board</p>
                        <p className="text-sm text-muted-foreground">Production change approvals</p>
                      </div>
                      <p className="text-sm">May 21, 2025</p>
                    </div>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">Security Council</p>
                        <p className="text-sm text-muted-foreground">Quarterly security review</p>
                      </div>
                      <p className="text-sm">June 5, 2025</p>
                    </div>
                  </div>
                </div>

                <div className="rounded-md border p-4">
                  <h3 className="text-lg font-medium mb-2">Governance Policies</h3>
                  <div className="space-y-2">
                    <div>
                      <p className="font-medium">IT Investment Policy</p>
                      <p className="text-sm text-muted-foreground">
                        Guidelines for IT investment decisions and ROI requirements
                      </p>
                    </div>
                    <div>
                      <p className="font-medium">Technology Standards</p>
                      <p className="text-sm text-muted-foreground">Approved technologies and architectural patterns</p>
                    </div>
                    <div>
                      <p className="font-medium">Data Governance Policy</p>
                      <p className="text-sm text-muted-foreground">Data ownership, quality, and privacy requirements</p>
                    </div>
                    <div>
                      <p className="font-medium">Security Policy</p>
                      <p className="text-sm text-muted-foreground">Security requirements for all IT initiatives</p>
                    </div>
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
