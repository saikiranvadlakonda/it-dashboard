import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

const segments = [
  {
    name: "Wealth Segment",
    projects: 12,
    teams: 6,
    onTrack: 8,
    atRisk: 3,
    platforms: ["FAST", "LifePro", "RPS"],
    intakes: 19,
    roi: "$2.3M",
    risks: 5,
    onTrackPercent: 72,
  },
  {
    name: "Commercial Segment",
    projects: 9,
    teams: 4,
    onTrack: 7,
    atRisk: 2,
    platforms: ["Apex", "Salesforce", "Guidewire"],
    intakes: 14,
    roi: "$1.8M",
    risks: 3,
    onTrackPercent: 78,
  },
  {
    name: "Retail Segment",
    projects: 15,
    teams: 8,
    onTrack: 11,
    atRisk: 4,
    platforms: ["Fiserv", "Temenos", "Backbase"],
    intakes: 22,
    roi: "$3.1M",
    risks: 7,
    onTrackPercent: 73,
  },
  {
    name: "Insurance Segment",
    projects: 10,
    teams: 5,
    onTrack: 6,
    atRisk: 4,
    platforms: ["OIPA", "Guidewire", "Duck Creek"],
    intakes: 16,
    roi: "$2.5M",
    risks: 6,
    onTrackPercent: 60,
  },
  {
    name: "Lending Segment",
    projects: 8,
    teams: 4,
    onTrack: 5,
    atRisk: 3,
    platforms: ["nCino", "Mortgage Cadence", "Encompass"],
    intakes: 12,
    roi: "$1.7M",
    risks: 4,
    onTrackPercent: 63,
  },
  {
    name: "Payments Segment",
    projects: 11,
    teams: 6,
    onTrack: 9,
    atRisk: 2,
    platforms: ["FIS", "Stripe", "PayPal"],
    intakes: 17,
    roi: "$2.9M",
    risks: 3,
    onTrackPercent: 82,
  },
]

export function SegmentOverview() {
  return (
    <>
      {segments.map((segment) => (
        <Card key={segment.name} className="overflow-hidden">
          <CardHeader className="bg-muted/50 pb-2">
            <CardTitle className="flex items-center justify-between text-lg">
              {segment.name}
              <Badge
                variant={segment.onTrackPercent > 70 ? "default" : "outline"}
                className={
                  segment.onTrackPercent > 70 ? "bg-green-500 hover:bg-green-500" : "border-amber-500 text-amber-500"
                }
              >
                {segment.onTrackPercent}% On-Track
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="space-y-4 text-sm">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-muted-foreground">Active Projects</div>
                  <div className="text-xl font-medium">{segment.projects}</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Teams</div>
                  <div className="text-xl font-medium">{segment.teams}</div>
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Progress</span>
                  <span className="font-medium">{segment.onTrackPercent}%</span>
                </div>
                <Progress value={segment.onTrackPercent} className="h-2" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-muted-foreground">Intakes This Quarter</div>
                  <div className="text-xl font-medium">{segment.intakes}</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Est. Value (ROI)</div>
                  <div className="text-xl font-medium text-green-600">{segment.roi}</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-muted-foreground">Open Risks</div>
                  <div className="text-xl font-medium text-amber-500">{segment.risks}</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Key Systems</div>
                  <div className="mt-1 flex flex-wrap gap-1">
                    {segment.platforms.map((platform) => (
                      <Badge key={platform} variant="outline" className="text-xs">
                        {platform}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </>
  )
}
