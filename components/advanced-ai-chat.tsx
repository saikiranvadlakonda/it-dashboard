"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import {
  Bot,
  User,
  Send,
  X,
  Maximize2,
  Minimize2,
  AlertTriangle,
  TrendingUp,
  Clock,
  FileText,
  Bell,
  Search,
  ChevronRight,
  MessageSquare,
  AlertCircle,
  Lightbulb,
  Maximize,
  Minimize,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

// Types for chat messages
type MessageRole = "user" | "assistant" | "system"
type AlertType = "financial" | "benefit" | "new" | "risk" | "status" | "incident"

interface Alert {
  type: AlertType
  title: string
  description: string
  actions?: { label: string; action: string }[]
}

interface Message {
  role: MessageRole
  content: string
  timestamp: string
  alerts?: Alert[]
  links?: { text: string; url: string }[]
  actions?: { label: string; action: string }[]
}

// Example alerts based on Wave data
const initialAlerts: Alert[] = [
  {
    type: "financial",
    title: "LifePro Version 20 Upgrade (9814)",
    description: "Total estimated one-time cost has increased by 12% (from $850k to $952k) since the last update.",
    actions: [
      { label: "View Cost Details", action: "view_cost_details_9814" },
      { label: "Why this change?", action: "explain_change_9814" },
    ],
  },
  {
    type: "benefit",
    title: "EI: Develop a content strategy (118)",
    description: "Projected total net benefit has decreased by $75k (from $1,255.5k to $1,180.5k).",
    actions: [{ label: "View Benefit Details", action: "view_benefit_details_118" }],
  },
  {
    type: "incident",
    title: "New P1 Incident: Core Banking Platform (INC0012345)",
    description:
      "Login failures for LifePro users reported 2 hours ago. This service is part of the 'LifePro Version 20 Upgrade' initiative.",
    actions: [
      { label: "View Incident Details", action: "view_incident_details_12345" },
      { label: "Show Related Initiatives", action: "show_related_initiatives_12345" },
    ],
  },
  {
    type: "new",
    title: "Ransomware backup and recovery solution (11770)",
    description: "Now in the top 5 for estimated one-time costs under 'Infrastructure & Ops' at $650k.",
    actions: [{ label: "See Top 5 Costs", action: "view_top_costs" }],
  },
]

// Example chat history
const initialChatHistory: Message[] = [
  {
    role: "assistant",
    content: "Good morning, Alex. Here are a few key updates based on the latest data refresh (as of 2025-02-18):",
    timestamp: "9:00 AM",
    alerts: initialAlerts,
  },
]

// Example suggested queries
const suggestedQueries = [
  "What's the portfolio budget status?",
  "Show me high-cost initiatives in 'Modernize Core'",
  "Any P1 incidents related to the LifePro upgrade?",
  "Which initiatives are focused on modernizing applications with high incident rates?",
  "Prep me for a meeting on 'Consent Preference Management' initiative",
]

