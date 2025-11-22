import { TableCRUD } from "@/components/admin/TableCRUD";

export default function AdminSettings() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Admin Settings</h2>
        <p className="text-muted-foreground">Manage admin configuration</p>
      </div>
      <TableCRUD
        tableName="admin_settings"
        title="Admin Settings"
        description="Administrative settings and configuration"
      />
    </div>
  );
}
