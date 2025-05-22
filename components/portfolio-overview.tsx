"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

export function PortfolioOverview() {
  return (
    <div className="space-y-8">
      {/* Initiative & Project Status */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xl font-bold">Initiative Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center py-4">
              <InitiativeStatusDonut />
            </div>
            <div className="mt-4 grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-lg font-bold text-green-600">36</div>
                <div className="text-sm text-muted-foreground">On Track</div>
              </div>
              <div>
                <div className="text-lg font-bold text-amber-600">10</div>
                <div className="text-sm text-muted-foreground">At Risk</div>
              </div>
              <div>
                <div className="text-lg font-bold text-red-600">4</div>
                <div className="text-sm text-muted-foreground">Delayed</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xl font-bold">Project Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center py-4">
              <ProjectStatusDonut />
            </div>
            <div className="mt-4 grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-lg font-bold text-green-600">180</div>
                <div className="text-sm text-muted-foreground">On Track</div>
              </div>
              <div>
                <div className="text-lg font-bold text-amber-600">48</div>
                <div className="text-sm text-muted-foreground">At Risk</div>
              </div>
              <div>
                <div className="text-lg font-bold text-red-600">20</div>
                <div className="text-sm text-muted-foreground">Blocked</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Strategic Objective Alignment */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-xl font-bold">Strategic Objective Alignment</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <div className="mb-2 flex items-center justify-between">
                <div className="font-medium">Improve Customer Experience</div>
                <div className="text-sm">15 Initiatives</div>
              </div>
              <div className="h-4 w-full overflow-hidden rounded-full bg-muted">
                <div className="flex h-full">
                  <div className="h-full bg-green-500" style={{ width: "67%" }}></div>
                  <div className="h-full bg-amber-500" style={{ width: "20%" }}></div>
                  <div className="h-full bg-red-500" style={{ width: "13%" }}></div>
                </div>
              </div>
              <div className="mt-1 flex justify-between text-xs text-muted-foreground">
                <span>10 On Track</span>
                <span>3 At Risk</span>
                <span>2 Delayed</span>
              </div>
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between">
                <div className="font-medium">Increase Operational Efficiency</div>
                <div className="text-sm">12 Initiatives</div>
              </div>
              <div className="h-4 w-full overflow-hidden rounded-full bg-muted">
                <div className="flex h-full">
                  <div className="h-full bg-green-500" style={{ width: "75%" }}></div>
                  <div className="h-full bg-amber-500" style={{ width: "17%" }}></div>
                  <div className="h-full bg-red-500" style={{ width: "8%" }}></div>
                </div>
              </div>
              <div className="mt-1 flex justify-between text-xs text-muted-foreground">
                <span>9 On Track</span>
                <span>2 At Risk</span>
                <span>1 Delayed</span>
              </div>
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between">
                <div className="font-medium">Enhance Security & Compliance</div>
                <div className="text-sm">8 Initiatives</div>
              </div>
              <div className="h-4 w-full overflow-hidden rounded-full bg-muted">
                <div className="flex h-full">
                  <div className="h-full bg-green-500" style={{ width: "100%" }}></div>
                </div>
              </div>
              <div className="mt-1 flex justify-between text-xs text-muted-foreground">
                <span>8 On Track</span>
                <span></span>
                <span></span>
              </div>
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between">
                <div className="font-medium">Digital Transformation</div>
                <div className="text-sm">10 Initiatives</div>
              </div>
              <div className="h-4 w-full overflow-hidden rounded-full bg-muted">
                <div className="flex h-full">
                  <div className="h-full bg-green-500" style={{ width: "70%" }}></div>
                  <div className="h-full bg-amber-500" style={{ width: "20%" }}></div>
                  <div className="h-full bg-red-500" style={{ width: "10%" }}></div>
                </div>
              </div>
              <div className="mt-1 flex justify-between text-xs text-muted-foreground">
                <span>7 On Track</span>
                <span>2 At Risk</span>
                <span>1 Delayed</span>
              </div>
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between">
                <div className="font-medium">Data & Analytics Modernization</div>
                <div className="text-sm">5 Initiatives</div>
              </div>
              <div className="h-4 w-full overflow-hidden rounded-full bg-muted">
                <div className="flex h-full">
                  <div className="h-full bg-green-500" style={{ width: "60%" }}></div>
                  <div className="h-full bg-amber-500" style={{ width: "40%" }}></div>
                </div>
              </div>
              <div className="mt-1 flex justify-between text-xs text-muted-foreground">
                <span>3 On Track</span>
                <span>2 At Risk</span>
                <span></span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Critical Focus Areas */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-xl font-bold">Critical Focus Areas</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="systems">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="systems">Key Systems Hotspot</TabsTrigger>
              <TabsTrigger value="risks">Top Portfolio Risks</TabsTrigger>
            </TabsList>
            <TabsContent value="systems" className="mt-4">
              <div className="h-[300px] w-full">
                <KeySystemsHotspot />
              </div>
            </TabsContent>
            <TabsContent value="risks" className="mt-4">
              <div className="rounded-md border">
                <div className="border-b bg-muted/50 p-3 font-medium">Top Critical Risks</div>
                <div className="divide-y">
                  <div className="p-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">Key Vendor Dependency for 'Project X'</div>
                        <div className="text-sm text-muted-foreground">High Risk of Delay</div>
                      </div>
                      <Badge variant="destructive">Critical</Badge>
                    </div>
                    <div className="mt-2 text-sm">
                      <span className="font-medium">Status:</span> Mitigation Plan Active
                    </div>
                  </div>
                  <div className="p-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">Resource Shortage for 'Initiative Y'</div>
                        <div className="text-sm text-muted-foreground">Impacting multiple workstreams</div>
                      </div>
                      <Badge variant="outline" className="border-amber-500 text-amber-500">
                        High
                      </Badge>
                    </div>
                    <div className="mt-2 text-sm">
                      <span className="font-medium">Status:</span> Escalated
                    </div>
                  </div>
                  <div className="p-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">Data Migration Complexity</div>
                        <div className="text-sm text-muted-foreground">Affecting 'Data Warehouse' initiative</div>
                      </div>
                      <Badge variant="outline" className="border-amber-500 text-amber-500">
                        High
                      </Badge>
                    </div>
                    <div className="mt-2 text-sm">
                      <span className="font-medium">Status:</span> Mitigation In Progress
                    </div>
                  </div>
                  <div className="p-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">Regulatory Compliance Timeline</div>
                        <div className="text-sm text-muted-foreground">New requirements identified</div>
                      </div>
                      <Badge variant="destructive">Critical</Badge>
                    </div>
                    <div className="mt-2 text-sm">
                      <span className="font-medium">Status:</span> Under Review
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

function InitiativeStatusDonut() {
  return (
    <div className="relative h-40 w-40">
      <svg viewBox="0 0 100 100" className="h-full w-full">
        {/* On Track - Green */}
        <circle
          cx="50"
          cy="50"
          r="40"
          fill="transparent"
          stroke="#22c55e"
          strokeWidth="20"
          strokeDasharray="251.2"
          strokeDashoffset="75.36"
          transform="rotate(-90 50 50)"
        />
        {/* At Risk - Amber */}
        <circle
          cx="50"
          cy="50"
          r="40"
          fill="transparent"
          stroke="#f59e0b"
          strokeWidth="20"
          strokeDasharray="251.2"
          strokeDashoffset="226.08"
          transform="rotate(-90 50 50)"
          strokeDashoffset="175.84"
        />
        {/* Delayed - Red */}
        <circle
          cx="50"
          cy="50"
          r="40"
          fill="transparent"
          stroke="#ef4444"
          strokeWidth="20"
          strokeDasharray="251.2"
          strokeDashoffset="226.08"
          transform="rotate(-90 50 50)"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-bold">50</span>
        <span className="text-xs text-muted-foreground">Initiatives</span>
      </div>
    </div>
  )
}

function ProjectStatusDonut() {
  return (
    <div className="relative h-40 w-40">
      <svg viewBox="0 0 100 100" className="h-full w-full">
        {/* On Track - Green */}
        <circle
          cx="50"
          cy="50"
          r="40"
          fill="transparent"
          stroke="#22c55e"
          strokeWidth="20"
          strokeDasharray="251.2"
          strokeDashoffset="75.36"
          transform="rotate(-90 50 50)"
        />
        {/* At Risk - Amber */}
        <circle
          cx="50"
          cy="50"
          r="40"
          fill="transparent"
          stroke="#f59e0b"
          strokeWidth="20"
          strokeDasharray="251.2"
          strokeDashoffset="226.08"
          transform="rotate(-90 50 50)"
          strokeDashoffset="175.84"
        />
        {/* Blocked - Red */}
        <circle
          cx="50"
          cy="50"
          r="40"
          fill="transparent"
          stroke="#ef4444"
          strokeWidth="20"
          strokeDasharray="251.2"
          strokeDashoffset="226.08"
          transform="rotate(-90 50 50)"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-bold">248</span>
        <span className="text-xs text-muted-foreground">Projects</span>
      </div>
    </div>
  )
}

function KeySystemsHotspot() {
  return (
    <div className="relative h-full w-full">
      {/* Core Banking Platform - Large, Amber */}
      <div
        className="absolute rounded-full bg-amber-500/20 border border-amber-500 flex items-center justify-center"
        style={{ width: "120px", height: "120px", left: "30%", top: "30%" }}
      >
        <div className="text-center">
          <div className="text-sm font-medium">Core Banking</div>
          <div className="text-xs text-muted-foreground">10 initiatives</div>
        </div>
      </div>

      {/* CRM System - Medium, Green */}
      <div
        className="absolute rounded-full bg-green-500/20 border border-green-500 flex items-center justify-center"
        style={{ width: "100px", height: "100px", left: "60%", top: "20%" }}
      >
        <div className="text-center">
          <div className="text-sm font-medium">CRM System</div>
          <div className="text-xs text-muted-foreground">7 initiatives</div>
        </div>
      </div>

      {/* Data Warehouse - Medium, Red */}
      <div
        className="absolute rounded-full bg-red-500/20 border border-red-500 flex items-center justify-center"
        style={{ width: "90px", height: "90px", left: "15%", top: "60%" }}
      >
        <div className="text-center">
          <div className="text-sm font-medium">Data Warehouse</div>
          <div className="text-xs text-muted-foreground">5 initiatives</div>
        </div>
      </div>

      {/* Mobile Banking - Small, Green */}
      <div
        className="absolute rounded-full bg-green-500/20 border border-green-500 flex items-center justify-center"
        style={{ width: "80px", height: "80px", left: "70%", top: "60%" }}
      >
        <div className="text-center">
          <div className="text-sm font-medium">Mobile Banking</div>
          <div className="text-xs text-muted-foreground">4 initiatives</div>
        </div>
      </div>

      {/* Payment Gateway - Small, Amber */}
      <div
        className="absolute rounded-full bg-amber-500/20 border border-amber-500 flex items-center justify-center"
        style={{ width: "70px", height: "70px", left: "45%", top: "70%" }}
      >
        <div className="text-center">
          <div className="text-sm font-medium">Payments</div>
          <div className="text-xs text-muted-foreground">3 initiatives</div>
        </div>
      </div>
    </div>
  )
}
