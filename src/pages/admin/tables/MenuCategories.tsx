import { TableCRUD } from "@/components/admin/TableCRUD";

export default function MenuCategories() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Menu Categories</h2>
        <p className="text-muted-foreground">Manage menu categories</p>
      </div>
      <TableCRUD
        tableName="menu_categories"
        title="Menu Categories"
        description="Categories for organizing menu items"
      />
    </div>
  );
}
