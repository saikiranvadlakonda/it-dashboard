"use client"

import type React from "react"
import { useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import Link from "next/link"
import {
  AlertCircle,
  BarChart3,
  DollarSign,
  LayoutDashboard,
  LogOut,
  PanelLeft,
  Settings,
  Users,
  Workflow,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import Image from "next/image"

// Define navigation items
const navigationItems = [
  { icon: LayoutDashboard, label: "Strategic Dashboard", path: "/" },
  { icon: DollarSign, label: "Financial Performance & ROI", path: "/financials-value" },
  { icon: BarChart3, label: "Initiative Delivery & Execution", path: "/initiative-delivery" },
  { icon: AlertCircle, label: "Operational Stability & Risk", path: "/operational-stability-risk" },
  { icon: Users, label: "Workforce & Capacity", path: "/workforce-capacity" },
  { icon: Workflow, label: "Governance & Intake", path: "/governance-intake" },
  { icon: Settings, label: "Settings", path: "/settings" },
]

interface DashboardSidebarProps {
  onToggle?: (collapsed: boolean) => void
}

export function DashboardSidebar({ onToggle }: DashboardSidebarProps) {
  const [collapsed, setCollapsed] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  const toggleSidebar = () => {
    const newCollapsedState = !collapsed
    setCollapsed(newCollapsedState)
    if (onToggle) {
      onToggle(newCollapsedState)
    }
  }

  const handleLogout = () => {
    // Implement logout functionality here
    console.log("Logging out...")
    // For demonstration, navigate to login page
    router.push("/login")
  }

  return (
    <div
      className={cn(
        "h-screen border-r bg-muted/30 transition-all duration-300 ease-in-out flex flex-col",
        collapsed ? "w-16" : "w-[280px]",
      )}
    >
      <div className="flex h-14 items-center justify-between border-b px-4">
        {!collapsed ? (
          <div className="flex-1 overflow-hidden">
            <Link href="/">
              <Image src="/trustage-logo.svg" alt="Trustage" width={120} height={30} className="object-contain" />
            </Link>
          </div>
        ) : (
          <div className="w-full flex justify-center">
            <Link href="/">
              <Image src="/trustage-logo.svg" alt="Trustage" width={40} height={30} className="object-contain" />
            </Link>
          </div>
        )}
        <Button variant="ghost" size="icon" onClick={toggleSidebar} className="ml-2 flex-shrink-0">
          <PanelLeft className="h-5 w-5" />
        </Button>
      </div>

      <nav className="space-y-1 p-2 overflow-y-auto flex-grow h-[calc(100vh-3.5rem-4rem)]">
        {navigationItems.map((item) => (
          <NavItem
            key={item.path}
            icon={<item.icon />}
            label={item.label}
            path={item.path}
            collapsed={collapsed}
            active={pathname === item.path || pathname.startsWith(`${item.path}/`)}
          />
        ))}
      </nav>
      <div className="border-t p-2">
        <div className={cn("flex items-center gap-3 rounded-md p-2", collapsed ? "justify-center" : "")}>
          <div className="relative h-10 w-10 overflow-hidden rounded-full bg-muted">
            <img src="/abstract-profile.png" alt="Profile" className="h-full w-full object-cover" />
          </div>
          {!collapsed && (
            <div className="flex flex-1 items-center justify-between">
              <div>
                <p className="text-sm font-medium">Alex Morgan</p>
                <p className="text-xs text-muted-foreground">CTO</p>
              </div>
              <Button variant="ghost" size="icon" title="Logout" onClick={handleLogout}>
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          )}
          {collapsed && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute -right-3 -top-3"
              title="Logout"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

interface NavItemProps {
  icon: React.ReactNode
  label: string
  path: string
  collapsed: boolean
  active?: boolean
}

function NavItem({ icon, label, path, collapsed, active }: NavItemProps) {
  return (
    <Link href={path} className="block w-full">
      <Button
        variant="ghost"
        className={cn(
          "flex w-full justify-start gap-3 px-3 py-2",
          active ? "bg-blue-600 text-white hover:bg-blue-700 hover:text-white" : "hover:bg-accent/50",
          collapsed ? "justify-center" : "",
        )}
      >
        <span className={active ? "text-white" : ""}>{icon}</span>
        {!collapsed && <span className="whitespace-nowrap">{label}</span>}
      </Button>
    </Link>
  )
}
