import { TableCRUD } from "@/components/admin/TableCRUD";

export default function UserRoles() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">User Roles</h2>
        <p className="text-muted-foreground">Manage user roles and permissions</p>
      </div>
      <TableCRUD
        tableName="user_roles"
        title="User Roles"
        description="User role assignments and access control"
      />
    </div>
  );
}
