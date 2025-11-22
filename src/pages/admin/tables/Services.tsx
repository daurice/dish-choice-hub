import { TableCRUD } from "@/components/admin/TableCRUD";

export default function Services() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Services</h2>
        <p className="text-muted-foreground">Manage catering services</p>
      </div>
      <TableCRUD
        tableName="services"
        title="Services"
        description="Catering services offered"
      />
    </div>
  );
}
