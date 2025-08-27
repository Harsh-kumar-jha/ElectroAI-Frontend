"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const initialProjects = [
  {
    id: 1,
    name: "Office Building A",
    status: "In Progress",
    requirements: [
      { id: 1, title: "Add emergency lighting system", status: "Open" },
      { id: 2, title: "Install main panel", status: "In Review" },
    ],
  },
  {
    id: 2,
    name: "Residential Complex B",
    status: "Completed",
    requirements: [{ id: 1, title: "Add solar backup", status: "Closed" }],
  },
];

export default function TrackPage() {
  const [projects, setProjects] = useState(initialProjects);
  const [tab, setTab] = useState("projects");

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Project & Requirement Tracking</h1>
        <p className="text-muted-foreground">
          Track project and requirement progress like a Jira board.
        </p>
      </div>
      <Tabs value={tab} onValueChange={setTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="requirements">Requirements</TabsTrigger>
        </TabsList>
        <TabsContent value="projects">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((project) => (
              <Card key={project.id} className="border-border">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>{project.name}</CardTitle>
                  <Badge
                    className={
                      project.status === "Completed"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }
                  >
                    {project.status}
                  </Badge>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="font-medium text-sm mb-1">
                      Requirements:
                    </div>
                    {project.requirements.map((req) => (
                      <div
                        key={req.id}
                        className="flex items-center gap-2 text-xs"
                      >
                        <Badge
                          className={
                            req.status === "Closed"
                              ? "bg-green-100 text-green-700"
                              : req.status === "In Review"
                              ? "bg-blue-100 text-blue-700"
                              : "bg-gray-100 text-gray-700"
                          }
                        >
                          {req.status}
                        </Badge>
                        <span>{req.title}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="requirements">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.flatMap((project) =>
              project.requirements.map((req) => (
                <Card key={project.id + "-" + req.id} className="border-border">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>{req.title}</CardTitle>
                    <Badge
                      className={
                        req.status === "Closed"
                          ? "bg-green-100 text-green-700"
                          : req.status === "In Review"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-gray-100 text-gray-700"
                      }
                    >
                      {req.status}
                    </Badge>
                  </CardHeader>
                  <CardContent>
                    <div className="text-xs text-muted-foreground mb-1">
                      Project: {project.name}
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
