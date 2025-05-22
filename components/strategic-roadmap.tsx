import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function StrategicRoadmap() {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-bold">Roadmap Alignment Layer</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="rounded-md border p-3">
          <div className="flex flex-wrap items-start justify-between gap-2">
            <div>
              <div className="font-medium">Q2 OKRs</div>
              <div className="mt-1 text-sm">Improve Broker Portal Speed by 20%</div>
            </div>
            <Badge variant="outline" className="border-amber-500 text-amber-500">
              At Risk
            </Badge>
          </div>
          <div className="mt-3 space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Initiative:</span>
              <span>WealthSync Modernization</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Owner:</span>
              <span>Wealth Product + Team Alpha</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Risk:</span>
              <span className="text-amber-500">API Latency</span>
            </div>
          </div>
        </div>

        <div className="rounded-md border p-3">
          <div className="flex flex-wrap items-start justify-between gap-2">
            <div>
              <div className="font-medium">Q2 OKRs</div>
              <div className="mt-1 text-sm">Reduce Authentication Failures by 50%</div>
            </div>
            <Badge variant="outline" className="border-green-500 text-green-500">
              On Track
            </Badge>
          </div>
          <div className="mt-3 space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Initiative:</span>
              <span>Identity Platform Upgrade</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Owner:</span>
              <span>Security Team + Team Gamma</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Progress:</span>
              <span className="text-green-500">75% Complete</span>
            </div>
          </div>
        </div>

        <div className="rounded-md border p-3">
          <div className="flex flex-wrap items-start justify-between gap-2">
            <div>
              <div className="font-medium">Q3 Planning</div>
              <div className="mt-1 text-sm">Launch Mobile Claims Processing</div>
            </div>
            <Badge variant="outline" className="border-blue-500 text-blue-500">
              Planning
            </Badge>
          </div>
          <div className="mt-3 space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Initiative:</span>
              <span>Insurance Digital Transformation</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Owner:</span>
              <span>Insurance Product + Team Zeta</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Status:</span>
              <span>Requirements Gathering</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
