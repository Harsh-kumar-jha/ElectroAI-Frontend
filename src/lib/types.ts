export interface User {
  id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
  avatarUrl?: string;
  role: "admin" | "senior_engineer" | "engineer" | "viewer";
  isVerified: boolean;
  isActive: boolean;
  verificationToken?: string;
  resetPasswordToken?: string;
  resetPasswordExpires?: string;
  preferences: {
    notifications: {
      email: boolean;
      desktop: boolean;
      mobile: boolean;
    };
    units: "imperial" | "metric";
    codeStandards: string[];
    autoSave: boolean;
    theme: "light" | "dark";
  };
  lastLoginAt?: string;
  loginCount: number;
  projectsCreated: number;
  designsGenerated: number;
  totalUsageHours: number;
  createdAt: string;
  updatedAt: string;
}

export interface Project {
  id: string;
  name: string;
  description?: string;
  projectNumber?: string;
  buildingType: "commercial" | "residential" | "industrial" | "institutional";
  projectType:
    | "new_construction"
    | "renovation"
    | "addition"
    | "tenant_improvement";
  buildingSize?: number;
  floors?: number;
  occupancy?: string;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  country?: string;
  latitude?: number;
  longitude?: number;
  ownerId: string;
  status:
    | "draft"
    | "in_progress"
    | "review"
    | "approved"
    | "completed"
    | "archived";
  priority: "low" | "medium" | "high" | "urgent";
  startDate?: string;
  targetDate?: string;
  completedDate?: string;
  designStandards: {
    codeYear: string;
    localCodes: string[];
    companyStandards: string[];
    voltageSystem: string;
    phases: number;
    serviceSize: number;
    utilityVoltage: string;
  };
  viewCount: number;
  designGenerations: number;
  totalTimeSpent: number;
  createdAt: string;
  updatedAt: string;
  archivedAt?: string;
}

export interface Design {
  id: string;
  projectId: string;
  name: string;
  version: string;
  description?: string;
  status: "generating" | "draft" | "in_review" | "approved" | "rejected";
  isActive: boolean;
  generationType: "ai_generated" | "manual" | "template_based" | "imported";
  generationSettings?: {
    loadDensity: string;
    redundancy: string;
    efficiency: string;
    codeCompliance: string;
  };
  generatedBy?: string;
  generatedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ElectricalPanel {
  id: string;
  designId: string;
  name: string;
  panelType:
    | "main_service"
    | "main_distribution"
    | "distribution"
    | "branch"
    | "motor_control";
  manufacturer?: string;
  model?: string;
  amperage: number;
  voltage: number;
  phases: number;
  busConfiguration?: string;
  shortCircuitRating?: number;
  location?: string;
  coordinates?: { x: number; y: number; z: number };
  feedFrom?: string;
  totalLoad?: number;
  connectedLoad?: number;
  demandFactor?: number;
  createdAt: string;
}

export interface Circuit {
  id: string;
  panelId: string;
  circuitNumber: number;
  description: string;
  circuitType:
    | "lighting"
    | "receptacle"
    | "motor"
    | "hvac"
    | "special"
    | "spare";
  voltage: number;
  phases: number;
  amperage: number;
  wireSize: string;
  wireType: string;
  conduitType?: string;
  conduitSize?: string;
  length?: number;
  load: number;
  protectionType: "circuit_breaker" | "fuse";
  protectionSize: number;
  isGfciProtected: boolean;
  isAfciProtected: boolean;
  createdAt: string;
}

export interface Material {
  id: string;
  projectId: string;
  category: string;
  subcategory: string;
  description: string;
  manufacturer?: string;
  partNumber?: string;
  unit: string;
  quantity: number;
  unitCost: number;
  totalCost: number;
  laborHours?: number;
  laborRate?: number;
  totalLaborCost?: number;
  createdAt: string;
}

export interface AuthUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  avatarUrl?: string;
}
