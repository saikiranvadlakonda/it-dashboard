"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"

export function IntakeProcess() {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-bold">Intake Process Audit</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="demand">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="demand">Demand & Governance</TabsTrigger>
            <TabsTrigger value="prioritization">Prioritization</TabsTrigger>
            <TabsTrigger value="readiness">Readiness</TabsTrigger>
            <TabsTrigger value="cadence">Cadence</TabsTrigger>
          </TabsList>

          <TabsContent value="demand" className="mt-4">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <MetricCard
                title="Intake Volume (Last 30 Days)"
                value="42"
                trend="+12%"
                trendDirection="up"
                description="Intakes across all segments"
              />

              <MetricCard
                title="Form Compliance Rate"
                value="87%"
                trend="+5%"
                trendDirection="up"
                description="Intakes with all required fields"
              />

              <MetricCard
                title="Stakeholder Visibility"
                value="6.2"
                trend="-0.8"
                trendDirection="down"
                description="Avg. followers per intake"
              />

              <MetricCard
                title="Reviewer Participation"
                value="73%"
                trend="+8%"
                trendDirection="up"
                description="Intakes with early comments"
              />
            </div>

            <div className="mt-6 rounded-md border">
              <div className="border-b bg-muted/50 p-3 font-medium">Intake Volume by Week</div>
              <div className="p-4">
                <div className="h-[200px]">
                  <IntakeVolumeChart />
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="prioritization" className="mt-4">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <MetricCard
                title="Scoring Adoption Rate"
                value="92%"
                trend="+7%"
                trendDirection="up"
                description="Intakes with priority score"
              />

              <MetricCard
                title="Priority Breakdown"
                value="P1: 18"
                secondaryValue="P2: 24"
                description="Count by priority level"
              />

              <MetricCard
                title="Decision Owner Breakdown"
                value="PMO: 45%"
                secondaryValue="Exec: 35%"
                description="Who makes decisions"
              />

              <MetricCard
                title="WIP Limit Violations"
                value="3"
                trend="-2"
                trendDirection="up"
                description="Days exceeding limits"
              />
            </div>

            <div className="mt-6 grid gap-6 md:grid-cols-2">
              <div className="rounded-md border">
                <div className="border-b bg-muted/50 p-3 font-medium">Priority Distribution</div>
                <div className="p-4">
                  <div className="space-y-4">
                    <div>
                      <div className="mb-1 flex justify-between text-sm">
                        <span>P1 (Critical)</span>
                        <span>18 (30%)</span>
                      </div>
                      <Progress value={30} className="h-2" />
                    </div>
                    <div>
                      <div className="mb-1 flex justify-between text-sm">
                        <span>P2 (High)</span>
                        <span>24 (40%)</span>
                      </div>
                      <Progress value={40} className="h-2" />
                    </div>
                    <div>
                      <div className="mb-1 flex justify-between text-sm">
                        <span>P3 (Medium)</span>
                        <span>12 (20%)</span>
                      </div>
                      <Progress value={20} className="h-2" />
                    </div>
                    <div>
                      <div className="mb-1 flex justify-between text-sm">
                        <span>P4 (Low)</span>
                        <span>6 (10%)</span>
                      </div>
                      <Progress value={10} className="h-2" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-md border">
                <div className="border-b bg-muted/50 p-3 font-medium">Decision Owner Breakdown</div>
                <div className="p-4">
                  <div className="h-[200px]">
                    <DecisionOwnerChart />
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="readiness" className="mt-4">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <MetricCard
                title="Readiness Checklist Pass Rate"
                value="78%"
                trend="+12%"
                trendDirection="up"
                description="Passing gating fields"
              />

              <MetricCard
                title="Technical Feasibility %"
                value="85%"
                trend="+3%"
                trendDirection="up"
                description="Items with tech review"
              />

              <MetricCard
                title="Duplicate Flagged Items"
                value="7"
                trend="-2"
                trendDirection="up"
                description="Auto-detected duplicates"
              />

              <MetricCard
                title="Estimation Rate"
                value="68%"
                trend="+5%"
                trendDirection="up"
                description="Items with story points"
              />
            </div>

            <div className="mt-6 rounded-md border">
              <div className="border-b bg-muted/50 p-3 font-medium">Readiness Checklist Compliance</div>
              <div className="p-4">
                <div className="space-y-4">
                  <div>
                    <div className="mb-1 flex justify-between text-sm">
                      <span>UX Design Review</span>
                      <span>82%</span>
                    </div>
                    <Progress value={82} className="h-2" />
                  </div>
                  <div>
                    <div className="mb-1 flex justify-between text-sm">
                      <span>Architecture Review</span>
                      <span>90%</span>
                    </div>
                    <Progress value={90} className="h-2" />
                  </div>
                  <div>
                    <div className="mb-1 flex justify-between text-sm">
                      <span>Security Assessment</span>
                      <span>75%</span>
                    </div>
                    <Progress value={75} className="h-2" />
                  </div>
                  <div>
                    <div className="mb-1 flex justify-between text-sm">
                      <span>ROI Calculation</span>
                      <span>68%</span>
                    </div>
                    <Progress value={68} className="h-2" />
                  </div>
                  <div>
                    <div className="mb-1 flex justify-between text-sm">
                      <span>Dependency Mapping</span>
                      <span>62%</span>
                    </div>
                    <Progress value={62} className="h-2" />
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="cadence" className="mt-4">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <MetricCard
                title="Cycle vs. Rolling Intakes"
                value="65%"
                secondaryValue="35%"
                description="Monthly vs. rolling"
              />

              <MetricCard
                title="Tool Usage Share"
                value="ADO: 78%"
                secondaryValue="JIRA: 22%"
                description="Source systems"
              />

              <MetricCard
                title="Pipeline Lead Time"
                value="14.2"
                trend="-2.3"
                trendDirection="up"
                description="Days from intake to dev"
              />

              <MetricCard
                title="Council Review Activity"
                value="8.5"
                trend="+1.2"
                trendDirection="up"
                description="Avg. intakes per session"
              />
            </div>

            <div className="mt-6 grid gap-6 md:grid-cols-2">
              <div className="rounded-md border">
                <div className="border-b bg-muted/50 p-3 font-medium">Intake Type Distribution</div>
                <div className="p-4">
                  <div className="h-[200px]">
                    <IntakeTypeChart />
                  </div>
                </div>
              </div>

              <div className="rounded-md border">
                <div className="border-b bg-muted/50 p-3 font-medium">Pipeline Lead Time Trend</div>
                <div className="p-4">
                  <div className="h-[200px]">
                    <LeadTimeChart />
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

function IntakeVolumeChart() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="relative h-full w-full">
        {/* X-axis */}
        <div className="absolute bottom-0 left-0 right-0 border-t border-border" />

        {/* Bars */}
        <div className="absolute bottom-0 left-0 flex h-full w-full items-end justify-around">
          <div className="flex w-16 flex-col items-center">
            <div className="h-[80px] w-12 rounded-t-md bg-primary/70"></div>
            <span className="mt-2 text-xs text-muted-foreground">Week 1</span>
          </div>
          <div className="flex w-16 flex-col items-center">
            <div className="h-[120px] w-12 rounded-t-md bg-primary/80"></div>
            <span className="mt-2 text-xs text-muted-foreground">Week 2</span>
          </div>
          <div className="flex w-16 flex-col items-center">
            <div className="h-[100px] w-12 rounded-t-md bg-primary/90"></div>
            <span className="mt-2 text-xs text-muted-foreground">Week 3</span>
          </div>
          <div className="flex w-16 flex-col items-center">
            <div className="h-[140px] w-12 rounded-t-md bg-primary"></div>
            <span className="mt-2 text-xs text-muted-foreground">Week 4</span>
          </div>
        </div>

        {/* Y-axis labels */}
        <div className="absolute -left-6 top-0 bottom-0 flex flex-col justify-between text-xs text-muted-foreground">
          <span>15</span>
          <span>10</span>
          <span>5</span>
          <span>0</span>
        </div>
      </div>
    </div>
  )
}

