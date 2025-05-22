"use client"

import { useState } from "react"
import { Search, Filter, Bell, ChevronDown, Bot } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DatePickerWithRange } from "@/components/date-range-picker"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"

interface DashboardHeaderProps {
  onOpenChat?: () => void
  title?: string
}

export function DashboardHeader({ onOpenChat, title }: DashboardHeaderProps) {
  const [segment, setSegment] = useState<string>("all")

  return (
    <header className="sticky top-0 z-10 border-b bg-background shadow-sm w-full px-4 py-3">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-bold">TruStage IT Ops Command Center</h2>
          {title && <span className="text-muted-foreground">| {title}</span>}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Select value={segment} onValueChange={setSegment}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Segment" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Segments</SelectItem>
              <SelectItem value="wealth">Wealth</SelectItem>
              <SelectItem value="commercial">Commercial</SelectItem>
              <SelectItem value="retail">Retail</SelectItem>
              <SelectItem value="insurance">Insurance</SelectItem>
              <SelectItem value="lending">Lending</SelectItem>
              <SelectItem value="payments">Payments</SelectItem>
            </SelectContent>
          </Select>

          <DatePickerWithRange />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-1">
                <Filter className="h-4 w-4" />
                <span>Filters</span>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[200px]">
              <DropdownMenuItem>Team</DropdownMenuItem>
              <DropdownMenuItem>Project</DropdownMenuItem>
              <DropdownMenuItem>Status</DropdownMenuItem>
              <DropdownMenuItem>Priority</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <div className="relative w-full md:w-auto">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search projects, tags, work items..."
              className="w-full pl-8 md:w-[250px]"
            />
          </div>

          <Button variant="outline" size="icon" className="relative">
            <Bell className="h-4 w-4" />
            <Badge className="absolute -right-1 -top-1 h-4 w-4 p-0 text-[10px]">3</Badge>
          </Button>

          <Button onClick={onOpenChat} variant="default" className="gap-2">
            <Bot className="h-4 w-4" />
            <span>Chat</span>
          </Button>
        </div>
      </div>
    </header>
  )
}
