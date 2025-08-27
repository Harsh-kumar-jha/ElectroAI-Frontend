"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowLeft,
  Building2,
  Calendar,
  Zap,
  Download,
  Share,
  Edit,
  Eye,
  Cable as Cube,
  FileText,
  Settings,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { ThreeDViewer } from "@/features/util/three-d-viewer";

// Mock project data
const projectData = {
  id: 1,
  name: "Office Building A",
  description: "Modern office complex with 5 floors and underground parking",
  type: "Commercial",
  status: "completed",
  createdAt: "2024-01-15",
  updatedAt: "2024-01-20",
  aiRequestsUsed: 2,
  floorplanUrl: "/placeholder-98lvy.png",
  detectedElements: {
    walls: 24,
    rooms: 8,
    doors: 12,
    windows: 16,
    electricalPanels: 2,
  },
  rooms: [
    {
      id: 1,
      name: "Reception",
      type: "Office",
      area: "320 sq ft",
      x: 50,
      y: 50,
      width: 120,
      height: 80,
    },
    {
      id: 2,
      name: "Conference Room",
      type: "Meeting",
      area: "280 sq ft",
      x: 200,
      y: 50,
      width: 100,
      height: 100,
    },
    {
      id: 3,
      name: "Office 1",
      type: "Office",
      area: "180 sq ft",
      x: 50,
      y: 150,
      width: 80,
      height: 90,
    },
    {
      id: 4,
      name: "Office 2",
      type: "Office",
      area: "180 sq ft",
      x: 150,
      y: 150,
      width: 80,
      height: 90,
    },
    {
      id: 5,
      name: "Break Room",
      type: "Utility",
      area: "120 sq ft",
      x: 250,
      y: 150,
      width: 70,
      height: 60,
    },
    {
      id: 6,
      name: "Storage",
      type: "Storage",
      area: "80 sq ft",
      x: 350,
      y: 50,
      width: 50,
      height: 80,
    },
  ],
};

const getRoomColor = (type: string) => {
  switch (type) {
    case "Office":
      return "rgba(76, 175, 80, 0.3)"; // Green
    case "Meeting":
      return "rgba(33, 150, 243, 0.3)"; // Blue
    case "Utility":
      return "rgba(255, 152, 0, 0.3)"; // Orange
    case "Storage":
      return "rgba(156, 39, 176, 0.3)"; // Purple
    default:
      return "rgba(158, 158, 158, 0.3)"; // Gray
  }
};

