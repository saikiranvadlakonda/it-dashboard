"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { BarChart, LineChart, PieChart } from "lucide-react"
import { Button } from "@/components/ui/button"

export function ProductionStability() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Production Stability & Incidents</CardTitle>
          <CardDescription>
            ServiceNow incident data related to applications and services in production environments.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="current">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="current">Current Incidents</TabsTrigger>
              <TabsTrigger value="trends">Incident Trends</TabsTrigger>
              <TabsTrigger value="analysis">Root Cause Analysis</TabsTrigger>
            </TabsList>

            {/* Tab 1: Current Incidents */}
            <TabsContent value="current" className="pt-6">
              <div className="space-y-6">
                {/* KPI Cards for Critical Open Incidents */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <Card className="bg-red-50 border-red-200">
                    <CardContent className="p-4">
                      <div className="text-sm font-medium text-red-800">Open P1 Incidents</div>
                      <div className="text-3xl font-bold text-red-700">3</div>
                      <div className="text-xs text-red-600 mt-1">+1 in last 24 hours</div>
                    </CardContent>
                  </Card>
                  <Card className="bg-amber-50 border-amber-200">
                    <CardContent className="p-4">
                      <div className="text-sm font-medium text-amber-800">Open P2 Incidents</div>
                      <div className="text-3xl font-bold text-amber-700">8</div>
                      <div className="text-xs text-amber-600 mt-1">-2 in last 24 hours</div>
                    </CardContent>
                  </Card>
                  <Card className="bg-blue-50 border-blue-200">
                    <CardContent className="p-4">
                      <div className="text-sm font-medium text-blue-800">Avg. P1 Resolution Time</div>
                      <div className="text-3xl font-bold text-blue-700">4.2h</div>
                      <div className="text-xs text-blue-600 mt-1">Last 30 days</div>
                    </CardContent>
                  </Card>
                  <Card className="bg-green-50 border-green-200">
                    <CardContent className="p-4">
                      <div className="text-sm font-medium text-green-800">Incidents Resolved (24h)</div>
                      <div className="text-3xl font-bold text-green-700">5</div>
                      <div className="text-xs text-green-600 mt-1">2 P1s, 3 P2s</div>
                    </CardContent>
                  </Card>
                </div>

                {/* Donut Chart: Open P1/P2 Incidents by Owning Application/Service Group */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Open P1/P2 Incidents by Application</CardTitle>
                      <CardDescription>Distribution of critical incidents across systems</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-center py-4">
                        <div className="relative h-60 w-60">
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-2xl font-bold">11</div>
                            <div className="text-xs text-muted-foreground">Total</div>
                          </div>
                          <div
                            className="h-full w-full rounded-full"
                            style={{
                              background:
                                "conic-gradient(#ef4444 0deg 65deg, #f97316 65deg 155deg, #0ea5e9 155deg 210deg, #84cc16 210deg 360deg)",
                            }}
                          ></div>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4 mt-2">
                        <div className="flex items-center gap-1">
                          <div className="h-3 w-3 rounded-full bg-red-500"></div>
                          <span className="text-sm">Core Banking (2 P1, 0 P2)</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <div className="h-3 w-3 rounded-full bg-orange-500"></div>
                          <span className="text-sm">Wealth Mgmt (1 P1, 3 P2)</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <div className="h-3 w-3 rounded-full bg-sky-500"></div>
                          <span className="text-sm">Mobile App (0 P1, 2 P2)</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <div className="h-3 w-3 rounded-full bg-green-500"></div>
                          <span className="text-sm">Internal Systems (0 P1, 3 P2)</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Table: Latest Critical Incidents */}
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Latest Critical Incidents</CardTitle>
                      <CardDescription>Most recent P1/P2 incidents</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>ID</TableHead>
                            <TableHead>Application</TableHead>
                            <TableHead>Priority</TableHead>
                            <TableHead>Created</TableHead>
                            <TableHead>Status</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow>
                            <TableCell className="font-medium">INC0012345</TableCell>
                            <TableCell>Core Banking</TableCell>
                            <TableCell>
                              <Badge className="bg-red-100 text-red-800">P1</Badge>
                            </TableCell>
                            <TableCell>2h ago</TableCell>
                            <TableCell>
                              <Badge variant="outline" className="text-amber-600 border-amber-300">
                                In Progress
                              </Badge>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">INC0012344</TableCell>
                            <TableCell>Wealth Management</TableCell>
                            <TableCell>
                              <Badge className="bg-red-100 text-red-800">P1</Badge>
                            </TableCell>
                            <TableCell>5h ago</TableCell>
                            <TableCell>
                              <Badge variant="outline" className="text-amber-600 border-amber-300">
                                In Progress
                              </Badge>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">INC0012343</TableCell>
                            <TableCell>Mobile App</TableCell>
                            <TableCell>
                              <Badge className="bg-amber-100 text-amber-800">P2</Badge>
                            </TableCell>
                            <TableCell>8h ago</TableCell>
                            <TableCell>
                              <Badge variant="outline" className="text-green-600 border-green-300">
                                Resolved
                              </Badge>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">INC0012342</TableCell>
                            <TableCell>Core Banking</TableCell>
                            <TableCell>
                              <Badge className="bg-red-100 text-red-800">P1</Badge>
                            </TableCell>
                            <TableCell>12h ago</TableCell>
                            <TableCell>
                              <Badge variant="outline" className="text-green-600 border-green-300">
                                Resolved
                              </Badge>
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                      <div className="mt-4 flex justify-end">
                        <Button variant="outline" size="sm">
                          View All Incidents
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            {/* Tab 2: Incident Trends */}
            <TabsContent value="trends" className="pt-6">
              <div className="space-y-6">
                {/* P1/P2 Incident Trend Chart */}
                <Card>
                  <CardHeader>
                    <CardTitle>P1/P2 Incident Trend (Last 90 Days)</CardTitle>
                    <CardDescription>Weekly count of new critical incidents</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[350px] relative">
                      {/* Simulated Line Chart */}
                      <div className="absolute inset-0 flex items-end px-10 pt-10">
                        <div className="w-full h-[300px] border-b border-l relative">
                          {/* Y-axis labels */}
                          <div className="absolute -left-8 bottom-0 text-xs text-muted-foreground">0</div>
                          <div className="absolute -left-8 bottom-1/4 text-xs text-muted-foreground">5</div>
                          <div className="absolute -left-8 bottom-2/4 text-xs text-muted-foreground">10</div>
                          <div className="absolute -left-8 bottom-3/4 text-xs text-muted-foreground">15</div>

                          {/* X-axis labels */}
                          <div className="absolute bottom-[-20px] left-[12.5%] text-xs text-muted-foreground">
                            Week 1
                          </div>
                          <div className="absolute bottom-[-20px] left-[37.5%] text-xs text-muted-foreground">
                            Week 4
                          </div>
                          <div className="absolute bottom-[-20px] left-[62.5%] text-xs text-muted-foreground">
                            Week 8
                          </div>
                          <div className="absolute bottom-[-20px] left-[87.5%] text-xs text-muted-foreground">
                            Week 12
                          </div>

                          {/* P1 Line (red) */}
                          <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
                            <path
                              d="M0,240 L80,220 L160,260 L240,200 L320,180 L400,240 L480,150 L560,180 L640,200 L720,220 L800,240"
                              fill="none"
                              stroke="#ef4444"
                              strokeWidth="3"
                            />
                          </svg>

                          {/* P2 Line (amber) */}
                          <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
                            <path
                              d="M0,180 L80,150 L160,200 L240,120 L320,100 L400,150 L480,80 L560,120 L640,150 L720,180 L800,200"
                              fill="none"
                              stroke="#f97316"
                              strokeWidth="3"
                            />
                          </svg>

                          {/* Resolved Line (green, dashed) */}
                          <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
                            <path
                              d="M0,200 L80,180 L160,220 L240,150 L320,130 L400,180 L480,100 L560,140 L640,170 L720,190 L800,210"
                              fill="none"
                              stroke="#22c55e"
                              strokeWidth="2"
                              strokeDasharray="5,5"
                            />
                          </svg>
                        </div>
                      </div>

                      {/* Legend */}
                      <div className="absolute top-4 right-4 bg-white/80 p-2 rounded-md border text-xs">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-1 bg-red-500"></div>
                          <span>New P1 Incidents</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-1 bg-orange-500"></div>
                          <span>New P2 Incidents</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-1 bg-green-500 border-t border-dashed"></div>
                          <span>Resolved Incidents</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Top 5 Applications/Services by P1/P2 Incident Volume */}
                <Card>
                  <CardHeader>
                    <CardTitle>Top 5 Applications by Incident Volume (Last 30 Days)</CardTitle>
                    <CardDescription>Applications with the highest number of critical incidents</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Application/Service</TableHead>
                          <TableHead>Owning Workstream</TableHead>
                          <TableHead className="text-right">P1s (Last 30d)</TableHead>
                          <TableHead className="text-right">P2s (Last 30d)</TableHead>
                          <TableHead className="text-right">Avg. P1 Resolve Time</TableHead>
                          <TableHead>Related Initiative</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell className="font-medium">Core Banking Platform</TableCell>
                          <TableCell>App Development</TableCell>
                          <TableCell className="text-right">5</TableCell>
                          <TableCell className="text-right">12</TableCell>
                          <TableCell className="text-right">4.5 hrs</TableCell>
                          <TableCell>
                            <Badge variant="outline">LifePro Version 20 Upgrade</Badge>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Wealth Management Suite</TableCell>
                          <TableCell>Wealth Tech</TableCell>
                          <TableCell className="text-right">3</TableCell>
                          <TableCell className="text-right">8</TableCell>
                          <TableCell className="text-right">6.2 hrs</TableCell>
                          <TableCell>
                            <Badge variant="outline">Wealth Platform Modernization</Badge>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Mobile App - Login Service</TableCell>
                          <TableCell>Retail Tech</TableCell>
                          <TableCell className="text-right">2</TableCell>
                          <TableCell className="text-right">5</TableCell>
                          <TableCell className="text-right">3.0 hrs</TableCell>
                          <TableCell>
                            <Badge variant="outline">Digital Customer Experience</Badge>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Customer Portal</TableCell>
                          <TableCell>Digital Channels</TableCell>
                          <TableCell className="text-right">2</TableCell>
                          <TableCell className="text-right">4</TableCell>
                          <TableCell className="text-right">3.8 hrs</TableCell>
                          <TableCell>
                            <Badge variant="outline">Portal Redesign</Badge>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Payment Processing</TableCell>
                          <TableCell>Financial Services</TableCell>
                          <TableCell className="text-right">1</TableCell>
                          <TableCell className="text-right">6</TableCell>
                          <TableCell className="text-right">2.5 hrs</TableCell>
                          <TableCell>
                            <Badge variant="outline">Payment Gateway Upgrade</Badge>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Tab 3: Root Cause Analysis */}
            <TabsContent value="analysis" className="pt-6">
              <div className="space-y-6">
                {/* Incident Root Cause Categories */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Incident Root Cause Categories (P1/P2 - Last 30 Days)</CardTitle>
                      <CardDescription>Distribution of incidents by root cause</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-center py-4">
                        <div className="relative h-60 w-60">
                          <div
                            className="h-full w-full rounded-full"
                            style={{
                              background:
                                "conic-gradient(#ef4444 0deg 108deg, #f97316 108deg 180deg, #0ea5e9 180deg 252deg, #84cc16 252deg 324deg, #a855f7 324deg 360deg)",
                            }}
                          ></div>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4 mt-4">
                        <div className="flex items-center gap-1">
                          <div className="h-3 w-3 rounded-full bg-red-500"></div>
                          <span className="text-sm">Application Bug (30%)</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <div className="h-3 w-3 rounded-full bg-orange-500"></div>
                          <span className="text-sm">Infrastructure Failure (20%)</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <div className="h-3 w-3 rounded-full bg-sky-500"></div>
                          <span className="text-sm">Database Issue (20%)</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <div className="h-3 w-3 rounded-full bg-green-500"></div>
                          <span className="text-sm">Change-Related (20%)</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <div className="h-3 w-3 rounded-full bg-purple-500"></div>
                          <span className="text-sm">User Error (10%)</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Incident Impact by Initiative Type</CardTitle>
                      <CardDescription>Correlation between initiatives and production incidents</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Initiative Category</TableHead>
                            <TableHead className="text-right">Total Initiatives</TableHead>
                            <TableHead className="text-right">Related P1/P2s</TableHead>
                            <TableHead>Risk Level</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow>
                            <TableCell className="font-medium">Modernize Core</TableCell>
                            <TableCell className="text-right">20</TableCell>
                            <TableCell className="text-right">18</TableCell>
                            <TableCell>
                              <Badge className="bg-red-100 text-red-800">High</Badge>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">Compliance</TableCell>
                            <TableCell className="text-right">15</TableCell>
                            <TableCell className="text-right">5</TableCell>
                            <TableCell>
                              <Badge className="bg-green-100 text-green-800">Low</Badge>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">Growth</TableCell>
                            <TableCell className="text-right">10</TableCell>
                            <TableCell className="text-right">12</TableCell>
                            <TableCell>
                              <Badge className="bg-amber-100 text-amber-800">Medium</Badge>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">Other</TableCell>
                            <TableCell className="text-right">5</TableCell>
                            <TableCell className="text-right">2</TableCell>
                            <TableCell>
                              <Badge className="bg-green-100 text-green-800">Low</Badge>
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>

                      <div className="mt-6">
                        <h4 className="text-sm font-medium mb-2">Key Insights:</h4>
                        <ul className="text-sm space-y-1 list-disc pl-4">
                          <li>
                            <span className="font-medium">Core Modernization</span> initiatives show the highest
                            correlation with production incidents
                          </li>
                          <li>
                            <span className="font-medium">Change-related</span> incidents are most common during active
                            development phases
                          </li>
                          <li>
                            Initiatives with <span className="font-medium">comprehensive testing</span> show 40% fewer
                            post-deployment incidents
                          </li>
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Recommendations */}
                <Card>
                  <CardHeader>
                    <CardTitle>Stability Improvement Recommendations</CardTitle>
                    <CardDescription>AI-generated recommendations based on incident patterns</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-3 border rounded-md bg-blue-50">
                        <h4 className="font-medium flex items-center gap-2">
                          <BarChart className="h-4 w-4 text-blue-600" />
                          Core Banking Platform Stability
                        </h4>
                        <p className="text-sm mt-1">
                          The Core Banking Platform shows a pattern of database-related incidents. Consider allocating
                          additional resources to database performance optimization in the LifePro Version 20 Upgrade
                          initiative.
                        </p>
                      </div>

                      <div className="p-3 border rounded-md bg-amber-50">
                        <h4 className="font-medium flex items-center gap-2">
                          <LineChart className="h-4 w-4 text-amber-600" />
                          Change Management Process
                        </h4>
                        <p className="text-sm mt-1">
                          20% of incidents are change-related. Review the change management process for Mobile App
                          Services to reduce deployment-related incidents. Consider implementing more comprehensive
                          pre-deployment testing.
                        </p>
                      </div>

                      <div className="p-3 border rounded-md bg-green-50">
                        <h4 className="font-medium flex items-center gap-2">
                          <PieChart className="h-4 w-4 text-green-600" />
                          Resource Allocation
                        </h4>
                        <p className="text-sm mt-1">
                          Wealth Management Suite has the longest P1 resolution time (6.2 hrs). Consider reallocating
                          support resources to improve response times for this critical system.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
