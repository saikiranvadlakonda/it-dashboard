"use client"

import type React from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DollarSign, TrendingUp } from "lucide-react"

export function FinancialsValueRealization() {
  return (
    <div className="space-y-6">
      {/* Global KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <FinancialKpiCard
          title="Total Portfolio Budget"
          value="$50M"
          period="Estimated One-time Costs"
          description="Source: Wave (as of 2/17/2025)"
        />
        <FinancialKpiCard
          title="Ongoing Maintenance"
          value="$12.5M"
          period="Annual Est. (2026)"
          description="Source: Wave (as of 2/17/2025)"
        />
        <FinancialKpiCard
          title="Estimated Net Benefits"
          value="$87.5M"
          status="positive"
          icon={<TrendingUp className="h-4 w-4" />}
          description="Total across all initiatives"
        />
        <FinancialKpiCard
          title="Estimated Portfolio ROI"
          value="175%"
          status="positive"
          icon={<TrendingUp className="h-4 w-4" />}
          description="Based on latest estimates"
        />
      </div>

      {/* Tabbed Content */}
      <Card>
        <CardHeader>
          <CardTitle>Financial Performance & Value Realization</CardTitle>
          <CardDescription>Based on latest estimates from Wave (as of 2/17/2025)</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="overview">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">Portfolio Financial Overview</TabsTrigger>
              <TabsTrigger value="initiatives">Initiative Financial Deep Dive</TabsTrigger>
              <TabsTrigger value="benefits">Benefit Realization</TabsTrigger>
            </TabsList>

            {/* Tab 1: Portfolio Financial Overview */}
            <TabsContent value="overview" className="pt-6">
              <div className="space-y-6">
                <div className="p-4 bg-muted/20 rounded-lg">
                  <h3 className="text-lg font-medium mb-2">Estimated Budget Allocation by Workstream</h3>
                  <div className="h-[400px] relative">
                    {/* Waterfall Chart */}
                    <div className="absolute inset-0 flex items-end justify-around px-10">
                      {/* Starting Budget */}
                      <div className="flex flex-col items-center">
                        <div className="h-[300px] w-20 rounded-t-md bg-blue-600"></div>
                        <div className="mt-2 text-xs font-medium">Total Budget</div>
                        <div className="text-sm font-bold">$50M</div>
                      </div>

                      {/* App Development */}
                      <div className="flex flex-col items-center">
                        <div className="mt-auto">
                          <div className="h-[150px] w-20 rounded-b-md bg-purple-500"></div>
                        </div>
                        <div className="mt-2 text-xs font-medium">App Development</div>
                        <div className="text-sm font-bold">$25M (50%)</div>
                      </div>

                      {/* Data & Analytics */}
                      <div className="flex flex-col items-center">
                        <div className="mt-auto">
                          <div className="h-[90px] w-20 rounded-b-md bg-teal-500"></div>
                        </div>
                        <div className="mt-2 text-xs font-medium">Data & Analytics</div>
                        <div className="text-sm font-bold">$15M (30%)</div>
                      </div>

                      {/* Infrastructure */}
                      <div className="flex flex-col items-center">
                        <div className="mt-auto">
                          <div className="h-[36px] w-20 rounded-b-md bg-indigo-500"></div>
                        </div>
                        <div className="mt-2 text-xs font-medium">Infrastructure</div>
                        <div className="text-sm font-bold">$6M (12%)</div>
                      </div>

                      {/* Other */}
                      <div className="flex flex-col items-center">
                        <div className="mt-auto">
                          <div className="h-[24px] w-20 rounded-b-md bg-cyan-500"></div>
                        </div>
                        <div className="mt-2 text-xs font-medium">Other</div>
                        <div className="text-sm font-bold">$4M (8%)</div>
                      </div>

                      {/* Remaining */}
                      <div className="flex flex-col items-center">
                        <div className="h-[0px] w-20 rounded-t-md bg-blue-600"></div>
                        <div className="mt-2 text-xs font-medium">Remaining</div>
                        <div className="text-sm font-bold">$0M (0%)</div>
                      </div>
                    </div>

                    {/* Y-axis labels */}
                    <div className="absolute -left-10 top-0 bottom-0 flex flex-col justify-between text-xs text-muted-foreground py-4">
                      <span>$50M</span>
                      <span>$40M</span>
                      <span>$30M</span>
                      <span>$20M</span>
                      <span>$10M</span>
                      <span>$0</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-muted/20 rounded-lg">
                  <h3 className="text-lg font-medium mb-2">Yearly Budget Allocation (One-time Costs)</h3>
                  <div className="h-[300px] relative">
                    {/* Bar Chart for yearly allocation */}
                    <div className="absolute inset-0 flex items-end justify-around px-10 pt-10">
                      {/* 2025 */}
                      <div className="flex flex-col items-center">
                        <div className="h-[200px] w-20 rounded-t-md bg-blue-600"></div>
                        <div className="mt-2 text-xs font-medium">2025</div>
                        <div className="text-sm font-bold">$20M</div>
                      </div>

                      {/* 2026 */}
                      <div className="flex flex-col items-center">
                        <div className="h-[150px] w-20 rounded-t-md bg-blue-600"></div>
                        <div className="mt-2 text-xs font-medium">2026</div>
                        <div className="text-sm font-bold">$15M</div>
                      </div>

                      {/* 2027 */}
                      <div className="flex flex-col items-center">
                        <div className="h-[100px] w-20 rounded-t-md bg-blue-600"></div>
                        <div className="mt-2 text-xs font-medium">2027</div>
                        <div className="text-sm font-bold">$10M</div>
                      </div>

                      {/* 2028 */}
                      <div className="flex flex-col items-center">
                        <div className="h-[50px] w-20 rounded-t-md bg-blue-600"></div>
                        <div className="mt-2 text-xs font-medium">2028</div>
                        <div className="text-sm font-bold">$5M</div>
                      </div>
                    </div>

                    {/* Y-axis labels */}
                    <div className="absolute -left-10 top-0 bottom-0 flex flex-col justify-between text-xs text-muted-foreground py-4">
                      <span>$20M</span>
                      <span>$15M</span>
                      <span>$10M</span>
                      <span>$5M</span>
                      <span>$0</span>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-muted/20 rounded-lg">
                  <h3 className="text-lg font-medium mb-2">Ongoing Operational Costs Trend (by Workstream)</h3>
                  <div className="h-[300px] relative">
                    {/* Line Chart for operational costs trend */}
                    <div className="absolute inset-0">
                      <svg className="w-full h-full">
                        {/* Grid lines */}
                        <line x1="10%" y1="90%" x2="90%" y2="90%" stroke="#e5e7eb" strokeWidth="1" />
                        <line x1="10%" y1="70%" x2="90%" y2="70%" stroke="#e5e7eb" strokeWidth="1" />
                        <line x1="10%" y1="50%" x2="90%" y2="50%" stroke="#e5e7eb" strokeWidth="1" />
                        <line x1="10%" y1="30%" x2="90%" y2="30%" stroke="#e5e7eb" strokeWidth="1" />
                        <line x1="10%" y1="10%" x2="90%" y2="10%" stroke="#e5e7eb" strokeWidth="1" />

                        {/* App Development line */}
                        <polyline
                          points="10%,60% 30%,55% 50%,50% 70%,45% 90%,40%"
                          fill="none"
                          stroke="#2563eb"
                          strokeWidth="2"
                        />

                        {/* Data & Analytics line */}
                        <polyline
                          points="10%,70% 30%,65% 50%,68% 70%,60% 90%,55%"
                          fill="none"
                          stroke="#10b981"
                          strokeWidth="2"
                        />

                        {/* Infrastructure line */}
                        <polyline
                          points="10%,40% 30%,45% 50%,42% 70%,38% 90%,35%"
                          fill="none"
                          stroke="#6366f1"
                          strokeWidth="2"
                        />

                        {/* Data points - App Development */}
                        <circle cx="10%" cy="60%" r="3" fill="#2563eb" />
                        <circle cx="30%" cy="55%" r="3" fill="#2563eb" />
                        <circle cx="50%" cy="50%" r="3" fill="#2563eb" />
                        <circle cx="70%" cy="45%" r="3" fill="#2563eb" />
                        <circle cx="90%" cy="40%" r="3" fill="#2563eb" />

                        {/* Data points - Data & Analytics */}
                        <circle cx="10%" cy="70%" r="3" fill="#10b981" />
                        <circle cx="30%" cy="65%" r="3" fill="#10b981" />
                        <circle cx="50%" cy="68%" r="3" fill="#10b981" />
                        <circle cx="70%" cy="60%" r="3" fill="#10b981" />
                        <circle cx="90%" cy="55%" r="3" fill="#10b981" />

                        {/* Data points - Infrastructure */}
                        <circle cx="10%" cy="40%" r="3" fill="#6366f1" />
                        <circle cx="30%" cy="45%" r="3" fill="#6366f1" />
                        <circle cx="50%" cy="42%" r="3" fill="#6366f1" />
                        <circle cx="70%" cy="38%" r="3" fill="#6366f1" />
                        <circle cx="90%" cy="35%" r="3" fill="#6366f1" />
                      </svg>

                      {/* X-axis labels */}
                      <div className="absolute bottom-0 left-0 right-0 flex justify-between px-[10%] text-xs text-muted-foreground">
                        <span>Q1 2025</span>
                        <span>Q2 2025</span>
                        <span>Q3 2025</span>
                        <span>Q4 2025</span>
                        <span>Q1 2026</span>
                      </div>

                      {/* Y-axis labels */}
                      <div className="absolute top-0 bottom-0 left-0 flex flex-col justify-between py-[10%] text-xs text-muted-foreground">
                        <span>$5M</span>
                        <span>$4M</span>
                        <span>$3M</span>
                        <span>$2M</span>
                        <span>$1M</span>
                      </div>

                      {/* Legend */}
                      <div className="absolute top-2 right-2 bg-white/80 p-2 rounded-md border text-xs">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-blue-600"></div>
                          <span>App Development</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-green-500"></div>
                          <span>Data & Analytics</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-indigo-500"></div>
                          <span>Infrastructure</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Tab 2: Initiative Financial Deep Dive */}
            <TabsContent value="initiatives" className="pt-6">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Initiative Name</TableHead>
                      <TableHead>Workstream</TableHead>
                      <TableHead className="text-right">One-time Budget</TableHead>
                      <TableHead className="text-right">Ongoing Annual</TableHead>
                      <TableHead className="text-right">Est. Net Benefit</TableHead>
                      <TableHead className="text-right">Est. ROI</TableHead>
                      <TableHead>Category</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">LifePro Version 20 Upgrade</TableCell>
                      <TableCell>App Development</TableCell>
                      <TableCell className="text-right">$2.0M</TableCell>
                      <TableCell className="text-right">$0.3M</TableCell>
                      <TableCell className="text-right">$3.6M</TableCell>
                      <TableCell className="text-right">180%</TableCell>
                      <TableCell>
                        <Badge className="bg-blue-100 text-blue-800">Modernize Core</Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Lending Platform Upgrade</TableCell>
                      <TableCell>App Development</TableCell>
                      <TableCell className="text-right">$5.0M</TableCell>
                      <TableCell className="text-right">$0.8M</TableCell>
                      <TableCell className="text-right">$10.0M</TableCell>
                      <TableCell className="text-right">200%</TableCell>
                      <TableCell>
                        <Badge className="bg-blue-100 text-blue-800">Modernize Core</Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Regulatory Compliance Framework</TableCell>
                      <TableCell>App Development</TableCell>
                      <TableCell className="text-right">$3.5M</TableCell>
                      <TableCell className="text-right">$0.5M</TableCell>
                      <TableCell className="text-right">$0.0M</TableCell>
                      <TableCell className="text-right">0%</TableCell>
                      <TableCell>
                        <Badge className="bg-orange-100 text-orange-800">Compliance</Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Data Lake Implementation</TableCell>
                      <TableCell>Data & Analytics</TableCell>
                      <TableCell className="text-right">$4.2M</TableCell>
                      <TableCell className="text-right">$0.6M</TableCell>
                      <TableCell className="text-right">$6.3M</TableCell>
                      <TableCell className="text-right">150%</TableCell>
                      <TableCell>
                        <Badge className="bg-blue-100 text-blue-800">Modernize Core</Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Digital Customer Experience</TableCell>
                      <TableCell>App Development</TableCell>
                      <TableCell className="text-right">$2.8M</TableCell>
                      <TableCell className="text-right">$0.4M</TableCell>
                      <TableCell className="text-right">$5.6M</TableCell>
                      <TableCell className="text-right">200%</TableCell>
                      <TableCell>
                        <Badge className="bg-red-100 text-red-800">Growth</Badge>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            {/* Tab 3: Estimated Benefits */}
            <TabsContent value="benefits" className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Average Time to Value</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">9.5 months</div>
                    <p className="text-xs text-muted-foreground">From initiative start to first benefit realization</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Benefit Realization Rate</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">68%</div>
                    <p className="text-xs text-muted-foreground">Actual vs. Target (YTD)</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Initiatives with Measured Benefits</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">12/40</div>
                    <p className="text-xs text-muted-foreground">30% of total portfolio</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Total Realized Benefits</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">$15.2M</div>
                    <p className="text-xs text-muted-foreground">YTD (Target: $22.5M)</p>
                  </CardContent>
                </Card>
              </div>
              <div className="space-y-6">
                <div className="p-4 bg-muted/20 rounded-lg">
                  <h3 className="text-lg font-medium mb-2">
                    Benefit Realization: Actual vs. Target by Initiative (Estimated)
                  </h3>
                  <div className="h-[400px] relative">
                    {/* Y-axis */}
                    <div className="absolute left-16 top-0 bottom-0 border-r border-muted-foreground/20"></div>

                    {/* X-axis */}
                    <div className="absolute left-16 right-8 bottom-16 border-t border-muted-foreground/20"></div>

                    {/* Y-axis labels */}
                    <div className="absolute left-0 top-0 bottom-16 flex flex-col justify-between text-xs text-muted-foreground py-4">
                      <span>$10M</span>
                      <span>$8M</span>
                      <span>$6M</span>
                      <span>$4M</span>
                      <span>$2M</span>
                      <span>$0</span>
                    </div>

                    {/* Bars */}
                    <div className="absolute left-16 right-8 top-0 bottom-16 flex items-end justify-around">
                      {/* Lending Platform */}
                      <div className="flex flex-col items-center">
                        <div className="w-16 h-[320px] bg-blue-600 rounded-t-sm"></div>
                        <div className="absolute -bottom-16 text-xs font-medium text-center w-20">Lending Platform</div>
                      </div>

                      {/* Data Lake */}
                      <div className="flex flex-col items-center">
                        <div className="w-16 h-[200px] bg-blue-600 rounded-t-sm"></div>
                        <div className="absolute -bottom-16 text-xs font-medium text-center w-20">Data Lake</div>
                      </div>

                      {/* Digital CX */}
                      <div className="flex flex-col items-center">
                        <div className="w-16 h-[180px] bg-blue-600 rounded-t-sm"></div>
                        <div className="absolute -bottom-16 text-xs font-medium text-center w-20">Digital CX</div>
                      </div>

                      {/* LifePro */}
                      <div className="flex flex-col items-center">
                        <div className="w-16 h-[115px] bg-blue-600 rounded-t-sm"></div>
                        <div className="absolute -bottom-16 text-xs font-medium text-center w-20">LifePro</div>
                      </div>

                      {/* Compliance */}
                      <div className="flex flex-col items-center">
                        <div className="w-16 h-[0px] bg-blue-600 rounded-t-sm"></div>
                        <div className="absolute -bottom-16 text-xs font-medium text-center w-20">Compliance</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-muted/20 rounded-lg">
                  <h3 className="text-lg font-medium mb-2">Yearly Estimated Net Benefits</h3>
                  <div className="h-[300px] relative">
                    {/* Line Chart for yearly benefits */}
                    <div className="absolute inset-0">
                      <svg className="w-full h-full">
                        {/* Grid lines */}
                        <line x1="10%" y1="90%" x2="90%" y2="90%" stroke="#e5e7eb" strokeWidth="1" />
                        <line x1="10%" y1="70%" x2="90%" y2="70%" stroke="#e5e7eb" strokeWidth="1" />
                        <line x1="10%" y1="50%" x2="90%" y2="50%" stroke="#e5e7eb" strokeWidth="1" />
                        <line x1="10%" y1="30%" x2="90%" y2="30%" stroke="#e5e7eb" strokeWidth="1" />
                        <line x1="10%" y1="10%" x2="90%" y2="10%" stroke="#e5e7eb" strokeWidth="1" />

                        {/* Benefit line */}
                        <polyline
                          points="10%,85% 30%,70% 50%,40% 70%,20% 90%,10%"
                          fill="none"
                          stroke="#2563eb"
                          strokeWidth="3"
                        />

                        {/* Data points */}
                        <circle cx="10%" cy="85%" r="4" fill="#2563eb" />
                        <circle cx="30%" cy="70%" r="4" fill="#2563eb" />
                        <circle cx="50%" cy="40%" r="4" fill="#2563eb" />
                        <circle cx="70%" cy="20%" r="4" fill="#2563eb" />
                        <circle cx="90%" cy="10%" r="4" fill="#2563eb" />
                      </svg>

                      {/* X-axis labels */}
                      <div className="absolute bottom-0 left-0 right-0 flex justify-between px-[10%] text-xs text-muted-foreground">
                        <span>2025</span>
                        <span>2026</span>
                        <span>2027</span>
                        <span>2028</span>
                        <span>2029</span>
                      </div>

                      {/* Y-axis labels */}
                      <div className="absolute top-0 bottom-0 left-0 flex flex-col justify-between py-[10%] text-xs text-muted-foreground">
                        <span>$25M</span>
                        <span>$20M</span>
                        <span>$15M</span>
                        <span>$10M</span>
                        <span>$5M</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-muted/20 rounded-lg">
                  <h3 className="text-lg font-medium mb-2">Benefit Details by Initiative</h3>
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Initiative</TableHead>
                          <TableHead className="text-right">Est. Net Benefit</TableHead>
                          <TableHead className="text-right">One-time Cost</TableHead>
                          <TableHead className="text-right">Est. ROI</TableHead>
                          <TableHead>Benefit Type</TableHead>
                          <TableHead>Category</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell className="font-medium">Lending Platform Upgrade</TableCell>
                          <TableCell className="text-right">$10.0M</TableCell>
                          <TableCell className="text-right">$5.0M</TableCell>
                          <TableCell className="text-right">200%</TableCell>
                          <TableCell>Cost Reduction</TableCell>
                          <TableCell>
                            <Badge className="bg-blue-100 text-blue-800">Modernize Core</Badge>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Data Lake Implementation</TableCell>
                          <TableCell className="text-right">$6.3M</TableCell>
                          <TableCell className="text-right">$4.2M</TableCell>
                          <TableCell className="text-right">150%</TableCell>
                          <TableCell>Revenue Growth</TableCell>
                          <TableCell>
                            <Badge className="bg-blue-100 text-blue-800">Modernize Core</Badge>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Digital Customer Experience</TableCell>
                          <TableCell className="text-right">$5.6M</TableCell>
                          <TableCell className="text-right">$2.8M</TableCell>
                          <TableCell className="text-right">200%</TableCell>
                          <TableCell>Revenue Growth</TableCell>
                          <TableCell>
                            <Badge className="bg-red-100 text-red-800">Growth</Badge>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">LifePro Version 20 Upgrade</TableCell>
                          <TableCell className="text-right">$3.6M</TableCell>
                          <TableCell className="text-right">$2.0M</TableCell>
                          <TableCell className="text-right">180%</TableCell>
                          <TableCell>Cost Reduction</TableCell>
                          <TableCell>
                            <Badge className="bg-blue-100 text-blue-800">Modernize Core</Badge>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Regulatory Compliance Framework</TableCell>
                          <TableCell className="text-right">$0.0M</TableCell>
                          <TableCell className="text-right">$3.5M</TableCell>
                          <TableCell className="text-right">0%</TableCell>
                          <TableCell>Compliance</TableCell>
                          <TableCell>
                            <Badge className="bg-orange-100 text-orange-800">Compliance</Badge>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
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

function FinancialKpiCard({
  title,
  value,
  period,
  status,
  icon,
  description,
}: {
  title: string
  value: string
  period?: string
  status?: "positive" | "negative" | "neutral"
  icon?: React.ReactNode
  description?: string
}) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <div className="flex items-baseline gap-1">
              <h3
                className={`text-2xl font-bold ${
                  status === "positive" ? "text-green-600" : status === "negative" ? "text-red-600" : ""
                }`}
              >
                {value}
              </h3>
              {icon && (
                <span
                  className={`${
                    status === "positive" ? "text-green-600" : status === "negative" ? "text-red-600" : ""
                  }`}
                >
                  {icon}
                </span>
              )}
            </div>
            {period && <p className="text-xs text-muted-foreground mt-1">{period}</p>}
            {description && <p className="text-xs text-muted-foreground mt-1">{description}</p>}
          </div>
          <div className="p-2 bg-muted rounded-full">
            <DollarSign className="h-5 w-5 text-blue-600" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
