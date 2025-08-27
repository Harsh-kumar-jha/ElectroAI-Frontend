import { AuthGuard } from "@/features/auth/auth-guard";
import { DashboardLayout } from "@/features/layouts/dashboard-layout";
import type React from "react";

export default function DashboardLayoutPage({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard>
      <DashboardLayout>{children}</DashboardLayout>
    </AuthGuard>
  );
}
