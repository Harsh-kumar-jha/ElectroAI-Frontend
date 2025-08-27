import { DashboardLayout } from "@/features/layouts/dashboard-layout";
import { UserSettings } from "@/features/user/user-settings";

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-balance">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account settings and preferences
        </p>
      </div>
      <UserSettings />
    </div>
  );
}
