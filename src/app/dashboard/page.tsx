"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Users,
  FolderOpen,
  Zap,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
  BarChart3,
  Calendar,
  Target,
  Award,
  Activity,
  UserPlus,
} from "lucide-react";
import { dataStore } from "@/lib/data-store";
import type { AuthUser, Project } from "@/lib/types";

export default function Dashboard() {
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [analytics, setAnalytics] = useState<any>(null);

  useEffect(() => {
    const user = dataStore.getCurrentUser();
    const userProjects = dataStore.getProjects();
    const analyticsData = dataStore.getAnalytics();

    setCurrentUser(user);
    setProjects(userProjects);
    setAnalytics(analyticsData);
  }, []);

  if (!currentUser || !analytics) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  const recentProjects = projects.slice(0, 3);
  const completedProjects = projects.filter((p) => p.status === "completed");
  const inProgressProjects = projects.filter((p) => p.status === "in_progress");
  const needsReviewProjects = projects.filter((p) => p.status === "review");

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-balance">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back, {currentUser.firstName}! Here's an overview of your
          ElectroAI Designer activity.
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Projects
            </CardTitle>
            <FolderOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.totalProjects}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-primary">+{analytics.activeProjects}</span>{" "}
              active projects
            </p>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              AI Requests Used
            </CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {analytics.aiRequestsUsed}/5
            </div>
            <p className="text-xs text-muted-foreground">
              {analytics.aiRequestsRemaining} remaining
            </p>
            <Progress
              value={(analytics.aiRequestsUsed / 5) * 100}
              className="mt-2"
            />
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Time Saved</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(analytics.totalTimeSpent / 60)}h
            </div>
            <p className="text-xs text-muted-foreground">
              <span className="text-primary">
                +{Math.round((analytics.totalTimeSpent / 60) * 0.3)}h
              </span>{" "}
              this month
            </p>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {analytics.totalDesigns > 0
                ? Math.round(
                    (analytics.totalDesigns / (analytics.totalDesigns + 1)) *
                      100
                  )
                : 0}
              %
            </div>
            <p className="text-xs text-muted-foreground">
              Code compliance accuracy
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Analytics Tabs */}
      <Tabs defaultValue="user" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="user" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            User Analytics
          </TabsTrigger>
          <TabsTrigger value="team" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Team Analytics
          </TabsTrigger>
          <TabsTrigger value="projects" className="flex items-center gap-2">
            <FolderOpen className="h-4 w-4" />
            Project Analytics
          </TabsTrigger>
        </TabsList>

        {/* User Analytics Tab */}
        <TabsContent value="user" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5 text-primary" />
                  Personal Performance
                </CardTitle>
                <CardDescription>
                  Your individual usage and productivity metrics
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Projects Created</span>
                    <span className="font-medium">
                      {analytics.totalProjects}
                    </span>
                  </div>
                  <Progress
                    value={Math.min((analytics.totalProjects / 20) * 100, 100)}
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Designs Generated</span>
                    <span className="font-medium">
                      {analytics.totalDesigns}
                    </span>
                  </div>
                  <Progress
                    value={Math.min((analytics.totalDesigns / 50) * 100, 100)}
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>AI Requests</span>
                    <span className="font-medium">
                      {analytics.aiRequestsUsed}/5
                    </span>
                  </div>
                  <Progress value={(analytics.aiRequestsUsed / 5) * 100} />
                </div>
                <div className="pt-2 flex items-center justify-between">
                  <Badge variant="secondary" className="text-xs">
                    Free Plan Active
                  </Badge>
                  <Button variant="outline" size="sm">
                    <Award className="h-3 w-3 mr-1" />
                    Upgrade
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-primary" />
                  Goals & Achievements
                </CardTitle>
                <CardDescription>
                  Track your progress and milestones
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-primary/10 rounded-lg">
                    <div className="space-y-1">
                      <p className="text-sm font-medium">First Project</p>
                      <p className="text-xs text-muted-foreground">
                        Create your first electrical design
                      </p>
                    </div>
                    <CheckCircle className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div className="space-y-1">
                      <p className="text-sm font-medium">AI Explorer</p>
                      <p className="text-xs text-muted-foreground">
                        Use AI generation 5 times
                      </p>
                    </div>
                    {analytics.aiRequestsUsed >= 5 ? (
                      <CheckCircle className="h-5 w-5 text-primary" />
                    ) : (
                      <div className="text-xs text-muted-foreground">
                        {analytics.aiRequestsUsed}/5
                      </div>
                    )}
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Project Master</p>
                      <p className="text-xs text-muted-foreground">
                        Complete 10 projects
                      </p>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {analytics.completedProjects}/10
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                Activity Timeline
              </CardTitle>
              <CardDescription>
                Your recent activity and project milestones
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentProjects.map((project, index) => (
                  <div
                    key={project.id}
                    className="flex items-center gap-4 p-3 bg-muted/30 rounded-lg"
                  >
                    <div className="flex-shrink-0">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium">{project.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {project.buildingType} • Created{" "}
                        {new Date(project.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <Badge variant="outline" className="text-xs capitalize">
                      {project.status.replace("_", " ")}
                    </Badge>
                  </div>
                ))}
                {recentProjects.length === 0 && (
                  <div className="text-center py-8">
                    <FolderOpen className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">
                      No recent projects
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Team Analytics Tab */}
        <TabsContent value="team" className="space-y-6">
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                Team Collaboration
              </CardTitle>
              <CardDescription>
                Team productivity and collaboration insights
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <Users className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium text-foreground mb-2">
                  Team Features Coming Soon
                </h3>
                <p className="text-sm text-muted-foreground mb-6 max-w-md mx-auto">
                  Collaborate with your team, share projects, and track
                  collective productivity. Available in Pro and Enterprise
                  plans.
                </p>
                <div className="flex items-center justify-center gap-3">
                  <Button variant="outline" size="sm">
                    <UserPlus className="h-4 w-4 mr-2" />
                    Invite Team Members
                  </Button>
                  <Button
                    size="sm"
                    className="bg-accent text-accent-foreground hover:bg-accent/90"
                  >
                    <Award className="h-4 w-4 mr-2" />
                    Upgrade to Pro
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Project Analytics Tab */}
        <TabsContent value="projects" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-primary" />
                  Project Overview
                </CardTitle>
                <CardDescription>
                  Status distribution and project insights
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-primary/10 rounded-lg">
                    <div className="text-2xl font-bold text-primary">
                      {completedProjects.length}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Completed
                    </div>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">
                      {inProgressProjects.length}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      In Progress
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Project Completion Rate</span>
                    <span className="font-medium">
                      {projects.length > 0
                        ? Math.round(
                            (completedProjects.length / projects.length) * 100
                          )
                        : 0}
                      %
                    </span>
                  </div>
                  <Progress
                    value={
                      projects.length > 0
                        ? (completedProjects.length / projects.length) * 100
                        : 0
                    }
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  Performance Metrics
                </CardTitle>
                <CardDescription>
                  Design quality and efficiency statistics
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      Total Designs
                    </span>
                    <span className="font-medium">
                      {analytics.totalDesigns}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      Successful Generations
                    </span>
                    <span className="font-medium">
                      {Math.max(analytics.totalDesigns - 2, 0)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      Code Compliance Rate
                    </span>
                    <span className="font-medium">
                      {analytics.totalDesigns > 0
                        ? Math.round(
                            (analytics.totalDesigns /
                              (analytics.totalDesigns + 1)) *
                              100
                          )
                        : 0}
                      %
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      Avg. Generation Time
                    </span>
                    <span className="font-medium">12 min</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FolderOpen className="h-5 w-5 text-primary" />
                Recent Projects
              </CardTitle>
              <CardDescription>
                Your latest electrical design projects
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentProjects.map((project) => (
                  <div
                    key={project.id}
                    className="flex items-center justify-between p-4 bg-muted/30 rounded-lg"
                  >
                    <div className="space-y-1">
                      <p className="text-sm font-medium">{project.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {project.buildingType} • Created{" "}
                        {new Date(project.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-xs text-muted-foreground">
                        {project.designGenerations} AI requests
                      </div>
                      <Badge
                        variant={
                          project.status === "completed"
                            ? "secondary"
                            : "outline"
                        }
                        className="text-xs capitalize"
                      >
                        {project.status === "completed" && (
                          <CheckCircle className="h-3 w-3 mr-1" />
                        )}
                        {project.status === "in_progress" && (
                          <Clock className="h-3 w-3 mr-1" />
                        )}
                        {project.status === "review" && (
                          <AlertCircle className="h-3 w-3 mr-1" />
                        )}
                        {project.status.replace("_", " ")}
                      </Badge>
                    </div>
                  </div>
                ))}
                {recentProjects.length === 0 && (
                  <div className="text-center py-8">
                    <FolderOpen className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">
                      No projects yet
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-3 bg-transparent"
                    >
                      <FolderOpen className="h-4 w-4 mr-2" />
                      Create Your First Project
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
