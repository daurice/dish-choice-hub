import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import { ProtectedRoute } from "@/components/admin/ProtectedRoute";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { MainLayout } from "@/components/layouts/MainLayout";
import { ScrollToTop } from "@/components/ScrollToTop";

// Public Pages
import Home from "./pages/Home";
import AboutPage from "./pages/About";
import ServicesPage from "./pages/Services";
import MenuPage from "./pages/Menu";
import GalleryPage from "./pages/Gallery";
import ContactPage from "./pages/Contact";
import NotFoundPublic from "./pages/NotFoundPublic";

// Admin Pages
import Login from "./pages/admin/Login";
import Setup from "./pages/admin/Setup";
import Dashboard from "./pages/admin/Dashboard";
import Users from "./pages/admin/Users";
import Settings from "./pages/admin/Settings";

// Admin Table Pages
import ContactInfo from "./pages/admin/tables/ContactInfo";
import GalleryImages from "./pages/admin/tables/GalleryImages";
import GalleryMigration from "./pages/admin/GalleryMigration";
import MenuCategories from "./pages/admin/tables/MenuCategories";
import MenuItems from "./pages/admin/tables/MenuItems";
import Services from "./pages/admin/tables/Services";
import SiteSettings from "./pages/admin/tables/SiteSettings";
import Profiles from "./pages/admin/tables/Profiles";
import UserRoles from "./pages/admin/tables/UserRoles";
import AdminSettings from "./pages/admin/tables/AdminSettings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <AuthProvider>
          <Routes>
            {/* Public Routes with MainLayout */}
            <Route path="/" element={<MainLayout><Home /></MainLayout>} />
            <Route path="/about" element={<MainLayout><AboutPage /></MainLayout>} />
            <Route path="/services" element={<MainLayout><ServicesPage /></MainLayout>} />
            <Route path="/menu" element={<MainLayout><MenuPage /></MainLayout>} />
            <Route path="/gallery" element={<MainLayout><GalleryPage /></MainLayout>} />
            <Route path="/contact" element={<MainLayout><ContactPage /></MainLayout>} />

            {/* Admin Routes (no MainLayout - they have AdminLayout) */}
            <Route path="/admin/login" element={<Login />} />
            <Route path="/admin/setup" element={<Setup />} />
            <Route
              path="/admin"
              element={
                <ProtectedRoute requireAdmin>
                  <AdminLayout>
                    <Dashboard />
                  </AdminLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/users"
              element={
                <ProtectedRoute requireSuperAdmin>
                  <AdminLayout>
                    <Users />
                  </AdminLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/settings"
              element={
                <ProtectedRoute requireAdmin>
                  <AdminLayout>
                    <Settings />
                  </AdminLayout>
                </ProtectedRoute>
              }
            />

            {/* Database Table Routes */}
            <Route
              path="/admin/tables/contact-info"
              element={
                <ProtectedRoute requireAdmin>
                  <AdminLayout>
                    <ContactInfo />
                  </AdminLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/tables/gallery-images"
              element={
                <ProtectedRoute requireAdmin>
                  <AdminLayout>
                    <GalleryImages />
                  </AdminLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/gallery-migration"
              element={
                <ProtectedRoute requireAdmin>
                  <AdminLayout>
                    <GalleryMigration />
                  </AdminLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/tables/menu-categories"
              element={
                <ProtectedRoute requireAdmin>
                  <AdminLayout>
                    <MenuCategories />
                  </AdminLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/tables/menu-items"
              element={
                <ProtectedRoute requireAdmin>
                  <AdminLayout>
                    <MenuItems />
                  </AdminLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/tables/services"
              element={
                <ProtectedRoute requireAdmin>
                  <AdminLayout>
                    <Services />
                  </AdminLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/tables/site-settings"
              element={
                <ProtectedRoute requireAdmin>
                  <AdminLayout>
                    <SiteSettings />
                  </AdminLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/tables/profiles"
              element={
                <ProtectedRoute requireAdmin>
                  <AdminLayout>
                    <Profiles />
                  </AdminLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/tables/user-roles"
              element={
                <ProtectedRoute requireAdmin>
                  <AdminLayout>
                    <UserRoles />
                  </AdminLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/tables/admin-settings"
              element={
                <ProtectedRoute requireAdmin>
                  <AdminLayout>
                    <AdminSettings />
                  </AdminLayout>
                </ProtectedRoute>
              }
            />
            
            {/* 404 Route - Must be last */}
            <Route path="*" element={<MainLayout><NotFoundPublic /></MainLayout>} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
