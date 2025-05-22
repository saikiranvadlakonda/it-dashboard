"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProjectTimeline } from "@/components/project-timeline"
import { DependencyView } from "@/components/dependency-view"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { ArrowRight, BarChart3, Calendar, Network } from "lucide-react"

export default function InitiativeDeliveryPage() {
  const [activeTab, setActiveTab] = useState("overview")
  const router = useRouter()

  return (
    <div className="flex-1 overflow-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold tracking-tight">Initiative Delivery & Execution</h1>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full max-w-md grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="dependencies">Dependencies</TabsTrigger>
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card className="col-span-1">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">24</div>
                <p className="text-xs text-muted-foreground">12 on track, 8 at risk, 4 blocked</p>
                <Button variant="link" className="px-0 text-xs" onClick={() => setActiveTab("projects")}>
                  View all projects <ArrowRight className="ml-1 h-3 w-3" />
                </Button>
              </CardContent>
            </Card>

            <Card className="col-span-1">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Critical Dependencies</CardTitle>
                <Network className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">8</div>
                <p className="text-xs text-muted-foreground">3 blocked, 5 at risk</p>
                <Button variant="link" className="px-0 text-xs" onClick={() => setActiveTab("dependencies")}>
                  View all dependencies <ArrowRight className="ml-1 h-3 w-3" />
                </Button>
              </CardContent>
            </Card>

            <Card className="col-span-1">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Upcoming Milestones</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">15</div>
                <p className="text-xs text-muted-foreground">5 this week, 10 next week</p>
                <Button variant="link" className="px-0 text-xs" onClick={() => setActiveTab("timeline")}>
                  View timeline <ArrowRight className="ml-1 h-3 w-3" />
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Project Status Summary</CardTitle>
                <CardDescription>Overview of all active projects by status and segment</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <h4 className="mb-4 text-sm font-medium">Project Health by Segment</h4>
                  <div className="h-[250px]">
                    <div className="flex h-full flex-col">
                      <div className="flex justify-between text-xs text-muted-foreground mb-2">
                        <span>Number of Active Projects</span>
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-1">
                            <div className="h-3 w-3 rounded-full bg-green-500"></div>
                            <span>On Track</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <div className="h-3 w-3 rounded-full bg-amber-500"></div>
                            <span>At Risk</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <div className="h-3 w-3 rounded-full bg-red-500"></div>
                            <span>Blocked</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex-1 space-y-4">
                        {/* Wealth Management */}
                        <div>
                          <div className="flex justify-between text-xs mb-1">
                            <span>Wealth Management</span>
                            <span>7 projects</span>
                          </div>
                          <div className="h-6 w-full rounded-full overflow-hidden bg-muted flex">
                            <div className="bg-green-500 h-full" style={{ width: "57%" }}></div>
                            <div className="bg-amber-500 h-full" style={{ width: "29%" }}></div>
                            <div className="bg-red-500 h-full" style={{ width: "14%" }}></div>
                          </div>
                        </div>

                        {/* Commercial Lending */}
                        <div>
                          <div className="flex justify-between text-xs mb-1">
                            <span>Commercial Lending</span>
                            <span>5 projects</span>
                          </div>
                          <div className="h-6 w-full rounded-full overflow-hidden bg-muted flex">
                            <div className="bg-green-500 h-full" style={{ width: "40%" }}></div>
                            <div className="bg-amber-500 h-full" style={{ width: "40%" }}></div>
                            <div className="bg-red-500 h-full" style={{ width: "20%" }}></div>
                          </div>
                        </div>

                        {/* Retail Banking */}
                        <div>
                          <div className="flex justify-between text-xs mb-1">
                            <span>Retail Banking</span>
                            <span>6 projects</span>
                          </div>
                          <div className="h-6 w-full rounded-full overflow-hidden bg-muted flex">
                            <div className="bg-green-500 h-full" style={{ width: "50%" }}></div>
                            <div className="bg-amber-500 h-full" style={{ width: "33%" }}></div>
                            <div className="bg-red-500 h-full" style={{ width: "17%" }}></div>
                          </div>
                        </div>

                        {/* Core Modernization */}
                        <div>
                          <div className="flex justify-between text-xs mb-1">
                            <span>Core Modernization</span>
                            <span>3 projects</span>
                          </div>
                          <div className="h-6 w-full rounded-full overflow-hidden bg-muted flex">
                            <div className="bg-green-500 h-full" style={{ width: "33%" }}></div>
                            <div className="bg-amber-500 h-full" style={{ width: "33%" }}></div>
                            <div className="bg-red-500 h-full" style={{ width: "34%" }}></div>
                          </div>
                        </div>

                        {/* Data & Analytics */}
                        <div>
                          <div className="flex justify-between text-xs mb-1">
                            <span>Data & Analytics</span>
                            <span>3 projects</span>
                          </div>
                          <div className="h-6 w-full rounded-full overflow-hidden bg-muted flex">
                            <div className="bg-green-500 h-full" style={{ width: "67%" }}></div>
                            <div className="bg-amber-500 h-full" style={{ width: "33%" }}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Delivery Performance</CardTitle>
                <CardDescription>Key metrics for initiative delivery performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <h4 className="mb-4 text-sm font-medium">Key Delivery Performance Trends (Portfolio Aggregate)</h4>
                  <div className="grid grid-cols-3 gap-4 h-[250px]">
                    {/* Average Cycle Time */}
                    <div className="border rounded-md p-3">
                      <h5 className="text-xs font-medium mb-2">Average Cycle Time (Days)</h5>
                      <div className="h-[180px] relative">
                        <div className="absolute inset-0">
                          <div className="h-full flex items-end">
                            <div className="w-1/6 h-[90%] bg-primary/20 relative group">
                              <div className="absolute bottom-0 w-full h-[45px] bg-primary"></div>
                              <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-background border rounded px-2 py-1 text-xs">
                                Jan: 45d
                              </div>
                            </div>
                            <div className="w-1/6 h-[84%] bg-primary/20 relative group">
                              <div className="absolute bottom-0 w-full h-[42px] bg-primary"></div>
                              <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-background border rounded px-2 py-1 text-xs">
                                Feb: 42d
                              </div>
                            </div>
                            <div className="w-1/6 h-[96%] bg-primary/20 relative group">
                              <div className="absolute bottom-0 w-full h-[48px] bg-primary"></div>
                              <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-background border rounded px-2 py-1 text-xs">
                                Mar: 48d
                              </div>
                            </div>
                            <div className="w-1/6 h-[100%] bg-primary/20 relative group">
                              <div className="absolute bottom-0 w-full h-[50px] bg-primary"></div>
                              <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-background border rounded px-2 py-1 text-xs">
                                Apr: 50d
                              </div>
                            </div>
                            <div className="w-1/6 h-[94%] bg-primary/20 relative group">
                              <div className="absolute bottom-0 w-full h-[47px] bg-primary"></div>
                              <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-background border rounded px-2 py-1 text-xs">
                                May: 47d
                              </div>
                            </div>
                            <div className="w-1/6 h-[90%] bg-primary/20 relative group">
                              <div className="absolute bottom-0 w-full h-[45px] bg-primary"></div>
                              <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-background border rounded px-2 py-1 text-xs">
                                Jun: 45d
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-between text-xs text-muted-foreground mt-2">
                        <span>Jan</span>
                        <span>Feb</span>
                        <span>Mar</span>
                        <span>Apr</span>
                        <span>May</span>
                        <span>Jun</span>
                      </div>
                    </div>

                    {/* % Work Items Blocked */}
                    <div className="border rounded-md p-3">
                      <h5 className="text-xs font-medium mb-2">% Work Items Blocked</h5>
                      <div className="h-[180px] relative">
                        <div className="absolute inset-0">
                          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                            <polyline
                              points="0,92 16.6,93 33.3,90 50,88 66.6,91 83.3,92"
                              fill="none"
                              stroke="hsl(var(--primary))"
                              strokeWidth="2"
                            />
                            <circle cx="0" cy="92" r="2" fill="hsl(var(--primary))" />
                            <circle cx="16.6" cy="93" r="2" fill="hsl(var(--primary))" />
                            <circle cx="33.3" cy="90" r="2" fill="hsl(var(--primary))" />
                            <circle cx="50" cy="88" r="2" fill="hsl(var(--primary))" />
                            <circle cx="66.6" cy="91" r="2" fill="hsl(var(--primary))" />
                            <circle cx="83.3" cy="92" r="2" fill="hsl(var(--primary))" />
                          </svg>
                          <div className="absolute top-0 left-0 w-full h-full flex justify-between">
                            <div className="h-full relative group">
                              <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-background border rounded px-2 py-1 text-xs">
                                Jan: 8%
                              </div>
                            </div>
                            <div className="h-full relative group">
                              <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-background border rounded px-2 py-1 text-xs">
                                Feb: 7%
                              </div>
                            </div>
                            <div className="h-full relative group">
                              <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-background border rounded px-2 py-1 text-xs">
                                Mar: 10%
                              </div>
                            </div>
                            <div className="h-full relative group">
                              <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-background border rounded px-2 py-1 text-xs">
                                Apr: 12%
                              </div>
                            </div>
                            <div className="h-full relative group">
                              <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-background border rounded px-2 py-1 text-xs">
                                May: 9%
                              </div>
                            </div>
                            <div className="h-full relative group">
                              <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-background border rounded px-2 py-1 text-xs">
                                Jun: 8%
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-between text-xs text-muted-foreground mt-2">
                        <span>Jan</span>
                        <span>Feb</span>
                        <span>Mar</span>
                        <span>Apr</span>
                        <span>May</span>
                        <span>Jun</span>
                      </div>
                    </div>

                    {/* Delivery Predictability */}
                    <div className="border rounded-md p-3">
                      <h5 className="text-xs font-medium mb-2">Delivery Predictability (% Milestones Met)</h5>
                      <div className="h-[180px] relative">
                        <div className="absolute inset-0">
                          <div className="h-full flex items-end justify-around">
                            <div className="w-1/5 h-[75%] bg-primary/20 relative group">
                              <div className="absolute bottom-0 w-full h-[75%] bg-primary"></div>
                              <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-background border rounded px-2 py-1 text-xs">
                                Q1: 75%
                              </div>
                            </div>
                            <div className="w-1/5 h-[70%] bg-primary/20 relative group">
                              <div className="absolute bottom-0 w-full h-[70%] bg-primary"></div>
                              <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-background border rounded px-2 py-1 text-xs">
                                Q2: 70%
                              </div>
                            </div>
                            <div className="w-1/5 h-[80%] bg-primary/20 relative group">
                              <div className="absolute bottom-0 w-full h-[80%] bg-primary"></div>
                              <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-background border rounded px-2 py-1 text-xs">
                                Q3: 80%
                              </div>
                            </div>
                            <div className="w-1/5 h-[78%] bg-primary/20 relative group">
                              <div className="absolute bottom-0 w-full h-[78%] bg-primary"></div>
                              <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-background border rounded px-2 py-1 text-xs">
                                Q4: 78%
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-around text-xs text-muted-foreground mt-2">
                        <span>Q1</span>
                        <span>Q2</span>
                        <span>Q3</span>
                        <span>Q4</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Strategic Initiative Progress</CardTitle>
              <CardDescription>Progress tracking for key strategic initiatives</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] overflow-auto">
                <h4 className="mb-4 text-sm font-medium">Top Strategic Initiatives: Progress Overview</h4>
                <div className="space-y-6">
                  {/* WealthSync Retirement Portal */}
                  <div>
                    <div className="flex justify-between mb-1">
                      <div className="flex items-center">
                        <span className="font-medium">WealthSync Retirement Portal</span>
                        <span className="ml-2 text-xs px-2 py-0.5 bg-amber-100 text-amber-800 rounded-full">
                          At Risk
                        </span>
                      </div>
                      <span className="text-sm">60%</span>
                    </div>
                    <div className="h-3 w-full rounded-full overflow-hidden bg-muted">
                      <div className="bg-amber-500 h-full" style={{ width: "60%" }}></div>
                    </div>
                    <div className="flex justify-between mt-1 text-xs">
                      <div className="flex items-center">
                        <span className="text-muted-foreground">Next Milestone:</span>
                        <span className="ml-1 font-medium">UAT Start - Jul 15</span>
                      </div>
                      <div className="flex items-center text-red-500">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="mr-1"
                        >
                          <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path>
                          <path d="M12 9v4"></path>
                          <path d="M12 17h.01"></path>
                        </svg>
                        <span>Blocked by Customer Data API</span>
                      </div>
                    </div>
                  </div>

                  {/* Commercial Lending Platform */}
                  <div>
                    <div className="flex justify-between mb-1">
                      <div className="flex items-center">
                        <span className="font-medium">Commercial Lending Platform</span>
                        <span className="ml-2 text-xs px-2 py-0.5 bg-green-100 text-green-800 rounded-full">
                          On Track
                        </span>
                      </div>
                      <span className="text-sm">40%</span>
                    </div>
                    <div className="h-3 w-full rounded-full overflow-hidden bg-muted">
                      <div className="bg-green-500 h-full" style={{ width: "40%" }}></div>
                    </div>
                    <div className="flex justify-between mt-1 text-xs">
                      <div className="flex items-center">
                        <span className="text-muted-foreground">Next Milestone:</span>
                        <span className="ml-1 font-medium">Dev Complete - Aug 01</span>
                      </div>
                      <div className="flex items-center text-muted-foreground">
                        <span>No blockers</span>
                      </div>
                    </div>
                  </div>

                  {/* Core System Modernization */}
                  <div>
                    <div className="flex justify-between mb-1">
                      <div className="flex items-center">
                        <span className="font-medium">Core System Modernization - Phase 1</span>
                        <span className="ml-2 text-xs px-2 py-0.5 bg-red-100 text-red-800 rounded-full">Blocked</span>
                      </div>
                      <span className="text-sm">30%</span>
                    </div>
                    <div className="h-3 w-full rounded-full overflow-hidden bg-muted">
                      <div className="bg-red-500 h-full" style={{ width: "30%" }}></div>
                    </div>
                    <div className="flex justify-between mt-1 text-xs">
                      <div className="flex items-center">
                        <span className="text-muted-foreground">Next Milestone:</span>
                        <span className="ml-1 font-medium text-red-500">
                          Vendor Contract Sign-off - Jul 10 (Overdue)
                        </span>
                      </div>
                      <div className="flex items-center text-red-500">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="mr-1"
                        >
                          <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path>
                          <path d="M12 9v4"></path>
                          <path d="M12 17h.01"></path>
                        </svg>
                        <span>Vendor Negotiation Stalled</span>
                      </div>
                    </div>
                  </div>

                  {/* Retail Mobile Banking App */}
                  <div>
                    <div className="flex justify-between mb-1">
                      <div className="flex items-center">
                        <span className="font-medium">Retail Mobile Banking App</span>
                        <span className="ml-2 text-xs px-2 py-0.5 bg-green-100 text-green-800 rounded-full">
                          On Track
                        </span>
                      </div>
                      <span className="text-sm">85%</span>
                    </div>
                    <div className="h-3 w-full rounded-full overflow-hidden bg-muted">
                      <div className="bg-green-500 h-full" style={{ width: "85%" }}></div>
                    </div>
                    <div className="flex justify-between mt-1 text-xs">
                      <div className="flex items-center">
                        <span className="text-muted-foreground">Next Milestone:</span>
                        <span className="ml-1 font-medium">Final UAT - Jul 05</span>
                      </div>
                      <div className="flex items-center text-muted-foreground">
                        <span>No blockers</span>
                      </div>
                    </div>
                  </div>

                  {/* Insurance Claims Processing */}
                  <div>
                    <div className="flex justify-between mb-1">
                      <div className="flex items-center">
                        <span className="font-medium">Insurance Claims Processing</span>
                        <span className="ml-2 text-xs px-2 py-0.5 bg-amber-100 text-amber-800 rounded-full">
                          At Risk
                        </span>
                      </div>
                      <span className="text-sm">25%</span>
                    </div>
                    <div className="h-3 w-full rounded-full overflow-hidden bg-muted">
                      <div className="bg-amber-500 h-full" style={{ width: "25%" }}></div>
                    </div>
                    <div className="flex justify-between mt-1 text-xs">
                      <div className="flex items-center">
                        <span className="text-muted-foreground">Next Milestone:</span>
                        <span className="ml-1 font-medium">Design Review - Jul 20</span>
                      </div>
                      <div className="flex items-center text-amber-500">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="mr-1"
                        >
                          <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path>
                          <path d="M12 9v4"></path>
                          <path d="M12 17h.01"></path>
                        </svg>
                        <span>Resource Constraints</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="projects">
          <Card>
            <CardHeader>
              <CardTitle>Projects</CardTitle>
              <CardDescription>View and manage all active projects</CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={() => router.push("/projects")} className="mb-4">
                Go to Projects Dashboard
              </Button>
              <div className="h-[400px] flex items-center justify-center border rounded-md">
                <div className="text-center text-muted-foreground">
                  <p>Projects will be displayed here</p>
                  <p className="text-sm">Click the button above to access the full Projects dashboard</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="dependencies">
          <DependencyView />
        </TabsContent>

        <TabsContent value="timeline">
          <ProjectTimeline />
        </TabsContent>
      </Tabs>
    </div>
  )
}
