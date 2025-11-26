import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Settings as SettingsIcon, FileText } from "lucide-react";
import { Link } from "react-router-dom";

export default function Settings() {
  const { user, userRole } = useAuth();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
        <p className="text-muted-foreground">
          Configure system settings and preferences
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Account Information</CardTitle>
            <CardDescription>Your account details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div>
              <p className="text-sm font-medium">Email</p>
              <p className="text-sm text-muted-foreground">{user?.email}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Role</p>
              <p className="text-sm text-muted-foreground capitalize">
                {userRole?.replace('_', ' ')}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium">User ID</p>
              <p className="text-sm text-muted-foreground font-mono text-xs">
                {user?.id}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>System Information</CardTitle>
            <CardDescription>Current system configuration</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div>
              <p className="text-sm font-medium">Database Status</p>
              <p className="text-sm text-muted-foreground">Connected</p>
            </div>
            <div>
              <p className="text-sm font-medium">Authentication</p>
              <p className="text-sm text-muted-foreground">Enabled</p>
            </div>
            <div>
              <p className="text-sm font-medium">Storage</p>
              <p className="text-sm text-muted-foreground">Configured</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>
              <SettingsIcon className="h-5 w-5 inline mr-2" />
              Admin Features
            </CardTitle>
            <CardDescription>Available administrative tools</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <p>✓ User Management</p>
            <p>✓ Database Access</p>
            <p>✓ Content Management</p>
            <p>✓ Role-based Access Control</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Backend Access</CardTitle>
            <CardDescription>Manage your backend configuration</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Access your backend dashboard to manage database, storage, and more.
            </p>
            <Button variant="outline" className="w-full" asChild>
              <a href="#" onClick={(e) => {
                e.preventDefault();
                // This will be replaced by the lovable action
              }}>
                Open Backend Dashboard
              </a>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>
              <FileText className="h-5 w-5 inline mr-2" />
              Quote Requests
            </CardTitle>
            <CardDescription>Manage customer quote requests</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              View, edit, and manage all quote requests from customers.
            </p>
            <Button variant="outline" className="w-full" asChild>
              <Link to="/admin/tables/quotes">
                Manage Quotes
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
