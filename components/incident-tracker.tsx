"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AlertCircle, Bell, Clock, PhoneCall } from "lucide-react"

const incidents = [
  {
    id: "INC-001",
    title: "View Service Outage",
    severity: "High",
    status: "Open",
    startTime: "2 hours ago",
    assignee: "Alex M.",
    service: "View Service",
  },
  {
    id: "INC-002",
    title: "Sitecore Content Publishing Failure",
    severity: "Medium",
    status: "Open",
    startTime: "5 hours ago",
    assignee: "Sarah L.",
    service: "Sitecore",
  },
  {
    id: "INC-003",
    title: "API Gateway Latency",
    severity: "Low",
    status: "Open",
    startTime: "1 day ago",
    assignee: "Michael T.",
    service: "API Gateway",
  },
]

export function IncidentTracker() {
  const [activeTab, setActiveTab] = useState("open")

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xl font-bold">Incident Response Tracker</CardTitle>
        <Button variant="outline" size="sm" className="gap-1">
          <Bell className="h-4 w-4" />
          <span className="hidden sm:inline">Alerts</span>
        </Button>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="open" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="open">
              Open
              <Badge variant="secondary" className="ml-1">
                {incidents.filter((i) => i.status === "Open").length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="resolved">Resolved</TabsTrigger>
            <TabsTrigger value="stats">Stats</TabsTrigger>
          </TabsList>
          <TabsContent value="open" className="mt-4 space-y-4">
            {incidents.map((incident) => (
              <div key={incident.id} className="rounded-md border p-3">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <AlertCircle
                        className={
                          incident.severity === "High"
                            ? "h-4 w-4 text-red-500"
                            : incident.severity === "Medium"
                              ? "h-4 w-4 text-amber-500"
                              : "h-4 w-4 text-yellow-500"
                        }
                      />
                      <span className="font-medium">{incident.title}</span>
                    </div>
                    <div className="mt-1 text-xs text-muted-foreground">
                      {incident.id} • {incident.service}
                    </div>
                  </div>
                  <Badge
                    variant={incident.severity === "High" ? "destructive" : "outline"}
                    className={
                      incident.severity === "Medium"
                        ? "border-amber-500 text-amber-500"
                        : incident.severity === "Low"
                          ? "border-yellow-500 text-yellow-500"
                          : ""
                    }
                  >
                    {incident.severity}
                  </Badge>
                </div>
                <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-sm">
                  <div className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                    <span>{incident.startTime}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground">Assignee:</span>
                    <span>{incident.assignee}</span>
                    <Button variant="ghost" size="icon" className="h-6 w-6">
                      <PhoneCall className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </TabsContent>
          <TabsContent value="resolved" className="mt-4">
            <div className="rounded-md border border-dashed p-8 text-center">
              <div className="text-muted-foreground">No resolved incidents in the last 24 hours</div>
            </div>
          </TabsContent>
          <TabsContent value="stats" className="mt-4">
            <div className="space-y-4">
              <div className="rounded-md border p-3">
                <div className="text-sm font-medium">MTTR (Mean Time to Resolution)</div>
                <div className="mt-2 text-2xl font-bold">2.1 hrs</div>
                <div className="mt-1 text-xs text-muted-foreground">Last 30 days average</div>
              </div>

              <div className="rounded-md border p-3">
                <div className="text-sm font-medium">Top Services by Alert Volume</div>
                <div className="mt-2 space-y-2">
                  <div className="flex justify-between">
                    <span>View Service</span>
                    <span className="font-medium">8 alerts</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sitecore</span>
                    <span className="font-medium">3 alerts</span>
                  </div>
                  <div className="flex justify-between">
                    <span>API Gateway</span>
                    <span className="font-medium">2 alerts</span>
                  </div>
                </div>
              </div>

              <div className="rounded-md border p-3">
                <div className="text-sm font-medium">On-Call Rotation</div>
                <div className="mt-2">
                  <div className="font-medium">Alex M. (CRM Ops)</div>
                  <div className="text-xs text-muted-foreground">Until May 16, 9:00 AM</div>
                </div>
                <div className="mt-2">
                  <div className="text-xs text-muted-foreground">Next on-call:</div>
                  <div className="text-sm">Sarah L. (Platform Ops)</div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
