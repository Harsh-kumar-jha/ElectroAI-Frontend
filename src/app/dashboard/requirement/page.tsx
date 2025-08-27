"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  CheckCircle,
  Plus,
  FileText,
  Clock,
  Users,
  Upload,
  Image,
  Zap,
} from "lucide-react";
import Link from "next/link";

export default function RequirementPage() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    type: "Electrical",
    priority: "Medium",
    dueDate: "",
    attachments: [] as string[],
    stakeholders: [] as string[],
    estimatedCost: "",
    status: "Open",
    assignedTo: "Unassigned",
    acceptanceCriteria: "",
    comments: "",
    designFile: null as File | null,
  });
  const [fileName, setFileName] = useState("");
  const [designFileName, setDesignFileName] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFileName(e.target.files[0].name);
      setForm({ ...form, attachments: [e.target.files[0].name] });
    }
  };

  const handleDesignFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setDesignFileName(file.name);
      setForm({ ...form, designFile: file });
    }
  };

  const handleAnalyzeDesign = async () => {
    if (!form.designFile) return;

    setIsAnalyzing(true);

    // Simulate AI analysis
    await new Promise((resolve) => setTimeout(resolve, 3000));

    // Mock AI analysis results
    const analysisResults = {
      detectedElements: "3 panels, 12 outlets, 8 switches, 6 light fixtures",
      suggestedRequirements: [
        "Add GFCI protection for bathroom outlets",
        "Install arc fault breakers for bedroom circuits",
        "Upgrade panel to 200A for future expansion",
      ],
      complianceIssues: "Kitchen requires dedicated 20A circuits",
      estimatedCost: "3500",
    };

    // Auto-populate form with AI suggestions
    setForm((prev) => ({
      ...prev,
      description:
        prev.description +
        (prev.description ? "\n\n" : "") +
        `AI Analysis Results:\n- Detected: ${analysisResults.detectedElements}\n- Compliance: ${analysisResults.complianceIssues}`,
      acceptanceCriteria: analysisResults.suggestedRequirements.join(", "),
      estimatedCost: analysisResults.estimatedCost,
    }));

    setIsAnalyzing(false);
  };

  const handleStakeholderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setForm((prev) => {
      const stakeholders = prev.stakeholders.includes(value)
        ? prev.stakeholders.filter((s) => s !== value)
        : [...prev.stakeholders, value];
      return { ...prev, stakeholders };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim()) return;

    // Here you would typically save to backend
    console.log("Requirement submitted:", form);

    setIsSubmitted(true);
    setForm({
      title: "",
      description: "",
      type: "Electrical",
      priority: "Medium",
      dueDate: "",
      attachments: [] as string[],
      stakeholders: [] as string[],
      estimatedCost: "",
      status: "Open",
      assignedTo: "Unassigned",
      acceptanceCriteria: "",
      comments: "",
      designFile: null,
    });
    setFileName("");
    setDesignFileName("");

    // Reset success message after 3 seconds
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
            <Plus className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900">
            Create New Requirement
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Define detailed requirements for your electrical design project with
            comprehensive tracking and management capabilities.
          </p>
          <div className="flex justify-center gap-4 mt-6">
            <Link href="/dashboard/requirement/view">
              <Button variant="outline" className="gap-2">
                <FileText className="h-4 w-4" />
                View All Requirements
              </Button>
            </Link>
          </div>
        </div>

        {/* Success Message */}
        {isSubmitted && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <span className="text-green-800 font-medium">
              Requirement created successfully!
            </span>
          </div>
        )}

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
            <CardContent className="p-6 text-center">
              <Clock className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <h3 className="font-semibold text-blue-900">Quick Processing</h3>
              <p className="text-sm text-blue-700 mt-1">
                Requirements are processed within 24 hours
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
            <CardContent className="p-6 text-center">
              <Users className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <h3 className="font-semibold text-green-900">Collaborative</h3>
              <p className="text-sm text-green-700 mt-1">
                Multiple stakeholders can review and comment
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
            <CardContent className="p-6 text-center">
              <CheckCircle className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <h3 className="font-semibold text-purple-900">Tracked</h3>
              <p className="text-sm text-purple-700 mt-1">
                Full audit trail and status tracking
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Form Card */}
        <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/10 border-b">
            <CardTitle className="text-2xl flex items-center gap-3">
              <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                <FileText className="h-4 w-4 text-primary" />
              </div>
              Requirement Details
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Title</Label>
                  <Input
                    name="title"
                    placeholder="Requirement title"
                    value={form.title}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>Type</Label>
                  <select
                    name="type"
                    className="w-full border rounded px-2 py-1"
                    value={form.type}
                    onChange={handleSelectChange}
                  >
                    <option value="Electrical">Electrical</option>
                    <option value="Safety">Safety</option>
                    <option value="Compliance">Compliance</option>
                    <option value="Design">Design</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label>Priority</Label>
                  <select
                    name="priority"
                    className="w-full border rounded px-2 py-1"
                    value={form.priority}
                    onChange={handleSelectChange}
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                    <option value="Urgent">Urgent</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label>Due Date</Label>
                  <Input
                    type="date"
                    name="dueDate"
                    value={form.dueDate}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Estimated Cost ($)</Label>
                  <Input
                    name="estimatedCost"
                    type="number"
                    min="0"
                    value={form.estimatedCost}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Assign To</Label>
                  <select
                    name="assignedTo"
                    className="w-full border rounded px-2 py-1"
                    value={form.assignedTo}
                    onChange={handleSelectChange}
                  >
                    <option value="Unassigned">Unassigned</option>
                    <option value="Engineer1">Engineer 1</option>
                    <option value="Engineer2">Engineer 2</option>
                    <option value="Client">Client</option>
                    <option value="Admin">Admin</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label>Status</Label>
                  <select
                    name="status"
                    className="w-full border rounded px-2 py-1"
                    value={form.status}
                    onChange={handleSelectChange}
                  >
                    <option value="Open">Open</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Blocked">Blocked</option>
                    <option value="Closed">Closed</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label>Stakeholders</Label>
                  <div className="flex flex-wrap gap-2">
                    {["Admin", "Engineer1", "Engineer2", "Client"].map(
                      (stake) => (
                        <label
                          key={stake}
                          className="flex items-center gap-1 text-xs"
                        >
                          <input
                            type="checkbox"
                            value={stake}
                            checked={form.stakeholders.includes(stake)}
                            onChange={handleStakeholderChange}
                          />
                          {stake}
                        </label>
                      )
                    )}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Attachments</Label>
                  <Input
                    type="file"
                    name="attachments"
                    onChange={handleFileChange}
                  />
                  {fileName && (
                    <span className="text-xs text-muted-foreground">
                      {fileName}
                    </span>
                  )}
                </div>
              </div>

              {/* Design Upload Section */}
              <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Upload className="h-5 w-5 text-blue-600" />
                    AI Design Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Upload your electrical design file (PDF, CAD, or image) for
                    AI-powered analysis and automatic requirement generation.
                  </p>

                  <div className="space-y-2">
                    <Label>Design File</Label>
                    <div className="flex items-center gap-3">
                      <Input
                        type="file"
                        accept=".pdf,.dwg,.jpg,.jpeg,.png,.bmp"
                        onChange={handleDesignFileChange}
                        className="flex-1"
                      />
                      {form.designFile && (
                        <Button
                          type="button"
                          onClick={handleAnalyzeDesign}
                          disabled={isAnalyzing}
                          className="bg-blue-600 hover:bg-blue-700 gap-2"
                        >
                          {isAnalyzing ? (
                            <>
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                              Analyzing...
                            </>
                          ) : (
                            <>
                              <Zap className="h-4 w-4" />
                              Analyze with AI
                            </>
                          )}
                        </Button>
                      )}
                    </div>
                    {designFileName && (
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Image className="h-3 w-3" />
                        {designFileName}
                      </div>
                    )}
                  </div>

                  {isAnalyzing && (
                    <div className="bg-blue-100 border border-blue-200 rounded p-3">
                      <div className="flex items-center gap-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                        <span className="text-blue-800 text-sm font-medium">
                          AI is analyzing your design...
                        </span>
                      </div>
                      <p className="text-xs text-blue-600 mt-1">
                        This may take a few seconds. The analysis will
                        auto-populate fields below.
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>

              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea
                  name="description"
                  placeholder="Describe the requirement..."
                  value={form.description}
                  onChange={handleChange}
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label>Acceptance Criteria</Label>
                <Textarea
                  name="acceptanceCriteria"
                  placeholder="What needs to be true for this requirement to be accepted?"
                  value={form.acceptanceCriteria}
                  onChange={handleChange}
                  rows={2}
                />
              </div>
              <div className="space-y-2">
                <Label>Comments/Notes</Label>
                <Textarea
                  name="comments"
                  placeholder="Any additional notes or comments..."
                  value={form.comments}
                  onChange={handleChange}
                  rows={2}
                />
              </div>
              <Button type="submit" className="w-full mt-4">
                Add Requirement
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
