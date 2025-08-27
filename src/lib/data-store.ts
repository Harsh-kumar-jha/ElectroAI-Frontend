import type { User, Project, Design, Material, AuthUser } from "./types";
import {
  DUMMY_USERS,
  DUMMY_PROJECTS,
  DUMMY_DESIGNS,
  DUMMY_ELECTRICAL_PANELS,
  DUMMY_CIRCUITS,
  DUMMY_MATERIALS,
} from "./dummy-data";

class DataStore {
  private storageKey = "electroai-data";

  private getStoredData() {
    if (typeof window === "undefined") return null;
    const stored = localStorage.getItem(this.storageKey);
    return stored ? JSON.parse(stored) : null;
  }

  private setStoredData(data: any) {
    if (typeof window === "undefined") return;
    localStorage.setItem(this.storageKey, JSON.stringify(data));
  }

  private initializeData() {
    const stored = this.getStoredData();
    if (!stored) {
      const initialData = {
        users: DUMMY_USERS,
        projects: DUMMY_PROJECTS,
        designs: DUMMY_DESIGNS,
        electricalPanels: DUMMY_ELECTRICAL_PANELS,
        circuits: DUMMY_CIRCUITS,
        materials: DUMMY_MATERIALS,
        currentUser: null,
      };
      this.setStoredData(initialData);
      return initialData;
    }
    return stored;
  }

  // Authentication methods
  login(email: string, password: string): AuthUser | null {
    const data = this.initializeData();
    const user = data.users.find(
      (u: User) => u.email === email && u.password === password
    );

    if (user && user.isActive) {
      const authUser: AuthUser = {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        avatarUrl: user.avatarUrl,
      };

      // Update login stats
      user.lastLoginAt = new Date().toISOString();
      user.loginCount += 1;
      data.currentUser = authUser;
      this.setStoredData(data);

      return authUser;
    }
    return null;
  }

  logout() {
    const data = this.getStoredData();
    if (data) {
      data.currentUser = null;
      this.setStoredData(data);
    }
  }

  getCurrentUser(): AuthUser | null {
    const data = this.getStoredData();
    return data?.currentUser || null;
  }

