import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

const menuCategories = {
  breakfast: [
    { name: "Full Breakfast", items: ["Ndazi /Toasted/Bread/Cake Slice", "Sausage/Eggs/Bacon/Beans", "Coffee /Milo/ Tea", " Juice"], price: "KES 300/person" },
    { name: "The Choice Special Breakfast", items: ["Coffee /Milo/ Tea", "Sausages/Eggs/", "Nduma", "Fruit Slices"], price: "KES 250/person" },
    
  ],
  platters: [
    { name: "Small Platter", items: ["1/4 Chicken", "1/4 Choma", "Vegetable rice", "Chips","Chapati","2 Sausages","2 Free Mocktails"], price: "@ KES 750" },
    { name: "Medium Platter", items: ["1/2 Chicken", "1/4 Mbuzi Choma", "Vege Rice", "Pilau", "Chips","Chapati","Greens","Kachumbari","2 Sausages","2 Samosas","3 free mocktails"], price: "@ KES 1500" },
    { name: "Large Platter", items: ["1/2 Chicken", "1/2 Choma", "1/2 dry fry beef", "Ugali","Pilau","Vege rice","Chapati","Chips/Chips Masala","3 Sausages","2 Samosas","Kachumbari","4 free Mocktail"], price: "@ KES 2500" },
  ],
  dinner: [
    { name: "Gala Dinner", items: ["3-Course Meal", "Welcome Drinks", "Main Course", "Dessert"], price: "KES 1,500/person" },
    { name: "BBQ Night", items: ["Grilled Meats", "Roast Chicken", "Salads", "Ugali & Chips"], price: "KES 1,200/person" },
    { name: "Themed Dinner", items: ["Italian/Asian Fusion", "Appetizers", "Main Course", "Dessert"], price: "KES 1,400/person" },
  ],
  cocktail: [
    { name: "Cocktail Package", items: ["Canapés", "Mini Burgers", "Spring Rolls", "Samosas", "Fresh Juices"], price: "KES 700/person" },
    { name: "Premium Cocktail", items: ["Gourmet Finger Foods", "Seafood Platter", "Cheese Board", "Beverages"], price: "KES 1,000/person" },
  ],
};

const MenuSelection = () => {
  const [selectedCategory, setSelectedCategory] = useState("breakfast");

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

        <Tabs defaultValue="breakfast" className="w-full" onValueChange={setSelectedCategory}>
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-8 h-auto">
            <TabsTrigger value="breakfast" className="py-3">Breakfast</TabsTrigger>
            <TabsTrigger value="platters" className="py-3">Platters</TabsTrigger>
            <TabsTrigger value="dinner" className="py-3">Dinner</TabsTrigger>
            <TabsTrigger value="cocktail" className="py-3">Cocktail</TabsTrigger>
          </TabsList>

          {Object.entries(menuCategories).map(([category, menus]) => (
            <TabsContent key={category} value={category}>
              <div className="grid md:grid-cols-3 gap-6">
                {menus.map((menu, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow border-2 hover:border-primary">
                    <CardHeader>
                      <CardTitle className="text-xl">{menu.name}</CardTitle>
                      <CardDescription>
                        <Badge variant="secondary" className="mt-2">{menu.price}</Badge>
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {menu.items.map((item, idx) => (
                          <li key={idx} className="flex items-center gap-2">
                            <span className="w-2 h-2 bg-primary rounded-full"></span>
                            <span className="text-foreground/80">{item}</span>
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
            *Menus can be customized to suit your dietary requirements and preferences
          </p>
        </div>
      </div>
    </section>
  );
};

export default MenuSelection;