export function AdvancedAIChat({ open, onOpenChange }) {
  const [chatHistory, setChatHistory] = useState<Message[]>(initialChatHistory)
  const [inputMessage, setInputMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isExpanded, setIsExpanded] = useState(true) // Start expanded by default
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [activeTab, setActiveTab] = useState("chat")
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const dialogRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [chatHistory])

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return

    // Add user message to chat
    const userMessage: Message = {
      role: "user",
      content: inputMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    }
    setChatHistory([...chatHistory, userMessage])
    setInputMessage("")
    setIsLoading(true)

    // Simulate response (in a real app, this would call an API)
    setTimeout(() => {
      const assistantMessage = generateResponse(inputMessage)
      setChatHistory((prev) => [...prev, assistantMessage])
      setIsLoading(false)
    }, 1500)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage()
    }
  }

  const toggleExpand = () => {
    setIsExpanded(!isExpanded)
  }

  const toggleFullscreen = () => {
    if (!isFullscreen) {
      if (dialogRef.current?.requestFullscreen) {
        dialogRef.current.requestFullscreen()
        setIsFullscreen(true)
      } else if ((dialogRef.current as any)?.webkitRequestFullscreen) {
        ;(dialogRef.current as any).webkitRequestFullscreen()
        setIsFullscreen(true)
      } else if ((dialogRef.current as any)?.msRequestFullscreen) {
        ;(dialogRef.current as any).msRequestFullscreen()
        setIsFullscreen(true)
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen()
        setIsFullscreen(false)
      } else if ((document as any).webkitExitFullscreen) {
        ;(document as any).webkitExitFullscreen()
        setIsFullscreen(false)
      } else if ((document as any).msExitFullscreen) {
        ;(document as any).msExitFullscreen()
        setIsFullscreen(false)
      }
    }
  }

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(
        document.fullscreenElement !== null ||
          (document as any).webkitFullscreenElement !== null ||
          (document as any).msFullscreenElement !== null,
      )
    }

    document.addEventListener("fullscreenchange", handleFullscreenChange)
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange)
    document.addEventListener("msfullscreenchange", handleFullscreenChange)

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange)
      document.removeEventListener("webkitfullscreenchange", handleFullscreenChange)
      document.removeEventListener("msfullscreenchange", handleFullscreenChange)
    }
  }, [])

  const handleSuggestedQuery = (query: string) => {
    setInputMessage(query)
    handleSendMessage()
  }

  const handleActionClick = (action: string) => {
    // In a real app, this would trigger specific actions based on the action ID
    setIsLoading(true)

    setTimeout(() => {
      let responseMessage: Message

      if (action === "explain_change_9814") {
        responseMessage = {
          role: "assistant",
          content:
            "The estimated total one-time cost for 'LifePro Version 20 Upgrade' (9814) increased from $850k to $952k.",
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          links: [{ text: "View Initiative 9814", url: "#initiative/9814" }],
        }

        // Add a follow-up message with more details
        setTimeout(() => {
          const detailMessage: Message = {
            role: "assistant",
            content:
              "Looking at the yearly estimates in Wave:\n• The estimate for 2024 increased from $300k to $382k (+$82k).\n• The estimate for 2025 increased from $200k to $220k (+$20k).\n• Estimates for other years remained unchanged.\n\nThe Wave data doesn't specify the exact reason for these estimate changes. This typically reflects updated scope, resource plans, or vendor quotes. For precise reasons, you might need to consult the initiative owner or PMO documentation.",
            timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            actions: [{ label: "Show Yearly Cost Breakdown", action: "show_yearly_costs_9814" }],
          }
          setChatHistory((prev) => [...prev, detailMessage])
        }, 800)
      } else if (action === "view_incident_details_12345") {
        responseMessage = {
          role: "assistant",
          content: "Here are the details for incident INC0012345 affecting the Core Banking Platform:",
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        }

        // Add a follow-up message with incident details
        setTimeout(() => {
          const incidentDetailsMessage: Message = {
            role: "assistant",
            content:
              "Incident: INC0012345\nTitle: Login failures for LifePro users\nPriority: P1\nStatus: In Progress\nCreated: 2 hours ago\n\nDescription: Users are unable to log in to the LifePro application. Authentication service is returning 503 errors. Approximately 250 users affected.\n\nCurrent Actions: Infrastructure team is investigating the authentication service. Database team is checking for connection issues.",
            timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            links: [
              { text: "View in ServiceNow", url: "#servicenow/INC0012345" },
              { text: "View Related Initiative", url: "#initiative/9814" },
            ],
          }
          setChatHistory((prev) => [...prev, incidentDetailsMessage])
        }, 800)
      } else if (action === "show_related_initiatives_12345") {
        responseMessage = {
          role: "assistant",
          content: "The incident INC0012345 is related to the following initiatives:",
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          alerts: [
            {
              type: "financial",
              title: "LifePro Version 20 Upgrade (9814)",
              description:
                "This initiative is modernizing the Core Banking Platform which is currently experiencing the P1 incident.",
              actions: [{ label: "View Initiative Details", action: "view_initiative_9814" }],
            },
          ],
        }
      } else if (action === "view_cost_details_9814") {
        responseMessage = {
          role: "assistant",
          content: "Here are the cost details for 'LifePro Version 20 Upgrade' (9814):",
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        }

        // Add a follow-up message with cost details
        setTimeout(() => {
          const costDetailsMessage: Message = {
            role: "assistant",
            content:
              "One-Time Costs by Year:\n• 2023: $150k\n• 2024: $382k\n• 2025: $220k\n• 2026: $200k\n• Total: $952k\n\nOngoing Maintenance Costs (Annual):\n• $95k per year starting 2024",
            timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            links: [{ text: "View Full Financial Report", url: "#reports/financial" }],
          }
          setChatHistory((prev) => [...prev, costDetailsMessage])
        }, 800)
      } else {
        responseMessage = {
          role: "assistant",
          content: `I'll show you the information for action: ${action}`,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        }
      }

      setChatHistory((prev) => [...prev, responseMessage])
      setIsLoading(false)
    }, 1000)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        ref={dialogRef}
        className={cn(
          "flex flex-col p-0 overflow-hidden max-w-5xl h-[85vh] w-[95vw] rounded-xl shadow-2xl border-0",
          isFullscreen && "!max-w-none !w-screen !h-screen !rounded-none",
        )}
        style={{ transition: "all 0.3s ease" }}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-800 to-slate-700 text-white px-6 py-4 flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-white/10 p-2 rounded-full">
                <Bot className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-xl font-semibold">AI Strategic Assistant</h2>
                <p className="text-xs text-slate-300">Data as of Feb 18, 2025</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/10"
                onClick={toggleFullscreen}
                title={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
              >
                {isFullscreen ? <Minimize className="h-4 w-4" /> : <Maximize className="h-4 w-4" />}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/10"
                onClick={toggleExpand}
                title={isExpanded ? "Minimize" : "Maximize"}
              >
                {isExpanded ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/10"
                onClick={() => onOpenChange(false)}
                title="Close"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Main content area with tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col overflow-hidden">
          {/* Tab navigation */}
          <div className="bg-slate-50 dark:bg-slate-900 border-b">
            <TabsList className="flex w-full bg-transparent h-auto p-0">
              <TabsTrigger
                value="chat"
                className={cn(
                  "flex items-center gap-2 flex-1 rounded-none border-b-2 border-transparent py-3 px-4 font-medium",
                  activeTab === "chat" && "border-slate-800 dark:border-slate-200",
                )}
              >
                <MessageSquare className="h-4 w-4" />
                <span>Chat</span>
              </TabsTrigger>
              <TabsTrigger
                value="alerts"
                className={cn(
                  "flex items-center gap-2 flex-1 rounded-none border-b-2 border-transparent py-3 px-4 font-medium",
                  activeTab === "alerts" && "border-slate-800 dark:border-slate-200",
                )}
              >
                <AlertCircle className="h-4 w-4" />
                <span>Alerts</span>
              </TabsTrigger>
              <TabsTrigger
                value="insights"
                className={cn(
                  "flex items-center gap-2 flex-1 rounded-none border-b-2 border-transparent py-3 px-4 font-medium",
                  activeTab === "insights" && "border-slate-800 dark:border-slate-200",
                )}
              >
                <Lightbulb className="h-4 w-4" />
                <span>Insights</span>
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Tab content */}
          <div className="flex-1 flex flex-col overflow-hidden bg-slate-50 dark:bg-slate-900">
            <TabsContent
              value="chat"
              className="flex-1 flex flex-col overflow-hidden relative m-0 p-0 data-[state=inactive]:hidden"
            >
              <ScrollArea className="flex-1 h-full absolute inset-0">
                <div className="space-y-6 p-6 pb-20">
                  {chatHistory.map((message, index) => (
                    <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                      <div
                        className={cn(
                          "flex max-w-[85%] items-start gap-3 rounded-2xl p-4",
                          message.role === "user"
                            ? "bg-slate-700 text-white"
                            : "bg-white dark:bg-slate-800 shadow-sm border border-slate-200 dark:border-slate-700",
                        )}
                      >
                        <div className="mt-1 flex-shrink-0">
                          {message.role === "user" ? (
                            <div className="bg-slate-600 rounded-full p-1">
                              <User className="h-4 w-4" />
                            </div>
                          ) : (
                            <div className="bg-slate-200 dark:bg-slate-700 rounded-full p-1">
                              <Bot className="h-4 w-4" />
                            </div>
                          )}
                        </div>
                        <div className="flex-1 overflow-hidden">
                          <div className="whitespace-pre-wrap break-words text-sm">{message.content}</div>

                          {/* Render alerts if present */}
                          {message.alerts && message.alerts.length > 0 && (
                            <div className="mt-4 space-y-3">
                              {message.alerts.map((alert, alertIndex) => (
                                <Card
                                  key={alertIndex}
                                  className={cn(
                                    "overflow-hidden border-0 shadow-md",
                                    message.role === "user" ? "bg-slate-600" : "bg-white dark:bg-slate-800",
                                  )}
                                >
                                  <div className={cn("h-1", getAlertColorClass(alert.type))} />
                                  <CardContent className="p-3">
                                    <div className="flex items-start gap-3">
                                      <div className={cn("p-2 rounded-full", getAlertBgClass(alert.type))}>
                                        {getAlertIcon(alert.type)}
                                      </div>
                                      <div className="flex-1">
                                        <div className="font-medium">{alert.title}</div>
                                        <div className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                                          {alert.description}
                                        </div>
                                        {alert.actions && alert.actions.length > 0 && (
                                          <div className="mt-3 flex flex-wrap gap-2">
                                            {alert.actions.map((action, actionIndex) => (
                                              <Button
                                                key={actionIndex}
                                                variant="outline"
                                                size="sm"
                                                className="h-8 rounded-full"
                                                onClick={() => handleActionClick(action.action)}
                                              >
                                                {action.label}
                                              </Button>
                                            ))}
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                  </CardContent>
                                </Card>
                              ))}
                            </div>
                          )}

                          {/* Render links if present */}
                          {message.links && message.links.length > 0 && (
                            <div className="mt-3 flex flex-wrap gap-2">
                              {message.links.map((link, linkIndex) => (
                                <Button
                                  key={linkIndex}
                                  variant="outline"
                                  size="sm"
                                  className="h-8 rounded-full bg-transparent"
                                  asChild
                                >
                                  <a href={link.url}>{link.text}</a>
                                </Button>
                              ))}
                            </div>
                          )}

                          {/* Render action buttons if present */}
                          {message.actions && message.actions.length > 0 && (
                            <div className="mt-3 flex flex-wrap gap-2">
                              {message.actions.map((action, actionIndex) => (
                                <Button
                                  key={actionIndex}
                                  variant="outline"
                                  size="sm"
                                  className="h-8 rounded-full"
                                  onClick={() => handleActionClick(action.action)}
                                >
                                  {action.label}
                                </Button>
                              ))}
                            </div>
                          )}

                          <div className="mt-2 text-right text-xs opacity-70">{message.timestamp}</div>
                        </div>
                      </div>
                    </div>
                  ))}

                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="flex max-w-[85%] items-start gap-3 rounded-2xl p-4 bg-white dark:bg-slate-800 shadow-sm border border-slate-200 dark:border-slate-700">
                        <div className="mt-1 flex-shrink-0">
                          <div className="bg-slate-200 dark:bg-slate-700 rounded-full p-1">
                            <Bot className="h-4 w-4" />
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="flex space-x-2">
                            <div className="h-2 w-2 animate-bounce rounded-full bg-slate-400"></div>
                            <div
                              className="h-2 w-2 animate-bounce rounded-full bg-slate-400"
                              style={{ animationDelay: "0.2s" }}
                            ></div>
                            <div
                              className="h-2 w-2 animate-bounce rounded-full bg-slate-400"
                              style={{ animationDelay: "0.4s" }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  <div ref={messagesEndRef} />
                </div>
              </ScrollArea>

              {/* Suggested queries */}
              {chatHistory.length <= 1 && (
                <div className="px-6 py-4 absolute bottom-16 left-0 right-0 bg-slate-50 dark:bg-slate-900 border-t z-10">
                  <p className="text-sm text-slate-500 dark:text-slate-400 mb-3">Try asking:</p>
                  <div className="flex flex-wrap gap-2">
                    {suggestedQueries.map((query, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        className="h-8 rounded-full"
                        onClick={() => handleSuggestedQuery(query)}
                      >
                        {query}
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              {/* Input area */}
              <div className="border-t p-4 flex-shrink-0 mt-auto absolute bottom-0 left-0 right-0 bg-white dark:bg-slate-800 z-10">
                <div className="flex items-center gap-2 max-w-4xl mx-auto w-full bg-slate-100 dark:bg-slate-700 rounded-full px-4 py-1">
                  <Input
                    placeholder="Ask about initiatives, financials, risks, or production incidents..."
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="flex-1 border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 px-0"
                  />
                  <Button
                    onClick={handleSendMessage}
                    disabled={isLoading || !inputMessage.trim()}
                    size="sm"
                    className="rounded-full h-8 w-8 p-0 bg-slate-700 hover:bg-slate-800"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent
              value="alerts"
              className="flex-1 overflow-hidden relative m-0 p-0 data-[state=inactive]:hidden"
            >
              <ScrollArea className="h-full absolute inset-0">
                <div className="space-y-4 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium">Recent Alerts</h3>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <Input
                        placeholder="Search alerts"
                        className="pl-9 h-9 w-[200px] rounded-full bg-slate-100 dark:bg-slate-700 border-0"
                      />
                    </div>
                  </div>
                  {initialAlerts.map((alert, index) => (
                    <Card key={index} className="overflow-hidden border-0 shadow-md">
                      <div className={cn("h-1", getAlertColorClass(alert.type))} />
                      <CardContent className="p-4">
                        <div className="flex items-start gap-4">
                          <div className={cn("p-3 rounded-full", getAlertBgClass(alert.type))}>
                            {getAlertIcon(alert.type)}
                          </div>
                          <div className="flex-1">
                            <div className="font-medium text-lg">{alert.title}</div>
                            <div className="text-sm text-slate-500 dark:text-slate-400 mt-1">{alert.description}</div>
                            {alert.actions && alert.actions.length > 0 && (
                              <div className="mt-4 flex flex-wrap gap-2">
                                {alert.actions.map((action, actionIndex) => (
                                  <Button
                                    key={actionIndex}
                                    variant="outline"
                                    size="sm"
                                    className="h-8 rounded-full"
                                    onClick={() => handleActionClick(action.action)}
                                  >
                                    {action.label}
                                  </Button>
                                ))}
                              </div>
                            )}
                          </div>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-full">
                            <ChevronRight className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>

            <TabsContent
              value="insights"
              className="flex-1 overflow-hidden relative m-0 p-0 data-[state=inactive]:hidden"
            >
              <ScrollArea className="h-full absolute inset-0">
                <div className="space-y-6 p-6">
                  <h3 className="text-lg font-medium">Portfolio Insights</h3>

                  <Card className="border-0 shadow-md overflow-hidden">
                    <div className="bg-slate-800 text-white px-4 py-3">
                      <h4 className="font-medium">Top 3 High-Cost Initiatives</h4>
                    </div>
                    <CardContent className="p-0">
                      <ul className="divide-y">
                        <li className="flex justify-between items-center p-4 hover:bg-slate-50 dark:hover:bg-slate-800">
                          <span className="font-medium">LifePro Version 20 Upgrade (9814)</span>
                          <span className="font-medium text-slate-700 dark:text-slate-300">$952k</span>
                        </li>
                        <li className="flex justify-between items-center p-4 hover:bg-slate-50 dark:hover:bg-slate-800">
                          <span className="font-medium">External Consumer Data (15773)</span>
                          <span className="font-medium text-slate-700 dark:text-slate-300">$720k</span>
                        </li>
                        <li className="flex justify-between items-center p-4 hover:bg-slate-50 dark:hover:bg-slate-800">
                          <span className="font-medium">PCI 4.0 Compliance (11901)</span>
                          <span className="font-medium text-slate-700 dark:text-slate-300">$610k</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className="border-0 shadow-md overflow-hidden">
                    <div className="bg-slate-800 text-white px-4 py-3">
                      <h4 className="font-medium">Highest ROI Initiatives</h4>
                    </div>
                    <CardContent className="p-0">
                      <ul className="divide-y">
                        <li className="flex justify-between items-center p-4 hover:bg-slate-50 dark:hover:bg-slate-800">
                          <span className="font-medium">Automation WFM (179)</span>
                          <span className="font-medium text-green-600">187%</span>
                        </li>
                        <li className="flex justify-between items-center p-4 hover:bg-slate-50 dark:hover:bg-slate-800">
                          <span className="font-medium">Content Strategy (118)</span>
                          <span className="font-medium text-green-600">145%</span>
                        </li>
                        <li className="flex justify-between items-center p-4 hover:bg-slate-50 dark:hover:bg-slate-800">
                          <span className="font-medium">CPM - Posture (17114)</span>
                          <span className="font-medium text-green-600">117%</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className="border-0 shadow-md overflow-hidden">
                    <div className="bg-slate-800 text-white px-4 py-3">
                      <h4 className="font-medium">Applications with Highest Incident Rates</h4>
                    </div>
                    <CardContent className="p-0">
                      <ul className="divide-y">
                        <li className="flex justify-between items-center p-4 hover:bg-slate-50 dark:hover:bg-slate-800">
                          <span className="font-medium">Core Banking Platform</span>
                          <span className="font-medium text-red-600">17 P1/P2s (30d)</span>
                        </li>
                        <li className="flex justify-between items-center p-4 hover:bg-slate-50 dark:hover:bg-slate-800">
                          <span className="font-medium">Wealth Management Suite</span>
                          <span className="font-medium text-amber-600">11 P1/P2s (30d)</span>
                        </li>
                        <li className="flex justify-between items-center p-4 hover:bg-slate-50 dark:hover:bg-slate-800">
                          <span className="font-medium">Mobile App - Login Service</span>
                          <span className="font-medium text-amber-600">7 P1/P2s (30d)</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </ScrollArea>
            </TabsContent>
          </div>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}

// Helper functions
function getAlertColorClass(type: AlertType): string {
  switch (type) {
    case "financial":
      return "bg-amber-500"
    case "benefit":
      return "bg-red-500"
    case "new":
      return "bg-blue-500"
    case "risk":
      return "bg-red-600"
    case "status":
      return "bg-green-500"
    case "incident":
      return "bg-purple-500"
    default:
      return "bg-slate-500"
  }
}

function getAlertBgClass(type: AlertType): string {
  switch (type) {
    case "financial":
      return "bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400"
    case "benefit":
      return "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400"
    case "new":
      return "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
    case "risk":
      return "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400"
    case "status":
      return "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400"
    case "incident":
      return "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400"
    default:
      return "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400"
  }
}

function getAlertIcon(type: AlertType) {
  switch (type) {
    case "financial":
      return <AlertTriangle className="h-4 w-4" />
    case "benefit":
      return <TrendingUp className="h-4 w-4" />
    case "new":
      return <FileText className="h-4 w-4" />
    case "risk":
      return <AlertTriangle className="h-4 w-4" />
    case "status":
      return <Clock className="h-4 w-4" />
    case "incident":
      return <Bell className="h-4 w-4" />
    default:
      return <AlertTriangle className="h-4 w-4" />
  }
}

// Mock response generator based on user query
function generateResponse(query: string): Message {
  const timestamp = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  const lowerQuery = query.toLowerCase()

  if (
    lowerQuery.includes("portfolio budget") ||
    lowerQuery.includes("financial") ||
    lowerQuery.includes("budget status")
  ) {
    return {
      role: "assistant",
      content: "Based on the latest Wave data (as of Feb 18, 2025), here's the portfolio budget status:",
      timestamp,
      alerts: [
        {
          type: "financial",
          title: "Portfolio Budget Summary",
          description: "Total Budget: $50M | Estimated Spend: $32.5M (65%) | Variance: -$2.5M (5% over budget)",
          actions: [{ label: "View Financial Report", action: "view_financial_report" }],
        },
      ],
    }
  }

  if (lowerQuery.includes("high-cost") && lowerQuery.includes("modernize core")) {
    return {
      role: "assistant",
      content:
        "Based on latest Wave estimates, the following 'Modernize Core' initiatives have the highest estimated one-time costs:",
      timestamp,
      links: [{ text: "View All Modernize Core Initiatives", url: "#reports/modernize-core" }],
      actions: [{ label: "Show as Chart", action: "show_modernize_core_chart" }],
      alerts: [
        {
          type: "financial",
          title: "High-Cost Modernize Core Initiatives",
          description:
            "1. LifePro Version 20 Upgrade (9814): $952k\n2. External Consumer Data (15773): $720k\n3. Core Banking Platform (10045): $580k",
          actions: [],
        },
      ],
    }
  }

  if (lowerQuery.includes("p1") && lowerQuery.includes("incident") && lowerQuery.includes("lifepro")) {
    return {
      role: "assistant",
      content: "I found 1 open P1 incident related to the LifePro Version 20 Upgrade initiative:",
      timestamp,
      alerts: [
        {
          type: "incident",
          title: "P1 Incident: Core Banking Platform (INC0012345)",
          description:
            "Login failures for LifePro users reported 2 hours ago. This incident is affecting the Core Banking Platform which is part of the 'LifePro Version 20 Upgrade' initiative.",
          actions: [
            { label: "View Incident Details", action: "view_incident_details_12345" },
            { label: "View Initiative Details", action: "view_initiative_9814" },
          ],
        },
      ],
    }
  }

  if (lowerQuery.includes("modernizing") && lowerQuery.includes("high incident")) {
    return {
      role: "assistant",
      content:
        "Based on ServiceNow data, these initiatives are focused on modernizing applications with high incident rates:",
      timestamp,
      alerts: [
        {
          type: "incident",
          title: "LifePro Version 20 Upgrade (9814)",
          description:
            "Modernizing Core Banking Platform which had 17 P1/P2 incidents in the last 30 days (highest in portfolio).",
          actions: [
            { label: "View Initiative Details", action: "view_initiative_9814" },
            { label: "View Incident History", action: "view_incident_history_core_banking" },
          ],
        },
        {
          type: "incident",
          title: "Wealth Platform Modernization (10233)",
          description:
            "Modernizing Wealth Management Suite which had 11 P1/P2 incidents in the last 30 days (2nd highest).",
          actions: [
            { label: "View Initiative Details", action: "view_initiative_10233" },
            { label: "View Incident History", action: "view_incident_history_wealth" },
          ],
        },
      ],
      links: [{ text: "View Production Stability Dashboard", url: "#delivery-risk-quality/stability" }],
    }
  }

  if (lowerQuery.includes("prep") && lowerQuery.includes("meeting") && lowerQuery.includes("consent preference")) {
    return {
      role: "assistant",
      content:
        "Here's a summary for 'Consent Preference Management, CPM - Posture and Data & Analytics' (17114) based on Wave estimates:",
      timestamp,
      links: [{ text: "View Initiative 17114", url: "#initiative/17114" }],
      alerts: [
        {
          type: "financial",
          title: "Financial Summary",
          description:
            "• Total One-Time Cost: $450k\n• 2024 Est. Spend: $150k\n• 2025 Est. Spend: $200k\n• 2026 Est. Spend: $100k\n• Total Projected Net Benefit: $975k\n• Estimated ROI: 116.7%",
          actions: [
            { label: "Show Yearly Costs", action: "show_yearly_costs_17114" },
            { label: "Show Yearly Benefits", action: "show_yearly_benefits_17114" },
          ],
        },
        {
          type: "status",
          title: "Key Considerations",
          description:
            "• Categorized under 'Longer Term Growth,' suggesting strategic importance\n• Benefit realization is projected to start significantly in 2025\n• Current ADO Status: On Track\n• Open Critical/High Risks: None logged",
          actions: [],
        },
        {
          type: "incident",
          title: "Production Stability",
          description:
            "• Related application: Customer Portal\n• P1/P2 incidents (last 30 days): 2 P1, 4 P2\n• Average resolution time: 3.8 hours\n• Most common root cause: Database issues",
          actions: [{ label: "View Incident History", action: "view_incident_history_portal" }],
        },
      ],
    }
  }

  if (lowerQuery.includes("alert")) {
    return {
      role: "assistant",
      content: "Here are the current alerts based on the latest data refresh (as of Feb 18, 2025):",
      timestamp,
      alerts: initialAlerts,
    }
  }

  // Default response for other queries
  return {
    role: "assistant",
    content: `I've analyzed the data regarding "${query}". Here's what I found:\n\nBased on the latest estimates, there are 50 active initiatives across 5 workstreams. The total estimated one-time cost is $50M with an estimated ROI of 175%.\n\nWould you like more specific information about a particular aspect of the portfolio?`,
    timestamp,
    actions: [
      { label: "Show Portfolio Overview", action: "show_portfolio_overview" },
      { label: "Show Financial Summary", action: "show_financial_summary" },
      { label: "Show Production Incidents", action: "show_production_incidents" },
    ],
  }
}
