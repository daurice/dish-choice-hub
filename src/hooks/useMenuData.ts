import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const useMenuData = () => {
  return useQuery({
    queryKey: ["menu-data"],
    queryFn: async () => {
      const { data: categories, error: categoriesError } = await supabase
        .from("menu_categories")
        .select("*")
        .order("order_index", { ascending: true });

      if (categoriesError) throw categoriesError;

      const { data: items, error: itemsError } = await supabase
        .from("menu_items")
        .select("*")
        .order("order_index", { ascending: true });

      if (itemsError) throw itemsError;

      // Group items by category
      const menuByCategory = categories?.reduce((acc, category) => {
        acc[category.name] = items?.filter(item => item.category_id === category.id) || [];
        return acc;
      }, {} as Record<string, any[]>);

      return { categories, items, menuByCategory };
    },
  });
};
