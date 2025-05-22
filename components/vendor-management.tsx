"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export function VendorManagement() {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-bold">Vendor Management</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <MetricCard
            title="RFP Completion Rate"
            value="87%"
            trend="+5%"
            trendDirection="up"
            description="Vendors with docs attached"
          />

          <MetricCard
            title="SLA Performance"
            value="92%"
            trend="-3%"
            trendDirection="down"
            description="Tasks meeting SLA time"
          />

          <MetricCard
            title="Risk Score"
            value="2.4"
            trend="-0.3"
            trendDirection="up"
            description="Avg. score (scale 1-5)"
          />

          <MetricCard
            title="Backup Vendor Coverage"
            value="68%"
            trend="+8%"
            trendDirection="up"
            description="Critical services with backup"
          />
        </div>

        <div className="rounded-md border">
          <div className="border-b bg-muted/50 p-3 font-medium">Key Vendor Performance</div>
          <div className="overflow-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Vendor</TableHead>
                  <TableHead>Service</TableHead>
                  <TableHead>SLA</TableHead>
                  <TableHead>Risk</TableHead>
                  <TableHead>Backup</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">Accenture</TableCell>
                  <TableCell>Development</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Progress value={95} className="h-2 w-16" />
                      <span className="text-xs text-green-500">95%</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="border-green-500 text-green-500">
                      Low
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="border-green-500 text-green-500">
                      Yes
                    </Badge>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Cognizant</TableCell>
                  <TableCell>QA Testing</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Progress value={88} className="h-2 w-16" />
                      <span className="text-xs text-green-500">88%</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="border-green-500 text-green-500">
                      Low
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="border-green-500 text-green-500">
                      Yes
                    </Badge>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">TCS</TableCell>
                  <TableCell>Support</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Progress value={78} className="h-2 w-16" />
                      <span className="text-xs text-amber-500">78%</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="border-amber-500 text-amber-500">
                      Medium
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="border-green-500 text-green-500">
                      Yes
                    </Badge>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Infosys</TableCell>
                  <TableCell>Infrastructure</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Progress value={92} className="h-2 w-16" />
                      <span className="text-xs text-green-500">92%</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="border-green-500 text-green-500">
                      Low
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="border-green-500 text-green-500">
                      Yes
                    </Badge>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Deloitte</TableCell>
                  <TableCell>Consulting</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Progress value={85} className="h-2 w-16" />
                      <span className="text-xs text-amber-500">85%</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="border-amber-500 text-amber-500">
                      Medium
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="border-red-500 text-red-500">
                      No
                    </Badge>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>

        <div className="rounded-md border">
          <div className="border-b bg-muted/50 p-3 font-medium">SLA Breaches by Vendor</div>
          <div className="p-4">
            <div className="space-y-4">
              <div>
                <div className="mb-1 flex justify-between text-sm">
                  <span>TCS</span>
                  <span>8 breaches</span>
                </div>
                <Progress value={40} className="h-2" />
              </div>
              <div>
                <div className="mb-1 flex justify-between text-sm">
                  <span>Deloitte</span>
                  <span>5 breaches</span>
                </div>
                <Progress value={25} className="h-2" />
              </div>
              <div>
                <div className="mb-1 flex justify-between text-sm">
                  <span>Cognizant</span>
                  <span>4 breaches</span>
                </div>
                <Progress value={20} className="h-2" />
              </div>
              <div>
                <div className="mb-1 flex justify-between text-sm">
                  <span>Accenture</span>
                  <span>2 breaches</span>
                </div>
                <Progress value={10} className="h-2" />
              </div>
              <div>
                <div className="mb-1 flex justify-between text-sm">
                  <span>Infosys</span>
                  <span>1 breach</span>
                </div>
                <Progress value={5} className="h-2" />
              </div>
            </div>
          </div>
        </div>
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
