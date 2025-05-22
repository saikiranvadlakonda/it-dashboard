import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export function SecurityMetrics() {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-bold">Compliance & Testing Score</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
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
      </CardContent>
    </Card>
  )
}
