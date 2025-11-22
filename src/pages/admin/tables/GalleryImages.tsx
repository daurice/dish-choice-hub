import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "sonner";
import { Trash2, Edit, Plus, Upload } from "lucide-react";

interface GalleryImage {
  id: string;
  title: string;
  description: string;
  image_path: string;
  order_index: number;
  created_at: string;
}

export default function GalleryImages() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [uploading, setUploading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    order_index: 0,
  });

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("gallery_images")
        .select("*")
        .order("order_index", { ascending: true });

      if (error) throw error;
      setImages(data || []);
    } catch (error: any) {
      toast.error("Failed to fetch images: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.match(/^image\/(jpeg|jpg|png|webp)$/)) {
        toast.error("Please upload a valid image file (JPG, PNG, or WEBP)");
        return;
      }
      
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size must be less than 5MB");
        return;
      }

      setImageFile(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadImageToStorage = async (file: File): Promise<string> => {
    const fileExt = file.name.split(".").pop();
    const fileName = `${Math.random().toString(36).substring(2)}_${Date.now()}.${fileExt}`;
    const filePath = `gallery/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from("website-images")
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    const { data: { publicUrl } } = supabase.storage
      .from("website-images")
      .getPublicUrl(filePath);

    return publicUrl;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);

    try {
      let imagePath = selectedImage?.image_path || "";

      // Upload new image if file is selected
      if (imageFile) {
        imagePath = await uploadImageToStorage(imageFile);
        
        // Delete old image if updating
        if (editMode && selectedImage?.image_path) {
          const oldPath = selectedImage.image_path.split("/gallery/")[1];
          if (oldPath) {
            await supabase.storage
              .from("website-images")
              .remove([`gallery/${oldPath}`]);
          }
        }
      }

      if (!imagePath && !editMode) {
        toast.error("Please select an image to upload");
        setUploading(false);
        return;
      }

      const imageData = {
        title: formData.title,
        description: formData.description,
        image_path: imagePath,
        order_index: formData.order_index,
      };

      if (editMode && selectedImage) {
        const { error } = await supabase
          .from("gallery_images")
          .update(imageData)
          .eq("id", selectedImage.id);

        if (error) throw error;
        toast.success("Image updated successfully");
      } else {
        const { error } = await supabase
          .from("gallery_images")
          .insert([imageData]);

        if (error) throw error;
        toast.success("Image uploaded successfully");
      }

      setIsDialogOpen(false);
      resetForm();
      fetchImages();
    } catch (error: any) {
      toast.error("Failed to save image: " + error.message);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedImage) return;

    try {
      // Delete from storage
      const imagePath = selectedImage.image_path.split("/gallery/")[1];
      if (imagePath) {
        await supabase.storage
          .from("website-images")
          .remove([`gallery/${imagePath}`]);
      }

      // Delete from database
      const { error } = await supabase
        .from("gallery_images")
        .delete()
        .eq("id", selectedImage.id);

      if (error) throw error;

      toast.success("Image deleted successfully");
      setIsDeleteDialogOpen(false);
      setSelectedImage(null);
      fetchImages();
    } catch (error: any) {
      toast.error("Failed to delete image: " + error.message);
    }
  };

  const openCreateDialog = () => {
    resetForm();
    setEditMode(false);
    setIsDialogOpen(true);
  };

  const openEditDialog = (image: GalleryImage) => {
    setSelectedImage(image);
    setFormData({
      title: image.title,
      description: image.description,
      order_index: image.order_index,
    });
    setImagePreview(image.image_path);
    setEditMode(true);
    setIsDialogOpen(true);
  };

  const openDeleteDialog = (image: GalleryImage) => {
    setSelectedImage(image);
    setIsDeleteDialogOpen(true);
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      order_index: 0,
    });
    setImageFile(null);
    setImagePreview(null);
    setSelectedImage(null);
  };

  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Gallery Images</h2>
          <p className="text-muted-foreground">Manage gallery images and content</p>
        </div>
        <Button onClick={openCreateDialog}>
          <Plus className="mr-2 h-4 w-4" />
          Add Image
        </Button>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Preview</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Order</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {images.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center text-muted-foreground">
                  No images found. Add your first gallery image.
                </TableCell>
              </TableRow>
            ) : (
              images.map((image) => (
                <TableRow key={image.id}>
                  <TableCell>
                    <img
                      src={image.image_path}
                      alt={image.title}
                      className="w-16 h-16 object-cover rounded"
                    />
                  </TableCell>
                  <TableCell className="font-medium">{image.title}</TableCell>
                  <TableCell className="max-w-xs truncate">{image.description}</TableCell>
                  <TableCell>{image.order_index}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => openEditDialog(image)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => openDeleteDialog(image)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Create/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <form onSubmit={handleSubmit}>
            <DialogHeader>
              <DialogTitle>{editMode ? "Edit" : "Add"} Gallery Image</DialogTitle>
              <DialogDescription>
                {editMode ? "Update the gallery image details" : "Upload a new image to the gallery"}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="image">Image *</Label>
                <Input
                  id="image"
                  type="file"
                  accept="image/jpeg,image/jpg,image/png,image/webp"
                  onChange={handleFileChange}
                  required={!editMode}
                />
                <p className="text-xs text-muted-foreground">
                  Accepted formats: JPG, PNG, WEBP (Max 5MB)
                </p>
              </div>

              {imagePreview && (
                <div className="mt-2">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-48 object-cover rounded-lg"
                  />
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="order_index">Order Index</Label>
                <Input
                  id="order_index"
                  type="number"
                  value={formData.order_index}
                  onChange={(e) => setFormData({ ...formData, order_index: parseInt(e.target.value) })}
                />
              </div>
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={uploading}>
                {uploading ? (
                  <>
                    <Upload className="mr-2 h-4 w-4 animate-spin" />
                    {editMode ? "Updating..." : "Uploading..."}
                  </>
                ) : (
                  editMode ? "Update" : "Upload"
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Image</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this image? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
