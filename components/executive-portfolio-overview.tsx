"use client"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

export function ExecutivePortfolioOverview() {
  return (
    <div className="space-y-6">
      {/* Metric Cards */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 mb-8">
        <div className="rounded-lg border bg-card p-3 shadow-sm">
          <div className="text-sm font-medium text-muted-foreground">Total Initiatives</div>
          <div className="text-2xl font-bold">50</div>
          <div className="text-xs text-muted-foreground">Active initiatives</div>
        </div>
        <div className="rounded-lg border bg-card p-3 shadow-sm">
          <div className="text-sm font-medium text-muted-foreground">Total Workstreams</div>
          <div className="text-2xl font-bold">12</div>
          <div className="text-xs text-muted-foreground">Across portfolio</div>
        </div>
        <div className="rounded-lg border bg-card p-3 shadow-sm">
          <div className="text-sm font-medium text-muted-foreground">Estimated Budget</div>
          <div className="text-2xl font-bold">$50M</div>
          <div className="text-xs text-muted-foreground">One-time costs</div>
        </div>
        <div className="rounded-lg border bg-card p-3 shadow-sm">
          <div className="text-sm font-medium text-muted-foreground">Estimated ROI</div>
          <div className="text-2xl font-bold text-green-600">175%</div>
          <div className="text-xs text-muted-foreground">Portfolio-wide</div>
        </div>
      </div>

      {/* New row for the P1 incidents card */}
      <div className="mb-8">
        <div className="rounded-lg border bg-card p-3 shadow-sm">
          <div className="text-sm font-medium text-muted-foreground">Open Critical Incidents (P1s)</div>
          <div className="text-2xl font-bold text-red-600">3</div>
          <div className="text-xs text-muted-foreground">Requiring immediate attention</div>
        </div>
      </div>

      {/* Initiative Distribution Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Status</CardTitle>
            <CardDescription>Initiative distribution by category</CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="flex justify-center py-4">
              {/* Donut Chart showing initiative distribution by category */}
              <div className="relative h-48 w-48">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-2xl font-bold">50</div>
                </div>
                <div
                  className="h-full w-full rounded-full border-8 border-blue-500"
                  style={{ borderRightColor: "orange", borderBottomColor: "red", borderLeftColor: "green" }}
                ></div>
              </div>
            </div>
            <div className="flex justify-center gap-4 mt-2">
              <div className="flex items-center gap-1">
                <div className="h-3 w-3 rounded-full bg-blue-500"></div>
                <span className="text-sm">Modernize Core (20)</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="h-3 w-3 rounded-full bg-orange-500"></div>
                <span className="text-sm">Compliance (15)</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="h-3 w-3 rounded-full bg-red-500"></div>
                <span className="text-sm">Growth (10)</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="h-3 w-3 rounded-full bg-green-500"></div>
                <span className="text-sm">Other (5)</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Workstream Distribution</CardTitle>
            <CardDescription>Initiatives by workstream</CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="flex justify-center py-4">
              {/* Donut Chart showing initiative distribution by workstream */}
              <div className="relative h-48 w-48">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-2xl font-bold">50</div>
                </div>
                <div
                  className="h-full w-full rounded-full border-8 border-purple-500"
                  style={{ borderRightColor: "teal", borderBottomColor: "indigo", borderLeftColor: "cyan" }}
                ></div>
              </div>
            </div>
            <div className="flex justify-center gap-4 mt-2 flex-wrap">
              <div className="flex items-center gap-1">
                <div className="h-3 w-3 rounded-full bg-purple-500"></div>
                <span className="text-sm">App Development (22)</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="h-3 w-3 rounded-full bg-teal-500"></div>
                <span className="text-sm">Data & Analytics (15)</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="h-3 w-3 rounded-full bg-indigo-500"></div>
                <span className="text-sm">Infrastructure (8)</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="h-3 w-3 rounded-full bg-cyan-500"></div>
                <span className="text-sm">Other (5)</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Strategic Objective Alignment */}
      <Card>
        <CardHeader>
          <CardTitle>Strategic Objective Alignment</CardTitle>
          <CardDescription>Initiatives by strategic category</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <ObjectiveBar title="Modernize Core" total={20} category="Modernize Core" />
            <ObjectiveBar title="Mandatory - Business Compliance" total={15} category="Compliance" />
            <ObjectiveBar title="Longer Term Growth" total={10} category="Growth" />
            <ObjectiveBar title="In Flight Carry Over" total={3} category="Other" />
            <ObjectiveBar title="Other Categories" total={2} category="Other" />
          </div>
        </CardContent>
      </Card>

      {/* Initiative Focus Areas - Tabbed Section */}
      <Card>
        <CardHeader>
          <CardTitle>Initiative Focus Areas</CardTitle>
          <CardDescription>Distribution by imperative and workstream</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="imperative">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="imperative">By Imperative</TabsTrigger>
              <TabsTrigger value="workstream">By Workstream</TabsTrigger>
            </TabsList>
            <TabsContent value="imperative" className="pt-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FocusCard
                  name="Core Modernization"
                  initiatives={15}
                  category="Modernize Core"
                  description="Platform upgrades and modernization"
                />
                <FocusCard
                  name="Product Framework"
                  initiatives={10}
                  category="Growth"
                  description="New product capabilities"
                />
                <FocusCard
                  name="Regulatory Compliance"
                  initiatives={8}
                  category="Compliance"
                  description="Meeting regulatory requirements"
                />
                <FocusCard
                  name="Digital Experience"
                  initiatives={7}
                  category="Growth"
                  description="Customer-facing improvements"
                />
                <FocusCard
                  name="Data Foundation"
                  initiatives={6}
                  category="Modernize Core"
                  description="Data infrastructure and governance"
                />
                <FocusCard
                  name="Security Enhancement"
                  initiatives={4}
                  category="Compliance"
                  description="Security and risk mitigation"
                />
              </div>
            </TabsContent>
            <TabsContent value="workstream" className="pt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-4">
                  <h3 className="font-medium text-sm">Application Development</h3>
                  <div className="space-y-2">
                    <WorkstreamItem name="Core Systems" initiatives={8} />
                    <WorkstreamItem name="Digital Channels" initiatives={6} />
                    <WorkstreamItem name="Integration" initiatives={5} />
                    <WorkstreamItem name="Other App Dev" initiatives={3} />
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="font-medium text-sm">Data & Analytics</h3>
                  <div className="space-y-2">
                    <WorkstreamItem name="Data Warehouse" initiatives={6} />
                    <WorkstreamItem name="Business Intelligence" initiatives={5} />
                    <WorkstreamItem name="Data Governance" initiatives={4} />
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="font-medium text-sm">Infrastructure & Operations</h3>
                  <div className="space-y-2">
                    <WorkstreamItem name="Cloud Migration" initiatives={4} />
                    <WorkstreamItem name="Network" initiatives={2} />
                    <WorkstreamItem name="Security" initiatives={2} />
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="font-medium text-sm">Other Workstreams</h3>
                  <div className="space-y-2">
                    <WorkstreamItem name="Enterprise Architecture" initiatives={3} />
                    <WorkstreamItem name="Project Management" initiatives={2} />
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* New section for Critical Application Focus (renamed from Key Systems Hotspot) */}
      {/* This is a placeholder since the original file didn't have this section */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Critical Application Focus</CardTitle>
          <CardDescription>Key systems status and modernization efforts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <SystemCard name="LifePro" status="At Risk" incidents={2} isModernizeCore={true} />
              <SystemCard name="ClaimCenter" status="Stable" incidents={0} isModernizeCore={true} />
              <SystemCard name="PolicyCenter" status="Warning" incidents={1} isModernizeCore={false} />
              <SystemCard name="BillingCenter" status="Stable" incidents={0} isModernizeCore={false} />
              <SystemCard name="CustomerPortal" status="Stable" incidents={0} isModernizeCore={true} />
              <SystemCard name="AgentPortal" status="Warning" incidents={1} isModernizeCore={false} />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* New section for Top Delivery & Initiative Risks (renamed from Top Portfolio Risks) */}
      {/* This is a placeholder since the original file didn't have this section */}
      <Card>
        <CardHeader>
          <CardTitle>Top Delivery & Initiative Risks</CardTitle>
          <CardDescription>Highest priority risks requiring attention</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <RiskItem
              title="LifePro Version 20 Upgrade Resource Constraints"
              impact="High"
              probability="Medium"
              category="Resource"
            />
            <RiskItem title="Data Migration Timeline Slippage" impact="High" probability="High" category="Schedule" />
            <RiskItem title="Vendor Delivery Delays" impact="Medium" probability="High" category="Vendor" />
            <RiskItem
              title="Integration Testing Coverage Gaps"
              impact="Medium"
              probability="Medium"
              category="Quality"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function ObjectiveBar({ title, total, category }: { title: string; total: number; category: string }) {
  const getColor = (category: string) => {
    switch (category) {
      case "Modernize Core":
        return "bg-blue-500"
      case "Compliance":
        return "bg-orange-500"
      case "Growth":
        return "bg-red-500"
      default:
        return "bg-green-500"
    }
  }

  return (
    <div className="space-y-1">
      <div className="flex justify-between items-center">
        <span className="font-medium text-sm">{title}</span>
        <span className="text-sm text-muted-foreground">{total} Initiatives</span>
      </div>
      <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
        <div className={`h-full ${getColor(category)}`} style={{ width: `${(total / 50) * 100}%` }}></div>
      </div>
    </div>
  )
}

function FocusCard({
  name,
  initiatives,
  category,
  description,
}: {
  name: string
  initiatives: number
  category: string
  description: string
}) {
  const getBorderColor = (category: string) => {
    switch (category) {
      case "Modernize Core":
        return "border-l-blue-500"
      case "Compliance":
        return "border-l-orange-500"
      case "Growth":
        return "border-l-red-500"
      default:
        return "border-l-green-500"
    }
  }

  return (
    <Card className={`border-l-4 ${getBorderColor(category)}`}>
      <CardContent className="p-4">
        <h4 className="font-semibold">{name}</h4>
        <div className="flex items-center gap-1 mt-1">
          <span className="text-sm text-muted-foreground">{initiatives} initiatives</span>
          <span className="text-xs px-1.5 py-0.5 rounded-full bg-muted">{description}</span>
        </div>
      </CardContent>
    </Card>
  )
}

function WorkstreamItem({ name, initiatives }: { name: string; initiatives: number }) {
  return (
    <div className="flex justify-between items-center p-2 border rounded-md">
      <span className="font-medium text-sm">{name}</span>
      <Badge variant="outline">{initiatives}</Badge>
    </div>
  )
}

// Add the new SystemCard component at the end of the file
function SystemCard({
  name,
  status,
  incidents,
  isModernizeCore,
}: {
  name: string
  status: "Stable" | "Warning" | "At Risk"
  incidents: number
  isModernizeCore: boolean
}) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Stable":
        return "bg-green-500"
      case "Warning":
        return "bg-yellow-500"
      case "At Risk":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <div className="border rounded-md p-4 relative">
      {isModernizeCore && (
        <div
          className="absolute top-2 right-2 h-3 w-3 rounded-full bg-blue-500"
          title="Modernize Core Initiative"
        ></div>
      )}
      <div className="flex items-center gap-2 mb-2">
        <div className={`h-3 w-3 rounded-full ${getStatusColor(status)}`}></div>
        <h3 className="font-medium">{name}</h3>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-sm text-muted-foreground">Status: {status}</span>
        <span className={`text-sm ${incidents > 0 ? "text-red-500" : "text-green-500"}`}>
          {incidents} {incidents === 1 ? "incident" : "incidents"}
        </span>
      </div>
    </div>
  )
}

// Add the new RiskItem component at the end of the file
function RiskItem({
  title,
  impact,
  probability,
  category,
}: {
  title: string
  impact: "Low" | "Medium" | "High"
  probability: "Low" | "Medium" | "High"
  category: string
}) {
  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "Low":
        return "bg-green-100 text-green-800"
      case "Medium":
        return "bg-yellow-100 text-yellow-800"
      case "High":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getProbabilityColor = (probability: string) => {
    switch (probability) {
      case "Low":
        return "bg-green-100 text-green-800"
      case "Medium":
        return "bg-yellow-100 text-yellow-800"
      case "High":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="border rounded-md p-4">
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-medium">{title}</h3>
        <Badge variant="outline">{category}</Badge>
      </div>
      <div className="flex gap-2 mt-2">
        <span className={`text-xs px-2 py-1 rounded-full ${getImpactColor(impact)}`}>Impact: {impact}</span>
        <span className={`text-xs px-2 py-1 rounded-full ${getProbabilityColor(probability)}`}>
          Probability: {probability}
        </span>
      </div>
    </div>
  )
}
