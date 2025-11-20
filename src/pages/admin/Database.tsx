import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Database as DatabaseIcon } from "lucide-react";
import { TableManager } from "@/components/admin/TableManager";

const tables = [
  { name: "contact_info", description: "Contact information" },
  { name: "gallery_images", description: "Gallery images" },
  { name: "menu_categories", description: "Menu categories" },
  { name: "menu_items", description: "Menu items" },
  { name: "services", description: "Catering services" },
  { name: "site_settings", description: "Site configuration" },
  { name: "profiles", description: "User profiles" },
  { name: "user_roles", description: "User roles" },
  { name: "admin_settings", description: "Admin configuration" },
];

export default function Database() {
  const [selectedTable, setSelectedTable] = useState(tables[0].name);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Database Management</h2>
        <p className="text-muted-foreground">
          View and manage all database tables
        </p>
      </div>

      <Tabs value={selectedTable} onValueChange={setSelectedTable}>
        <TabsList className="flex-wrap h-auto">
          {tables.map((table) => (
            <TabsTrigger key={table.name} value={table.name} className="flex items-center gap-2">
              <DatabaseIcon className="h-4 w-4" />
              {table.name}
            </TabsTrigger>
          ))}
        </TabsList>

        {tables.map((table) => (
          <TabsContent key={table.name} value={table.name}>
            <Card>
              <CardHeader>
                <CardTitle className="capitalize">{table.name.replace(/_/g, ' ')}</CardTitle>
                <CardDescription>{table.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <TableManager tableName={table.name} />
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
