"use client"

import { OperationalStability } from "@/components/operational-stability"

export default function OperationalStabilityPage() {
  return (
    <div className="flex-1 overflow-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold tracking-tight">Operational Stability</h1>
      </div>
      <OperationalStability />
    </div>
  )
}
