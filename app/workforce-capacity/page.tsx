"use client"

import { TeamComposition } from "@/components/team-composition"

export default function WorkforceCapacityPage() {
  return (
    <div className="flex-1 overflow-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold tracking-tight">Workforce & Capacity</h1>
      </div>
      <TeamComposition />
    </div>
  )
}
