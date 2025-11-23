import { ReactNode, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { 
  LayoutDashboard, 
  Users, 
  Settings, 
  Menu,
  Search,
  Heart,
  Mail,
  Bell,
  MessageSquare,
  ChevronDown,
  ChevronRight,
  Info,
  Image,
  Utensils,
  Briefcase,
  FileText,
  UserCircle,
  Shield,
  Database as DatabaseIcon,
  Upload
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { cn } from "@/lib/utils";
import logo from "@/assets/choice-cafe-logo.png";

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
    { icon: Mail, label: "Contact Messages", path: "/admin/tables/contact-messages" },
    { icon: Image, label: "Gallery Images", path: "/admin/tables/gallery-images" },
    { icon: Utensils, label: "Menu Categories", path: "/admin/tables/menu-categories" },
    { icon: Utensils, label: "Menu Items", path: "/admin/tables/menu-items" },
    { icon: Briefcase, label: "Services", path: "/admin/tables/services" },
    { icon: FileText, label: "Site Settings", path: "/admin/tables/site-settings" },
    { icon: UserCircle, label: "Profiles", path: "/admin/tables/profiles" },
    { icon: Shield, label: "User Roles", path: "/admin/tables/user-roles" },
    { icon: DatabaseIcon, label: "Admin Settings", path: "/admin/tables/admin-settings" },
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

        {/* Utilities Section */}
        <div className="pt-4">
          <div className="px-4 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Utilities
          </div>
          <div className="space-y-1">
            <Link
              to="/admin/gallery-migration"
              onClick={() => setMobileMenuOpen(false)}
              className={cn(
                "flex items-center gap-3 px-4 py-2 rounded-lg transition-colors text-sm",
                location.pathname === "/admin/gallery-migration"
                  ? "bg-primary text-primary-foreground"
                  : "text-sidebar-foreground hover:bg-sidebar-accent"
              )}
            >
              <Upload className="h-4 w-4" />
              <span>Gallery Migration</span>
            </Link>
            <Link
              to="/admin/services-migration"
              onClick={() => setMobileMenuOpen(false)}
              className={cn(
                "flex items-center gap-3 px-4 py-2 rounded-lg transition-colors text-sm",
                location.pathname === "/admin/services-migration"
                  ? "bg-primary text-primary-foreground"
                  : "text-sidebar-foreground hover:bg-sidebar-accent"
              )}
            >
              <Upload className="h-4 w-4" />
              <span>Services Migration</span>
            </Link>
          </div>
        </div>

      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-card shadow-sm">
        <div className="flex h-16 items-center px-4 md:px-6 gap-4">
          {/* Logo & Menu Toggle */}
          <div className="flex items-center gap-3">
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
                      <img src={logo} alt="Choice Cafe" className="h-10 w-10 object-contain" />
                      <div>
                        <h2 className="text-lg font-bold">Choice Cafe</h2>
                        <p className="text-xs text-muted-foreground">Admin Dashboard</p>
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
              <img src={logo} alt="Choice Cafe" className="h-10 w-10 object-contain" />
              <div>
                <h1 className="text-lg md:text-xl font-bold">Choice Cafe</h1>
                <p className="text-xs text-muted-foreground">Admin Dashboard</p>
              </div>
            </div>
          </div>

          {/* Page Title */}
          <div className="flex-1 hidden md:block">
            <h2 className="text-xl md:text-2xl font-bold">Dashboard</h2>
          </div>

          {/* Header Actions */}
          <div className="flex items-center gap-1 md:gap-2">
            <Button variant="ghost" size="icon" className="relative h-9 w-9">
              <Search className="h-4 w-4 md:h-5 md:w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="relative hidden sm:flex h-9 w-9">
              <Heart className="h-4 w-4 md:h-5 md:w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="relative hidden sm:flex h-9 w-9">
              <Mail className="h-4 w-4 md:h-5 md:w-5" />
              <Badge className="absolute -top-1 -right-1 h-4 w-4 md:h-5 md:w-5 flex items-center justify-center p-0 bg-primary text-[9px] md:text-[10px]">
                70
              </Badge>
            </Button>
            <Button variant="ghost" size="icon" className="relative hidden sm:flex h-9 w-9">
              <Bell className="h-4 w-4 md:h-5 md:w-5" />
              <Badge className="absolute -top-1 -right-1 h-4 w-4 md:h-5 md:w-5 flex items-center justify-center p-0 bg-primary text-[9px] md:text-[10px]">
                8
              </Badge>
            </Button>
            <Button variant="ghost" size="icon" className="relative hidden sm:flex h-9 w-9">
              <MessageSquare className="h-4 w-4 md:h-5 md:w-5" />
              <Badge className="absolute -top-1 -right-1 h-4 w-4 md:h-5 md:w-5 flex items-center justify-center p-0 bg-primary text-[9px] md:text-[10px]">
                15
              </Badge>
            </Button>
            <Avatar className="h-8 w-8 md:h-9 md:w-9 cursor-pointer">
              <AvatarImage src="" />
              <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                {user?.email?.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar - Desktop */}
        <aside className="hidden lg:flex w-64 border-r bg-sidebar overflow-y-auto">
          <nav className="flex-1 p-4">
            <NavLinks />
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto">
          <div className="w-full max-w-full p-4 md:p-6">
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
