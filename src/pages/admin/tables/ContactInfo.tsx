import { TableCRUD } from "@/components/admin/TableCRUD";

export default function ContactInfo() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Contact Information</h2>
        <p className="text-muted-foreground">Manage website contact details</p>
      </div>
      <TableCRUD
        tableName="contact_info"
        title="Contact Info"
        description="Contact information displayed on the website"
      />
    </div>
  );
}
