"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Filter, Search, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Sample dependencies data
const initialDependencies = [
  {
    id: "DEP-001",
    sourceProject: "PRJ-001",
    sourceName: "WealthSync Retirement Portal",
    targetProject: "PRJ-007",
    targetName: "Customer Data Platform",
    type: "Blocks",
    status: "Active",
    impact: "High",
    description: "WealthSync requires Customer Data Platform API to be completed first",
  },
  {
    id: "DEP-002",
    sourceProject: "PRJ-002",
    sourceName: "Commercial Lending Platform",
    targetProject: "PRJ-006",
    targetName: "Payment Gateway Integration",
    type: "Depends On",
    status: "At Risk",
    impact: "Medium",
    description: "Commercial Lending Platform depends on Payment Gateway for transaction processing",
  },
  {
    id: "DEP-003",
    sourceProject: "PRJ-003",
    sourceName: "Retail Mobile Banking App",
    targetProject: "PRJ-006",
    targetName: "Payment Gateway Integration",
    type: "Depends On",
    status: "Active",
    impact: "High",
    description: "Mobile Banking requires Payment Gateway for transfers and payments",
  },
  {
    id: "DEP-004",
    sourceProject: "PRJ-004",
    sourceName: "Insurance Claims Processing",
    targetProject: "PRJ-007",
    targetName: "Customer Data Platform",
    type: "Depends On",
    status: "Active",
    impact: "Medium",
    description: "Claims Processing needs customer data for verification",
  },
  {
    id: "DEP-005",
    sourceProject: "PRJ-005",
    sourceName: "Mortgage Origination System",
    targetProject: "PRJ-002",
    targetName: "Commercial Lending Platform",
    type: "Related To",
    status: "Active",
    impact: "Low",
    description: "Shares some components with Commercial Lending Platform",
  },
]

// Sample projects data
const projects = [
  { id: "PRJ-001", name: "WealthSync Retirement Portal", segment: "Wealth" },
  { id: "PRJ-002", name: "Commercial Lending Platform", segment: "Commercial" },
  { id: "PRJ-003", name: "Retail Mobile Banking App", segment: "Retail" },
  { id: "PRJ-004", name: "Insurance Claims Processing", segment: "Insurance" },
  { id: "PRJ-005", name: "Mortgage Origination System", segment: "Lending" },
  { id: "PRJ-006", name: "Payment Gateway Integration", segment: "Payments" },
  { id: "PRJ-007", name: "Customer Data Platform", segment: "Retail" },
]