export default function ProjectDetailsPage() {
  const [show3DComingSoon, setShow3DComingSoon] = useState(false);

  const handleRender3D = () => {
    setShow3DComingSoon(true);
    setTimeout(() => setShow3DComingSoon(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/dashboard/project" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Projects
            </Link>
          </Button>
          <div className="space-y-1">
            <h1 className="text-3xl font-bold text-balance">
              {projectData.name}
            </h1>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Building2 className="h-4 w-4" />
                <span>{projectData.type}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>
                  Created {new Date(projectData.createdAt).toLocaleDateString()}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <Zap className="h-4 w-4" />
                <span>{projectData.aiRequestsUsed} AI requests used</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="border-border bg-transparent"
          >
            <Share className="h-4 w-4 mr-2" />
            Share
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="border-border bg-transparent"
          >
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button
            size="sm"
            className="bg-accent text-accent-foreground hover:bg-accent/90"
          >
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </Button>
        </div>
      </div>

      {/* Project Status */}
      <Card className="border-border">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm font-medium">Project Status</p>
              <p className="text-xs text-muted-foreground">
                {projectData.description}
              </p>
            </div>
            <Badge
              variant="secondary"
              className="bg-primary/10 text-primary border-primary/20"
            >
              Completed
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Main Content Tabs */}
      <Tabs defaultValue="floorplan" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="floorplan" className="flex items-center gap-2">
            <Eye className="h-4 w-4" />
            Floorplan
          </TabsTrigger>
          <TabsTrigger value="analysis" className="flex items-center gap-2">
            <Zap className="h-4 w-4" />
            AI Analysis
          </TabsTrigger>
          <TabsTrigger value="3d" className="flex items-center gap-2">
            <Cube className="h-4 w-4" />
            3D View
          </TabsTrigger>
          <TabsTrigger value="reports" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Reports
          </TabsTrigger>
        </TabsList>

        {/* Floorplan Tab */}
        <TabsContent value="floorplan" className="space-y-6">
          <Card className="border-border">
            <CardHeader>
              <CardTitle>Uploaded Floorplan with AI Detection</CardTitle>
              <CardDescription>
                View your original floorplan with AI-detected elements overlaid
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative bg-muted/30 rounded-lg overflow-hidden">
                <img
                  src={projectData.floorplanUrl || "/placeholder.svg"}
                  alt="Project floorplan"
                  className="w-full h-auto max-h-[500px] object-contain"
                />
                {/* Overlay detected rooms */}
                <svg
                  className="absolute inset-0 w-full h-full"
                  viewBox="0 0 400 300"
                >
                  {projectData.rooms.map((room) => (
                    <g key={room.id}>
                      <rect
                        x={room.x}
                        y={room.y}
                        width={room.width}
                        height={room.height}
                        fill={getRoomColor(room.type)}
                        stroke={getRoomColor(room.type).replace("0.3", "0.8")}
                        strokeWidth="2"
                        className="transition-opacity hover:opacity-80"
                      />
                      <text
                        x={room.x + room.width / 2}
                        y={room.y + room.height / 2}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        className="fill-foreground text-xs font-medium"
                        style={{ fontSize: "10px" }}
                      >
                        {room.name}
                      </text>
                    </g>
                  ))}
                </svg>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <Badge
                  variant="outline"
                  className="bg-green-50 text-green-700 border-green-200"
                >
                  Office Spaces
                </Badge>
                <Badge
                  variant="outline"
                  className="bg-blue-50 text-blue-700 border-blue-200"
                >
                  Meeting Rooms
                </Badge>
                <Badge
                  variant="outline"
                  className="bg-orange-50 text-orange-700 border-orange-200"
                >
                  Utility Areas
                </Badge>
                <Badge
                  variant="outline"
                  className="bg-purple-50 text-purple-700 border-purple-200"
                >
                  Storage
                </Badge>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* AI Analysis Tab */}
        <TabsContent value="analysis" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-border">
              <CardHeader>
                <CardTitle>Detected Elements</CardTitle>
                <CardDescription>
                  AI-identified structural elements
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <div className="text-2xl font-bold text-primary">
                      {projectData.detectedElements.walls}
                    </div>
                    <div className="text-sm text-muted-foreground">Walls</div>
                  </div>
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <div className="text-2xl font-bold text-primary">
                      {projectData.detectedElements.rooms}
                    </div>
                    <div className="text-sm text-muted-foreground">Rooms</div>
                  </div>
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <div className="text-2xl font-bold text-primary">
                      {projectData.detectedElements.doors}
                    </div>
                    <div className="text-sm text-muted-foreground">Doors</div>
                  </div>
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <div className="text-2xl font-bold text-primary">
                      {projectData.detectedElements.windows}
                    </div>
                    <div className="text-sm text-muted-foreground">Windows</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader>
                <CardTitle>Room Analysis</CardTitle>
                <CardDescription>
                  Detailed room identification and areas
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {projectData.rooms.map((room) => (
                    <div
                      key={room.id}
                      className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
                    >
                      <div>
                        <div className="font-medium text-sm">{room.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {room.type}
                        </div>
                      </div>
                      <div className="text-sm font-medium">{room.area}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* 3D View Tab */}
        <TabsContent value="3d" className="space-y-6">
          <ThreeDViewer rooms={projectData.rooms} />
        </TabsContent>

        {/* Reports Tab */}
        <TabsContent value="reports" className="space-y-6">
          <Card className="border-border">
            <CardHeader>
              <CardTitle>Project Reports</CardTitle>
              <CardDescription>
                Generate and download project documentation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border border-border rounded-lg">
                  <div className="flex items-center gap-3 mb-2">
                    <FileText className="h-5 w-5 text-primary" />
                    <span className="font-medium">Design Summary</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    Comprehensive overview of the electrical design and AI
                    analysis
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-border bg-transparent"
                  >
                    <Download className="h-3 w-3 mr-2" />
                    Download PDF
                  </Button>
                </div>
                <div className="p-4 border border-border rounded-lg">
                  <div className="flex items-center gap-3 mb-2">
                    <Settings className="h-5 w-5 text-primary" />
                    <span className="font-medium">Code Compliance</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    Detailed compliance report with NEC standards validation
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-border bg-transparent"
                  >
                    <Download className="h-3 w-3 mr-2" />
                    Download PDF
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
