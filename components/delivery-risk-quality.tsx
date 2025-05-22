"use client"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Calendar } from "lucide-react"

export function DeliveryRiskQuality() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Delivery, Risk & Quality Oversight</CardTitle>
          <CardDescription>
            Note: This view shows estimated data. For actual delivery metrics, please refer to ADO reports.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="timeline">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="timeline">Initiative Timeline</TabsTrigger>
              <TabsTrigger value="workstreams">Workstream Status</TabsTrigger>
              <TabsTrigger value="milestones">Key Milestones</TabsTrigger>
            </TabsList>

            {/* Tab 1: Initiative Timeline */}
            <TabsContent value="timeline" className="pt-6">
              <div className="space-y-6">
                <div className="p-4 bg-muted/20 rounded-lg">
                  <h3 className="text-lg font-medium mb-4">Initiative Timeline (Estimated)</h3>
                  <div className="space-y-6">
                    <TimelineItem
                      name="Lending Platform Upgrade"
                      category="Modernize Core"
                      startDate="Jan 2025"
                      endDate="Dec 2025"
                      progress={25}
                    />
                    <TimelineItem
                      name="Data Lake Implementation"
                      category="Modernize Core"
                      startDate="Mar 2025"
                      endDate="Sep 2025"
                      progress={15}
                    />
                    <TimelineItem
                      name="Regulatory Compliance Framework"
                      category="Compliance"
                      startDate="Feb 2025"
                      endDate="Jul 2025"
                      progress={40}
                    />
                    <TimelineItem
                      name="Digital Customer Experience"
                      category="Growth"
                      startDate="Apr 2025"
                      endDate="Dec 2025"
                      progress={10}
                    />
                    <TimelineItem
                      name="LifePro Version 20 Upgrade"
                      category="Modernize Core"
                      startDate="May 2025"
                      endDate="Oct 2025"
                      progress={5}
                    />
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Tab 2: Workstream Status */}
            <TabsContent value="workstreams" className="pt-6">
              <div className="space-y-6">
                <div className="p-4 bg-muted/20 rounded-lg">
                  <h3 className="text-lg font-medium mb-4">Workstream Status</h3>
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Workstream</TableHead>
                          <TableHead>Initiatives</TableHead>
                          <TableHead className="text-right">Budget Allocation</TableHead>
                          <TableHead className="text-right">Est. Completion</TableHead>
                          <TableHead>Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell className="font-medium">Application Development</TableCell>
                          <TableCell>22</TableCell>
                          <TableCell className="text-right">$25M</TableCell>
                          <TableCell className="text-right">Q4 2025</TableCell>
                          <TableCell>
                            <Badge className="bg-green-100 text-green-800">On Track</Badge>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Data & Analytics</TableCell>
                          <TableCell>15</TableCell>
                          <TableCell className="text-right">$15M</TableCell>
                          <TableCell className="text-right">Q3 2025</TableCell>
                          <TableCell>
                            <Badge className="bg-amber-100 text-amber-800">At Risk</Badge>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Infrastructure & Operations</TableCell>
                          <TableCell>8</TableCell>
                          <TableCell className="text-right">$6M</TableCell>
                          <TableCell className="text-right">Q2 2025</TableCell>
                          <TableCell>
                            <Badge className="bg-green-100 text-green-800">On Track</Badge>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Enterprise Architecture</TableCell>
                          <TableCell>3</TableCell>
                          <TableCell className="text-right">$2M</TableCell>
                          <TableCell className="text-right">Q2 2025</TableCell>
                          <TableCell>
                            <Badge className="bg-green-100 text-green-800">On Track</Badge>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Project Management</TableCell>
                          <TableCell>2</TableCell>
                          <TableCell className="text-right">$2M</TableCell>
                          <TableCell className="text-right">Q4 2025</TableCell>
                          <TableCell>
                            <Badge className="bg-green-100 text-green-800">On Track</Badge>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                </div>

                <div className="p-4 bg-muted/20 rounded-lg">
                  <h3 className="text-lg font-medium mb-4">Workstream Resource Allocation</h3>
                  <div className="h-[300px] relative">
                    {/* Stacked Bar Chart */}
                    <div className="absolute inset-0 flex items-end justify-around px-10 pt-10">
                      {/* App Dev */}
                      <div className="flex flex-col items-center">
                        <div className="flex flex-col w-20">
                          <div className="h-[100px] bg-blue-600 w-full"></div>
                          <div className="h-[80px] bg-green-500 w-full"></div>
                          <div className="h-[40px] bg-amber-500 w-full"></div>
                        </div>
                        <div className="mt-2 text-xs font-medium">App Dev</div>
                        <div className="text-sm font-bold">55 FTEs</div>
                      </div>

                      {/* Data & Analytics */}
                      <div className="flex flex-col items-center">
                        <div className="flex flex-col w-20">
                          <div className="h-[80px] bg-blue-600 w-full"></div>
                          <div className="h-[60px] bg-green-500 w-full"></div>
                          <div className="h-[20px] bg-amber-500 w-full"></div>
                        </div>
                        <div className="mt-2 text-xs font-medium">Data</div>
                        <div className="text-sm font-bold">40 FTEs</div>
                      </div>

                      {/* Infrastructure */}
                      <div className="flex flex-col items-center">
                        <div className="flex flex-col w-20">
                          <div className="h-[40px] bg-blue-600 w-full"></div>
                          <div className="h-[30px] bg-green-500 w-full"></div>
                          <div className="h-[10px] bg-amber-500 w-full"></div>
                        </div>
                        <div className="mt-2 text-xs font-medium">Infra</div>
                        <div className="text-sm font-bold">20 FTEs</div>
                      </div>

                      {/* Other */}
                      <div className="flex flex-col items-center">
                        <div className="flex flex-col w-20">
                          <div className="h-[30px] bg-blue-600 w-full"></div>
                          <div className="h-[20px] bg-green-500 w-full"></div>
                          <div className="h-[10px] bg-amber-500 w-full"></div>
                        </div>
                        <div className="mt-2 text-xs font-medium">Other</div>
                        <div className="text-sm font-bold">15 FTEs</div>
                      </div>
                    </div>

                    {/* Legend */}
                    <div className="absolute top-2 right-2 bg-white/80 p-2 rounded-md border text-xs">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-blue-600"></div>
                        <span>Internal</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-green-500"></div>
                        <span>Vendor</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-amber-500"></div>
                        <span>Contractor</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Tab 3: Key Milestones */}
            <TabsContent value="milestones" className="pt-6">
              <div className="space-y-6">
                <div className="p-4 bg-muted/20 rounded-lg">
                  <h3 className="text-lg font-medium mb-4">Key Milestones (Estimated)</h3>
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Milestone</TableHead>
                          <TableHead>Initiative</TableHead>
                          <TableHead>Category</TableHead>
                          <TableHead className="text-right">Target Date</TableHead>
                          <TableHead>Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell className="font-medium">Requirements Complete</TableCell>
                          <TableCell>Lending Platform Upgrade</TableCell>
                          <TableCell>Modernize Core</TableCell>
                          <TableCell className="text-right">Mar 15, 2025</TableCell>
                          <TableCell>
                            <Badge className="bg-green-100 text-green-800">On Track</Badge>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Phase 1 Go-Live</TableCell>
                          <TableCell>Regulatory Compliance Framework</TableCell>
                          <TableCell>Compliance</TableCell>
                          <TableCell className="text-right">Apr 30, 2025</TableCell>
                          <TableCell>
                            <Badge className="bg-amber-100 text-amber-800">At Risk</Badge>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Data Migration Complete</TableCell>
                          <TableCell>Data Lake Implementation</TableCell>
                          <TableCell>Modernize Core</TableCell>
                          <TableCell className="text-right">Jun 15, 2025</TableCell>
                          <TableCell>
                            <Badge className="bg-green-100 text-green-800">On Track</Badge>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">UAT Complete</TableCell>
                          <TableCell>LifePro Version 20 Upgrade</TableCell>
                          <TableCell>Modernize Core</TableCell>
                          <TableCell className="text-right">Aug 30, 2025</TableCell>
                          <TableCell>
                            <Badge className="bg-green-100 text-green-800">On Track</Badge>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Mobile App Launch</TableCell>
                          <TableCell>Digital Customer Experience</TableCell>
                          <TableCell>Growth</TableCell>
                          <TableCell className="text-right">Oct 15, 2025</TableCell>
                          <TableCell>
                            <Badge className="bg-green-100 text-green-800">On Track</Badge>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                </div>

                <div className="p-4 bg-muted/20 rounded-lg">
                  <h3 className="text-lg font-medium mb-4">Milestone Calendar (Q2-Q3 2025)</h3>
                  <div className="grid grid-cols-3 gap-4">
                    <MilestoneCard
                      month="April 2025"
                      milestones={[
                        { name: "Phase 1 Go-Live", initiative: "Regulatory Compliance", status: "at-risk" },
                        { name: "Design Complete", initiative: "Digital CX", status: "on-track" },
                      ]}
                    />
                    <MilestoneCard
                      month="May 2025"
                      milestones={[
                        { name: "Vendor Selection", initiative: "Lending Platform", status: "on-track" },
                        { name: "Kickoff", initiative: "LifePro Upgrade", status: "on-track" },
                      ]}
                    />
                    <MilestoneCard
                      month="June 2025"
                      milestones={[
                        { name: "Data Migration", initiative: "Data Lake", status: "on-track" },
                        { name: "Phase 2 Go-Live", initiative: "Regulatory Compliance", status: "on-track" },
                      ]}
                    />
                    <MilestoneCard
                      month="July 2025"
                      milestones={[
                        { name: "Final Go-Live", initiative: "Regulatory Compliance", status: "on-track" },
                        { name: "Development Start", initiative: "Digital CX", status: "on-track" },
                      ]}
                    />
                    <MilestoneCard
                      month="August 2025"
                      milestones={[
                        { name: "UAT Complete", initiative: "LifePro Upgrade", status: "on-track" },
                        { name: "Phase 1 Go-Live", initiative: "Lending Platform", status: "on-track" },
                      ]}
                    />
                    <MilestoneCard
                      month="September 2025"
                      milestones={[
                        { name: "Final Go-Live", initiative: "Data Lake", status: "on-track" },
                        { name: "Testing Start", initiative: "Digital CX", status: "on-track" },
                      ]}
                    />
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

