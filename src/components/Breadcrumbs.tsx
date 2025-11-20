import { Link, useLocation } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";
import { cn } from "@/lib/utils";

export function Breadcrumbs() {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  // Always show breadcrumbs on mobile/tablet (they'll be hidden on desktop via CSS)

  // Route name mapping for better display
  const routeNames: Record<string, string> = {
    about: "About Us",
    services: "Our Services",
    menu: "Sample Menus",
    gallery: "Gallery",
    contact: "Contact Us",
    admin: "Dashboard",
    users: "User Management",
    database: "Database",
    settings: "Settings",
    login: "Login",
    setup: "Setup",
  };

  const getRouteName = (path: string): string => {
    return routeNames[path] || path.charAt(0).toUpperCase() + path.slice(1);
  };

  return (
    <nav 
      className="lg:hidden flex items-center space-x-2 text-sm py-4 px-4 bg-muted/20 border-b"
      aria-label="Breadcrumb"
    >
      <ol className="flex items-center space-x-2">
        <li>
          <Link
            to="/"
            className="flex items-center hover:text-primary transition-colors text-muted-foreground"
            aria-label="Home"
          >
            <Home className="h-4 w-4" />
          </Link>
        </li>

        {pathnames.map((path, index) => {
          const routePath = `/${pathnames.slice(0, index + 1).join("/")}`;
          const isLast = index === pathnames.length - 1;

          return (
            <li key={routePath} className="flex items-center space-x-2">
              <ChevronRight className="h-4 w-4 text-muted-foreground/50" />
              {isLast ? (
                <span className="font-medium text-foreground">
                  {getRouteName(path)}
                </span>
              ) : (
                <Link
                  to={routePath}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {getRouteName(path)}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
