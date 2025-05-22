"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { DashboardHeader } from "@/components/dashboard-header"
import { AdvancedAIChat } from "@/components/advanced-ai-chat"

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const [chatOpen, setChatOpen] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const pathname = usePathname()
  const [pageTitle, setPageTitle] = useState("")

  useEffect(() => {
    // Set page title based on current route
    if (pathname === "/") {
      setPageTitle("Strategic Dashboard")
    } else if (pathname === "/financials-value") {
      setPageTitle("Financial Performance & ROI")
    } else if (pathname === "/delivery-risk-quality") {
      setPageTitle("Delivery, Risk & Quality")
    } else if (pathname === "/operational-stability-risk") {
      setPageTitle("Operational Stability & Risk")
    } else if (pathname === "/initiative-delivery") {
      setPageTitle("Initiative Delivery & Execution")
    } else if (pathname === "/workforce-capacity") {
      setPageTitle("Workforce & Capacity")
    } else if (pathname === "/governance-intake") {
      setPageTitle("Governance & Intake")
    } else if (pathname === "/projects") {
      setPageTitle("Projects")
    } else if (pathname === "/dependencies") {
      setPageTitle("Dependencies")
    } else if (pathname === "/timeline") {
      setPageTitle("Timeline")
    } else if (pathname === "/reports") {
      setPageTitle("Reports")
    } else if (pathname === "/settings") {
      setPageTitle("Settings")
    }
  }, [pathname])

  const handleSidebarToggle = (collapsed: boolean) => {
    setSidebarCollapsed(collapsed)
  }

  return (
    <>
      <div className="flex h-screen overflow-hidden">
        {/* Fixed Sidebar */}
        <div className="fixed left-0 top-0 h-full z-10">
          <DashboardSidebar onToggle={handleSidebarToggle} />
        </div>

        {/* Main Content Area with proper margin */}
        <div
          className="flex flex-1 flex-col transition-all duration-300 ease-in-out"
          style={{
            marginLeft: sidebarCollapsed ? "64px" : "280px",
            width: sidebarCollapsed ? "calc(100% - 64px)" : "calc(100% - 280px)",
          }}
        >
          {/* Header - positioned directly next to sidebar */}
          <DashboardHeader title={pageTitle} onOpenChat={() => setChatOpen(true)} />

          {/* Page Content - with appropriate spacing */}
          <div className="flex-1 overflow-auto">{children}</div>
        </div>
      </div>

      {/* Advanced AI Chat Dialog - outside the main layout to avoid z-index issues */}
      <AdvancedAIChat open={chatOpen} onOpenChange={setChatOpen} />
    </>
  )
}
