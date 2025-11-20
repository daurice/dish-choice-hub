import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Database, Users, FileText, Settings } from "lucide-react";

export default function Dashboard() {
  const { user, userRole } = useAuth();

  const stats = [
    {
      title: "Total Users",
      value: "1",
      icon: Users,
      description: "Active users in the system",
    },
    {
      title: "Database Tables",
      value: "9",
      icon: Database,
      description: "Total tables available",
    },
    {
      title: "Services",
      value: "4",
      icon: FileText,
      description: "Active catering services",
    },
    {
      title: "Settings",
      value: "Configured",
      icon: Settings,
      description: "System configuration",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground">
          Welcome back, {user?.email}
        </p>
        <p className="text-sm text-muted-foreground mt-1">
          Role: <span className="font-medium capitalize">{userRole?.replace('_', ' ')}</span>
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>
            Common administrative tasks
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>• Manage users and assign roles</p>
            <p>• View and edit database tables</p>
            <p>• Update site content and settings</p>
            <p>• Configure system preferences</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
