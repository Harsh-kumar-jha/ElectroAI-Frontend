"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  Zap,
  Building2,
  CheckCircle,
  Clock,
  AlertTriangle,
} from "lucide-react";
import Link from "next/link";
import { DashboardLayout } from "@/features/layouts/dashboard-layout";
import { FileUpload } from "@/features/util/file-upload";

export default function NewProjectPage() {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [aiProcessing, setAiProcessing] = useState(false);
  const [aiResults, setAiResults] = useState<any>(null);
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [projectType, setProjectType] = useState("");

  const handleFileSelect = (file: File) => {
    setUploadedFile(file);
    setAiResults(null);
  };

  const handleAiRecognition = async () => {
    if (!uploadedFile) return;

    setAiProcessing(true);

    // Simulate AI processing
    setTimeout(() => {
      setAiResults({
        status: "success",
        detectedElements: {
          walls: 24,
          rooms: 8,
          doors: 12,
          windows: 16,
          electricalPanels: 2,
        },
        roomTypes: [
          { name: "Living Room", area: "320 sq ft", confidence: 0.95 },
          { name: "Kitchen", area: "180 sq ft", confidence: 0.92 },
          { name: "Bedroom 1", area: "220 sq ft", confidence: 0.88 },
          { name: "Bedroom 2", area: "200 sq ft", confidence: 0.91 },
          { name: "Bathroom 1", area: "80 sq ft", confidence: 0.94 },
          { name: "Bathroom 2", area: "75 sq ft", confidence: 0.89 },
          { name: "Hallway", area: "120 sq ft", confidence: 0.87 },
          { name: "Utility Room", area: "60 sq ft", confidence: 0.93 },
        ],
        recommendations: [
          "Consider additional outlets in the living room for modern electrical needs",
          "Kitchen requires GFCI outlets near water sources",
          "Bedrooms need adequate lighting circuits for comfort",
        ],
        processingTime: "2.3 seconds",
        codeCompliance: 0.94,
      });
      setAiProcessing(false);
    }, 3000);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" asChild>
            <Link
              href="/dashboard/projects"
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Projects
            </Link>
          </Button>
          <div className="space-y-1">
            <h1 className="text-3xl font-bold text-balance">New Project</h1>
            <p className="text-muted-foreground">
              Create a new electrical design project with AI assistance
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Project Details */}
          <div className="space-y-6">
            <Card className="border-border">
              <CardHeader>
                <CardTitle>Project Information</CardTitle>
                <CardDescription>
                  Enter the basic details for your new project
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="projectName">Project Name</Label>
                  <Input
                    id="projectName"
                    placeholder="Enter project name"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    className="border-border"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="projectType">Project Type</Label>
                  <Select value={projectType} onValueChange={setProjectType}>
                    <SelectTrigger className="border-border">
                      <SelectValue placeholder="Select project type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="residential">Residential</SelectItem>
                      <SelectItem value="commercial">Commercial</SelectItem>
                      <SelectItem value="industrial">Industrial</SelectItem>
                      <SelectItem value="healthcare">Healthcare</SelectItem>
                      <SelectItem value="educational">Educational</SelectItem>
                      <SelectItem value="retail">Retail</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="projectDescription">Description</Label>
                  <Textarea
                    id="projectDescription"
                    placeholder="Describe your project..."
                    value={projectDescription}
                    onChange={(e) => setProjectDescription(e.target.value)}
                    className="border-border min-h-[100px]"
                  />
                </div>
              </CardContent>
            </Card>

            {/* File Upload */}
            <Card className="border-border">
              <CardHeader>
                <CardTitle>Upload Floorplan</CardTitle>
                <CardDescription>
                  Upload your architectural floorplan for AI analysis
                </CardDescription>
              </CardHeader>
              <CardContent>
                <FileUpload onFileSelect={handleFileSelect} />
                {uploadedFile && (
                  <div className="mt-4">
                    <Button
                      onClick={handleAiRecognition}
                      disabled={aiProcessing}
                      className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                    >
                      {aiProcessing ? (
                        <>
                          <Clock className="h-4 w-4 mr-2 animate-spin" />
                          Running AI Recognition...
                        </>
                      ) : (
                        <>
                          <Zap className="h-4 w-4 mr-2" />
                          Run AI Recognition
                        </>
                      )}
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* AI Results */}
          <div className="space-y-6">
            <Card className="border-border">
              <CardHeader>
                <CardTitle>AI Analysis Results</CardTitle>
                <CardDescription>
                  {aiResults
                    ? "AI has analyzed your floorplan"
                    : "Upload a floorplan to see AI analysis results"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {!aiResults && !aiProcessing && (
                  <div className="text-center py-8">
                    <Building2 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">
                      AI results will appear here after processing
                    </p>
                  </div>
                )}

                {aiProcessing && (
                  <div className="text-center py-8">
                    <div className="animate-spin h-8 w-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
                    <p className="text-foreground font-medium">
                      Analyzing floorplan...
                    </p>
                    <p className="text-sm text-muted-foreground">
                      This may take a few moments
                    </p>
                  </div>
                )}

                {aiResults && (
                  <div className="space-y-6">
                    {/* Status */}
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-primary" />
                      <span className="font-medium text-foreground">
                        Analysis Complete
                      </span>
                      <Badge variant="secondary" className="ml-auto">
                        {aiResults.processingTime}
                      </Badge>
                    </div>

                    <Separator />

                    {/* Detected Elements */}
                    <div className="space-y-3">
                      <h4 className="font-medium text-foreground">
                        Detected Elements
                      </h4>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Walls:</span>
                          <span className="font-medium">
                            {aiResults.detectedElements.walls}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Rooms:</span>
                          <span className="font-medium">
                            {aiResults.detectedElements.rooms}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Doors:</span>
                          <span className="font-medium">
                            {aiResults.detectedElements.doors}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">
                            Windows:
                          </span>
                          <span className="font-medium">
                            {aiResults.detectedElements.windows}
                          </span>
                        </div>
                      </div>
                    </div>

                    <Separator />

                    {/* Room Types */}
                    <div className="space-y-3">
                      <h4 className="font-medium text-foreground">
                        Identified Rooms
                      </h4>
                      <div className="space-y-2">
                        {aiResults.roomTypes.map((room: any, index: number) => (
                          <div
                            key={index}
                            className="flex items-center justify-between p-2 bg-muted/50 rounded"
                          >
                            <div>
                              <span className="text-sm font-medium">
                                {room.name}
                              </span>
                              <span className="text-xs text-muted-foreground ml-2">
                                {room.area}
                              </span>
                            </div>
                            <Badge variant="outline" className="text-xs">
                              {Math.round(room.confidence * 100)}%
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </div>

                    <Separator />

                    {/* Recommendations */}
                    <div className="space-y-3">
                      <h4 className="font-medium text-foreground">
                        AI Recommendations
                      </h4>
                      <div className="space-y-2">
                        {aiResults.recommendations.map(
                          (rec: string, index: number) => (
                            <div
                              key={index}
                              className="flex items-start gap-2 p-2 bg-primary/5 rounded"
                            >
                              <AlertTriangle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                              <span className="text-sm">{rec}</span>
                            </div>
                          )
                        )}
                      </div>
                    </div>

                    <Separator />

                    {/* Code Compliance */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-foreground">
                          Code Compliance Score
                        </span>
                        <span className="text-lg font-bold text-primary">
                          {Math.round(aiResults.codeCompliance * 100)}%
                        </span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div
                          className="bg-primary h-2 rounded-full transition-all duration-500"
                          style={{
                            width: `${aiResults.codeCompliance * 100}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Action Buttons */}
            {aiResults && (
              <div className="flex gap-4">
                <Button className="flex-1 bg-accent text-accent-foreground hover:bg-accent/90">
                  Create Project
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 border-border bg-transparent"
                >
                  Save as Draft
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
