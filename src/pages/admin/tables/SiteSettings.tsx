import { TableCRUD } from "@/components/admin/TableCRUD";

export default function SiteSettings() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Site Settings</h2>
        <p className="text-muted-foreground">Manage website configuration</p>
      </div>
      <TableCRUD
        tableName="site_settings"
        title="Site Settings"
        description="General website settings and configuration"
      />
    </div>
  );
}
