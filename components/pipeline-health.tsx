import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export function PipelineHealth() {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-bold">CI/CD Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="text-sm font-medium">Build Success Rate</div>
            <div className="text-sm font-medium text-green-600">91.2%</div>
          </div>
          <Progress value={91.2} className="h-2" />
          <div className="text-xs text-muted-foreground">Last 7 days: 152 successful builds out of 167</div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="text-sm font-medium">Average Build Time</div>
            <div className="text-sm font-medium">13.2 mins</div>
          </div>
          <div className="h-10 rounded-md bg-muted p-2">
            <div className="flex justify-between text-xs">
              <span>Fastest: 8.4 mins</span>
              <span>Slowest: 22.1 mins</span>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="text-sm font-medium">Release Volume</div>
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-md border p-3 text-center">
              <div className="text-2xl font-bold">18</div>
              <div className="text-xs text-muted-foreground">This Month</div>
            </div>
            <div className="rounded-md border p-3 text-center">
              <div className="text-2xl font-bold">4</div>
              <div className="text-xs text-muted-foreground">This Week</div>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="text-sm font-medium">Failed Deployments</div>
          <div className="rounded-md border">
            <div className="border-b p-2 text-xs font-medium">Project (Failures)</div>
            <div className="space-y-1 p-2">
              <div className="flex justify-between text-sm">
                <span>Apex Core</span>
                <span className="font-medium text-red-500">3</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>OIPA UI</span>
                <span className="font-medium text-red-500">1</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
