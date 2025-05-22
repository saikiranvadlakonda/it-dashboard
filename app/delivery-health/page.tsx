"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TeamComposition } from "@/components/team-composition"
import { DeliveryHealth } from "@/components/delivery-health"

// Sample teams data
const teams = [
  { id: "TEAM-001", name: "Team Alpha", segment: "Wealth" },
  { id: "TEAM-002", name: "Team Beta", segment: "Commercial" },
  { id: "TEAM-003", name: "Team Gamma", segment: "Retail" },
  { id: "TEAM-004", name: "Team Delta", segment: "Insurance" },
  { id: "TEAM-005", name: "Team Epsilon", segment: "Lending" },
  { id: "TEAM-006", name: "Team Zeta", segment: "Payments" },
]

// Sample sprint data
const sprintData = {
  "Team Alpha": {
    currentSprint: "Sprint 23",
    velocity: [28, 30, 32, 35],
    burndown: [
      { day: 1, remaining: 35, ideal: 35 },
      { day: 2, remaining: 32, ideal: 31.5 },
      { day: 3, remaining: 30, ideal: 28 },
      { day: 4, remaining: 28, ideal: 24.5 },
      { day: 5, remaining: 25, ideal: 21 },
      { day: 6, remaining: 20, ideal: 17.5 },
      { day: 7, remaining: 18, ideal: 14 },
      { day: 8, remaining: 15, ideal: 10.5 },
      { day: 9, remaining: 10, ideal: 7 },
      { day: 10, remaining: 5, ideal: 3.5 },
    ],
    agingItems: [
      { id: "FAST-123", title: "API Integration Issue", age: 42, priority: "High" },
      { id: "SEC-456", title: "Security Vulnerability", age: 38, priority: "Critical" },
      { id: "PERF-789", title: "Performance Optimization", age: 31, priority: "Medium" },
    ],
    flowMetrics: {
      wip: 12,
      cycleTime: 8.5,
      throughput: 4.2,
      blockedItems: 3,
    },
  },
  "Team Beta": {
    currentSprint: "Sprint 24",
    velocity: [25, 27, 28, 30],
    burndown: [
      { day: 1, remaining: 30, ideal: 30 },
      { day: 2, remaining: 28, ideal: 27 },
      { day: 3, remaining: 25, ideal: 24 },
      { day: 4, remaining: 22, ideal: 21 },
      { day: 5, remaining: 20, ideal: 18 },
      { day: 6, remaining: 18, ideal: 15 },
      { day: 7, remaining: 15, ideal: 12 },
      { day: 8, remaining: 12, ideal: 9 },
      { day: 9, remaining: 8, ideal: 6 },
      { day: 10, remaining: 4, ideal: 3 },
    ],
    agingItems: [
      { id: "UI-101", title: "Responsive Design Issues", age: 28, priority: "Medium" },
      { id: "API-202", title: "Rate Limiting Implementation", age: 22, priority: "High" },
    ],
    flowMetrics: {
      wip: 10,
      cycleTime: 7.2,
      throughput: 3.8,
      blockedItems: 2,
    },
  },
  "Team Gamma": {
    currentSprint: "Sprint 22",
    velocity: [32, 35, 33, 36],
    burndown: [
      { day: 1, remaining: 36, ideal: 36 },
      { day: 2, remaining: 34, ideal: 32.4 },
      { day: 3, remaining: 30, ideal: 28.8 },
      { day: 4, remaining: 28, ideal: 25.2 },
      { day: 5, remaining: 25, ideal: 21.6 },
      { day: 6, remaining: 22, ideal: 18 },
      { day: 7, remaining: 18, ideal: 14.4 },
      { day: 8, remaining: 14, ideal: 10.8 },
      { day: 9, remaining: 10, ideal: 7.2 },
      { day: 10, remaining: 6, ideal: 3.6 },
    ],
    agingItems: [
      { id: "DATA-303", title: "Data Migration Script", age: 25, priority: "High" },
      { id: "UI-404", title: "Accessibility Issues", age: 18, priority: "Medium" },
      { id: "PERF-505", title: "Database Optimization", age: 15, priority: "High" },
    ],
    flowMetrics: {
      wip: 14,
      cycleTime: 9.1,
      throughput: 4.5,
      blockedItems: 1,
    },
  },
  "Team Delta": {
    currentSprint: "Sprint 25",
    velocity: [24, 26, 28, 27],
    burndown: [
      { day: 1, remaining: 27, ideal: 27 },
      { day: 2, remaining: 25, ideal: 24.3 },
      { day: 3, remaining: 23, ideal: 21.6 },
      { day: 4, remaining: 20, ideal: 18.9 },
      { day: 5, remaining: 18, ideal: 16.2 },
      { day: 6, remaining: 15, ideal: 13.5 },
      { day: 7, remaining: 12, ideal: 10.8 },
      { day: 8, remaining: 10, ideal: 8.1 },
      { day: 9, remaining: 7, ideal: 5.4 },
      { day: 10, remaining: 3, ideal: 2.7 },
    ],
    agingItems: [
      { id: "SEC-606", title: "Authentication Flow", age: 20, priority: "Critical" },
      { id: "UI-707", title: "Mobile Responsiveness", age: 14, priority: "Medium" },
    ],
    flowMetrics: {
      wip: 9,
      cycleTime: 6.8,
      throughput: 3.5,
      blockedItems: 2,
    },
  },
  "Team Epsilon": {
    currentSprint: "Sprint 21",
    velocity: [22, 24, 25, 26],
    burndown: [
      { day: 1, remaining: 26, ideal: 26 },
      { day: 2, remaining: 24, ideal: 23.4 },
      { day: 3, remaining: 22, ideal: 20.8 },
      { day: 4, remaining: 20, ideal: 18.2 },
      { day: 5, remaining: 18, ideal: 15.6 },
      { day: 6, remaining: 16, ideal: 13 },
      { day: 7, remaining: 14, ideal: 10.4 },
      { day: 8, remaining: 10, ideal: 7.8 },
      { day: 9, remaining: 7, ideal: 5.2 },
      { day: 10, remaining: 4, ideal: 2.6 },
    ],
    agingItems: [
      { id: "API-808", title: "API Documentation", age: 16, priority: "Low" },
      { id: "TEST-909", title: "Test Coverage", age: 12, priority: "Medium" },
    ],
    flowMetrics: {
      wip: 8,
      cycleTime: 6.2,
      throughput: 3.2,
      blockedItems: 1,
    },
  },
  "Team Zeta": {
    currentSprint: "Sprint 23",
    velocity: [30, 32, 34, 33],
    burndown: [
      { day: 1, remaining: 33, ideal: 33 },
      { day: 2, remaining: 31, ideal: 29.7 },
      { day: 3, remaining: 28, ideal: 26.4 },
      { day: 4, remaining: 25, ideal: 23.1 },
      { day: 5, remaining: 22, ideal: 19.8 },
      { day: 6, remaining: 19, ideal: 16.5 },
      { day: 7, remaining: 16, ideal: 13.2 },
      { day: 8, remaining: 12, ideal: 9.9 },
      { day: 9, remaining: 8, ideal: 6.6 },
      { day: 10, remaining: 4, ideal: 3.3 },
    ],
    agingItems: [
      { id: "PERF-101", title: "Performance Bottleneck", age: 22, priority: "High" },
      { id: "UI-202", title: "UI Inconsistencies", age: 15, priority: "Medium" },
      { id: "SEC-303", title: "Security Audit Findings", age: 10, priority: "Critical" },
    ],
    flowMetrics: {
      wip: 11,
      cycleTime: 7.8,
      throughput: 4.0,
      blockedItems: 2,
    },
  },
}

