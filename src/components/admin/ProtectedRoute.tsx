import { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
  requireSuperAdmin?: boolean;
}

export function ProtectedRoute({ 
  children, 
  requireAdmin = false,
  requireSuperAdmin = false 
}: ProtectedRouteProps) {
  const { user, loading, isAdmin, isSuperAdmin } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        navigate('/admin/login');
      } else if (requireSuperAdmin && !isSuperAdmin) {
        navigate('/admin');
      } else if (requireAdmin && !isAdmin) {
        navigate('/admin');
      }
    }
  }, [user, loading, isAdmin, isSuperAdmin, requireAdmin, requireSuperAdmin, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  if (requireSuperAdmin && !isSuperAdmin) {
    return null;
  }

  if (requireAdmin && !isAdmin) {
    return null;
  }

  return <>{children}</>;
}
