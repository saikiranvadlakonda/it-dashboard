"use client"

import { useState, useRef, useEffect } from "react"
import { Send, Bot, User } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"

// Example chat history with ADO data queries and responses
const initialChatHistory = [
  {
    role: "user",
    content: "Show me all blocked work items in the WealthSync project",
    timestamp: "10:23 AM",
  },
  {
    role: "assistant",
    content:
      "I found 3 blocked work items in WealthSync:\n\n1. FAST-123: API Integration Issue (Blocked for 42 days)\n2. WS-456: Authentication Flow (Blocked for 5 days)\n3. WS-789: Performance Optimization (Blocked for 3 days)",
    timestamp: "10:23 AM",
  },
  {
    role: "user",
    content: "What's the current sprint velocity for Team Alpha?",
    timestamp: "10:25 AM",
  },
  {
    role: "assistant",
    content:
      "Team Alpha's velocity metrics:\n\n- Current Sprint (S23): 32 points\n- Previous Sprint (S22): 30 points\n- 3-Sprint Average: 29.3 points\n- Trend: Increasing (+2.7 points)",
    timestamp: "10:25 AM",
  },
  {
    role: "user",
    content: "List all high priority items with security tags",
    timestamp: "10:28 AM",
  },
  {
    role: "assistant",
    content:
      "High priority items with security tags:\n\n1. SEC-001: OAuth Vulnerability (Critical)\n2. SEC-002: Data Encryption Implementation (High)\n3. SEC-003: Access Control Review (High)\n4. SEC-004: API Security Audit (High)",
    timestamp: "10:28 AM",
  },
]

export function AdoChat() {
  const [chatHistory, setChatHistory] = useState(initialChatHistory)
  const [inputMessage, setInputMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [chatHistory])

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return

    // Add user message to chat
    const userMessage = {
      role: "user",
      content: inputMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    }
    setChatHistory([...chatHistory, userMessage])
    setInputMessage("")
    setIsLoading(true)

    // Simulate response (in a real app, this would call an API)
    setTimeout(() => {
      const assistantMessage = {
        role: "assistant",
        content: generateMockResponse(inputMessage),
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      }
      setChatHistory((prev) => [...prev, assistantMessage])
      setIsLoading(false)
    }, 1500)
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSendMessage()
    }
  }

  return (
    <Card className="flex h-full flex-col">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-xl font-bold">
          <Bot className="h-5 w-5" />
          ADO Data Assistant
          <Badge variant="outline" className="ml-2">
            Connected to Azure DevOps
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col">
        <ScrollArea className="flex-1 pr-4">
          <div className="space-y-4 pb-4">
            {chatHistory.map((message, index) => (
              <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`flex max-w-[80%] items-start gap-2 rounded-lg p-3 ${
                    message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                  }`}
                >
                  <div className="mt-1">
                    {message.role === "user" ? <User className="h-5 w-5" /> : <Bot className="h-5 w-5" />}
                  </div>
                  <div className="flex-1">
                    <div className="whitespace-pre-wrap">{message.content}</div>
                    <div className="mt-1 text-right text-xs opacity-70">{message.timestamp}</div>
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="flex max-w-[80%] items-start gap-2 rounded-lg bg-muted p-3 text-muted-foreground">
                  <div className="mt-1">
                    <Bot className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <div className="flex space-x-1">
                      <div className="h-2 w-2 animate-bounce rounded-full bg-current"></div>
                      <div
                        className="h-2 w-2 animate-bounce rounded-full bg-current"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                      <div
                        className="h-2 w-2 animate-bounce rounded-full bg-current"
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

        <div className="mt-4 flex items-center gap-2">
          <Input
            placeholder="Ask about ADO data, work items, sprints, etc."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1"
          />
          <Button onClick={handleSendMessage} disabled={isLoading || !inputMessage.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </div>

        <div className="mt-2 text-xs text-muted-foreground">
          <p>Try asking: "Show blocked items", "What's Team Alpha's velocity?", "List high priority bugs"</p>
        </div>
      </CardContent>
    </Card>
  )
}

// Mock response generator - in a real app, this would be replaced with actual API calls
function generateMockResponse(query) {
  const lowerQuery = query.toLowerCase()

  if (lowerQuery.includes("blocked") || lowerQuery.includes("blocking")) {
    return "I found 5 blocked items across all projects:\n\n1. FAST-123: API Integration Issue (42 days)\n2. WS-456: Authentication Flow (5 days)\n3. SEC-789: Security Audit (8 days)\n4. UI-101: Responsive Design (3 days)\n5. API-202: Rate Limiting (12 days)"
  }

  if (lowerQuery.includes("velocity") || lowerQuery.includes("sprint")) {
    return "Sprint velocity metrics for active teams:\n\n- Team Alpha: 32 points (↑2)\n- Team Beta: 28 points (↑1)\n- Team Gamma: 35 points (↓3)\n- Team Delta: 30 points (→0)\n\nOverall trend: Increasing (+0.5 points per sprint)"
  }

  if (lowerQuery.includes("security") || lowerQuery.includes("vulnerab")) {
    return "Security items summary:\n\n- Critical: 2 open items\n- High: 5 open items\n- Medium: 8 open items\n- Low: 12 open items\n\nMost urgent: SEC-001 OAuth Vulnerability (Critical, assigned to Security Team)"
  }

  if (lowerQuery.includes("bug") || lowerQuery.includes("defect")) {
    return "Bug tracking summary:\n\n- Critical: 3 bugs\n- Major: 8 bugs\n- Minor: 15 bugs\n\nOldest unresolved: UI-303 Navigation Issue (18 days old)\nHighest impact: API-505 Data Synchronization (affects 3 teams)"
  }

  if (lowerQuery.includes("team") || lowerQuery.includes("capacity")) {
    return "Team capacity metrics:\n\n- Team Alpha: 85% allocated (3 members on PTO)\n- Team Beta: 100% allocated (fully staffed)\n- Team Gamma: 70% allocated (2 open positions)\n- Team Delta: 90% allocated (1 member on training)\n\nOverall capacity: 86%"
  }

  return "Based on Azure DevOps data, I found the following insights:\n\n- 48 active projects across 6 segments\n- 24 teams currently assigned to projects\n- 342 work items in progress\n- 68% overall completion rate\n\nWould you like more specific information about a particular project, team, or metric?"
}
