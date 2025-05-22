import { RoiValueImpact } from "@/components/roi-value-impact"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

export default function RoiValuePage() {
  return (
    <div className="container mx-auto space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold">ROI & Value Impact</h1>
        <p className="text-muted-foreground">
          Track return on investment and business value metrics across all projects
        </p>
      </div>

      {/* Main ROI & Value Impact Component */}
      <RoiValueImpact />

      {/* Value Realization Tracking */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xl font-bold">Value Realization Tracking</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="realized">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="realized">Realized Value</TabsTrigger>
                <TabsTrigger value="projected">Projected Value</TabsTrigger>
              </TabsList>

              <TabsContent value="realized" className="mt-4 space-y-4">
                <div className="rounded-md border">
                  <div className="border-b bg-muted/50 p-3 font-medium">Value Realization by Category</div>
                  <div className="p-4">
                    <div className="space-y-4">
                      <div>
                        <div className="mb-1 flex justify-between text-sm">
                          <span>Cost Reduction</span>
                          <span className="font-medium text-green-600">$4.2M</span>
                        </div>
                        <Progress value={42} className="h-2" />
                      </div>
                      <div>
                        <div className="mb-1 flex justify-between text-sm">
                          <span>Revenue Growth</span>
                          <span className="font-medium text-green-600">$3.8M</span>
                        </div>
                        <Progress value={38} className="h-2" />
                      </div>
                      <div>
                        <div className="mb-1 flex justify-between text-sm">
                          <span>Risk Mitigation</span>
                          <span className="font-medium text-green-600">$2.1M</span>
                        </div>
                        <Progress value={21} className="h-2" />
                      </div>
                      <div>
                        <div className="mb-1 flex justify-between text-sm">
                          <span>Productivity Gains</span>
                          <span className="font-medium text-green-600">$1.9M</span>
                        </div>
                        <Progress value={19} className="h-2" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="rounded-md border p-4">
                    <div className="text-sm font-medium">Realized vs. Projected</div>
                    <div className="mt-1 text-2xl font-bold">87%</div>
                    <div className="mt-1 text-xs text-muted-foreground">Percentage of projected value realized</div>
                  </div>
                  <div className="rounded-md border p-4">
                    <div className="text-sm font-medium">Time to Value</div>
                    <div className="mt-1 text-2xl font-bold">4.2 months</div>
                    <div className="mt-1 text-xs text-muted-foreground">
                      Average time from project completion to value realization
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="projected" className="mt-4 space-y-4">
                <div className="rounded-md border">
                  <div className="border-b bg-muted/50 p-3 font-medium">Projected Value by Timeline</div>
                  <div className="p-4">
                    <div className="space-y-4">
                      <div>
                        <div className="mb-1 flex justify-between text-sm">
                          <span>Short-term (0-6 months)</span>
                          <span className="font-medium">$5.3M</span>
                        </div>
                        <Progress value={28} className="h-2" />
                      </div>
                      <div>
                        <div className="mb-1 flex justify-between text-sm">
                          <span>Mid-term (6-12 months)</span>
                          <span className="font-medium">$7.8M</span>
                        </div>
                        <Progress value={41} className="h-2" />
                      </div>
                      <div>
                        <div className="mb-1 flex justify-between text-sm">
                          <span>Long-term (12+ months)</span>
                          <span className="font-medium">$5.9M</span>
                        </div>
                        <Progress value={31} className="h-2" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="rounded-md border p-4">
                    <div className="text-sm font-medium">Confidence Level</div>
                    <div className="mt-1 text-2xl font-bold">76%</div>
                    <div className="mt-1 text-xs text-muted-foreground">
                      Average confidence in projected value estimates
                    </div>
                  </div>
                  <div className="rounded-md border p-4">
                    <div className="text-sm font-medium">Risk-Adjusted Value</div>
                    <div className="mt-1 text-2xl font-bold">$14.5M</div>
                    <div className="mt-1 text-xs text-muted-foreground">
                      Total projected value adjusted for risk factors
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xl font-bold">Business Capability Impact</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-md border">
              <div className="border-b bg-muted/50 p-3 font-medium">Capability Enhancement</div>
              <div className="p-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Digital Customer Experience</div>
                      <div className="text-sm text-muted-foreground">8 projects contributing</div>
                    </div>
                    <Badge className="bg-green-600">High Impact</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Data Analytics & Insights</div>
                      <div className="text-sm text-muted-foreground">6 projects contributing</div>
                    </div>
                    <Badge className="bg-green-600">High Impact</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Process Automation</div>
                      <div className="text-sm text-muted-foreground">5 projects contributing</div>
                    </div>
                    <Badge className="bg-amber-600">Medium Impact</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Security & Compliance</div>
                      <div className="text-sm text-muted-foreground">4 projects contributing</div>
                    </div>
                    <Badge className="bg-amber-600">Medium Impact</Badge>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-md border p-4">
              <div className="text-sm font-medium">Capability Coverage</div>
              <div className="mt-4 grid grid-cols-3 gap-2">
                <div className="flex flex-col items-center rounded-md border p-2">
                  <span className="text-xl font-bold">82%</span>
                  <span className="text-xs text-muted-foreground">Strategic</span>
                </div>
                <div className="flex flex-col items-center rounded-md border p-2">
                  <span className="text-xl font-bold">68%</span>
                  <span className="text-xs text-muted-foreground">Operational</span>
                </div>
                <div className="flex flex-col items-center rounded-md border p-2">
                  <span className="text-xl font-bold">74%</span>
                  <span className="text-xs text-muted-foreground">Technical</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Non-Financial Value Metrics */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-xl font-bold">Non-Financial Value Metrics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-md border p-4">
              <div className="text-sm font-medium">Customer Experience</div>
              <div className="mt-1 flex items-end justify-between">
                <div className="text-2xl font-bold">+12%</div>
                <div className="flex items-center text-sm text-green-500">↑ 4%</div>
              </div>
              <div className="mt-1 text-xs text-muted-foreground">Improvement in NPS score YoY</div>
            </div>

            <div className="rounded-md border p-4">
              <div className="text-sm font-medium">Employee Productivity</div>
              <div className="mt-1 flex items-end justify-between">
                <div className="text-2xl font-bold">+18%</div>
                <div className="flex items-center text-sm text-green-500">↑ 5%</div>
              </div>
              <div className="mt-1 text-xs text-muted-foreground">Increase in output per employee</div>
            </div>

            <div className="rounded-md border p-4">
              <div className="text-sm font-medium">Time to Market</div>
              <div className="mt-1 flex items-end justify-between">
                <div className="text-2xl font-bold">-24%</div>
                <div className="flex items-center text-sm text-green-500">↓ 8%</div>
              </div>
              <div className="mt-1 text-xs text-muted-foreground">Reduction in product launch cycles</div>
            </div>
          </div>

          <div className="mt-6 rounded-md border">
            <div className="border-b bg-muted/50 p-3 font-medium">Qualitative Value Assessment</div>
            <div className="p-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-4">
                  <div>
                    <div className="mb-1 flex justify-between text-sm">
                      <span>Brand Perception</span>
                      <span className="font-medium">Strong Positive</span>
                    </div>
                    <Progress value={85} className="h-2" />
                  </div>
                  <div>
                    <div className="mb-1 flex justify-between text-sm">
                      <span>Market Positioning</span>
                      <span className="font-medium">Positive</span>
                    </div>
                    <Progress value={72} className="h-2" />
                  </div>
                  <div>
                    <div className="mb-1 flex justify-between text-sm">
                      <span>Competitive Advantage</span>
                      <span className="font-medium">Moderate</span>
                    </div>
                    <Progress value={65} className="h-2" />
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <div className="mb-1 flex justify-between text-sm">
                      <span>Employee Satisfaction</span>
                      <span className="font-medium">Strong Positive</span>
                    </div>
                    <Progress value={82} className="h-2" />
                  </div>
                  <div>
                    <div className="mb-1 flex justify-between text-sm">
                      <span>Operational Resilience</span>
                      <span className="font-medium">Positive</span>
                    </div>
                    <Progress value={78} className="h-2" />
                  </div>
                  <div>
                    <div className="mb-1 flex justify-between text-sm">
                      <span>Innovation Capacity</span>
                      <span className="font-medium">Moderate</span>
                    </div>
                    <Progress value={68} className="h-2" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Value Governance */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-xl font-bold">Value Governance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-md border">
              <div className="border-b bg-muted/50 p-3 font-medium">Value Realization Status</div>
              <div className="p-4">
                <div className="space-y-4">
                  <div>
                    <div className="mb-1 flex justify-between text-sm">
                      <span>Identified</span>
                      <span>32 projects</span>
                    </div>
                    <Progress value={100} className="h-2" />
                  </div>
                  <div>
                    <div className="mb-1 flex justify-between text-sm">
                      <span>Planned</span>
                      <span>28 projects</span>
                    </div>
                    <Progress value={87} className="h-2" />
                  </div>
                  <div>
                    <div className="mb-1 flex justify-between text-sm">
                      <span>Measured</span>
                      <span>24 projects</span>
                    </div>
                    <Progress value={75} className="h-2" />
                  </div>
                  <div>
                    <div className="mb-1 flex justify-between text-sm">
                      <span>Realized</span>
                      <span>19 projects</span>
                    </div>
                    <Progress value={59} className="h-2" />
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-md border">
              <div className="border-b bg-muted/50 p-3 font-medium">Value Tracking Compliance</div>
              <div className="p-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Business Case Defined</div>
                      <div className="text-sm text-muted-foreground">Projects with formal business case</div>
                    </div>
                    <Badge>94%</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">KPIs Established</div>
                      <div className="text-sm text-muted-foreground">Projects with defined success metrics</div>
                    </div>
                    <Badge>88%</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Baseline Metrics</div>
                      <div className="text-sm text-muted-foreground">Projects with pre-implementation metrics</div>
                    </div>
                    <Badge>76%</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Post-Implementation Review</div>
                      <div className="text-sm text-muted-foreground">Completed projects with value review</div>
                    </div>
                    <Badge>72%</Badge>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
