"use client"

import { X } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"

export function ProjectDetailModal({ project, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="relative max-h-[90vh] w-full max-w-4xl overflow-auto rounded-lg bg-background p-6 shadow-lg">
        <Button variant="ghost" size="icon" className="absolute right-4 top-4" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>

        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">{project.name}</h2>
            <div className="mt-1 flex items-center gap-2">
              <Badge>{project.segment} Segment</Badge>
              <Badge
                variant={
                  project.status === "On Track" ? "default" : project.status === "At Risk" ? "outline" : "destructive"
                }
                className={project.status === "At Risk" ? "border-amber-500 text-amber-500" : ""}
              >
                {project.status}
              </Badge>
              <Badge variant="outline">{project.id}</Badge>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-muted-foreground">Target Release</div>
            <div className="text-lg font-medium">{project.targetRelease}</div>
          </div>
        </div>

        <Tabs defaultValue="general">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="timeline">Timeline</TabsTrigger>
            <TabsTrigger value="dependencies">Dependencies</TabsTrigger>
            <TabsTrigger value="intake">Intake Metadata</TabsTrigger>
            <TabsTrigger value="financials">Financials</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="mt-4 space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium">Project Details</h3>
                  <Separator className="my-2" />
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Owner:</span>
                      <span>{project.owner}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Teams:</span>
                      <div className="flex flex-wrap gap-1 text-right">
                        {project.teams.map((team) => (
                          <Badge key={team} variant="outline" className="text-xs">
                            {team}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Priority:</span>
                      <Badge variant={project.priority === "P1" ? "default" : "secondary"}>{project.priority}</Badge>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium">Linked Systems</h3>
                  <Separator className="my-2" />
                  <div className="flex flex-wrap gap-1">
                    {project.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium">Progress</h3>
                  <Separator className="my-2" />
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Completion:</span>
                      <span>{project.completion}%</span>
                    </div>
                    <Progress value={project.completion} className="h-2" />
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium">Goals & KPIs</h3>
                  <Separator className="my-2" />
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Linked OKR:</span>
                      <span>Q2 - Improve Customer Experience</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">KPI Target:</span>
                      <span>Reduce processing time by 30%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Value Estimate:</span>
                      <span className="text-green-600">{project.roi}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium">Risk Status</h3>
                  <Separator className="my-2" />
                  <div className="rounded-md border border-amber-200 bg-amber-50 p-3 text-amber-800 dark:border-amber-800 dark:bg-amber-950 dark:text-amber-200">
                    <div className="font-medium">Resource Constraint</div>
                    <div className="text-sm">Team capacity limited due to parallel projects</div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="timeline" className="mt-4">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Project Timeline</h3>
              <div className="rounded-md border">
                <div className="p-4">
                  <div className="relative">
                    <div className="absolute left-2 top-0 h-full w-0.5 bg-muted"></div>
                    <div className="space-y-8">
                      <TimelineItem title="Intake Created" date="Feb 15, 2025" status="Completed" />
                      <TimelineItem title="Approved" date="Mar 2, 2025" status="Completed" />
                      <TimelineItem title="Dev Started" date="Mar 15, 2025" status="Completed" />
                      <TimelineItem title="First Commit" date="Mar 18, 2025" status="Completed" />
                      <TimelineItem title="Test Passed" date="May 20, 2025" status="In Progress" />
                      <TimelineItem title="Released to UAT" date="Jun 5, 2025" status="Planned" />
                      <TimelineItem title="Released to Prod" date="Jun 15, 2025" status="Planned" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="dependencies" className="mt-4">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Dependencies</h3>
              <div className="rounded-md border">
                <div className="border-b bg-muted/50 p-3 font-medium">Blocking Projects</div>
                <div className="p-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between rounded-md border p-3">
                      <div>
                        <div className="font-medium">FAST Retirement API</div>
                        <div className="text-sm text-muted-foreground">Required for authentication</div>
                      </div>
                      <Badge variant="outline" className="border-amber-500 text-amber-500">
                        Delayed (6 days)
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between rounded-md border p-3">
                      <div>
                        <div className="font-medium">Identity Platform Upgrade</div>
                        <div className="text-sm text-muted-foreground">Required for SSO</div>
                      </div>
                      <Badge variant="outline" className="border-green-500 text-green-500">
                        On Track
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-md border">
                <div className="border-b bg-muted/50 p-3 font-medium">Blocked By</div>
                <div className="p-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between rounded-md border p-3">
                      <div>
                        <div className="font-medium">Mobile Claims Processing</div>
                        <div className="text-sm text-muted-foreground">Waiting on our API</div>
                      </div>
                      <Badge variant="outline" className="border-red-500 text-red-500">
                        Blocked
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="intake" className="mt-4">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Intake Metadata</h3>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="rounded-md border">
                  <div className="border-b bg-muted/50 p-3 font-medium">Form Completion</div>
                  <div className="p-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Form Completed?</span>
                        <Badge variant="outline" className="border-green-500 text-green-500">
                          Yes
                        </Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Scoring Done?</span>
                        <Badge variant="outline" className="border-green-500 text-green-500">
                          Yes
                        </Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Readiness Passed?</span>
                        <Badge variant="outline" className="border-green-500 text-green-500">
                          Yes
                        </Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">ROI Attached?</span>
                        <Badge variant="outline" className="border-green-500 text-green-500">
                          Yes
                        </Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Feasibility OK?</span>
                        <Badge variant="outline" className="border-green-500 text-green-500">
                          Yes
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="rounded-md border">
                  <div className="border-b bg-muted/50 p-3 font-medium">Work Breakdown</div>
                  <div className="p-4">
                    <div className="space-y-3">
                      <div>
                        <div className="mb-1 flex justify-between text-sm">
                          <span>Features</span>
                          <span>4 of 6</span>
                        </div>
                        <Progress value={66.7} className="h-2" />
                      </div>
                      <div>
                        <div className="mb-1 flex justify-between text-sm">
                          <span>Epics</span>
                          <span>2 of 3</span>
                        </div>
                        <Progress value={66.7} className="h-2" />
                      </div>
                      <div>
                        <div className="mb-1 flex justify-between text-sm">
                          <span>Tasks</span>
                          <span>24 of 42</span>
                        </div>
                        <Progress value={57.1} className="h-2" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="financials" className="mt-4">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Financial ROI</h3>
              <div className="grid gap-6 md:grid-cols-3">
                <div className="rounded-md border p-4 text-center">
                  <div className="text-sm text-muted-foreground">Year 1 ROI</div>
                  <div className="text-2xl font-bold text-green-600">{project.roi}</div>
                </div>
                <div className="rounded-md border p-4 text-center">
                  <div className="text-sm text-muted-foreground">Year 2 ROI</div>
                  <div className="text-2xl font-bold text-green-600">$1.8M</div>
                </div>
                <div className="rounded-md border p-4 text-center">
                  <div className="text-sm text-muted-foreground">Year 3 ROI</div>
                  <div className="text-2xl font-bold text-green-600">$2.2M</div>
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div className="rounded-md border">
                  <div className="border-b bg-muted/50 p-3 font-medium">Cost Tags</div>
                  <div className="p-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Development:</span>
                        <span>$450,000</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Infrastructure:</span>
                        <span>$120,000</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Licensing:</span>
                        <span>$80,000</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Support:</span>
                        <span>$150,000</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="rounded-md border">
                  <div className="border-b bg-muted/50 p-3 font-medium">Benefit Details</div>
                  <div className="p-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Recurring Benefit:</span>
                        <Badge variant="outline" className="border-green-500 text-green-500">
                          Yes
                        </Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Cost Reduction:</span>
                        <span>$800,000 / year</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Revenue Increase:</span>
                        <span>$400,000 / year</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Payback Period:</span>
                        <span>14 months</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

function TimelineItem({ title, date, status }) {
  return (
    <div className="relative pl-8">
      <div
        className={`absolute left-0 top-1 h-4 w-4 rounded-full border-2 ${
          status === "Completed"
            ? "border-green-500 bg-green-500"
            : status === "In Progress"
              ? "border-amber-500 bg-amber-500"
              : "border-muted-foreground bg-background"
        }`}
      ></div>
      <div className="font-medium">{title}</div>
      <div className="flex justify-between text-sm">
        <span className="text-muted-foreground">{date}</span>
        <Badge
          variant={status === "Completed" ? "default" : status === "In Progress" ? "outline" : "secondary"}
          className={status === "In Progress" ? "border-amber-500 text-amber-500" : ""}
        >
          {status}
        </Badge>
      </div>
    </div>
  )
}
