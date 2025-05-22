"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

export function ProjectTimeline() {
  const [timeframe, setTimeframe] = useState("quarter")

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xl font-bold">Delivery Timeline (Gantt Style)</CardTitle>
        <Select value={timeframe} onValueChange={setTimeframe}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Timeframe" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="month">This Month</SelectItem>
            <SelectItem value="quarter">This Quarter</SelectItem>
            <SelectItem value="year">This Year</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="overflow-auto">
        <div className="min-w-[800px]">
          {/* Month Headers */}
          <div className="mb-4 grid grid-cols-6 text-center text-xs font-medium text-muted-foreground">
            <div>May</div>
            <div>June</div>
            <div>July</div>
            <div>August</div>
            <div>September</div>
            <div>October</div>
          </div>

          <div className="space-y-24">
            {/* WealthSync Retirement Portal */}
            <TimelineProject
              name="WealthSync Retirement Portal"
              segment="Wealth"
              duration="2 months"
              barStart={0}
              barWidth={33.3}
              milestones={[
                { position: 5, label: "Dev Started", status: "Completed" },
                { position: 20, label: "UAT", status: "In Progress" },
                { position: 30, label: "Release", status: "Upcoming" },
              ]}
            />

            {/* Commercial Lending Platform */}
            <TimelineProject
              name="Commercial Lending Platform"
              segment="Commercial"
              duration="3 months"
              barStart={16.7}
              barWidth={50}
              milestones={[
                { position: 25, label: "Dev Started", status: "Completed" },
                { position: 50, label: "UAT", status: "Upcoming" },
                { position: 65, label: "Release", status: "Upcoming" },
              ]}
            />

            {/* Retail Mobile Banking App */}
            <TimelineProject
              name="Retail Mobile Banking App"
              segment="Retail"
              duration="1.5 months"
              barStart={0}
              barWidth={25}
              milestones={[
                { position: 5, label: "Dev Started", status: "Completed" },
                { position: 15, label: "UAT", status: "In Progress" },
                { position: 23, label: "Release", status: "Upcoming" },
              ]}
            />

            {/* Insurance Claims Processing */}
            <TimelineProject
              name="Insurance Claims Processing"
              segment="Insurance"
              duration="3 months"
              barStart={50}
              barWidth={50}
              milestones={[
                { position: 55, label: "Dev Started", status: "Upcoming" },
                { position: 75, label: "UAT", status: "Upcoming" },
                { position: 90, label: "Release", status: "Upcoming" },
              ]}
            />

            {/* Mortgage Origination System */}
            <TimelineProject
              name="Mortgage Origination System"
              segment="Lending"
              duration="2 months"
              barStart={33.3}
              barWidth={33.3}
              milestones={[
                { position: 40, label: "Dev Started", status: "Completed" },
                { position: 55, label: "UAT", status: "Upcoming" },
                { position: 65, label: "Release", status: "Upcoming" },
              ]}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function TimelineProject({ name, segment, duration, barStart, barWidth, milestones }) {
  return (
    <div className="relative mb-16">
      {/* Project header */}
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="font-medium">{name}</span>
          <Badge variant="outline" className="text-xs">
            {segment}
          </Badge>
        </div>
        <div className="text-xs text-muted-foreground">{duration}</div>
      </div>

      {/* Timeline bar */}
      <div className="relative h-8 rounded-md bg-muted">
        <div
          className="absolute h-full rounded-md bg-primary/20"
          style={{
            left: `${barStart}%`,
            width: `${barWidth}%`,
          }}
        ></div>

        {/* Milestones */}
        {milestones.map((milestone, index) => (
          <Milestone key={index} position={milestone.position} label={milestone.label} status={milestone.status} />
        ))}
      </div>
    </div>
  )
}

function Milestone({ position, label, status }) {
  // Determine color based on status
  const getColor = () => {
    switch (status) {
      case "Completed":
        return "bg-green-500"
      case "In Progress":
        return "bg-amber-500"
      default:
        return "bg-muted-foreground"
    }
  }

  // Determine badge style based on status
  const getBadgeStyle = () => {
    switch (status) {
      case "Completed":
        return "border-green-500 text-green-500"
      case "In Progress":
        return "border-amber-500 text-amber-500"
      default:
        return ""
    }
  }

  return (
    <div className="absolute top-0" style={{ left: `${position}%` }}>
      {/* Milestone line */}
      <div className={`h-8 w-0.5 ${getColor()}`}></div>

      {/* Milestone label - positioned below with enough space */}
      <div className="absolute top-10 transform -translate-x-1/2 w-24 text-center z-10">
        <div className="text-xs font-medium">{label}</div>
        <Badge variant="outline" className={`mt-1 text-[10px] ${getBadgeStyle()}`}>
          {status}
        </Badge>
      </div>
    </div>
  )
}
