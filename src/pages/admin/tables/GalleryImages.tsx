import { TableCRUD } from "@/components/admin/TableCRUD";

export default function GalleryImages() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Gallery Images</h2>
        <p className="text-muted-foreground">Manage gallery images and content</p>
      </div>
      <TableCRUD
        tableName="gallery_images"
        title="Gallery Images"
        description="Images displayed in the gallery section"
      />
    </div>
  );
}