export default function DeliveryHealthPage() {
  const [activeTab, setActiveTab] = useState("delivery")

  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-col space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Delivery & Resource Management</h1>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="delivery">Delivery Health</TabsTrigger>
            <TabsTrigger value="team">Team Composition</TabsTrigger>
          </TabsList>

          <TabsContent value="delivery" className="mt-6">
            <DeliveryHealth />
          </TabsContent>

          <TabsContent value="team" className="mt-6">
            <TeamComposition />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

function BurndownChart({ data }) {
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
              points={data
                .map((point, index) => {
                  const x = (index / (data.length - 1)) * 100 + "%"
                  const y = (1 - point.remaining / data[0].remaining) * 100 + "%"
                  return `${x},${y}`
                })
                .join(" ")}
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
          <span>{data[0].remaining}</span>
          <span>{Math.floor(data[0].remaining / 2)}</span>
          <span>0</span>
        </div>
      </div>
    </div>
  )
}

function VelocityChart({ data }) {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="relative h-full w-full">
        {/* X-axis */}
        <div className="absolute bottom-0 left-0 right-0 border-t border-border" />

        {/* Bars */}
        <div className="absolute bottom-0 left-0 flex h-full w-full items-end justify-around">
          {data.map((velocity, index) => (
            <div key={index} className="flex w-16 flex-col items-center">
              <div
                className={`w-12 rounded-t-md ${
                  index === data.length - 1 ? "bg-primary" : `bg-primary/${60 + index * 10}`
                }`}
                style={{ height: `${(velocity / Math.max(...data)) * 80}%` }}
              ></div>
              <span className="mt-2 text-xs text-muted-foreground">Sprint {index + 1}</span>
            </div>
          ))}
        </div>

        {/* Trend line */}
        <div className="absolute bottom-0 left-0 h-full w-full">
          <svg className="h-full w-full">
            <line
              x1="6%"
              y1={`${100 - (data[0] / Math.max(...data)) * 80}%`}
              x2="94%"
              y2={`${100 - (data[data.length - 1] / Math.max(...data)) * 80}%`}
              stroke="#ef4444"
              strokeWidth="2"
            />
          </svg>
        </div>

        {/* Y-axis labels */}
        <div className="absolute -left-6 top-0 bottom-0 flex flex-col justify-between text-xs text-muted-foreground">
          <span>{Math.max(...data)}</span>
          <span>{Math.floor(Math.max(...data) / 2)}</span>
          <span>0</span>
        </div>
      </div>
    </div>
  )
}
