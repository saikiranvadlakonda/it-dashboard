import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function QualityMetrics() {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-bold">Quality & Security</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="security">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="testing">Testing</TabsTrigger>
            <TabsTrigger value="bugs">Bugs</TabsTrigger>
          </TabsList>

          <TabsContent value="security" className="mt-4 space-y-6">
            <div className="space-y-4">
              <div className="text-sm font-medium">Security Findings</div>
              <div className="grid grid-cols-4 gap-2 text-center">
                <div className="rounded-md border p-2">
                  <div className="text-xs text-muted-foreground">Critical</div>
                  <div className="text-lg font-bold text-red-500">4</div>
                </div>
                <div className="rounded-md border p-2">
                  <div className="text-xs text-muted-foreground">High</div>
                  <div className="text-lg font-bold text-amber-500">7</div>
                </div>
                <div className="rounded-md border p-2">
                  <div className="text-xs text-muted-foreground">Medium</div>
                  <div className="text-lg font-bold text-yellow-500">12</div>
                </div>
                <div className="rounded-md border p-2">
                  <div className="text-xs text-muted-foreground">Low</div>
                  <div className="text-lg font-bold text-green-500">23</div>
                </div>
              </div>
            </div>

            <div className="rounded-md border">
              <div className="border-b bg-muted/50 p-3 font-medium">Security Findings by Project</div>
              <div className="p-4">
                <div className="space-y-4">
                  <div>
                    <div className="mb-1 flex justify-between text-sm">
                      <span>WealthSync Retirement Portal</span>
                      <span className="font-medium text-amber-500">3 High</span>
                    </div>
                    <Progress value={75} className="h-2" />
                  </div>
                  <div>
                    <div className="mb-1 flex justify-between text-sm">
                      <span>Commercial Lending Platform</span>
                      <span className="font-medium text-red-500">2 Critical</span>
                    </div>
                    <Progress value={40} className="h-2" />
                  </div>
                  <div>
                    <div className="mb-1 flex justify-between text-sm">
                      <span>Retail Mobile Banking App</span>
                      <span className="font-medium text-amber-500">4 High</span>
                    </div>
                    <Progress value={60} className="h-2" />
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="testing" className="mt-4 space-y-6">
            <div className="space-y-4">
              <div className="text-sm font-medium">Test Coverage</div>
              <div className="space-y-3">
                <div>
                  <div className="mb-1 flex justify-between text-xs">
                    <span>Unit Tests</span>
                    <span className="font-medium">72%</span>
                  </div>
                  <Progress value={72} className="h-2" />
                </div>
                <div>
                  <div className="mb-1 flex justify-between text-xs">
                    <span>Integration Tests</span>
                    <span className="font-medium">63%</span>
                  </div>
                  <Progress value={63} className="h-2" />
                </div>
                <div>
                  <div className="mb-1 flex justify-between text-xs">
                    <span>UI Tests</span>
                    <span className="font-medium">45%</span>
                  </div>
                  <Progress value={45} className="h-2" />
                </div>
              </div>
            </div>

            <div className="rounded-md border">
              <div className="border-b bg-muted/50 p-3 font-medium">Test Coverage by Project</div>
              <div className="p-4">
                <div className="space-y-4">
                  <div>
                    <div className="mb-1 flex justify-between text-sm">
                      <span>WealthSync Retirement Portal</span>
                      <span className="font-medium">78%</span>
                    </div>
                    <Progress value={78} className="h-2" />
                  </div>
                  <div>
                    <div className="mb-1 flex justify-between text-sm">
                      <span>Commercial Lending Platform</span>
                      <span className="font-medium">65%</span>
                    </div>
                    <Progress value={65} className="h-2" />
                  </div>
                  <div>
                    <div className="mb-1 flex justify-between text-sm">
                      <span>Retail Mobile Banking App</span>
                      <span className="font-medium">82%</span>
                    </div>
                    <Progress value={82} className="h-2" />
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="bugs" className="mt-4 space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="text-sm font-medium">Escaped Defects</div>
                <div className="rounded-md border p-3 text-center">
                  <div className="text-2xl font-bold text-red-500">6</div>
                  <div className="text-xs text-muted-foreground">This Month</div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-sm font-medium">Template Adoption</div>
                <div className="rounded-md border p-3 text-center">
                  <div className="text-2xl font-bold text-green-500">87%</div>
                  <div className="text-xs text-muted-foreground">Compliance</div>
                </div>
              </div>
            </div>

            <div className="rounded-md border">
              <div className="border-b bg-muted/50 p-3 font-medium">Open Bugs by Severity</div>
              <div className="p-4">
                <div className="space-y-3">
                  <div>
                    <div className="mb-1 flex justify-between text-sm">
                      <span>Critical</span>
                      <span className="font-medium text-red-500">3</span>
                    </div>
                    <Progress value={15} className="h-2" />
                  </div>
                  <div>
                    <div className="mb-1 flex justify-between text-sm">
                      <span>Major</span>
                      <span className="font-medium text-amber-500">8</span>
                    </div>
                    <Progress value={40} className="h-2" />
                  </div>
                  <div>
                    <div className="mb-1 flex justify-between text-sm">
                      <span>Minor</span>
                      <span className="font-medium">9</span>
                    </div>
                    <Progress value={45} className="h-2" />
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-md border">
              <div className="border-b bg-muted/50 p-3 font-medium">Time to Bug Fix</div>
              <div className="p-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Critical:</span>
                    <span className="font-medium">1.2 days</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Major:</span>
                    <span className="font-medium">3.5 days</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Minor:</span>
                    <span className="font-medium">7.8 days</span>
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
