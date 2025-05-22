"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function SprintHealth() {
  const [team, setTeam] = useState("sigma")

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xl font-bold">Agile Sprint Summary</CardTitle>
        <Select value={team} onValueChange={setTeam}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Team" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="sigma">Team Sigma</SelectItem>
            <SelectItem value="alpha">Team Alpha</SelectItem>
            <SelectItem value="beta">Team Beta</SelectItem>
            <SelectItem value="gamma">Team Gamma</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="burndown">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="burndown">Burndown</TabsTrigger>
            <TabsTrigger value="velocity">Velocity</TabsTrigger>
            <TabsTrigger value="aging">Aging Items</TabsTrigger>
          </TabsList>
          <TabsContent value="burndown" className="space-y-4">
            <div className="mt-4 h-[200px] w-full">
              <BurndownChart />
            </div>
            <div className="rounded-md bg-muted p-3">
              <p className="font-medium">Team Sigma – Sprint 23</p>
              <p className="text-sm text-muted-foreground">Burn Down: 35 → 5 points over 10 days</p>
            </div>
          </TabsContent>
          <TabsContent value="velocity" className="space-y-4">
            <div className="mt-4 h-[200px] w-full">
              <VelocityChart />
            </div>
            <div className="rounded-md bg-muted p-3">
              <p className="font-medium">Velocity (last 3 sprints)</p>
              <p className="text-sm text-muted-foreground">Sprint 20: 28 points</p>
              <p className="text-sm text-muted-foreground">Sprint 21: 30 points</p>
              <p className="text-sm text-muted-foreground">Sprint 22: 32 points</p>
            </div>
          </TabsContent>
          <TabsContent value="aging" className="space-y-4">
            <div className="rounded-md border">
              <div className="flex items-center justify-between border-b p-3">
                <div className="font-medium">Aging Work Items (&gt;30 Days)</div>
                <div className="text-sm text-muted-foreground">3 items</div>
              </div>
              <div className="p-3">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <div>
                      <div className="font-medium">API Integration Issue</div>
                      <div className="text-sm text-muted-foreground">FAST-123</div>
                    </div>
                    <div className="text-sm text-red-500">42 days</div>
                  </div>
                  <div className="flex justify-between">
                    <div>
                      <div className="font-medium">Security Vulnerability</div>
                      <div className="text-sm text-muted-foreground">SEC-456</div>
                    </div>
                    <div className="text-sm text-red-500">38 days</div>
                  </div>
                  <div className="flex justify-between">
                    <div>
                      <div className="font-medium">Performance Optimization</div>
                      <div className="text-sm text-muted-foreground">PERF-789</div>
                    </div>
                    <div className="text-sm text-amber-500">31 days</div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

function BurndownChart() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="relative h-full w-full">
        {/* X-axis */}
        <div className="absolute bottom-0 left-0 right-0 border-t border-border" />
        {/* Y-axis */}
        <div className="absolute bottom-0 left-0 top-0 border-r border-border" />

        {/* Ideal line */}
        <div className="absolute bottom-0 left-0 h-full w-full">
          <svg className="h-full w-full">
            <line x1="0" y1="0" x2="100%" y2="100%" stroke="#d1d5db" strokeWidth="2" strokeDasharray="5,5" />
          </svg>
        </div>

        {/* Actual line */}
        <div className="absolute bottom-0 left-0 h-full w-full">
          <svg className="h-full w-full">
            <polyline
              points="0,10 20,30 40,40 60,60 80,80 100,90"
              fill="none"
              stroke="hsl(var(--primary))"
              strokeWidth="3"
            />
          </svg>
        </div>

        {/* Labels */}
        <div className="absolute -bottom-6 left-0 right-0 flex justify-between text-xs text-muted-foreground">
          <span>Day 1</span>
          <span>Day 5</span>
          <span>Day 10</span>
        </div>
        <div className="absolute -left-6 top-0 bottom-0 flex flex-col justify-between text-xs text-muted-foreground">
          <span>35</span>
          <span>20</span>
          <span>5</span>
        </div>
      </div>
    </div>
  )
}

function VelocityChart() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="relative h-full w-full">
        {/* X-axis */}
        <div className="absolute bottom-0 left-0 right-0 border-t border-border" />

        {/* Bars */}
        <div className="absolute bottom-0 left-0 flex h-full w-full items-end justify-around">
          <div className="flex w-16 flex-col items-center">
            <div className="h-[112px] w-12 rounded-t-md bg-primary/70"></div>
            <span className="mt-2 text-xs text-muted-foreground">Sprint 20</span>
          </div>
          <div className="flex w-16 flex-col items-center">
            <div className="h-[120px] w-12 rounded-t-md bg-primary/80"></div>
            <span className="mt-2 text-xs text-muted-foreground">Sprint 21</span>
          </div>
          <div className="flex w-16 flex-col items-center">
            <div className="h-[128px] w-12 rounded-t-md bg-primary"></div>
            <span className="mt-2 text-xs text-muted-foreground">Sprint 22</span>
          </div>
        </div>

        {/* Y-axis labels */}
        <div className="absolute -left-6 top-0 bottom-0 flex flex-col justify-between text-xs text-muted-foreground">
          <span>35</span>
          <span>20</span>
          <span>0</span>
        </div>
      </div>
    </div>
  )
}
