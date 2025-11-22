import { TableCRUD } from "@/components/admin/TableCRUD";

export default function Profiles() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">User Profiles</h2>
        <p className="text-muted-foreground">Manage user profile information</p>
      </div>
      <TableCRUD
        tableName="profiles"
        title="User Profiles"
        description="User account profiles and details"
      />
    </div>
  );
}
