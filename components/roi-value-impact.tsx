"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"

export function RoiValueImpact() {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-bold">ROI & Value Impact</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="strategic">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="strategic">Strategic Value</TabsTrigger>
            <TabsTrigger value="financial">Financial ROI</TabsTrigger>
          </TabsList>

          <TabsContent value="strategic" className="mt-4">
            <div className="grid gap-6 md:grid-cols-3">
              <MetricCard
                title="OKR Linkage Rate"
                value="84%"
                trend="+12%"
                trendDirection="up"
                description="Projects with strategic objective"
              />

              <MetricCard
                title="CX-Tagged Initiatives"
                value="18"
                trend="+5"
                trendDirection="up"
                description="Customer experience projects"
              />

              <MetricCard
                title="Baseline KPI Available"
                value="76%"
                trend="+8%"
                trendDirection="up"
                description="Projects with 'before' metrics"
              />
            </div>

            <div className="mt-6 grid gap-6 md:grid-cols-2">
              <div className="rounded-md border">
                <div className="border-b bg-muted/50 p-3 font-medium">Strategic Objective Alignment</div>
                <div className="p-4">
                  <div className="space-y-4">
                    <div>
                      <div className="mb-1 flex justify-between text-sm">
                        <span>Improve Customer Experience</span>
                        <span>12 projects</span>
                      </div>
                      <Progress value={40} className="h-2" />
                    </div>
                    <div>
                      <div className="mb-1 flex justify-between text-sm">
                        <span>Increase Operational Efficiency</span>
                        <span>9 projects</span>
                      </div>
                      <Progress value={30} className="h-2" />
                    </div>
                    <div>
                      <div className="mb-1 flex justify-between text-sm">
                        <span>Enhance Security & Compliance</span>
                        <span>5 projects</span>
                      </div>
                      <Progress value={17} className="h-2" />
                    </div>
                    <div>
                      <div className="mb-1 flex justify-between text-sm">
                        <span>Enable New Business Capabilities</span>
                        <span>4 projects</span>
                      </div>
                      <Progress value={13} className="h-2" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-md border">
                <div className="border-b bg-muted/50 p-3 font-medium">Top Projects by Strategic Value</div>
                <div className="p-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">WealthSync Retirement Portal</div>
                        <div className="text-sm text-muted-foreground">Wealth Segment</div>
                      </div>
                      <Badge variant="default">High Value</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">Commercial Lending Platform</div>
                        <div className="text-sm text-muted-foreground">Commercial Segment</div>
                      </div>
                      <Badge variant="default">High Value</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">Retail Mobile Banking App</div>
                        <div className="text-sm text-muted-foreground">Retail Segment</div>
                      </div>
                      <Badge variant="default">High Value</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="financial" className="mt-4">
            <div className="grid gap-6 md:grid-cols-3">
              <MetricCard
                title="ROI Coverage Rate"
                value="92%"
                trend="+7%"
                trendDirection="up"
                description="Projects with ROI fields populated"
              />

              <MetricCard
                title="Recurring Value Items"
                value="78%"
                trend="+5%"
                trendDirection="up"
                description="Marked as recurring vs. one-time"
              />

              <MetricCard
                title="Total Projected ROI"
                value="$14.3M"
                trend="+$2.1M"
                trendDirection="up"
                description="Year 1 across all projects"
              />
            </div>

            <div className="mt-6 rounded-md border">
              <div className="border-b bg-muted/50 p-3 font-medium">Projected vs. Actual ROI</div>
              <div className="p-4">
                <div className="h-[200px]">
                  <RoiChart />
                </div>
              </div>
            </div>

            <div className="mt-6 grid gap-6 md:grid-cols-2">
              <div className="rounded-md border">
                <div className="border-b bg-muted/50 p-3 font-medium">Top Projects by ROI</div>
                <div className="p-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="font-medium">Insurance Claims Processing</div>
                      <div className="font-medium text-green-600">$3.2M</div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="font-medium">Commercial Lending Platform</div>
                      <div className="font-medium text-green-600">$2.5M</div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="font-medium">Payment Gateway Integration</div>
                      <div className="font-medium text-green-600">$2.1M</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-md border">
                <div className="border-b bg-muted/50 p-3 font-medium">ROI by Segment</div>
                <div className="p-4">
                  <div className="space-y-3">
                    <div>
                      <div className="mb-1 flex justify-between text-sm">
                        <span>Wealth</span>
                        <span className="font-medium text-green-600">$2.3M</span>
                      </div>
                      <Progress value={16} className="h-2" />
                    </div>
                    <div>
                      <div className="mb-1 flex justify-between text-sm">
                        <span>Commercial</span>
                        <span className="font-medium text-green-600">$1.8M</span>
                      </div>
                      <Progress value={13} className="h-2" />
                    </div>
                    <div>
                      <div className="mb-1 flex justify-between text-sm">
                        <span>Retail</span>
                        <span className="font-medium text-green-600">$3.1M</span>
                      </div>
                      <Progress value={22} className="h-2" />
                    </div>
                    <div>
                      <div className="mb-1 flex justify-between text-sm">
                        <span>Insurance</span>
                        <span className="font-medium text-green-600">$2.5M</span>
                      </div>
                      <Progress value={17} className="h-2" />
                    </div>
                    <div>
                      <div className="mb-1 flex justify-between text-sm">
                        <span>Lending</span>
                        <span className="font-medium text-green-600">$1.7M</span>
                      </div>
                      <Progress value={12} className="h-2" />
                    </div>
                    <div>
                      <div className="mb-1 flex justify-between text-sm">
                        <span>Payments</span>
                        <span className="font-medium text-green-600">$2.9M</span>
                      </div>
                      <Progress value={20} className="h-2" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

function MetricCard({ title, value, secondaryValue, trend, trendDirection, description }) {
  return (
    <div className="rounded-md border p-4">
      <div className="text-sm font-medium">{title}</div>
      <div className="mt-1 flex items-end justify-between">
        <div className="text-2xl font-bold">{value}</div>
        {trend && (
          <div className={`flex items-center text-sm ${trendDirection === "up" ? "text-green-500" : "text-red-500"}`}>
            {trend}
          </div>
        )}
      </div>
      {secondaryValue && <div className="mt-1 text-sm font-medium">{secondaryValue}</div>}
      <div className="mt-1 text-xs text-muted-foreground">{description}</div>
    </div>
  )
}

function RoiChart() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="relative h-full w-full">
        {/* X-axis */}
        <div className="absolute bottom-0 left-0 right-0 border-t border-border" />
        {/* Y-axis */}
        <div className="absolute bottom-0 left-0 top-0 border-r border-border" />

        {/* Projected line */}
        <div className="absolute bottom-0 left-0 h-full w-full">
          <svg className="h-full w-full">
            <polyline
              points="0,40 50,60 100,80 150,100 200,120"
              fill="none"
              stroke="hsl(var(--primary))"
              strokeWidth="3"
              strokeDasharray="5,5"
            />
          </svg>
        </div>

        {/* Actual line */}
        <div className="absolute bottom-0 left-0 h-full w-full">
          <svg className="h-full w-full">
            <polyline points="0,50 50,80 100,90 150,110" fill="none" stroke="#10b981" strokeWidth="3" />
          </svg>
        </div>

        {/* Labels */}
        <div className="absolute -bottom-6 left-0 right-0 flex justify-between text-xs text-muted-foreground">
          <span>Q1</span>
          <span>Q2</span>
          <span>Q3</span>
          <span>Q4</span>
        </div>
        <div className="absolute -left-10 top-0 bottom-0 flex flex-col justify-between text-xs text-muted-foreground">
          <span>$15M</span>
          <span>$10M</span>
          <span>$5M</span>
          <span>$0</span>
        </div>

        {/* Legend */}
        <div className="absolute -top-6 right-0 flex items-center gap-4 text-xs">
          <div className="flex items-center gap-1">
            <div className="h-2 w-2 rounded-full bg-primary"></div>
            <span>Projected</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="h-2 w-2 rounded-full bg-green-500"></div>
            <span>Actual</span>
          </div>
        </div>
      </div>
    </div>
  )
}
