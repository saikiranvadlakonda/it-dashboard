"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Download, FileText, Printer, Filter } from "lucide-react"

export default function ReportsPage() {
  const [selectedReport, setSelectedReport] = useState("financial-summary")
  const [selectedInitiative, setSelectedInitiative] = useState("9814")
  const [dateRange, setDateRange] = useState("q2-2025")

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Reports</h1>
          <p className="text-muted-foreground">Generate and export standardized reports</p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="q1-2025">Q1 2025</SelectItem>
              <SelectItem value="q2-2025">Q2 2025</SelectItem>
              <SelectItem value="ytd-2025">YTD 2025</SelectItem>
              <SelectItem value="fy-2025">FY 2025</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Tabs value={selectedReport} onValueChange={setSelectedReport} className="space-y-4">
        <TabsList className="grid grid-cols-4 w-full">
          <TabsTrigger value="financial-summary">Portfolio Financial Summary</TabsTrigger>
          <TabsTrigger value="cost-benefit">Initiative Cost & Benefit</TabsTrigger>
          <TabsTrigger value="portfolio-composition">Portfolio Composition</TabsTrigger>
          <TabsTrigger value="initiative-detail">Initiative Detail Sheet</TabsTrigger>
        </TabsList>

        {/* Portfolio Financial Summary Report */}
        <TabsContent value="financial-summary" className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Portfolio Financial Summary - Q2 2025</CardTitle>
                  <CardDescription>Data as of May 15, 2025 | Source: McKinsey Wave</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Printer className="mr-2 h-4 w-4" />
                    Print
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    Export CSV
                  </Button>
                  <Button size="sm">
                    <FileText className="mr-2 h-4 w-4" />
                    Export PDF
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-4 gap-4 mb-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Total Portfolio Budget</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">$15,000,000</div>
                    <p className="text-xs text-muted-foreground">Q2 2025</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Total Actual Spend</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">$16,200,000</div>
                    <p className="text-xs text-muted-foreground">Q2 2025</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Overall Variance</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-red-500">-$1,200,000</div>
                    <p className="text-xs text-muted-foreground">Over Budget</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">% Budget Utilized</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-red-500">108%</div>
                    <p className="text-xs text-muted-foreground">Q2 2025</p>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-3">Spend by Workstream/Segment</h3>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Workstream/Segment</TableHead>
                        <TableHead>Budget (Q2 2025)</TableHead>
                        <TableHead>Actual Spend (Q2 2025)</TableHead>
                        <TableHead>Variance</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>Application Development</TableCell>
                        <TableCell>$5,000,000</TableCell>
                        <TableCell>$5,500,000</TableCell>
                        <TableCell className="text-red-500">-$500,000</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Data & Analytics</TableCell>
                        <TableCell>$3,000,000</TableCell>
                        <TableCell>$3,300,000</TableCell>
                        <TableCell className="text-red-500">-$300,000</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Infrastructure & Ops</TableCell>
                        <TableCell>$4,000,000</TableCell>
                        <TableCell>$3,800,000</TableCell>
                        <TableCell className="text-green-500">+$200,000</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Customer Ops</TableCell>
                        <TableCell>$2,000,000</TableCell>
                        <TableCell>$2,500,000</TableCell>
                        <TableCell className="text-red-500">-$500,000</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Enterprise Services</TableCell>
                        <TableCell>$1,000,000</TableCell>
                        <TableCell>$1,100,000</TableCell>
                        <TableCell className="text-red-500">-$100,000</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-3">Top 5 Over/Under Spending Initiatives</h3>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Initiative Name</TableHead>
                        <TableHead>Budget (Q2 2025)</TableHead>
                        <TableHead>Actual Spend (Q2 2025)</TableHead>
                        <TableHead>Variance</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>LifePro Version 20 Upgrade</TableCell>
                        <TableCell>$800,000</TableCell>
                        <TableCell>$950,000</TableCell>
                        <TableCell className="text-red-500">-$150,000</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Consumer Data Enablement - Policy Hub</TableCell>
                        <TableCell>$400,000</TableCell>
                        <TableCell>$520,000</TableCell>
                        <TableCell className="text-red-500">-$120,000</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Automation WFM</TableCell>
                        <TableCell>$350,000</TableCell>
                        <TableCell>$450,000</TableCell>
                        <TableCell className="text-red-500">-$100,000</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Discovery - Mainframe Hosting</TableCell>
                        <TableCell>$600,000</TableCell>
                        <TableCell>$500,000</TableCell>
                        <TableCell className="text-green-500">+$100,000</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Content Strategy Development</TableCell>
                        <TableCell>$250,000</TableCell>
                        <TableCell>$180,000</TableCell>
                        <TableCell className="text-green-500">+$70,000</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </div>
            </CardContent>
            <CardFooter className="text-sm text-muted-foreground">
              Note: Data is sourced from McKinsey Wave. Actual spend data is collected during L3 and L4 reviews.
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Initiative Cost & Benefit Overview Report */}
        <TabsContent value="cost-benefit" className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Initiative Cost & Estimated Benefit Overview</CardTitle>
                  <CardDescription>Data as of May 15, 2025 | Source: McKinsey Wave</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Printer className="mr-2 h-4 w-4" />
                    Print
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    Export CSV
                  </Button>
                  <Button size="sm">
                    <FileText className="mr-2 h-4 w-4" />
                    Export PDF
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Initiative #</TableHead>
                    <TableHead>Initiative Name</TableHead>
                    <TableHead>Workstream</TableHead>
                    <TableHead>Total Est. One-Time Cost</TableHead>
                    <TableHead>Total Est. Ongoing Cost (Next 3 Yrs)</TableHead>
                    <TableHead>Total Est. Net Benefit</TableHead>
                    <TableHead>Est. ROI (%)</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>9814</TableCell>
                    <TableCell>LifePro Version 20 Upgrade</TableCell>
                    <TableCell>App Development</TableCell>
                    <TableCell>$2,450,000</TableCell>
                    <TableCell>$750,000</TableCell>
                    <TableCell>$4,200,000</TableCell>
                    <TableCell className="font-medium text-green-500">131.3%</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>15773</TableCell>
                    <TableCell>External Consumer Data and Information Source</TableCell>
                    <TableCell>App Development</TableCell>
                    <TableCell>$1,850,000</TableCell>
                    <TableCell>$620,000</TableCell>
                    <TableCell>$3,100,000</TableCell>
                    <TableCell className="font-medium text-green-500">125.5%</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>118</TableCell>
                    <TableCell>EI: Develop a content strategy</TableCell>
                    <TableCell>Customer Ops</TableCell>
                    <TableCell>$670,700</TableCell>
                    <TableCell>$0</TableCell>
                    <TableCell>$1,255,500</TableCell>
                    <TableCell className="font-medium text-green-500">87.2%</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>179</TableCell>
                    <TableCell>Customer Care Contact Center VC Implementation</TableCell>
                    <TableCell>Customer Ops</TableCell>
                    <TableCell>$523,600</TableCell>
                    <TableCell>$149,100</TableCell>
                    <TableCell>-$304,300</TableCell>
                    <TableCell className="font-medium text-red-500">-45.2%</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>2145</TableCell>
                    <TableCell>Automation WFM</TableCell>
                    <TableCell>Data & Analytics</TableCell>
                    <TableCell>$980,000</TableCell>
                    <TableCell>$320,000</TableCell>
                    <TableCell>$1,274,000</TableCell>
                    <TableCell className="font-medium text-green-500">98.0%</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter className="text-sm text-muted-foreground">
              Note: Estimated ROI is calculated as (Total Est. Net Benefit) / (Total Est. One-Time Cost + Total Est.
              Ongoing Cost for defined period)
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Portfolio Composition Report */}
        <TabsContent value="portfolio-composition" className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Portfolio Composition by Theme/Filter</CardTitle>
                  <CardDescription>Data as of May 15, 2025 | Source: McKinsey Wave</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Printer className="mr-2 h-4 w-4" />
                    Print
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    Export CSV
                  </Button>
                  <Button size="sm">
                    <FileText className="mr-2 h-4 w-4" />
                    Export PDF
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-3">By Theme / Policy Administration</h3>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Theme / Policy Administration</TableHead>
                        <TableHead>Number of Initiatives</TableHead>
                        <TableHead>Total Estimated Budget</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>CIO - Policy Administration</TableCell>
                        <TableCell>5</TableCell>
                        <TableCell>$8,750,000</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>No Theme Set</TableCell>
                        <TableCell>20</TableCell>
                        <TableCell>$24,500,000</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>CIO - Claims</TableCell>
                        <TableCell>3</TableCell>
                        <TableCell>$5,200,000</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>CIO - Customer Experience</TableCell>
                        <TableCell>8</TableCell>
                        <TableCell>$7,300,000</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>CIO - Infrastructure</TableCell>
                        <TableCell>4</TableCell>
                        <TableCell>$4,250,000</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-3">By Filter / Category</h3>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Filter / Category</TableHead>
                        <TableHead>Number of Initiatives</TableHead>
                        <TableHead>Total Estimated Budget</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>Modernize Core</TableCell>
                        <TableCell>8</TableCell>
                        <TableCell>$15,800,000</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Mandatory - Business Compliance</TableCell>
                        <TableCell>6</TableCell>
                        <TableCell>$9,500,000</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>In Flight Carry Over</TableCell>
                        <TableCell>15</TableCell>
                        <TableCell>$12,700,000</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Longer Term Growth</TableCell>
                        <TableCell>3</TableCell>
                        <TableCell>$7,800,000</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Mandatory - KTLO</TableCell>
                        <TableCell>2</TableCell>
                        <TableCell>$4,200,000</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </div>
            </CardContent>
            <CardFooter className="text-sm text-muted-foreground">
              Note: Data aggregated by counting initiatives and summing their "Total" one-time costs from Wave, grouped
              by the Theme/Filter values.
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Initiative Detail Sheet */}
        <TabsContent value="initiative-detail" className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-4 mb-2">
                    <CardTitle>Initiative Detail Sheet</CardTitle>
                    <Select value={selectedInitiative} onValueChange={setSelectedInitiative} className="w-[350px]">
                      <SelectTrigger>
                        <SelectValue placeholder="Select initiative" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="9814">9814 - LifePro Version 20 Upgrade</SelectItem>
                        <SelectItem value="15773">15773 - External Consumer Data and Information Source</SelectItem>
                        <SelectItem value="118">118 - EI: Develop a content strategy</SelectItem>
                        <SelectItem value="179">179 - Customer Care Contact Center VC Implementation</SelectItem>
                        <SelectItem value="2145">2145 - Automation WFM</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <CardDescription>Data as of May 15, 2025 | Source: McKinsey Wave</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Printer className="mr-2 h-4 w-4" />
                    Print
                  </Button>
                  <Button size="sm">
                    <FileText className="mr-2 h-4 w-4" />
                    Export PDF
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">Initiative Details</h3>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="text-sm font-medium">Initiative Name:</div>
                      <div className="text-sm">LifePro Version 20 Upgrade</div>

                      <div className="text-sm font-medium">Initiative #:</div>
                      <div className="text-sm">9814</div>

                      <div className="text-sm font-medium">Workstream:</div>
                      <div className="text-sm">Application Development</div>

                      <div className="text-sm font-medium">Theme/Policy:</div>
                      <div className="text-sm">CIO - Policy Administration</div>

                      <div className="text-sm font-medium">Filter/Category:</div>
                      <div className="text-sm">
                        <Badge variant="outline">Modernize Core</Badge>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">One-Time Costs by Year</h3>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>2023</TableHead>
                          <TableHead>2024</TableHead>
                          <TableHead>2025</TableHead>
                          <TableHead>2026</TableHead>
                          <TableHead>Total</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell>$450,000</TableCell>
                          <TableCell>$1,200,000</TableCell>
                          <TableCell>$800,000</TableCell>
                          <TableCell>$0</TableCell>
                          <TableCell className="font-medium">$2,450,000</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">Ongoing Costs by Year (Next 5 Years)</h3>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>2025</TableHead>
                          <TableHead>2026</TableHead>
                          <TableHead>2027</TableHead>
                          <TableHead>2028</TableHead>
                          <TableHead>2029</TableHead>
                          <TableHead>Total (Next 5 Yrs)</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell>$150,000</TableCell>
                          <TableCell>$200,000</TableCell>
                          <TableCell>$250,000</TableCell>
                          <TableCell>$250,000</TableCell>
                          <TableCell>$250,000</TableCell>
                          <TableCell className="font-medium">$1,100,000</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">Net Benefits by Year (Projected)</h3>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>2025</TableHead>
                          <TableHead>2026</TableHead>
                          <TableHead>2027</TableHead>
                          <TableHead>2028</TableHead>
                          <TableHead>Total Projected</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell>$800,000</TableCell>
                          <TableCell>$1,100,000</TableCell>
                          <TableCell>$1,200,000</TableCell>
                          <TableCell>$1,100,000</TableCell>
                          <TableCell className="font-medium">$4,200,000</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>

                  <div className="mt-6 p-4 bg-muted/30 rounded-lg">
                    <div className="text-lg font-medium mb-2">Estimated Lifetime ROI</div>
                    <div className="text-3xl font-bold text-green-500">131.3%</div>
                    <p className="text-sm text-muted-foreground mt-1">
                      Calculation: (Total Est. Net Benefit) / (Total Est. One-Time Cost + Total Est. Ongoing Cost for
                      defined period)
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="text-sm text-muted-foreground">
              Note: All financial figures are based on latest estimates from McKinsey Wave as of May 15, 2025.
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
