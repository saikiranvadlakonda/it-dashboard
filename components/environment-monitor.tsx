"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Switch } from "@/components/ui/switch"

const environments = [
  {
    name: "OIPA-Staging",
    provisionedBy: "Team Gamma",
    cost: "$148/month",
    lastUsed: "2 days ago",
    ttl: "4 days remaining",
    autoShutdown: true,
  },
  {
    name: "WealthSync-Dev",
    provisionedBy: "Team Alpha",
    cost: "$210/month",
    lastUsed: "Today",
    ttl: "14 days remaining",
    autoShutdown: true,
  },
  {
    name: "Lending-QA",
    provisionedBy: "Team Eta",
    cost: "$175/month",
    lastUsed: "5 days ago",
    ttl: "1 day remaining",
    autoShutdown: false,
  },
  {
    name: "Payments-Integration",
    provisionedBy: "Team Theta",
    cost: "$230/month",
    lastUsed: "Yesterday",
    ttl: "10 days remaining",
    autoShutdown: true,
  },
  {
    name: "Retail-UAT",
    provisionedBy: "Team Delta",
    cost: "$195/month",
    lastUsed: "3 days ago",
    ttl: "7 days remaining",
    autoShutdown: true,
  },
]

export function EnvironmentMonitor() {
  const [envs, setEnvs] = useState(environments)

  const toggleAutoShutdown = (index) => {
    const newEnvs = [...envs]
    newEnvs[index].autoShutdown = !newEnvs[index].autoShutdown
    setEnvs(newEnvs)
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-bold">Dev/Test Environment Monitor</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Environment</TableHead>
                <TableHead>Provisioned By</TableHead>
                <TableHead>Cost</TableHead>
                <TableHead>Last Used</TableHead>
                <TableHead>TTL</TableHead>
                <TableHead>Auto-Shutdown</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {envs.map((env, index) => (
                <TableRow key={env.name}>
                  <TableCell className="font-medium">{env.name}</TableCell>
                  <TableCell>{env.provisionedBy}</TableCell>
                  <TableCell>{env.cost}</TableCell>
                  <TableCell>{env.lastUsed}</TableCell>
                  <TableCell className={env.ttl.includes("1 day") ? "text-red-500" : ""}>{env.ttl}</TableCell>
                  <TableCell>
                    <Switch checked={env.autoShutdown} onCheckedChange={() => toggleAutoShutdown(index)} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
