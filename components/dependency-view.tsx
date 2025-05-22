"use client"

import React from "react"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

const dependencies = [
  {
    project: "WealthSync",
    dependsOn: "FAST Retirement API",
    status: "Delayed",
    blockedSince: "6 days",
    impact: ["Team Alpha", "Team Tau"],
  },
  {
    project: "Commercial Lending Platform",
    dependsOn: "Apex Core Services",
    status: "On Track",
    blockedSince: "0 days",
    impact: ["Team Beta"],
  },
  {
    project: "Retail Mobile Banking",
    dependsOn: "Authentication Service",
    status: "Delayed",
    blockedSince: "3 days",
    impact: ["Team Delta", "Team Epsilon"],
  },
  {
    project: "Insurance Claims Processing",
    dependsOn: "OIPA Integration",
    status: "Blocked",
    blockedSince: "12 days",
    impact: ["Team Zeta", "Team Eta"],
  },
]

export function DependencyView() {
  const [view, setView] = useState("matrix")

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xl font-bold">Dependency & Conflict Tracker</CardTitle>
        <Select defaultValue={view} onValueChange={setView}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select View" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="matrix">Matrix View</SelectItem>
            <SelectItem value="network">Network View</SelectItem>
            <SelectItem value="list">List View</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="blocked">Blocked</TabsTrigger>
            <TabsTrigger value="delayed">Delayed</TabsTrigger>
            <TabsTrigger value="ontrack">On Track</TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="mt-4">
            {view === "matrix" ? (
              <DependencyMatrix dependencies={dependencies} />
            ) : view === "network" ? (
              <DependencyNetwork dependencies={dependencies} />
            ) : (
              <DependencyList dependencies={dependencies} />
            )}
          </TabsContent>
          <TabsContent value="blocked" className="mt-4">
            {view === "matrix" ? (
              <DependencyMatrix dependencies={dependencies.filter((d) => d.status === "Blocked")} />
            ) : view === "network" ? (
              <DependencyNetwork dependencies={dependencies.filter((d) => d.status === "Blocked")} />
            ) : (
              <DependencyList dependencies={dependencies.filter((d) => d.status === "Blocked")} />
            )}
          </TabsContent>
          <TabsContent value="delayed" className="mt-4">
            {view === "matrix" ? (
              <DependencyMatrix dependencies={dependencies.filter((d) => d.status === "Delayed")} />
            ) : view === "network" ? (
              <DependencyNetwork dependencies={dependencies.filter((d) => d.status === "Delayed")} />
            ) : (
              <DependencyList dependencies={dependencies.filter((d) => d.status === "Delayed")} />
            )}
          </TabsContent>
          <TabsContent value="ontrack" className="mt-4">
            {view === "matrix" ? (
              <DependencyMatrix dependencies={dependencies.filter((d) => d.status === "On Track")} />
            ) : view === "network" ? (
              <DependencyNetwork dependencies={dependencies.filter((d) => d.status === "On Track")} />
            ) : (
              <DependencyList dependencies={dependencies.filter((d) => d.status === "On Track")} />
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

function DependencyMatrix({ dependencies }) {
  return (
    <div className="h-[300px] w-full overflow-auto rounded-md border">
      <div className="grid min-w-[600px]" style={{ gridTemplateColumns: "1fr 1fr" }}>
        {/* Header */}
        <div className="border-b border-r bg-muted p-3 font-medium">Project</div>
        <div className="border-b bg-muted p-3 font-medium">Depends On</div>

        {/* Rows */}
        {dependencies.map((dep, index) => (
          <React.Fragment key={index}>
            <div className="border-b border-r p-3">
              <div className="font-medium">{dep.project}</div>
              <div className="mt-1 text-sm text-muted-foreground">
                Blocked Since: {dep.blockedSince === "0 days" ? "Not Blocked" : dep.blockedSince}
              </div>
            </div>
            <div className="border-b p-3">
              <div className="flex items-center gap-2">
                <span>{dep.dependsOn}</span>
                <StatusBadge status={dep.status} />
              </div>
              <div className="mt-2 text-sm">
                <span className="text-muted-foreground">Impact: </span>
                <div className="mt-1 flex flex-wrap gap-1">
                  {dep.impact.map((team) => (
                    <Badge key={team} variant="outline" className="text-xs">
                      {team}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}

function DependencyNetwork({ dependencies }) {
  return (
    <div className="h-[400px] w-full rounded-md border p-4">
      <div className="flex h-full items-center justify-center">
        <div className="text-center text-muted-foreground">
          <div className="mb-2 text-lg font-medium">Network Visualization</div>
          <div className="text-sm">Interactive network graph showing project dependencies and relationships</div>
          <div className="mt-4 flex justify-center">
            <div className="relative h-[250px] w-[250px] rounded-full border border-dashed p-4">
              {dependencies.map((dep, index) => {
                const angle = (index / dependencies.length) * 2 * Math.PI
                const x = 100 + Math.cos(angle) * 100
                const y = 100 + Math.sin(angle) * 100

                return (
                  <div
                    key={index}
                    className="absolute flex h-10 w-10 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground"
                    style={{
                      left: `${x}px`,
                      top: `${y}px`,
                      transform: "translate(-50%, -50%)",
                    }}
                  >
                    {dep.project.substring(0, 2)}
                  </div>
                )
              })}
              <div className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-muted text-xs font-medium">
                Core Services
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function DependencyList({ dependencies }) {
  return (
    <div className="space-y-4">
      {dependencies.map((dep, index) => (
        <div key={index} className="rounded-md border p-4">
          <div className="flex flex-wrap items-start justify-between gap-2">
            <div>
              <div className="text-lg font-medium">{dep.project}</div>
              <div className="text-sm text-muted-foreground">Waiting on: {dep.dependsOn}</div>
            </div>
            <StatusBadge status={dep.status} />
          </div>
          <div className="mt-3 text-sm">
            <div>
              <span className="text-muted-foreground">Blocked Since: </span>
              <span className={dep.blockedSince !== "0 days" ? "text-red-500 font-medium" : ""}>
                {dep.blockedSince === "0 days" ? "Not Blocked" : dep.blockedSince}
              </span>
            </div>
            <div className="mt-2">
              <span className="text-muted-foreground">Impact: </span>
              <div className="flex flex-wrap gap-1">
                {dep.impact.map((team) => (
                  <Badge key={team} variant="outline" className="text-xs">
                    {team}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

function StatusBadge({ status }) {
  return (
    <Badge
      variant={status === "On Track" ? "default" : "outline"}
      className={
        status === "On Track"
          ? "bg-green-500 hover:bg-green-500"
          : status === "Delayed"
            ? "border-amber-500 text-amber-500"
            : "border-red-500 text-red-500"
      }
    >
      {status}
    </Badge>
  )
}
