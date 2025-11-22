import { ReactNode, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { 
  LayoutDashboard, 
  Users, 
  Settings, 
  LogOut,
  Menu,
  Search,
  Heart,
  Mail,
  Bell,
  MessageSquare,
  ChevronDown,
  ChevronRight,
  BarChart3,
  Package,
  ShoppingCart,
  Info,
  Image,
  Utensils,
  Briefcase,
  FileText,
  UserCircle,
  Shield,
  Database as DatabaseIcon
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { cn } from "@/lib/utils";

interface AdminLayoutProps {
  children: ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const { user, signOut } = useAuth();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dashboardExpanded, setDashboardExpanded] = useState(true);

  const mainNavItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/admin", hasSubmenu: true },
    { icon: Users, label: "Users", path: "/admin/users" },
    { icon: Settings, label: "Settings", path: "/admin/settings" },
  ];

  const dashboardSubItems = [
    { label: "Dashboard Light", path: "/admin" },
    { label: "Dashboard Dark", path: "/admin/dashboard-dark" },
  ];

  const databaseTables = [
    { icon: Info, label: "Contact Info", path: "/admin/tables/contact-info" },
    { icon: Image, label: "Gallery Images", path: "/admin/tables/gallery-images" },
    { icon: Utensils, label: "Menu Categories", path: "/admin/tables/menu-categories" },
    { icon: Utensils, label: "Menu Items", path: "/admin/tables/menu-items" },
    { icon: Briefcase, label: "Services", path: "/admin/tables/services" },
    { icon: FileText, label: "Site Settings", path: "/admin/tables/site-settings" },
    { icon: UserCircle, label: "Profiles", path: "/admin/tables/profiles" },
    { icon: Shield, label: "User Roles", path: "/admin/tables/user-roles" },
    { icon: DatabaseIcon, label: "Admin Settings", path: "/admin/tables/admin-settings" },
  ];

  const otherSections = [
    { icon: Package, label: "Apps" },
    { icon: BarChart3, label: "Charts" },
    { icon: Settings, label: "Bootstrap" },
    { icon: ShoppingCart, label: "Plugins" },
  ];

  const NavLinks = () => {
    const isDashboardSection = location.pathname === "/admin" || location.pathname.startsWith("/admin/dashboard");
    
    return (
      <div className="space-y-1">
        {/* Dashboard with submenu */}
        <div>
          <button
            onClick={() => setDashboardExpanded(!dashboardExpanded)}
            className={cn(
              "flex items-center justify-between w-full px-4 py-3 rounded-lg transition-colors text-left",
              isDashboardSection ? "text-primary font-medium" : "text-sidebar-foreground hover:bg-sidebar-accent"
            )}
          >
            <div className="flex items-center gap-3">
              <LayoutDashboard className="h-5 w-5" />
              <span>Dashboard</span>
            </div>
            <ChevronDown className={cn("h-4 w-4 transition-transform", dashboardExpanded && "rotate-180")} />
          </button>
          
          {dashboardExpanded && (
            <div className="ml-4 mt-1 space-y-1 border-l-2 border-border pl-4">
              {dashboardSubItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      "block px-4 py-2 rounded-lg text-sm transition-colors",
                      isActive
                        ? "text-primary font-medium bg-sidebar-accent"
                        : "text-muted-foreground hover:text-foreground hover:bg-sidebar-accent/50"
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>
          )}
        </div>

        {/* Other main nav items */}
        {mainNavItems.slice(1).map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setMobileMenuOpen(false)}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-sidebar-foreground hover:bg-sidebar-accent"
              )}
            >
              <Icon className="h-5 w-5" />
              <span>{item.label}</span>
            </Link>
          );
        })}

        {/* Database Tables Section */}
        <div className="pt-4">
          <div className="px-4 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Database Tables
          </div>
          <div className="space-y-1">
            {databaseTables.map((table) => {
              const Icon = table.icon;
              const isActive = location.pathname === table.path;
              return (
                <Link
                  key={table.path}
                  to={table.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-4 py-2 rounded-lg transition-colors text-sm",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-sidebar-foreground hover:bg-sidebar-accent"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  <span>{table.label}</span>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Other sections */}
        <div className="pt-6 space-y-1">
          {otherSections.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.label}
                className="flex items-center justify-between px-4 py-3 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-lg bg-muted flex items-center justify-center">
                    <Icon className="h-4 w-4" />
                  </div>
                  <span>{item.label}</span>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-card shadow-sm">
        <div className="flex h-16 items-center px-6 gap-6">
          {/* Logo & Menu Toggle */}
          <div className="flex items-center gap-4">
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:flex">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-64 p-0">
                <div className="flex h-full flex-col">
                  <div className="p-6 border-b">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-lg bg-primary flex items-center justify-center">
                        <LayoutDashboard className="h-6 w-6 text-primary-foreground" />
                      </div>
                      <div>
                        <h2 className="text-lg font-bold">travl</h2>
                        <p className="text-xs text-muted-foreground">Hotel Admin Dashboard</p>
                      </div>
                    </div>
                  </div>
                  <nav className="flex-1 p-4 overflow-y-auto">
                    <NavLinks />
                  </nav>
                </div>
              </SheetContent>
            </Sheet>

            <div className="hidden lg:flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-primary flex items-center justify-center">
                <LayoutDashboard className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold">travl</h1>
                <p className="text-xs text-muted-foreground">Hotel Admin Dashboard</p>
              </div>
            </div>
          </div>

          {/* Page Title */}
          <div className="flex-1 hidden md:block">
            <h2 className="text-2xl font-bold">Dashboard</h2>
          </div>

          {/* Header Actions */}
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="relative">
              <Search className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="relative hidden sm:flex">
              <Heart className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="relative hidden sm:flex">
              <Mail className="h-5 w-5" />
              <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-primary text-[10px]">
                70
              </Badge>
            </Button>
            <Button variant="ghost" size="icon" className="relative hidden sm:flex">
              <Bell className="h-5 w-5" />
              <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-primary text-[10px]">
                8
              </Badge>
            </Button>
            <Button variant="ghost" size="icon" className="relative hidden sm:flex">
              <MessageSquare className="h-5 w-5" />
              <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-primary text-[10px]">
                15
              </Badge>
            </Button>
            <Avatar className="h-9 w-9 cursor-pointer">
              <AvatarImage src="" />
              <AvatarFallback className="bg-primary text-primary-foreground">
                {user?.email?.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar - Desktop */}
        <aside className="hidden lg:flex w-64 border-r bg-sidebar min-h-[calc(100vh-4rem)] sticky top-16">
          <nav className="flex-1 p-4 overflow-y-auto">
            <NavLinks />
          </nav>

          {/* Floating Action Buttons */}
          <div className="fixed right-6 bottom-6 flex flex-col gap-3">
            <Button size="icon" className="h-12 w-12 rounded-full shadow-lg bg-primary hover:bg-primary/90">
              <Settings className="h-5 w-5" />
            </Button>
            <Button size="icon" className="h-12 w-12 rounded-full shadow-lg bg-blue-500 hover:bg-blue-600">
              <Bell className="h-5 w-5" />
            </Button>
            <Button size="icon" className="h-12 w-12 rounded-full shadow-lg bg-teal-500 hover:bg-teal-600">
              <MessageSquare className="h-5 w-5" />
            </Button>
            <Button size="icon" className="h-12 w-12 rounded-full shadow-lg bg-green-500 hover:bg-green-600">
              <ShoppingCart className="h-5 w-5" />
            </Button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1">
          <div className="container mx-auto p-6">
            <Breadcrumbs />
            <div className="mt-4">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
