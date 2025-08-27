"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Filter,
  Plus,
  Calendar,
  User,
  AlertCircle,
  CheckCircle,
  Clock,
  Pause,
} from "lucide-react";
import Link from "next/link";

const mockRequirements = [
  {
    id: 1,
    title: "Add emergency lighting system",
    description: "Install emergency lights in all corridors and stairwells.",
    type: "Electrical",
    priority: "High",
    dueDate: "2025-09-10",
    attachments: ["emergency_lights_spec.pdf"],
    stakeholders: ["Admin", "Engineer1"],
    estimatedCost: "2000",
    status: "Open",
    createdBy: "Admin",
    assignedTo: "Engineer1",
    createdAt: "2025-08-27",
    acceptanceCriteria:
      "All corridors and stairwells have working emergency lights.",
    comments: ["Initial requirement created.", "Reviewed by senior engineer."],
  },
  {
    id: 2,
    title: "Upgrade main electrical panel",
    description:
      "Replace the existing 100A panel with a 200A panel to support increased load.",
    type: "Electrical",
    priority: "Medium",
    dueDate: "2025-09-15",
    attachments: [],
    stakeholders: ["Admin", "Client"],
    estimatedCost: "3500",
    status: "In Progress",
    createdBy: "Client",
    assignedTo: "Engineer2",
    createdAt: "2025-08-25",
    acceptanceCriteria:
      "New panel installed and tested, meets local electrical codes.",
    comments: ["Client approved budget.", "Parts ordered."],
  },
  {
    id: 3,
    title: "Install GFCI outlets in bathrooms",
    description:
      "Add GFCI protection for all bathroom outlets as per safety requirements.",
    type: "Safety",
    priority: "High",
    dueDate: "2025-09-05",
    attachments: ["gfci_requirements.pdf"],
    stakeholders: ["Admin"],
    estimatedCost: "800",
    status: "Blocked",
    createdBy: "Admin",
    assignedTo: "Engineer1",
    createdAt: "2025-08-20",
    acceptanceCriteria:
      "All bathroom outlets have GFCI protection and test properly.",
    comments: [
      "Waiting for permit approval.",
      "Inspector scheduled for next week.",
    ],
  },
];

export default function ViewRequirementsPage() {
  const [requirements] = useState(mockRequirements);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Open":
        return <AlertCircle className="h-4 w-4" />;
      case "In Progress":
        return <Clock className="h-4 w-4" />;
      case "Blocked":
        return <Pause className="h-4 w-4" />;
      case "Closed":
        return <CheckCircle className="h-4 w-4" />;
      default:
        return <AlertCircle className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Open":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "In Progress":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "Blocked":
        return "bg-red-100 text-red-700 border-red-200";
      case "Closed":
        return "bg-green-100 text-green-700 border-green-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Low":
        return "bg-gray-100 text-gray-700";
      case "Medium":
        return "bg-blue-100 text-blue-700";
      case "High":
        return "bg-orange-100 text-orange-700";
      case "Urgent":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const filteredRequirements = requirements.filter((req) => {
    const matchesSearch =
      req.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "All" || req.status === statusFilter;
    const matchesPriority =
      priorityFilter === "All" || req.priority === priorityFilter;

    return matchesSearch && matchesStatus && matchesPriority;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">
              Requirements Overview
            </h1>
            <p className="text-lg text-muted-foreground mt-2">
              Manage and track all project requirements
            </p>
          </div>
          <Link href="/dashboard/requirement">
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Create New Requirement
            </Button>
          </Link>
        </div>

        {/* Filters */}
        <Card className="shadow-sm">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search requirements..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9"
                  />
                </div>
              </div>
              <div className="flex gap-4">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3 py-2 border rounded-md bg-white"
                >
                  <option value="All">All Status</option>
                  <option value="Open">Open</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Blocked">Blocked</option>
                  <option value="Closed">Closed</option>
                </select>
                <select
                  value={priorityFilter}
                  onChange={(e) => setPriorityFilter(e.target.value)}
                  className="px-3 py-2 border rounded-md bg-white"
                >
                  <option value="All">All Priority</option>
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                  <option value="Urgent">Urgent</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Requirements Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredRequirements.map((req) => (
            <Card
              key={req.id}
              className="shadow-sm hover:shadow-md transition-shadow"
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <CardTitle className="text-lg font-semibold">
                    {req.title}
                  </CardTitle>
                  <div className="flex gap-2">
                    <Badge
                      className={`${getStatusColor(
                        req.status
                      )} flex items-center gap-1`}
                    >
                      {getStatusIcon(req.status)}
                      {req.status}
                    </Badge>
                    <Badge className={getPriorityColor(req.priority)}>
                      {req.priority}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">{req.description}</p>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium">Type:</span> {req.type}
                  </div>
                  <div>
                    <span className="font-medium">Cost:</span>{" "}
                    {req.estimatedCost ? `$${req.estimatedCost}` : "-"}
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    <span className="font-medium">Due:</span>{" "}
                    {req.dueDate || "No deadline"}
                  </div>
                  <div className="flex items-center gap-1">
                    <User className="h-3 w-3" />
                    <span className="font-medium">Assigned:</span>{" "}
                    {req.assignedTo}
                  </div>
                </div>

                {req.stakeholders.length > 0 && (
                  <div>
                    <span className="font-medium text-sm">Stakeholders:</span>
                    <div className="flex gap-1 mt-1">
                      {req.stakeholders.map((stakeholder, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {stakeholder}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {req.acceptanceCriteria && (
                  <div>
                    <span className="font-medium text-sm">
                      Acceptance Criteria:
                    </span>
                    <p className="text-sm text-muted-foreground mt-1">
                      {req.acceptanceCriteria}
                    </p>
                  </div>
                )}

                {req.comments.length > 0 && (
                  <div>
                    <span className="font-medium text-sm">
                      Latest Comments:
                    </span>
                    <div className="mt-1 space-y-1">
                      {req.comments.slice(-2).map((comment, idx) => (
                        <p
                          key={idx}
                          className="text-xs text-muted-foreground bg-gray-50 p-2 rounded"
                        >
                          {comment}
                        </p>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredRequirements.length === 0 && (
          <div className="text-center py-12">
            <div className="text-muted-foreground">
              <Filter className="h-12 w-12 mx-auto mb-4" />
              <h3 className="text-lg font-semibold">No requirements found</h3>
              <p className="mt-2">Try adjusting your search or filters</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