  register(userData: Partial<User>): AuthUser | null {
    const data = this.initializeData();

    // Check if email already exists
    if (data.users.find((u: User) => u.email === userData.email)) {
      return null;
    }

    const newUser: User = {
      id: `user-${Date.now()}`,
      email: userData.email!,
      password: userData.password!,
      firstName: userData.firstName!,
      lastName: userData.lastName!,
      phone: userData.phone,
      role: "engineer",
      isVerified: false,
      isActive: true,
      preferences: {
        notifications: { email: true, desktop: true, mobile: true },
        units: "imperial",
        codeStandards: ["NEC"],
        autoSave: true,
        theme: "light",
      },
      loginCount: 0,
      projectsCreated: 0,
      designsGenerated: 0,
      totalUsageHours: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    data.users.push(newUser);
    this.setStoredData(data);

    return {
      id: newUser.id,
      email: newUser.email,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      role: newUser.role,
      avatarUrl: newUser.avatarUrl,
    };
  }

  // Project CRUD methods
  getProjects(): Project[] {
    const data = this.initializeData();
    return data.projects || [];
  }

  getProject(id: string): Project | null {
    const data = this.initializeData();
    return data.projects.find((p: Project) => p.id === id) || null;
  }

  createProject(projectData: Partial<Project>): Project {
    const data = this.initializeData();
    const currentUser = this.getCurrentUser();

    const newProject: Project = {
      id: `proj-${Date.now()}`,
      name: projectData.name!,
      description: projectData.description,
      projectNumber: `PRJ-${new Date().getFullYear()}-${String(
        data.projects.length + 1
      ).padStart(3, "0")}`,
      buildingType: projectData.buildingType || "commercial",
      projectType: projectData.projectType || "new_construction",
      buildingSize: projectData.buildingSize,
      floors: projectData.floors,
      occupancy: projectData.occupancy,
      address: projectData.address,
      city: projectData.city,
      state: projectData.state,
      zipCode: projectData.zipCode,
      country: projectData.country || "USA",
      latitude: projectData.latitude,
      longitude: projectData.longitude,
      ownerId: currentUser?.id || "unknown",
      status: "draft",
      priority: projectData.priority || "medium",
      startDate: projectData.startDate,
      targetDate: projectData.targetDate,
      designStandards: projectData.designStandards || {
        codeYear: "2023",
        localCodes: [],
        companyStandards: [],
        voltageSystem: "120/208V",
        phases: 3,
        serviceSize: 200,
        utilityVoltage: "120/208V",
      },
      viewCount: 0,
      designGenerations: 0,
      totalTimeSpent: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    data.projects.push(newProject);

    // Update user stats
    const user = data.users.find((u: User) => u.id === currentUser?.id);
    if (user) {
      user.projectsCreated += 1;
      user.updatedAt = new Date().toISOString();
    }

    this.setStoredData(data);
    return newProject;
  }

  updateProject(id: string, updates: Partial<Project>): Project | null {
    const data = this.initializeData();
    const projectIndex = data.projects.findIndex((p: Project) => p.id === id);

    if (projectIndex === -1) return null;

    data.projects[projectIndex] = {
      ...data.projects[projectIndex],
      ...updates,
      updatedAt: new Date().toISOString(),
    };

    this.setStoredData(data);
    return data.projects[projectIndex];
  }

  deleteProject(id: string): boolean {
    const data = this.initializeData();
    const projectIndex = data.projects.findIndex((p: Project) => p.id === id);

    if (projectIndex === -1) return false;

    data.projects.splice(projectIndex, 1);

    // Also delete related designs, panels, circuits
    data.designs = data.designs.filter((d: Design) => d.projectId !== id);
    data.materials = data.materials.filter((m: Material) => m.projectId !== id);

    this.setStoredData(data);
    return true;
  }

  // Design methods
  getDesigns(projectId?: string): Design[] {
    const data = this.initializeData();
    return projectId
      ? data.designs.filter((d: Design) => d.projectId === projectId)
      : data.designs || [];
  }

  createDesign(designData: Partial<Design>): Design {
    const data = this.initializeData();
    const currentUser = this.getCurrentUser();

    const newDesign: Design = {
      id: `design-${Date.now()}`,
      projectId: designData.projectId!,
      name: designData.name!,
      version: "1.0.0",
      description: designData.description,
      status: "draft",
      isActive: false,
      generationType: "ai_generated",
      generationSettings: designData.generationSettings,
      generatedBy: currentUser?.id,
      generatedAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    data.designs.push(newDesign);

    // Update user and project stats
    const user = data.users.find((u: User) => u.id === currentUser?.id);
    if (user) {
      user.designsGenerated += 1;
      user.updatedAt = new Date().toISOString();
    }

    const project = data.projects.find(
      (p: Project) => p.id === designData.projectId
    );
    if (project) {
      project.designGenerations += 1;
      project.updatedAt = new Date().toISOString();
    }

    this.setStoredData(data);
    return newDesign;
  }

  // Analytics methods
  getAnalytics() {
    const data = this.initializeData();
    const currentUser = this.getCurrentUser();

    const userProjects = data.projects.filter(
      (p: Project) => p.ownerId === currentUser?.id
    );
    const totalDesigns = data.designs.filter((d: Design) =>
      userProjects.some((p: { id: string }) => p.id === d.projectId)
    ).length;

    return {
      totalProjects: userProjects.length,
      activeProjects: userProjects.filter(
        (p: Project) => p.status === "in_progress"
      ).length,
      completedProjects: userProjects.filter(
        (p: Project) => p.status === "completed"
      ).length,
      totalDesigns,
      aiRequestsUsed: Math.floor(Math.random() * 5) + 1, // Simulate AI usage
      aiRequestsRemaining: 5 - (Math.floor(Math.random() * 5) + 1),
      totalUsers: data.users.length,
      activeUsers: data.users.filter((u: User) => u.isActive).length,
      totalTimeSpent: userProjects.reduce(
        (sum: number, p: Project) => sum + p.totalTimeSpent,
        0
      ),
    };
  }
}

export const dataStore = new DataStore();
