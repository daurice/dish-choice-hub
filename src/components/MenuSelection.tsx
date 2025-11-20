import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useMenuData } from "@/hooks/useMenuData";

const MenuSelection = () => {
  const { data: menuData, isLoading } = useMenuData();
  const [selectedCategory, setSelectedCategory] = useState("Breakfast");

  if (isLoading) {
    return (
      <section id="menus" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p className="text-muted-foreground">Loading menu...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="menus" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-foreground">Sample Menus</h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-4"></div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose from our diverse menu options tailored to your event needs
          </p>
        </div>

        <Tabs defaultValue="Breakfast" className="w-full" onValueChange={setSelectedCategory}>
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-8 h-auto">
            {menuData?.categories?.map((category) => (
              <TabsTrigger key={category.id} value={category.name} className="py-3">
                {category.name}
              </TabsTrigger>
            ))}
          </TabsList>

          {menuData?.categories?.map((category) => (
            <TabsContent key={category.id} value={category.name}>
              <div className="grid md:grid-cols-3 gap-6">
                {menuData.menuByCategory?.[category.name]?.map((item) => (
                  <Card key={item.id} className="hover:shadow-lg transition-shadow border-2 hover:border-primary">
                    <CardHeader>
                      <CardTitle className="text-xl">{item.name}</CardTitle>
                      <CardDescription>
                        <Badge variant="secondary" className="mt-2">{item.price}</Badge>
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {item.items.map((ingredient: string, idx: number) => (
                          <li key={idx} className="flex items-center gap-2">
                            <span className="w-2 h-2 bg-primary rounded-full"></span>
                            <span className="text-foreground/80">{ingredient}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        <div className="mt-8 text-center">
          <p className="text-muted-foreground">
            * All menus can be customized to your preferences. Contact us for custom menu planning.
          </p>
        </div>
      </div>
    </section>
  );
};

export default MenuSelection;
