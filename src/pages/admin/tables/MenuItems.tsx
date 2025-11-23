import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { RefreshCw, Plus, Pencil, Trash2, Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function MenuItems() {
  const [data, setData] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedRow, setSelectedRow] = useState<any>(null);
  const [formData, setFormData] = useState<any>({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [itemsResult, categoriesResult] = await Promise.all([
        supabase.from("menu_items").select("*, menu_categories(name)").order("order_index"),
        supabase.from("menu_categories").select("*").order("order_index"),
      ]);

      if (itemsResult.error) throw itemsResult.error;
      if (categoriesResult.error) throw categoriesResult.error;

      setData(itemsResult.data || []);
      setCategories(categoriesResult.data || []);
    } catch (error: any) {
      toast.error("Error loading data", { description: error.message });
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setEditMode(false);
    setSelectedRow(null);
    setFormData({ items: [] });
    setDialogOpen(true);
  };

  const handleEdit = (row: any) => {
    setEditMode(true);
    setSelectedRow(row);
    setFormData({
      name: row.name,
      price: row.price,
      category_id: row.category_id,
      items: row.items || [],
      order_index: row.order_index,
    });
    setDialogOpen(true);
  };

  const handleDelete = (row: any) => {
    setSelectedRow(row);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!selectedRow) return;
    setSubmitting(true);
    try {
      const { error } = await supabase
        .from("menu_items")
        .delete()
        .eq("id", selectedRow.id);

      if (error) throw error;
      toast.success("Menu item deleted successfully");
      setDeleteDialogOpen(false);
      fetchData();
    } catch (error: any) {
      toast.error("Error deleting menu item", { description: error.message });
    } finally {
      setSubmitting(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const submitData = {
        name: formData.name,
        price: formData.price,
        category_id: formData.category_id,
        items: formData.items,
        order_index: formData.order_index || 0,
      };

      if (editMode && selectedRow) {
        const { error } = await supabase
          .from("menu_items")
          .update(submitData)
          .eq("id", selectedRow.id);

        if (error) throw error;
        toast.success("Menu item updated successfully");
      } else {
        const { error } = await supabase.from("menu_items").insert([submitData]);
        if (error) throw error;
        toast.success("Menu item created successfully");
      }

      setDialogOpen(false);
      fetchData();
    } catch (error: any) {
      toast.error(editMode ? "Error updating menu item" : "Error creating menu item", {
        description: error.message,
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Menu Items</h2>
        <p className="text-muted-foreground">Manage menu items and dishes</p>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">{data.length} items found</p>
          <div className="flex gap-2">
            <Button onClick={fetchData} variant="outline" size="sm">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
            <Button onClick={handleCreate} size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add New
            </Button>
          </div>
        </div>

        {data.length === 0 ? (
          <div className="text-center py-12 border rounded-lg bg-muted/20">
            <p className="text-muted-foreground">No menu items found</p>
          </div>
        ) : (
          <div className="border rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Items</TableHead>
                    <TableHead>Order</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell className="font-medium">{row.name}</TableCell>
                      <TableCell>{row.menu_categories?.name || "-"}</TableCell>
                      <TableCell>{row.price}</TableCell>
                      <TableCell className="max-w-xs truncate">
                        {row.items?.join(", ") || "-"}
                      </TableCell>
                      <TableCell>{row.order_index}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button onClick={() => handleEdit(row)} variant="ghost" size="sm">
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            onClick={() => handleDelete(row)}
                            variant="ghost"
                            size="sm"
                            className="text-destructive hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        )}
      </div>

      {/* Create/Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editMode ? "Edit" : "Create"} Menu Item</DialogTitle>
            <DialogDescription>
              {editMode ? "Update the menu item details below" : "Fill in the details to create a new menu item"}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-4">
              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <Select
                  value={formData.category_id}
                  onValueChange={(value) => setFormData({ ...formData, category_id: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="name">Name *</Label>
                <Input
                  id="name"
                  value={formData.name || ""}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="price">Price *</Label>
                <Input
                  id="price"
                  value={formData.price || ""}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="items">Items (one per line)</Label>
                <Textarea
                  id="items"
                  value={formData.items?.join("\n") || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      items: e.target.value.split("\n").filter(Boolean),
                    })
                  }
                  placeholder="Enter menu item components, one per line"
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="order_index">Order Index</Label>
                <Input
                  id="order_index"
                  type="number"
                  value={formData.order_index || 0}
                  onChange={(e) =>
                    setFormData({ ...formData, order_index: parseInt(e.target.value) || 0 })
                  }
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={submitting}>
                {submitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {editMode ? "Update" : "Create"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this menu item? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete} disabled={submitting}>
              {submitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
