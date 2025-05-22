"use client"

import { useState } from "react"
import { AlertCircle, Check, Edit, FileText, Filter, Search, SlidersHorizontal, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"

// Sample data for vendors
const initialVendors = [
  {
    id: "v1",
    name: "Accenture",
    category: "Development",
    status: "Active",
    riskLevel: "Low",
    slaPerformance: 95,
    contractValue: 1250000,
    contractEndDate: "2025-12-31",
    contactName: "John Smith",
    contactEmail: "john.smith@accenture.com",
    contactPhone: "+1 (555) 123-4567",
    hasBackup: true,
    breaches: 2,
    description: "Primary development partner for core banking applications.",
    tags: ["Development", "Core Systems", "Strategic"],
  },
  {
    id: "v2",
    name: "Cognizant",
    category: "QA Testing",
    status: "Active",
    riskLevel: "Low",
    slaPerformance: 88,
    contractValue: 750000,
    contractEndDate: "2025-06-30",
    contactName: "Emily Johnson",
    contactEmail: "emily.johnson@cognizant.com",
    contactPhone: "+1 (555) 234-5678",
    hasBackup: true,
    breaches: 4,
    description: "Quality assurance and testing services for all digital products.",
    tags: ["QA", "Testing", "Digital"],
  },
  {
    id: "v3",
    name: "TCS",
    category: "Support",
    status: "Active",
    riskLevel: "Medium",
    slaPerformance: 78,
    contractValue: 950000,
    contractEndDate: "2024-09-30",
    contactName: "Raj Patel",
    contactEmail: "raj.patel@tcs.com",
    contactPhone: "+1 (555) 345-6789",
    hasBackup: true,
    breaches: 8,
    description: "24/7 support services for production systems and customer-facing applications.",
    tags: ["Support", "Production", "Customer Service"],
  },
  {
    id: "v4",
    name: "Infosys",
    category: "Infrastructure",
    status: "Active",
    riskLevel: "Low",
    slaPerformance: 92,
    contractValue: 1100000,
    contractEndDate: "2025-03-31",
    contactName: "Sarah Williams",
    contactEmail: "sarah.williams@infosys.com",
    contactPhone: "+1 (555) 456-7890",
    hasBackup: true,
    breaches: 1,
    description: "Cloud infrastructure management and DevOps services.",
    tags: ["Infrastructure", "Cloud", "DevOps"],
  },
  {
    id: "v5",
    name: "Deloitte",
    category: "Consulting",
    status: "Active",
    riskLevel: "Medium",
    slaPerformance: 85,
    contractValue: 1500000,
    contractEndDate: "2024-12-31",
    contactName: "Michael Brown",
    contactEmail: "michael.brown@deloitte.com",
    contactPhone: "+1 (555) 567-8901",
    hasBackup: false,
    breaches: 5,
    description: "Strategic consulting for digital transformation initiatives.",
    tags: ["Consulting", "Strategy", "Digital Transformation"],
  },
  {
    id: "v6",
    name: "IBM",
    category: "AI & Analytics",
    status: "Active",
    riskLevel: "Low",
    slaPerformance: 90,
    contractValue: 2000000,
    contractEndDate: "2026-01-31",
    contactName: "Lisa Chen",
    contactEmail: "lisa.chen@ibm.com",
    contactPhone: "+1 (555) 678-9012",
    hasBackup: true,
    breaches: 3,
    description: "AI and advanced analytics solutions for customer insights and fraud detection.",
    tags: ["AI", "Analytics", "Fraud Detection"],
  },
  {
    id: "v7",
    name: "Capgemini",
    category: "Development",
    status: "Inactive",
    riskLevel: "High",
    slaPerformance: 65,
    contractValue: 800000,
    contractEndDate: "2023-12-31",
    contactName: "Thomas Wilson",
    contactEmail: "thomas.wilson@capgemini.com",
    contactPhone: "+1 (555) 789-0123",
    hasBackup: false,
    breaches: 12,
    description: "Legacy system maintenance and support.",
    tags: ["Legacy", "Maintenance", "Support"],
  },
  {
    id: "v8",
    name: "Wipro",
    category: "Security",
    status: "Active",
    riskLevel: "Medium",
    slaPerformance: 82,
    contractValue: 950000,
    contractEndDate: "2025-08-31",
    contactName: "David Lee",
    contactEmail: "david.lee@wipro.com",
    contactPhone: "+1 (555) 890-1234",
    hasBackup: true,
    breaches: 6,
    description: "Cybersecurity services including penetration testing and security monitoring.",
    tags: ["Security", "Cybersecurity", "Monitoring"],
  },
]

// Sample data for contracts
const initialContracts = [
  {
    id: "c1",
    vendorId: "v1",
    name: "Master Services Agreement",
    type: "MSA",
    startDate: "2023-01-01",
    endDate: "2025-12-31",
    value: 1250000,
    status: "Active",
    renewalOption: true,
    autoRenewal: false,
    noticePeriod: 90,
    documents: ["MSA_Accenture_2023.pdf", "SOW_Development_2023.pdf"],
  },
  {
    id: "c2",
    vendorId: "v2",
    name: "QA Services Agreement",
    type: "Service",
    startDate: "2023-07-01",
    endDate: "2025-06-30",
    value: 750000,
    status: "Active",
    renewalOption: true,
    autoRenewal: true,
    noticePeriod: 60,
    documents: ["Contract_Cognizant_QA_2023.pdf"],
  },
  {
    id: "c3",
    vendorId: "v3",
    name: "Support Services Agreement",
    type: "Service",
    startDate: "2022-10-01",
    endDate: "2024-09-30",
    value: 950000,
    status: "Active",
    renewalOption: true,
    autoRenewal: false,
    noticePeriod: 90,
    documents: ["TCS_Support_Agreement_2022.pdf", "SLA_Addendum_2023.pdf"],
  },
  {
    id: "c4",
    vendorId: "v4",
    name: "Infrastructure Management",
    type: "Service",
    startDate: "2023-04-01",
    endDate: "2025-03-31",
    value: 1100000,
    status: "Active",
    renewalOption: true,
    autoRenewal: true,
    noticePeriod: 60,
    documents: ["Infosys_Cloud_Services_2023.pdf"],
  },
  {
    id: "c5",
    vendorId: "v5",
    name: "Digital Transformation Consulting",
    type: "Consulting",
    startDate: "2023-01-01",
    endDate: "2024-12-31",
    value: 1500000,
    status: "Active",
    renewalOption: false,
    autoRenewal: false,
    noticePeriod: 30,
    documents: ["Deloitte_Consulting_Agreement_2023.pdf"],
  },
  {
    id: "c6",
    vendorId: "v6",
    name: "AI & Analytics Platform License",
    type: "License",
    startDate: "2023-02-01",
    endDate: "2026-01-31",
    value: 2000000,
    status: "Active",
    renewalOption: true,
    autoRenewal: false,
    noticePeriod: 120,
    documents: ["IBM_License_Agreement_2023.pdf", "Support_Terms_2023.pdf"],
  },
  {
    id: "c7",
    vendorId: "v7",
    name: "Legacy System Support",
    type: "Service",
    startDate: "2021-01-01",
    endDate: "2023-12-31",
    value: 800000,
    status: "Expiring",
    renewalOption: true,
    autoRenewal: false,
    noticePeriod: 60,
    documents: ["Capgemini_Support_Contract_2021.pdf"],
  },
  {
    id: "c8",
    vendorId: "v8",
    name: "Security Services Agreement",
    type: "Service",
    startDate: "2022-09-01",
    endDate: "2025-08-31",
    value: 950000,
    status: "Active",
    renewalOption: true,
    autoRenewal: false,
    noticePeriod: 90,
    documents: ["Wipro_Security_Agreement_2022.pdf"],
  },
]

// Sample data for SLA metrics
const initialSlaMetrics = [
  { vendorId: "v1", metric: "Response Time", target: "< 4 hours", actual: "3.2 hours", status: "Met" },
  { vendorId: "v1", metric: "Resolution Time", target: "< 24 hours", actual: "22.5 hours", status: "Met" },
  { vendorId: "v1", metric: "Availability", target: "99.9%", actual: "99.95%", status: "Met" },
  { vendorId: "v1", metric: "Quality", target: "< 5 defects/month", actual: "3 defects/month", status: "Met" },

  { vendorId: "v2", metric: "Test Coverage", target: "95%", actual: "92%", status: "Not Met" },
  { vendorId: "v2", metric: "Test Execution", target: "48 hours", actual: "45 hours", status: "Met" },
  { vendorId: "v2", metric: "Defect Identification", target: "90%", actual: "88%", status: "Not Met" },

  { vendorId: "v3", metric: "Response Time", target: "< 2 hours", actual: "2.8 hours", status: "Not Met" },
  { vendorId: "v3", metric: "Resolution Time", target: "< 12 hours", actual: "14.2 hours", status: "Not Met" },
  { vendorId: "v3", metric: "First Call Resolution", target: "80%", actual: "75%", status: "Not Met" },

  { vendorId: "v4", metric: "Uptime", target: "99.95%", actual: "99.97%", status: "Met" },
  { vendorId: "v4", metric: "Incident Response", target: "< 15 minutes", actual: "12 minutes", status: "Met" },
  { vendorId: "v4", metric: "Change Success Rate", target: "98%", actual: "99%", status: "Met" },

  { vendorId: "v5", metric: "Milestone Completion", target: "100%", actual: "90%", status: "Not Met" },
  { vendorId: "v5", metric: "Deliverable Quality", target: "4.5/5", actual: "4.2/5", status: "Not Met" },

  { vendorId: "v6", metric: "System Availability", target: "99.9%", actual: "99.95%", status: "Met" },
  { vendorId: "v6", metric: "Data Accuracy", target: "99%", actual: "99.5%", status: "Met" },
  { vendorId: "v6", metric: "Processing Time", target: "< 5 minutes", actual: "4.2 minutes", status: "Met" },

  { vendorId: "v7", metric: "Response Time", target: "< 8 hours", actual: "12 hours", status: "Not Met" },
  { vendorId: "v7", metric: "Resolution Time", target: "< 48 hours", actual: "72 hours", status: "Not Met" },

  { vendorId: "v8", metric: "Alert Response", target: "< 15 minutes", actual: "12 minutes", status: "Met" },
  { vendorId: "v8", metric: "Vulnerability Remediation", target: "< 7 days", actual: "5 days", status: "Met" },
  { vendorId: "v8", metric: "False Positive Rate", target: "< 5%", actual: "7%", status: "Not Met" },
]

// Risk assessment criteria
const riskCriteria = [
  { id: "financial", name: "Financial Stability", weight: 20 },
  { id: "operational", name: "Operational Performance", weight: 25 },
  { id: "compliance", name: "Regulatory Compliance", weight: 15 },
  { id: "security", name: "Security Posture", weight: 20 },
  { id: "business", name: "Business Continuity", weight: 10 },
  { id: "strategic", name: "Strategic Alignment", weight: 10 },
]

export function VendorManagementPage() {
  const [vendors, setVendors] = useState(initialVendors)
  const [contracts, setContracts] = useState(initialContracts)
  const [slaMetrics, setSlaMetrics] = useState(initialSlaMetrics)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [riskFilter, setRiskFilter] = useState("all")
  const [selectedVendor, setSelectedVendor] = useState(null)
  const [isAddingVendor, setIsAddingVendor] = useState(false)
  const [newVendor, setNewVendor] = useState({
    name: "",
    category: "",
    status: "Active",
    riskLevel: "Medium",
    slaPerformance: 80,
    contractValue: 0,
    contractEndDate: "",
    contactName: "",
    contactEmail: "",
    contactPhone: "",
    hasBackup: false,
    breaches: 0,
    description: "",
    tags: [],
  })
  const [newContract, setNewContract] = useState({
    name: "",
    type: "",
    startDate: "",
    endDate: "",
    value: 0,
    status: "Active",
    renewalOption: false,
    autoRenewal: false,
    noticePeriod: 60,
    documents: [],
  })
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [vendorToDelete, setVendorToDelete] = useState(null)
  const [newTag, setNewTag] = useState("")

  // Filter vendors based on search term and filters
  const filteredVendors = vendors.filter((vendor) => {
    const matchesSearch =
      vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vendor.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vendor.description.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || vendor.status === statusFilter
    const matchesRisk = riskFilter === "all" || vendor.riskLevel === riskFilter

    return matchesSearch && matchesStatus && matchesRisk
  })

  // Get contracts for a specific vendor
  const getVendorContracts = (vendorId) => {
    return contracts.filter((contract) => contract.vendorId === vendorId)
  }

  // Get SLA metrics for a specific vendor
  const getVendorSlaMetrics = (vendorId) => {
    return slaMetrics.filter((metric) => metric.vendorId === vendorId)
  }

  // Calculate SLA compliance percentage
  const calculateSlaCompliance = (vendorId) => {
    const metrics = getVendorSlaMetrics(vendorId)
    if (metrics.length === 0) return 0

    const metCount = metrics.filter((m) => m.status === "Met").length
    return Math.round((metCount / metrics.length) * 100)
  }

  // Handle adding a new vendor
  const handleAddVendor = () => {
    const id = `v${vendors.length + 1}`
    const vendorToAdd = {
      ...newVendor,
      id,
      breaches: Number.parseInt(newVendor.breaches) || 0,
      contractValue: Number.parseInt(newVendor.contractValue) || 0,
      slaPerformance: Number.parseInt(newVendor.slaPerformance) || 80,
    }

    setVendors([...vendors, vendorToAdd])
    setNewVendor({
      name: "",
      category: "",
      status: "Active",
      riskLevel: "Medium",
      slaPerformance: 80,
      contractValue: 0,
      contractEndDate: "",
      contactName: "",
      contactEmail: "",
      contactPhone: "",
      hasBackup: false,
      breaches: 0,
      description: "",
      tags: [],
    })
    setIsAddingVendor(false)
  }

  // Handle adding a new contract
  const handleAddContract = () => {
    if (!selectedVendor) return

    const id = `c${contracts.length + 1}`
    const contractToAdd = {
      ...newContract,
      id,
      vendorId: selectedVendor.id,
      value: Number.parseInt(newContract.value) || 0,
    }

    setContracts([...contracts, contractToAdd])
    setNewContract({
      name: "",
      type: "",
      startDate: "",
      endDate: "",
      value: 0,
      status: "Active",
      renewalOption: false,
      autoRenewal: false,
      noticePeriod: 60,
      documents: [],
    })
  }

  // Handle deleting a vendor
  const handleDeleteVendor = () => {
    if (!vendorToDelete) return

    // Remove vendor
    setVendors(vendors.filter((v) => v.id !== vendorToDelete.id))

    // Remove associated contracts
    setContracts(contracts.filter((c) => c.vendorId !== vendorToDelete.id))

    // Remove associated SLA metrics
    setSlaMetrics(slaMetrics.filter((m) => m.vendorId !== vendorToDelete.id))

    setShowDeleteConfirm(false)
    setVendorToDelete(null)

    // If the deleted vendor was selected, clear selection
    if (selectedVendor && selectedVendor.id === vendorToDelete.id) {
      setSelectedVendor(null)
    }
  }

  // Handle adding a tag to a new vendor
  const handleAddTag = () => {
    if (!newTag.trim()) return
    if (!newVendor.tags.includes(newTag)) {
      setNewVendor({
        ...newVendor,
        tags: [...newVendor.tags, newTag],
      })
    }
    setNewTag("")
  }

  // Handle removing a tag from a new vendor
  const handleRemoveTag = (tagToRemove) => {
    setNewVendor({
      ...newVendor,
      tags: newVendor.tags.filter((tag) => tag !== tagToRemove),
    })
  }

  // Get risk color based on risk level
  const getRiskColor = (risk) => {
    switch (risk) {
      case "Low":
        return "text-green-500 border-green-500"
      case "Medium":
        return "text-amber-500 border-amber-500"
      case "High":
        return "text-red-500 border-red-500"
      default:
        return "text-gray-500 border-gray-500"
    }
  }

  // Get days until contract expiration
  const getDaysUntilExpiration = (endDate) => {
    const end = new Date(endDate)
    const today = new Date()
    const diffTime = end - today
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  // Get contract status class
  const getContractStatusClass = (endDate) => {
    const daysLeft = getDaysUntilExpiration(endDate)
    if (daysLeft < 0) return "text-red-500"
    if (daysLeft < 90) return "text-amber-500"
    return "text-green-500"
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Vendor Management</h1>
          <p className="text-muted-foreground">Manage vendor relationships and performance</p>
        </div>
      </div>

      <Tabs defaultValue="vendors">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="vendors">Vendors</TabsTrigger>
          <TabsTrigger value="contracts">Contracts</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="risk">Risk Assessment</TabsTrigger>
        </TabsList>

        {/* Vendors Tab */}
        <TabsContent value="vendors" className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="relative w-96">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search vendors..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Filter className="mr-2 h-4 w-4" />
                    Status: {statusFilter === "all" ? "All" : statusFilter}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setStatusFilter("all")}>All</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter("Active")}>Active</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter("Inactive")}>Inactive</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <SlidersHorizontal className="mr-2 h-4 w-4" />
                    Risk: {riskFilter === "all" ? "All" : riskFilter}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setRiskFilter("all")}>All</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setRiskFilter("Low")}>Low</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setRiskFilter("Medium")}>Medium</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setRiskFilter("High")}>High</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Vendor</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Risk Level</TableHead>
                  <TableHead>SLA Performance</TableHead>
                  <TableHead>Contract Value</TableHead>
                  <TableHead>Contract End</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredVendors.map((vendor) => (
                  <TableRow
                    key={vendor.id}
                    className="cursor-pointer hover:bg-muted/50"
                    onClick={() => setSelectedVendor(vendor)}
                  >
                    <TableCell className="font-medium">{vendor.name}</TableCell>
                    <TableCell>{vendor.category}</TableCell>
                    <TableCell>
                      <Badge variant={vendor.status === "Active" ? "success" : "default"}>{vendor.status}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={getRiskColor(vendor.riskLevel)}>
                        {vendor.riskLevel}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Progress value={vendor.slaPerformance} className="h-2 w-16" />
                        <span
                          className={`text-xs ${
                            vendor.slaPerformance >= 90
                              ? "text-green-500"
                              : vendor.slaPerformance >= 80
                                ? "text-amber-500"
                                : "text-red-500"
                          }`}
                        >
                          {vendor.slaPerformance}%
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>${vendor.contractValue.toLocaleString()}</TableCell>
                    <TableCell className={getContractStatusClass(vendor.contractEndDate)}>
                      {new Date(vendor.contractEndDate).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={(e) => {
                            e.stopPropagation()
                            setSelectedVendor(vendor)
                          }}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={(e) => {
                            e.stopPropagation()
                            setVendorToDelete(vendor)
                            setShowDeleteConfirm(true)
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        {/* Contracts Tab */}
        <TabsContent value="contracts" className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="relative w-96">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search contracts..." className="pl-8" />
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Vendor</TableHead>
                  <TableHead>Contract Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Start Date</TableHead>
                  <TableHead>End Date</TableHead>
                  <TableHead>Value</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Documents</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {contracts.map((contract) => {
                  const vendor = vendors.find((v) => v.id === contract.vendorId)
                  return (
                    <TableRow key={contract.id}>
                      <TableCell className="font-medium">{vendor?.name || "Unknown"}</TableCell>
                      <TableCell>{contract.name}</TableCell>
                      <TableCell>{contract.type}</TableCell>
                      <TableCell>{new Date(contract.startDate).toLocaleDateString()}</TableCell>
                      <TableCell className={getContractStatusClass(contract.endDate)}>
                        {new Date(contract.endDate).toLocaleDateString()}
                      </TableCell>
                      <TableCell>${contract.value.toLocaleString()}</TableCell>
                      <TableCell>
                        <Badge variant={contract.status === "Active" ? "success" : "warning"}>{contract.status}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          {contract.documents.map((doc, index) => (
                            <Button key={index} variant="ghost" size="sm" className="h-8 px-2">
                              <FileText className="h-4 w-4 mr-1" />
                              <span className="text-xs">{doc.split("_")[0]}</span>
                            </Button>
                          ))}
                        </div>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Contract Expiration</CardTitle>
                <CardDescription>Upcoming contract renewals</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {contracts
                    .filter((c) => getDaysUntilExpiration(c.endDate) > 0 && getDaysUntilExpiration(c.endDate) < 180)
                    .sort((a, b) => new Date(a.endDate) - new Date(b.endDate))
                    .slice(0, 5)
                    .map((contract) => {
                      const vendor = vendors.find((v) => v.id === contract.vendorId)
                      const daysLeft = getDaysUntilExpiration(contract.endDate)
                      return (
                        <div key={contract.id} className="flex justify-between items-center">
                          <div>
                            <div className="font-medium">{vendor?.name}</div>
                            <div className="text-sm text-muted-foreground">{contract.name}</div>
                          </div>
                          <Badge variant={daysLeft < 30 ? "destructive" : daysLeft < 90 ? "warning" : "outline"}>
                            {daysLeft} days
                          </Badge>
                        </div>
                      )
                    })}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Contract Value by Type</CardTitle>
                <CardDescription>Distribution of contract values</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Object.entries(
                    contracts.reduce((acc, contract) => {
                      acc[contract.type] = (acc[contract.type] || 0) + contract.value
                      return acc
                    }, {}),
                  ).map(([type, value]) => (
                    <div key={type} className="space-y-1">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">{type}</span>
                        <span className="text-sm">${(value as number).toLocaleString()}</span>
                      </div>
                      <Progress
                        value={((value as number) / contracts.reduce((sum, c) => sum + c.value, 0)) * 100}
                        className="h-2"
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Auto-Renewal Status</CardTitle>
                <CardDescription>Contracts with auto-renewal</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex h-[150px] items-center justify-center">
                  <div className="text-center">
                    <div className="text-5xl font-bold">{contracts.filter((c) => c.autoRenewal).length}</div>
                    <div className="text-sm text-muted-foreground mt-1">of {contracts.length} contracts</div>
                    <div className="mt-4">
                      <Progress
                        value={(contracts.filter((c) => c.autoRenewal).length / contracts.length) * 100}
                        className="h-2"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Performance Tab */}
        <TabsContent value="performance" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Overall SLA Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center justify-center h-[120px]">
                  <div className="text-5xl font-bold">
                    {Math.round(vendors.reduce((sum, vendor) => sum + vendor.slaPerformance, 0) / vendors.length)}%
                  </div>
                  <div className="text-sm text-muted-foreground mt-2">Average across all vendors</div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">SLA Breaches</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center justify-center h-[120px]">
                  <div className="text-5xl font-bold">{vendors.reduce((sum, vendor) => sum + vendor.breaches, 0)}</div>
                  <div className="text-sm text-muted-foreground mt-2">Total breaches YTD</div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Backup Coverage</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center justify-center h-[120px]">
                  <div className="text-5xl font-bold">
                    {Math.round((vendors.filter((v) => v.hasBackup).length / vendors.length) * 100)}%
                  </div>
                  <div className="text-sm text-muted-foreground mt-2">Vendors with backup</div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Risk Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Low Risk</span>
                    <span className="text-sm font-medium">{vendors.filter((v) => v.riskLevel === "Low").length}</span>
                  </div>
                  <Progress
                    value={(vendors.filter((v) => v.riskLevel === "Low").length / vendors.length) * 100}
                    className="h-2 bg-muted"
                  />

                  <div className="flex justify-between items-center">
                    <span className="text-sm">Medium Risk</span>
                    <span className="text-sm font-medium">
                      {vendors.filter((v) => v.riskLevel === "Medium").length}
                    </span>
                  </div>
                  <Progress
                    value={(vendors.filter((v) => v.riskLevel === "Medium").length / vendors.length) * 100}
                    className="h-2 bg-muted"
                  />

                  <div className="flex justify-between items-center">
                    <span className="text-sm">High Risk</span>
                    <span className="text-sm font-medium">{vendors.filter((v) => v.riskLevel === "High").length}</span>
                  </div>
                  <Progress
                    value={(vendors.filter((v) => v.riskLevel === "High").length / vendors.length) * 100}
                    className="h-2 bg-muted"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">SLA Performance by Vendor</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Vendor</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>SLA Compliance</TableHead>
                    <TableHead>Breaches</TableHead>
                    <TableHead>Metrics</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {vendors.map((vendor) => {
                    const compliance = calculateSlaCompliance(vendor.id)
                    return (
                      <TableRow key={vendor.id}>
                        <TableCell className="font-medium">{vendor.name}</TableCell>
                        <TableCell>{vendor.category}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Progress value={compliance} className="h-2 w-24" />
                            <span
                              className={`text-xs ${
                                compliance >= 90
                                  ? "text-green-500"
                                  : compliance >= 80
                                    ? "text-amber-500"
                                    : "text-red-500"
                              }`}
                            >
                              {compliance}%
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>{vendor.breaches}</TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm" onClick={() => setSelectedVendor(vendor)}>
                            View Details
                          </Button>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">SLA Breaches by Vendor</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {vendors
                  .sort((a, b) => b.breaches - a.breaches)
                  .filter((v) => v.breaches > 0)
                  .map((vendor) => (
                    <div key={vendor.id}>
                      <div className="mb-1 flex justify-between text-sm">
                        <span>{vendor.name}</span>
                        <span>{vendor.breaches} breaches</span>
                      </div>
                      <Progress
                        value={(vendor.breaches / vendors.reduce((max, v) => Math.max(max, v.breaches), 1)) * 100}
                        className="h-2"
                      />
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Risk Assessment Tab */}
        <TabsContent value="risk" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="md:col-span-2">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Risk Assessment Matrix</CardTitle>
                <CardDescription>Vendor risk evaluation based on multiple criteria</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Vendor</TableHead>
                        {riskCriteria.map((criteria) => (
                          <TableHead key={criteria.id} className="text-center">
                            {criteria.name}
                            <div className="text-xs text-muted-foreground">({criteria.weight}%)</div>
                          </TableHead>
                        ))}
                        <TableHead className="text-center">Overall Risk</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {vendors.map((vendor) => {
                        // This would normally be calculated from actual risk assessments
                        // Here we're generating sample data
                        const riskScores = {
                          financial: Math.floor(Math.random() * 3) + 1,
                          operational: vendor.slaPerformance >= 90 ? 1 : vendor.slaPerformance >= 80 ? 2 : 3,
                          compliance: Math.floor(Math.random() * 3) + 1,
                          security: Math.floor(Math.random() * 3) + 1,
                          business: vendor.hasBackup ? 1 : 3,
                          strategic: Math.floor(Math.random() * 3) + 1,
                        }

                        const getRiskCell = (score) => {
                          switch (score) {
                            case 1:
                              return <div className="bg-green-100 text-green-800 text-center rounded py-1">Low</div>
                            case 2:
                              return <div className="bg-amber-100 text-amber-800 text-center rounded py-1">Medium</div>
                            case 3:
                              return <div className="bg-red-100 text-red-800 text-center rounded py-1">High</div>
                            default:
                              return <div className="text-center">-</div>
                          }
                        }

                        return (
                          <TableRow key={vendor.id}>
                            <TableCell className="font-medium">{vendor.name}</TableCell>
                            {riskCriteria.map((criteria) => (
                              <TableCell key={criteria.id}>{getRiskCell(riskScores[criteria.id])}</TableCell>
                            ))}
                            <TableCell>
                              <Badge variant="outline" className={getRiskColor(vendor.riskLevel)}>
                                {vendor.riskLevel}
                              </Badge>
                            </TableCell>
                          </TableRow>
                        )
                      })}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Risk Factors</CardTitle>
                <CardDescription>Key risk indicators</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="mb-1 text-sm font-medium">Financial Stability</div>
                  <div className="text-xs text-muted-foreground mb-2">Vendor's financial health and stability</div>
                  <div className="grid grid-cols-3 gap-1 text-xs">
                    <div className="bg-green-100 text-green-800 text-center rounded py-1">Low Risk</div>
                    <div className="bg-amber-100 text-amber-800 text-center rounded py-1">Medium Risk</div>
                    <div className="bg-red-100 text-red-800 text-center rounded py-1">High Risk</div>
                  </div>
                </div>

                <div>
                  <div className="mb-1 text-sm font-medium">Operational Performance</div>
                  <div className="text-xs text-muted-foreground mb-2">SLA compliance and service quality</div>
                  <div className="grid grid-cols-3 gap-1 text-xs">
                    <div className="bg-green-100 text-green-800 text-center rounded py-1">≥ 90%</div>
                    <div className="bg-amber-100 text-amber-800 text-center rounded py-1">80-89%</div>
                    <div className="bg-red-100 text-red-800 text-center rounded py-1">{"< 80%"}</div>
                  </div>
                </div>

                <div>
                  <div className="mb-1 text-sm font-medium">Regulatory Compliance</div>
                  <div className="text-xs text-muted-foreground mb-2">Adherence to regulations and standards</div>
                  <div className="grid grid-cols-3 gap-1 text-xs">
                    <div className="bg-green-100 text-green-800 text-center rounded py-1">Compliant</div>
                    <div className="bg-amber-100 text-amber-800 text-center rounded py-1">Minor Issues</div>
                    <div className="bg-red-100 text-red-800 text-center rounded py-1">Non-compliant</div>
                  </div>
                </div>

                <div>
                  <div className="mb-1 text-sm font-medium">Security Posture</div>
                  <div className="text-xs text-muted-foreground mb-2">Security controls and incident history</div>
                  <div className="grid grid-cols-3 gap-1 text-xs">
                    <div className="bg-green-100 text-green-800 text-center rounded py-1">Strong</div>
                    <div className="bg-amber-100 text-amber-800 text-center rounded py-1">Adequate</div>
                    <div className="bg-red-100 text-red-800 text-center rounded py-1">Weak</div>
                  </div>
                </div>

                <div>
                  <div className="mb-1 text-sm font-medium">Business Continuity</div>
                  <div className="text-xs text-muted-foreground mb-2">Backup vendors and continuity plans</div>
                  <div className="grid grid-cols-3 gap-1 text-xs">
                    <div className="bg-green-100 text-green-800 text-center rounded py-1">Backup Ready</div>
                    <div className="bg-amber-100 text-amber-800 text-center rounded py-1">Partial Backup</div>
                    <div className="bg-red-100 text-red-800 text-center rounded py-1">No Backup</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Risk Mitigation Actions</CardTitle>
              <CardDescription>Recommended actions for high-risk vendors</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Vendor</TableHead>
                    <TableHead>Risk Level</TableHead>
                    <TableHead>Key Risk Factors</TableHead>
                    <TableHead>Recommended Actions</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {vendors
                    .filter((v) => v.riskLevel === "Medium" || v.riskLevel === "High")
                    .map((vendor) => {
                      // Sample risk factors and actions
                      const riskFactors = []
                      const actions = []

                      if (vendor.slaPerformance < 80) {
                        riskFactors.push("Poor SLA Performance")
                        actions.push("Implement performance improvement plan")
                      }

                      if (!vendor.hasBackup) {
                        riskFactors.push("No Backup Vendor")
                        actions.push("Identify and onboard backup vendor")
                      }

                      if (vendor.breaches > 5) {
                        riskFactors.push("Multiple SLA Breaches")
                        actions.push("Review and strengthen SLA terms")
                      }

                      if (getDaysUntilExpiration(vendor.contractEndDate) < 90) {
                        riskFactors.push("Contract Expiring Soon")
                        actions.push("Initiate contract renewal review")
                      }

                      return (
                        <TableRow key={vendor.id}>
                          <TableCell className="font-medium">{vendor.name}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className={getRiskColor(vendor.riskLevel)}>
                              {vendor.riskLevel}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="space-y-1">
                              {riskFactors.map((factor, i) => (
                                <Badge key={i} variant="outline" className="mr-1">
                                  {factor}
                                </Badge>
                              ))}
                            </div>
                          </TableCell>
                          <TableCell>
                            <ul className="list-disc pl-4 text-sm">
                              {actions.map((action, i) => (
                                <li key={i}>{action}</li>
                              ))}
                            </ul>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">Pending</Badge>
                          </TableCell>
                        </TableRow>
                      )
                    })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Vendor Details Dialog */}
      {selectedVendor && (
        <Dialog open={!!selectedVendor} onOpenChange={(open) => !open && setSelectedVendor(null)}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
            <DialogHeader>
              <DialogTitle>Vendor Details: {selectedVendor.name}</DialogTitle>
              <DialogDescription>
                View and manage vendor information, contracts, and performance metrics
              </DialogDescription>
            </DialogHeader>

            <Tabs defaultValue="details" className="flex-1 overflow-hidden flex flex-col">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="contracts">Contracts</TabsTrigger>
                <TabsTrigger value="performance">Performance</TabsTrigger>
                <TabsTrigger value="contacts">Contacts</TabsTrigger>
              </TabsList>

              <ScrollArea className="flex-1 overflow-auto">
                <TabsContent value="details" className="p-4 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Vendor Name</Label>
                      <Input value={selectedVendor.name} readOnly className="mt-1" />
                    </div>
                    <div>
                      <Label>Category</Label>
                      <Input value={selectedVendor.category} readOnly className="mt-1" />
                    </div>
                    <div>
                      <Label>Status</Label>
                      <Input value={selectedVendor.status} readOnly className="mt-1" />
                    </div>
                    <div>
                      <Label>Risk Level</Label>
                      <Input value={selectedVendor.riskLevel} readOnly className="mt-1" />
                    </div>
                    <div className="col-span-2">
                      <Label>Description</Label>
                      <Textarea value={selectedVendor.description} readOnly className="mt-1" />
                    </div>
                  </div>

                  <div>
                    <Label>Tags</Label>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {selectedVendor.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">Performance Summary</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <div className="flex justify-between text-sm">
                            <span>SLA Performance</span>
                            <span
                              className={
                                selectedVendor.slaPerformance >= 90
                                  ? "text-green-500"
                                  : selectedVendor.slaPerformance >= 80
                                    ? "text-amber-500"
                                    : "text-red-500"
                              }
                            >
                              {selectedVendor.slaPerformance}%
                            </span>
                          </div>
                          <Progress value={selectedVendor.slaPerformance} className="h-2 mt-1" />
                        </div>

                        <div className="flex justify-between">
                          <span className="text-sm">SLA Breaches</span>
                          <span className="text-sm font-medium">{selectedVendor.breaches}</span>
                        </div>

                        <div className="flex justify-between">
                          <span className="text-sm">Backup Vendor</span>
                          <Badge variant={selectedVendor.hasBackup ? "success" : "destructive"}>
                            {selectedVendor.hasBackup ? "Yes" : "No"}
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">Contract Summary</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex justify-between">
                          <span className="text-sm">Contract Value</span>
                          <span className="text-sm font-medium">${selectedVendor.contractValue.toLocaleString()}</span>
                        </div>

                        <div className="flex justify-between">
                          <span className="text-sm">Contract End Date</span>
                          <span
                            className={`text-sm font-medium ${getContractStatusClass(selectedVendor.contractEndDate)}`}
                          >
                            {new Date(selectedVendor.contractEndDate).toLocaleDateString()}
                          </span>
                        </div>

                        <div className="flex justify-between">
                          <span className="text-sm">Days Until Expiration</span>
                          <Badge
                            variant={
                              getDaysUntilExpiration(selectedVendor.contractEndDate) < 30
                                ? "destructive"
                                : getDaysUntilExpiration(selectedVendor.contractEndDate) < 90
                                  ? "warning"
                                  : "outline"
                            }
                          >
                            {getDaysUntilExpiration(selectedVendor.contractEndDate)} days
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="contracts" className="p-4 space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium">Vendor Contracts</h3>
                  </div>

                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Contract Name</TableHead>
                          <TableHead>Type</TableHead>
                          <TableHead>Start Date</TableHead>
                          <TableHead>End Date</TableHead>
                          <TableHead>Value</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Documents</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {getVendorContracts(selectedVendor.id).map((contract) => (
                          <TableRow key={contract.id}>
                            <TableCell className="font-medium">{contract.name}</TableCell>
                            <TableCell>{contract.type}</TableCell>
                            <TableCell>{new Date(contract.startDate).toLocaleDateString()}</TableCell>
                            <TableCell className={getContractStatusClass(contract.endDate)}>
                              {new Date(contract.endDate).toLocaleDateString()}
                            </TableCell>
                            <TableCell>${contract.value.toLocaleString()}</TableCell>
                            <TableCell>
                              <Badge variant={contract.status === "Active" ? "success" : "warning"}>
                                {contract.status}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-1">
                                {contract.documents.map((doc, index) => (
                                  <Button key={index} variant="ghost" size="sm" className="h-8 px-2">
                                    <FileText className="h-4 w-4 mr-1" />
                                    <span className="text-xs">{doc.split("_")[0]}</span>
                                  </Button>
                                ))}
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Contract Details</h3>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Contract Name</Label>
                        <Input
                          value={newContract.name}
                          onChange={(e) => setNewContract({ ...newContract, name: e.target.value })}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label>Contract Type</Label>
                        <Select
                          value={newContract.type}
                          onValueChange={(value) => setNewContract({ ...newContract, type: value })}
                        >
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="MSA">Master Service Agreement</SelectItem>
                            <SelectItem value="Service">Service Contract</SelectItem>
                            <SelectItem value="License">License Agreement</SelectItem>
                            <SelectItem value="Consulting">Consulting Agreement</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Start Date</Label>
                        <Input
                          type="date"
                          value={newContract.startDate}
                          onChange={(e) => setNewContract({ ...newContract, startDate: e.target.value })}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label>End Date</Label>
                        <Input
                          type="date"
                          value={newContract.endDate}
                          onChange={(e) => setNewContract({ ...newContract, endDate: e.target.value })}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label>Contract Value</Label>
                        <Input
                          type="number"
                          value={newContract.value}
                          onChange={(e) => setNewContract({ ...newContract, value: e.target.value })}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label>Notice Period (days)</Label>
                        <Input
                          type="number"
                          value={newContract.noticePeriod}
                          onChange={(e) => setNewContract({ ...newContract, noticePeriod: e.target.value })}
                          className="mt-1"
                        />
                      </div>
                    </div>

                    <div className="flex space-x-4">
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="renewalOption"
                          checked={newContract.renewalOption}
                          onChange={(e) => setNewContract({ ...newContract, renewalOption: e.target.checked })}
                          className="rounded border-gray-300"
                        />
                        <Label htmlFor="renewalOption">Renewal Option</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="autoRenewal"
                          checked={newContract.autoRenewal}
                          onChange={(e) => setNewContract({ ...newContract, autoRenewal: e.target.checked })}
                          className="rounded border-gray-300"
                        />
                        <Label htmlFor="autoRenewal">Auto Renewal</Label>
                      </div>
                    </div>

                    <Button onClick={handleAddContract}>Add Contract</Button>
                  </div>
                </TabsContent>

                <TabsContent value="performance" className="p-4 space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium">SLA Metrics</h3>
                  </div>

                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Metric</TableHead>
                          <TableHead>Target</TableHead>
                          <TableHead>Actual</TableHead>
                          <TableHead>Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {getVendorSlaMetrics(selectedVendor.id).map((metric, index) => (
                          <TableRow key={index}>
                            <TableCell className="font-medium">{metric.metric}</TableCell>
                            <TableCell>{metric.target}</TableCell>
                            <TableCell>{metric.actual}</TableCell>
                            <TableCell>
                              <Badge variant={metric.status === "Met" ? "success" : "destructive"}>
                                {metric.status}
                              </Badge>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">SLA Compliance</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-col items-center justify-center h-[120px]">
                          <div className="text-5xl font-bold">{calculateSlaCompliance(selectedVendor.id)}%</div>
                          <div className="text-sm text-muted-foreground mt-2">Metrics meeting targets</div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">SLA Breaches</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-col items-center justify-center h-[120px]">
                          <div className="text-5xl font-bold">{selectedVendor.breaches}</div>
                          <div className="text-sm text-muted-foreground mt-2">Total breaches YTD</div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="contacts" className="p-4 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Primary Contact</Label>
                      <Input value={selectedVendor.contactName} readOnly className="mt-1" />
                    </div>
                    <div>
                      <Label>Email</Label>
                      <Input value={selectedVendor.contactEmail} readOnly className="mt-1" />
                    </div>
                    <div>
                      <Label>Phone</Label>
                      <Input value={selectedVendor.contactPhone} readOnly className="mt-1" />
                    </div>
                  </div>

                  <div className="rounded-md border p-4 mt-4">
                    <h3 className="text-lg font-medium mb-4">Contact History</h3>
                    <div className="space-y-4">
                      <div className="flex items-start gap-4">
                        <div className="bg-muted rounded-full p-2">
                          <FileText className="h-4 w-4" />
                        </div>
                        <div>
                          <div className="font-medium">Quarterly Review Meeting</div>
                          <div className="text-sm text-muted-foreground">April 15, 2025</div>
                          <div className="text-sm mt-1">
                            Discussed SLA performance and upcoming contract renewal. Action items assigned for
                            performance improvement.
                          </div>
                        </div>
                      </div>

                      <Separator />

                      <div className="flex items-start gap-4">
                        <div className="bg-muted rounded-full p-2">
                          <AlertCircle className="h-4 w-4" />
                        </div>
                        <div>
                          <div className="font-medium">SLA Breach Notification</div>
                          <div className="text-sm text-muted-foreground">March 10, 2025</div>
                          <div className="text-sm mt-1">
                            Formal notification sent regarding response time SLA breach. Vendor acknowledged and
                            provided remediation plan.
                          </div>
                        </div>
                      </div>

                      <Separator />

                      <div className="flex items-start gap-4">
                        <div className="bg-muted rounded-full p-2">
                          <Check className="h-4 w-4" />
                        </div>
                        <div>
                          <div className="font-medium">Contract Amendment Signed</div>
                          <div className="text-sm text-muted-foreground">January 22, 2025</div>
                          <div className="text-sm mt-1">
                            Amendment to extend service coverage signed by both parties. Updated terms added to contract
                            repository.
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </ScrollArea>
            </Tabs>

            <DialogFooter>
              <Button variant="outline" onClick={() => setSelectedVendor(null)}>
                Close
              </Button>
              <Button>Save Changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Add Vendor Dialog */}
      <Dialog open={isAddingVendor} onOpenChange={setIsAddingVendor}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Add New Vendor</DialogTitle>
            <DialogDescription>Enter vendor details to add them to your management system</DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <Label htmlFor="name">Vendor Name</Label>
              <Input
                id="name"
                value={newVendor.name}
                onChange={(e) => setNewVendor({ ...newVendor, name: e.target.value })}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="category">Category</Label>
              <Select
                value={newVendor.category}
                onValueChange={(value) => setNewVendor({ ...newVendor, category: value })}
              >
                <SelectTrigger id="category" className="mt-1">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Development">Development</SelectItem>
                  <SelectItem value="QA Testing">QA Testing</SelectItem>
                  <SelectItem value="Support">Support</SelectItem>
                  <SelectItem value="Infrastructure">Infrastructure</SelectItem>
                  <SelectItem value="Consulting">Consulting</SelectItem>
                  <SelectItem value="Security">Security</SelectItem>
                  <SelectItem value="AI & Analytics">AI & Analytics</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="status">Status</Label>
              <Select value={newVendor.status} onValueChange={(value) => setNewVendor({ ...newVendor, status: value })}>
                <SelectTrigger id="status" className="mt-1">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="riskLevel">Risk Level</Label>
              <Select
                value={newVendor.riskLevel}
                onValueChange={(value) => setNewVendor({ ...newVendor, riskLevel: value })}
              >
                <SelectTrigger id="riskLevel" className="mt-1">
                  <SelectValue placeholder="Select risk level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Low">Low</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="High">High</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="slaPerformance">SLA Performance (%)</Label>
              <Input
                id="slaPerformance"
                type="number"
                min="0"
                max="100"
                value={newVendor.slaPerformance}
                onChange={(e) => setNewVendor({ ...newVendor, slaPerformance: e.target.value })}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="contractValue">Contract Value ($)</Label>
              <Input
                id="contractValue"
                type="number"
                value={newVendor.contractValue}
                onChange={(e) => setNewVendor({ ...newVendor, contractValue: e.target.value })}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="contractEndDate">Contract End Date</Label>
              <Input
                id="contractEndDate"
                type="date"
                value={newVendor.contractEndDate}
                onChange={(e) => setNewVendor({ ...newVendor, contractEndDate: e.target.value })}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="breaches">SLA Breaches</Label>
              <Input
                id="breaches"
                type="number"
                min="0"
                value={newVendor.breaches}
                onChange={(e) => setNewVendor({ ...newVendor, breaches: e.target.value })}
                className="mt-1"
              />
            </div>

            <div className="col-span-2">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="hasBackup"
                  checked={newVendor.hasBackup}
                  onChange={(e) => setNewVendor({ ...newVendor, hasBackup: e.target.checked })}
                  className="rounded border-gray-300"
                />
                <Label htmlFor="hasBackup">Has Backup Vendor</Label>
              </div>
            </div>

            <div className="col-span-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={newVendor.description}
                onChange={(e) => setNewVendor({ ...newVendor, description: e.target.value })}
                className="mt-1"
              />
            </div>

            <div className="col-span-2">
              <Label>Contact Information</Label>
              <div className="grid grid-cols-3 gap-2 mt-1">
                <Input
                  placeholder="Contact Name"
                  value={newVendor.contactName}
                  onChange={(e) => setNewVendor({ ...newVendor, contactName: e.target.value })}
                />
                <Input
                  placeholder="Email"
                  value={newVendor.contactEmail}
                  onChange={(e) => setNewVendor({ ...newVendor, contactEmail: e.target.value })}
                />
                <Input
                  placeholder="Phone"
                  value={newVendor.contactPhone}
                  onChange={(e) => setNewVendor({ ...newVendor, contactPhone: e.target.value })}
                />
              </div>
            </div>

            <div className="col-span-2">
              <Label>Tags</Label>
              <div className="flex items-center gap-2 mt-1">
                <Input
                  placeholder="Add tag"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  className="flex-1"
                />
                <Button type="button" onClick={handleAddTag}>
                  Add
                </Button>
              </div>
              <div className="flex flex-wrap gap-1 mt-2">
                {newVendor.tags.map((tag, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="cursor-pointer"
                    onClick={() => handleRemoveTag(tag)}
                  >
                    {tag} ×
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddingVendor(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddVendor}>Add Vendor</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete {vendorToDelete?.name}? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeleteConfirm(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteVendor}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