function DecisionOwnerChart() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="relative h-full w-full">
        <div className="flex h-full flex-col items-center justify-center">
          <div className="relative h-40 w-40 rounded-full border">
            <div className="absolute inset-0 origin-center rotate-0 border-t-[40px] border-l-[40px] border-primary rounded-tl-full"></div>
            <div className="absolute inset-0 origin-center rotate-90 border-t-[40px] border-l-[40px] border-blue-400 rounded-tl-full"></div>
            <div className="absolute inset-0 origin-center rotate-180 border-t-[40px] border-l-[40px] border-green-400 rounded-tl-full"></div>
            <div className="absolute inset-0 origin-center rotate-[270deg] border-t-[40px] border-l-[40px] border-amber-400 rounded-tl-full"></div>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
            <div className="flex items-center gap-1">
              <div className="h-2 w-2 rounded-full bg-primary"></div>
              <span>PMO (45%)</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="h-2 w-2 rounded-full bg-blue-400"></div>
              <span>Exec (35%)</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="h-2 w-2 rounded-full bg-green-400"></div>
              <span>Business (15%)</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="h-2 w-2 rounded-full bg-amber-400"></div>
              <span>Other (5%)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function IntakeTypeChart() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="relative h-full w-full">
        {/* X-axis */}
        <div className="absolute bottom-0 left-0 right-0 border-t border-border" />

        {/* Bars */}
        <div className="absolute bottom-0 left-0 flex h-full w-full items-end justify-around">
          <div className="flex w-24 flex-col items-center">
            <div className="flex w-full flex-col">
              <div className="h-[100px] w-full rounded-t-md bg-primary"></div>
              <div className="h-[40px] w-full bg-blue-400"></div>
            </div>
            <span className="mt-2 text-xs text-muted-foreground">Q1</span>
          </div>
          <div className="flex w-24 flex-col items-center">
            <div className="flex w-full flex-col">
              <div className="h-[80px] w-full rounded-t-md bg-primary"></div>
              <div className="h-[60px] w-full bg-blue-400"></div>
            </div>
            <span className="mt-2 text-xs text-muted-foreground">Q2</span>
          </div>
          <div className="flex w-24 flex-col items-center">
            <div className="flex w-full flex-col">
              <div className="h-[70px] w-full rounded-t-md bg-primary"></div>
              <div className="h-[70px] w-full bg-blue-400"></div>
            </div>
            <span className="mt-2 text-xs text-muted-foreground">Q3</span>
          </div>
        </div>

        {/* Legend */}
        <div className="absolute -top-6 right-0 flex items-center gap-4 text-xs">
          <div className="flex items-center gap-1">
            <div className="h-2 w-2 rounded-full bg-primary"></div>
            <span>Monthly</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="h-2 w-2 rounded-full bg-blue-400"></div>
            <span>Rolling</span>
          </div>
        </div>
      </div>
    </div>
  )
}

function LeadTimeChart() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="relative h-full w-full">
        {/* X-axis */}
        <div className="absolute bottom-0 left-0 right-0 border-t border-border" />
        {/* Y-axis */}
        <div className="absolute bottom-0 left-0 top-0 border-r border-border" />

        {/* Line */}
        <div className="absolute bottom-0 left-0 h-full w-full">
          <svg className="h-full w-full">
            <polyline
              points="0,80 50,100 100,70 150,60 200,50 250,40"
              fill="none"
              stroke="hsl(var(--primary))"
              strokeWidth="3"
            />
          </svg>
        </div>

        {/* Labels */}
        <div className="absolute -bottom-6 left-0 right-0 flex justify-between text-xs text-muted-foreground">
          <span>Jan</span>
          <span>Feb</span>
          <span>Mar</span>
          <span>Apr</span>
          <span>May</span>
        </div>
        <div className="absolute -left-6 top-0 bottom-0 flex flex-col justify-between text-xs text-muted-foreground">
          <span>20d</span>
          <span>15d</span>
          <span>10d</span>
          <span>5d</span>
        </div>
      </div>
    </div>
  )
}