function TimelineItem({
  name,
  category,
  startDate,
  endDate,
  progress,
}: {
  name: string
  category: string
  startDate: string
  endDate: string
  progress: number
}) {
  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Modernize Core":
        return "border-blue-500"
      case "Compliance":
        return "border-orange-500"
      case "Growth":
        return "border-red-500"
      default:
        return "border-green-500"
    }
  }

  return (
    <div className={`border-l-4 ${getCategoryColor(category)} pl-4 py-2`}>
      <div className="flex justify-between items-start">
        <div>
          <h4 className="font-medium">{name}</h4>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>
              {startDate} - {endDate}
            </span>
          </div>
        </div>
        <Badge variant="outline">{category}</Badge>
      </div>
      <div className="mt-2">
        <div className="flex justify-between text-xs mb-1">
          <span>Progress</span>
          <span>{progress}%</span>
        </div>
        <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
          <div className="h-full bg-blue-600 rounded-full" style={{ width: `${progress}%` }}></div>
        </div>
      </div>
    </div>
  )
}

function MilestoneCard({
  month,
  milestones,
}: {
  month: string
  milestones: { name: string; initiative: string; status: string }[]
}) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm">{month}</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-2">
          {milestones.map((milestone, index) => (
            <div key={index} className="border-l-2 border-blue-500 pl-2 py-1">
              <div className="text-xs font-medium">{milestone.name}</div>
              <div className="text-xs text-muted-foreground">{milestone.initiative}</div>
              <Badge
                className={`mt-1 text-xs ${
                  milestone.status === "on-track" ? "bg-green-100 text-green-800" : "bg-amber-100 text-amber-800"
                }`}
              >
                {milestone.status === "on-track" ? "On Track" : "At Risk"}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
