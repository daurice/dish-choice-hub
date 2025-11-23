import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const useDashboardStats = () => {
  return useQuery({
    queryKey: ["dashboard-stats"],
    queryFn: async () => {
      // Fetch all counts in parallel
      const [
        contactMessagesResult,
        unreadMessagesResult,
        galleryImagesResult,
        servicesResult,
        menuItemsResult,
        usersResult,
      ] = await Promise.all([
        supabase.from("contact_messages").select("*", { count: "exact", head: true }),
        supabase.from("contact_messages").select("*", { count: "exact", head: true }).eq("status", "unread"),
        supabase.from("gallery_images").select("*", { count: "exact", head: true }),
        supabase.from("services").select("*", { count: "exact", head: true }),
        supabase.from("menu_items").select("*", { count: "exact", head: true }),
        supabase.from("profiles").select("*", { count: "exact", head: true }),
      ]);

      return {
        totalMessages: contactMessagesResult.count || 0,
        unreadMessages: unreadMessagesResult.count || 0,
        totalGalleryImages: galleryImagesResult.count || 0,
        totalServices: servicesResult.count || 0,
        totalMenuItems: menuItemsResult.count || 0,
        totalUsers: usersResult.count || 0,
      };
    },
    refetchInterval: 30000, // Refetch every 30 seconds
  });
};
