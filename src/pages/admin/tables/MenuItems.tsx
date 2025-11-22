import { TableCRUD } from "@/components/admin/TableCRUD";

export default function MenuItems() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Menu Items</h2>
        <p className="text-muted-foreground">Manage menu items and dishes</p>
      </div>
      <TableCRUD
        tableName="menu_items"
        title="Menu Items"
        description="Individual menu items with pricing and descriptions"
      />
    </div>
  );
}