export default function DependenciesPage() {
  const [dependencies, setDependencies] = useState(initialDependencies)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedView, setSelectedView] = useState("matrix")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [isAddDependencyOpen, setIsAddDependencyOpen] = useState(false)
  const [newDependency, setNewDependency] = useState({
    sourceProject: "",
    targetProject: "",
    type: "Depends On",
    impact: "Medium",
    description: "",
  })

  // Filter dependencies based on search term and status
  const filteredDependencies = dependencies.filter(
    (dependency) =>
      (dependency.sourceName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        dependency.targetName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        dependency.description.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (selectedStatus === "all" || dependency.status === selectedStatus),
  )

  const handleAddDependency = () => {
    // Find source and target project names
    const sourceProject = projects.find((p) => p.id === newDependency.sourceProject)
    const targetProject = projects.find((p) => p.id === newDependency.targetProject)

    if (!sourceProject || !targetProject) {
      console.error("Source or target project not found")
      return
    }

    const newDep = {
      id: `DEP-${String(dependencies.length + 1).padStart(3, "0")}`,
      sourceProject: newDependency.sourceProject,
      sourceName: sourceProject.name,
      targetProject: newDependency.targetProject,
      targetName: targetProject.name,
      type: newDependency.type,
      status: "Active",
      impact: newDependency.impact,
      description: newDependency.description,
    }

    setDependencies([...dependencies, newDep])
    setIsAddDependencyOpen(false)
    setNewDependency({
      sourceProject: "",
      targetProject: "",
      type: "Depends On",
      impact: "Medium",
      description: "",
    })
  }

  const handleDeleteDependency = (id: string) => {
    setDependencies(dependencies.filter((dep) => dep.id !== id))
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-col space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Project Dependencies</h1>
        </div>

        <div className="flex flex-col md:flex-row md:items-center gap-4 justify-between">
          <div className="flex flex-wrap items-center gap-2">
            <Select value={selectedView} onValueChange={setSelectedView}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select View" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="matrix">Matrix View</SelectItem>
                <SelectItem value="network">Network View</SelectItem>
                <SelectItem value="list">List View</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="At Risk">At Risk</SelectItem>
                <SelectItem value="Blocked">Blocked</SelectItem>
                <SelectItem value="Resolved">Resolved</SelectItem>
              </SelectContent>
            </Select>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <Filter className="h-4 w-4" />
                  <span>Filters</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px]">
                <DropdownMenuItem>By Project</DropdownMenuItem>
                <DropdownMenuItem>By Dependency Type</DropdownMenuItem>
                <DropdownMenuItem>By Impact</DropdownMenuItem>
                <DropdownMenuItem>Critical Path Only</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="relative w-full md:w-auto">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search dependencies..."
              className="w-full pl-8 md:w-[250px]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="blocked">Blocked</TabsTrigger>
            <TabsTrigger value="at-risk">At Risk</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-4">
            {selectedView === "matrix" ? (
              <DependencyMatrix dependencies={filteredDependencies} onDelete={handleDeleteDependency} />
            ) : selectedView === "network" ? (
              <DependencyNetwork dependencies={filteredDependencies} />
            ) : (
              <DependencyList dependencies={filteredDependencies} onDelete={handleDeleteDependency} />
            )}
          </TabsContent>

          <TabsContent value="blocked" className="mt-4">
            {selectedView === "matrix" ? (
              <DependencyMatrix
                dependencies={filteredDependencies.filter((d) => d.status === "Blocked")}
                onDelete={handleDeleteDependency}
              />
            ) : selectedView === "network" ? (
              <DependencyNetwork dependencies={filteredDependencies.filter((d) => d.status === "Blocked")} />
            ) : (
              <DependencyList
                dependencies={filteredDependencies.filter((d) => d.status === "Blocked")}
                onDelete={handleDeleteDependency}
              />
            )}
          </TabsContent>

          <TabsContent value="at-risk" className="mt-4">
            {selectedView === "matrix" ? (
              <DependencyMatrix
                dependencies={filteredDependencies.filter((d) => d.status === "At Risk")}
                onDelete={handleDeleteDependency}
              />
            ) : selectedView === "network" ? (
              <DependencyNetwork dependencies={filteredDependencies.filter((d) => d.status === "At Risk")} />
            ) : (
              <DependencyList
                dependencies={filteredDependencies.filter((d) => d.status === "At Risk")}
                onDelete={handleDeleteDependency}
              />
            )}
          </TabsContent>

          <TabsContent value="active" className="mt-4">
            {selectedView === "matrix" ? (
              <DependencyMatrix
                dependencies={filteredDependencies.filter((d) => d.status === "Active")}
                onDelete={handleDeleteDependency}
              />
            ) : selectedView === "network" ? (
              <DependencyNetwork dependencies={filteredDependencies.filter((d) => d.status === "Active")} />
            ) : (
              <DependencyList
                dependencies={filteredDependencies.filter((d) => d.status === "Active")}
                onDelete={handleDeleteDependency}
              />
            )}
          </TabsContent>
        </Tabs>
      </div>

      {/* Add Dependency Dialog */}
      <Dialog open={isAddDependencyOpen} onOpenChange={setIsAddDependencyOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add Dependency</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="source-project">Source Project</Label>
              <Select
                value={newDependency.sourceProject}
                onValueChange={(value) => setNewDependency({ ...newDependency, sourceProject: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select source project" />
                </SelectTrigger>
                <SelectContent>
                  {projects.map((project) => (
                    <SelectItem key={project.id} value={project.id}>
                      {project.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="dependency-type">Dependency Type</Label>
              <Select
                value={newDependency.type}
                onValueChange={(value) => setNewDependency({ ...newDependency, type: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select dependency type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Depends On">Depends On</SelectItem>
                  <SelectItem value="Blocks">Blocks</SelectItem>
                  <SelectItem value="Related To">Related To</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="target-project">Target Project</Label>
              <Select
                value={newDependency.targetProject}
                onValueChange={(value) => setNewDependency({ ...newDependency, targetProject: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select target project" />
                </SelectTrigger>
                <SelectContent>
                  {projects
                    .filter((project) => project.id !== newDependency.sourceProject)
                    .map((project) => (
                      <SelectItem key={project.id} value={project.id}>
                        {project.name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="impact">Impact</Label>
              <Select
                value={newDependency.impact}
                onValueChange={(value) => setNewDependency({ ...newDependency, impact: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select impact" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Low">Low</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="High">High</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                placeholder="Enter dependency description"
                value={newDependency.description}
                onChange={(e) => setNewDependency({ ...newDependency, description: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDependencyOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleAddDependency}
              disabled={!newDependency.sourceProject || !newDependency.targetProject || !newDependency.description}
            >
              Add Dependency
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

interface DependencyMatrixProps {
  dependencies: any[]
  onDelete: (id: string) => void
}

function DependencyMatrix({ dependencies, onDelete }: DependencyMatrixProps) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-bold">Dependency Matrix</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border overflow-auto p-2">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">ID</TableHead>
                <TableHead className="w-[200px]">Source Project</TableHead>
                <TableHead className="w-[150px]">Dependency Type</TableHead>
                <TableHead className="w-[200px]">Target Project</TableHead>
                <TableHead className="w-[100px]">Status</TableHead>
                <TableHead className="w-[100px]">Impact</TableHead>
                <TableHead className="min-w-[200px]">Description</TableHead>
                <TableHead className="w-[80px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {dependencies.map((dependency) => (
                <TableRow key={dependency.id}>
                  <TableCell className="font-medium">{dependency.id}</TableCell>
                  <TableCell>{dependency.sourceName}</TableCell>
                  <TableCell>{dependency.type}</TableCell>
                  <TableCell>{dependency.targetName}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        dependency.status === "Active"
                          ? "default"
                          : dependency.status === "At Risk"
                            ? "outline"
                            : "destructive"
                      }
                      className={dependency.status === "At Risk" ? "border-amber-500 text-amber-500" : ""}
                    >
                      {dependency.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={
                        dependency.impact === "High"
                          ? "border-red-500 text-red-500"
                          : dependency.impact === "Medium"
                            ? "border-amber-500 text-amber-500"
                            : "border-green-500 text-green-500"
                      }
                    >
                      {dependency.impact}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm">{dependency.description}</TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onDelete(dependency.id)}
                      className="h-8 w-8 text-red-500 hover:text-red-600"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {dependencies.length === 0 && (
                <TableRow>
                  <TableCell colSpan={8} className="h-24 text-center">
                    No dependencies found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}

interface DependencyNetworkProps {
  dependencies: any[]
}

function DependencyNetwork({ dependencies }: DependencyNetworkProps) {
  // Get unique projects from dependencies
  const projectsSet = new Set<string>()
  dependencies.forEach((dep) => {
    projectsSet.add(dep.sourceProject)
    projectsSet.add(dep.targetProject)
  })
  const uniqueProjects = Array.from(projectsSet)

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-bold">Dependency Network</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[500px] w-full rounded-md border p-6 flex items-center justify-center">
          <div className="relative h-full w-full">
            {/* Render nodes (projects) */}
            {uniqueProjects.map((projectId, index) => {
              const angle = (index / uniqueProjects.length) * 2 * Math.PI
              const radius = 200
              const x = 300 + Math.cos(angle) * radius
              const y = 250 + Math.sin(angle) * radius

              // Find project name
              const sourceDep = dependencies.find((d) => d.sourceProject === projectId)
              const targetDep = dependencies.find((d) => d.targetProject === projectId)
              const projectName = sourceDep ? sourceDep.sourceName : targetDep ? targetDep.targetName : projectId

              return (
                <div
                  key={projectId}
                  className="absolute flex h-16 w-16 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground"
                  style={{
                    left: `${x}px`,
                    top: `${y}px`,
                    transform: "translate(-50%, -50%)",
                  }}
                  title={projectName}
                >
                  {projectId.split("-")[1]}
                </div>
              )
            })}

            {/* Render edges (dependencies) */}
            <svg className="absolute inset-0 h-full w-full">
              {dependencies.map((dep) => {
                const sourceIndex = uniqueProjects.indexOf(dep.sourceProject)
                const targetIndex = uniqueProjects.indexOf(dep.targetProject)

                const sourceAngle = (sourceIndex / uniqueProjects.length) * 2 * Math.PI
                const targetAngle = (targetIndex / uniqueProjects.length) * 2 * Math.PI

                const radius = 200
                const sourceX = 300 + Math.cos(sourceAngle) * radius
                const sourceY = 250 + Math.sin(sourceAngle) * radius
                const targetX = 300 + Math.cos(targetAngle) * radius
                const targetY = 250 + Math.sin(targetAngle) * radius

                // Determine line color based on dependency status
                let strokeColor = "#3b82f6" // blue for Active
                if (dep.status === "At Risk") strokeColor = "#f59e0b" // amber for At Risk
                if (dep.status === "Blocked") strokeColor = "#ef4444" // red for Blocked

                // Determine line style based on dependency type
                let strokeDasharray = "none" // solid for Depends On
                if (dep.type === "Related To") strokeDasharray = "5,5" // dashed for Related To

                return (
                  <g key={dep.id}>
                    <line
                      x1={sourceX}
                      y1={sourceY}
                      x2={targetX}
                      y2={targetY}
                      stroke={strokeColor}
                      strokeWidth={dep.impact === "High" ? 3 : dep.impact === "Medium" ? 2 : 1}
                      strokeDasharray={strokeDasharray}
                      markerEnd="url(#arrowhead)"
                    />
                    {/* Add arrowhead marker */}
                    <defs>
                      <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                        <polygon points="0 0, 10 3.5, 0 7" fill={strokeColor} />
                      </marker>
                    </defs>
                  </g>
                )
              })}
            </svg>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-3 gap-6">
          <div className="rounded-md border p-3">
            <h3 className="text-sm font-medium mb-2">Dependency Types</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="h-1 w-8 bg-primary"></div>
                <span className="text-xs">Depends On</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-1 w-8 bg-primary" style={{ strokeDasharray: "5,5" }}></div>
                <span className="text-xs">Related To</span>
              </div>
            </div>
          </div>

          <div className="rounded-md border p-3">
            <h3 className="text-sm font-medium mb-2">Status</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="h-1 w-8 bg-blue-500"></div>
                <span className="text-xs">Active</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-1 w-8 bg-amber-500"></div>
                <span className="text-xs">At Risk</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-1 w-8 bg-red-500"></div>
                <span className="text-xs">Blocked</span>
              </div>
            </div>
          </div>

          <div className="rounded-md border p-3">
            <h3 className="text-sm font-medium mb-2">Impact</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="h-3 w-8 bg-primary"></div>
                <span className="text-xs">High</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-8 bg-primary"></div>
                <span className="text-xs">Medium</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-1 w-8 bg-primary"></div>
                <span className="text-xs">Low</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

interface DependencyListProps {
  dependencies: any[]
  onDelete: (id: string) => void
}

function DependencyList({ dependencies, onDelete }: DependencyListProps) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-bold">Dependencies List</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {dependencies.length === 0 ? (
            <div className="rounded-md border border-dashed p-8 text-center">
              <p className="text-muted-foreground">No dependencies found.</p>
            </div>
          ) : (
            dependencies.map((dependency) => (
              <Card key={dependency.id}>
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{dependency.id}</Badge>
                        <Badge
                          variant={
                            dependency.status === "Active"
                              ? "default"
                              : dependency.status === "At Risk"
                                ? "outline"
                                : "destructive"
                          }
                          className={dependency.status === "At Risk" ? "border-amber-500 text-amber-500" : ""}
                        >
                          {dependency.status}
                        </Badge>
                        <Badge
                          variant="outline"
                          className={
                            dependency.impact === "High"
                              ? "border-red-500 text-red-500"
                              : dependency.impact === "Medium"
                                ? "border-amber-500 text-amber-500"
                                : "border-green-500 text-green-500"
                          }
                        >
                          {dependency.impact}
                        </Badge>
                      </div>
                      <h3 className="text-lg font-medium mt-2">
                        {dependency.sourceName} <span className="text-muted-foreground">{dependency.type}</span>{" "}
                        {dependency.targetName}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1">{dependency.description}</p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-red-500 hover:text-red-600 hover:bg-red-50"
                      onClick={() => onDelete(dependency.id)}
                    >
                      <X className="h-4 w-4 mr-2" /> Remove
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  )
}
