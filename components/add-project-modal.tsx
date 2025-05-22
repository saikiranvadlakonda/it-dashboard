"use client"

import { useState, useEffect } from "react"
import { X, ArrowLeft, ArrowRight, Save } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"

interface AddProjectModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: (project: any) => void
  project?: any
}

export function AddProjectModal({ open, onOpenChange, onSave, project }: AddProjectModalProps) {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    name: project?.name || "",
    segment: project?.segment || "",
    description: project?.description || "",
    owner: project?.owner || "",
    priority: project?.priority || "",
    startDate: project?.startDate ? new Date(project.startDate) : (null as Date | null),
    endDate: project?.endDate ? new Date(project.endDate) : (null as Date | null),
    budget: project?.budget || "",
    roi: project?.roi || "",
    teams: project?.teams || ([] as string[]),
    tags: project?.tags || ([] as string[]),
  })
  const [currentTag, setCurrentTag] = useState("")
  const [currentTeam, setCurrentTeam] = useState("")

  const totalSteps = 3

  useEffect(() => {
    if (project) {
      setFormData({
        name: project.name || "",
        segment: project.segment || "",
        description: project.description || "",
        owner: project.owner || "",
        priority: project.priority || "",
        startDate: project.startDate ? new Date(project.startDate) : null,
        endDate: project.endDate ? new Date(project.endDate) : null,
        budget: project.budget || "",
        roi: project.roi || "",
        teams: project.teams || [],
        tags: project.tags || [],
      })
    }
  }, [project])

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1)
    }
  }

  const handlePrevious = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  const handleChange = (field: string, value: any) => {
    setFormData({
      ...formData,
      [field]: value,
    })
  }

  const handleAddTag = () => {
    if (currentTag.trim() && !formData.tags.includes(currentTag.trim())) {
      setFormData({
        ...formData,
        tags: [...formData.tags, currentTag.trim()],
      })
      setCurrentTag("")
    }
  }

  const handleRemoveTag = (tag: string) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter((t) => t !== tag),
    })
  }

  const handleAddTeam = () => {
    if (currentTeam.trim() && !formData.teams.includes(currentTeam.trim())) {
      setFormData({
        ...formData,
        teams: [...formData.teams, currentTeam.trim()],
      })
      setCurrentTeam("")
    }
  }

  const handleRemoveTeam = (team: string) => {
    setFormData({
      ...formData,
      teams: formData.teams.filter((t) => t !== team),
    })
  }

  const handleSave = () => {
    if (project) {
      // Editing existing project
      const updatedProject = {
        ...project,
        ...formData,
        targetRelease: formData.endDate ? format(formData.endDate, "dd-MMM") : "",
      }
      onSave(updatedProject)
    } else {
      // Creating new project
      const newProject = {
        ...formData,
        id: `PRJ-${Math.floor(Math.random() * 1000)
          .toString()
          .padStart(3, "0")}`,
        completion: 0,
        status: "Not Started",
        targetRelease: formData.endDate ? format(formData.endDate, "dd-MMM") : "",
        intake: "In Progress",
      }
      onSave(newProject)
    }
    onOpenChange(false)
    // Reset form
    setFormData({
      name: "",
      segment: "",
      description: "",
      owner: "",
      priority: "",
      startDate: null,
      endDate: null,
      budget: "",
      roi: "",
      teams: [],
      tags: [],
    })
    setStep(1)
  }

  const handleClose = () => {
    onOpenChange(false)
    setStep(1)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle>{project ? "Edit Project" : "Add New Project"}</DialogTitle>
            <Button variant="ghost" size="icon" onClick={handleClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        <div className="flex justify-between mb-6">
          {Array.from({ length: totalSteps }).map((_, index) => (
            <div
              key={index}
              className={`flex-1 h-2 rounded-full mx-1 ${
                index + 1 <= step ? "bg-primary" : "bg-muted"
              } transition-colors`}
            ></div>
          ))}
        </div>

        {step === 1 && (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Project Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                placeholder="Enter project name"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="segment">Segment *</Label>
              <Select value={formData.segment} onValueChange={(value) => handleChange("segment", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select segment" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Wealth">Wealth</SelectItem>
                  <SelectItem value="Commercial">Commercial</SelectItem>
                  <SelectItem value="Retail">Retail</SelectItem>
                  <SelectItem value="Insurance">Insurance</SelectItem>
                  <SelectItem value="Lending">Lending</SelectItem>
                  <SelectItem value="Payments">Payments</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleChange("description", e.target.value)}
                placeholder="Enter project description"
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="owner">Project Owner *</Label>
              <Input
                id="owner"
                value={formData.owner}
                onChange={(e) => handleChange("owner", e.target.value)}
                placeholder="Enter project owner"
                required
              />
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="priority">Priority *</Label>
              <Select value={formData.priority} onValueChange={(value) => handleChange("priority", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="P1">P1 (High)</SelectItem>
                  <SelectItem value="P2">P2 (Medium)</SelectItem>
                  <SelectItem value="P3">P3 (Low)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="startDate">Start Date *</Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="startDate"
                    type="date"
                    value={formData.startDate ? format(formData.startDate, "yyyy-MM-dd") : ""}
                    onChange={(e) => {
                      const date = e.target.value ? new Date(e.target.value) : null
                      handleChange("startDate", date)
                      // If end date is before new start date, clear end date
                      if (date && formData.endDate && date > formData.endDate) {
                        handleChange("endDate", null)
                      }
                    }}
                    className="w-full"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => {
                      // Clear the date
                      handleChange("startDate", null)
                    }}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="endDate">Target End Date *</Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="endDate"
                    type="date"
                    value={formData.endDate ? format(formData.endDate, "yyyy-MM-dd") : ""}
                    onChange={(e) => {
                      const date = e.target.value ? new Date(e.target.value) : null
                      handleChange("endDate", date)
                    }}
                    min={formData.startDate ? format(formData.startDate, "yyyy-MM-dd") : undefined}
                    className="w-full"
                    disabled={!formData.startDate}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => {
                      // Clear the date
                      handleChange("endDate", null)
                    }}
                    disabled={!formData.endDate}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                {!formData.startDate && (
                  <p className="text-xs text-muted-foreground">Please select a start date first</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="budget">Budget</Label>
                <Input
                  id="budget"
                  value={formData.budget}
                  onChange={(e) => handleChange("budget", e.target.value)}
                  placeholder="e.g. $500,000"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="roi">Estimated ROI</Label>
                <Input
                  id="roi"
                  value={formData.roi}
                  onChange={(e) => handleChange("roi", e.target.value)}
                  placeholder="e.g. $1.2M"
                />
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Teams</Label>
              <div className="flex gap-2">
                <Input
                  value={currentTeam}
                  onChange={(e) => setCurrentTeam(e.target.value)}
                  placeholder="Add team"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault()
                      handleAddTeam()
                    }
                  }}
                />
                <Button type="button" onClick={handleAddTeam}>
                  Add
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.teams.map((team) => (
                  <Badge key={team} variant="secondary" className="px-2 py-1">
                    {team}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-4 w-4 ml-1 p-0"
                      onClick={() => handleRemoveTeam(team)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label>Tags</Label>
              <div className="flex gap-2">
                <Input
                  value={currentTag}
                  onChange={(e) => setCurrentTag(e.target.value)}
                  placeholder="Add tag"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault()
                      handleAddTag()
                    }
                  }}
                />
                <Button type="button" onClick={handleAddTag}>
                  Add
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="px-2 py-1">
                    {tag}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-4 w-4 ml-1 p-0"
                      onClick={() => handleRemoveTag(tag)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                ))}
              </div>
            </div>

            <div className="p-4 border rounded-md bg-muted/30 mt-4">
              <h3 className="font-medium mb-2">Project Summary</h3>
              <div className="space-y-1 text-sm">
                <p>
                  <span className="font-medium">Name:</span> {formData.name}
                </p>
                <p>
                  <span className="font-medium">Segment:</span> {formData.segment}
                </p>
                <p>
                  <span className="font-medium">Owner:</span> {formData.owner}
                </p>
                <p>
                  <span className="font-medium">Priority:</span> {formData.priority}
                </p>
                <p>
                  <span className="font-medium">Timeline:</span>{" "}
                  {formData.startDate ? format(formData.startDate, "dd MMM yyyy") : "Not set"} to{" "}
                  {formData.endDate ? format(formData.endDate, "dd MMM yyyy") : "Not set"}
                </p>
                <p>
                  <span className="font-medium">Budget:</span> {formData.budget || "Not specified"}
                </p>
                <p>
                  <span className="font-medium">Est. ROI:</span> {formData.roi || "Not specified"}
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-between mt-6">
          {step > 1 ? (
            <Button type="button" variant="outline" onClick={handlePrevious}>
              <ArrowLeft className="mr-2 h-4 w-4" /> Previous
            </Button>
          ) : (
            <Button type="button" variant="outline" onClick={handleClose}>
              Cancel
            </Button>
          )}

          {step < totalSteps ? (
            <Button
              type="button"
              onClick={handleNext}
              disabled={
                (step === 1 && (!formData.name || !formData.segment || !formData.owner)) ||
                (step === 2 && (!formData.priority || !formData.startDate || !formData.endDate))
              }
            >
              Next <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Button type="button" onClick={handleSave}>
              <Save className="mr-2 h-4 w-4" /> Save Project
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
