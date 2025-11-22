import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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

interface TableCRUDProps {
  tableName: string;
  title: string;
  description: string;
}

export function TableCRUD({ tableName, title, description }: TableCRUDProps) {
  const [data, setData] = useState<any[]>([]);
  const [columns, setColumns] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedRow, setSelectedRow] = useState<any>(null);
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchTableData();
  }, [tableName]);

  const fetchTableData = async () => {
    setLoading(true);
    try {
      const { data: tableData, error } = await supabase
        .from(tableName as any)
        .select("*");

      if (error) throw error;

      setData(tableData || []);
      
      if (tableData && tableData.length > 0) {
        setColumns(Object.keys(tableData[0]));
      }
    } catch (error: any) {
      toast.error(`Error loading ${title}`, {
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setEditMode(false);
    setSelectedRow(null);
    setFormData({});
    setDialogOpen(true);
  };

  const handleEdit = (row: any) => {
    setEditMode(true);
    setSelectedRow(row);
    setFormData({ ...row });
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
        .from(tableName as any)
        .delete()
        .eq('id', selectedRow.id);

      if (error) throw error;

      toast.success("Record deleted successfully");
      setDeleteDialogOpen(false);
      fetchTableData();
    } catch (error: any) {
      toast.error("Error deleting record", {
        description: error.message,
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      if (editMode && selectedRow) {
        const { error } = await supabase
          .from(tableName as any)
          .update(formData as any)
          .eq('id', selectedRow.id);

        if (error) throw error;
        toast.success("Record updated successfully");
      } else {
        const { error } = await supabase
          .from(tableName as any)
          .insert([formData as any]);

        if (error) throw error;
        toast.success("Record created successfully");
      }

      setDialogOpen(false);
      fetchTableData();
    } catch (error: any) {
      toast.error(editMode ? "Error updating record" : "Error creating record", {
        description: error.message,
      });
    } finally {
      setSubmitting(false);
    }
  };

  const formatValue = (value: any): string => {
    if (value === null || value === undefined) return "-";
    if (typeof value === "boolean") return value ? "Yes" : "No";
    if (Array.isArray(value)) return value.join(", ");
    if (typeof value === "object") return JSON.stringify(value);
    if (typeof value === "string" && value.length > 50) {
      return value.substring(0, 50) + "...";
    }
    return String(value);
  };

  const renderFormField = (column: string, value: any) => {
    // Skip auto-generated fields
    if (column === 'id' || column === 'created_at' || column === 'updated_at') {
      return null;
    }

    const isTextarea = typeof value === 'string' && value.length > 100;
    const isArray = Array.isArray(value);

    return (
      <div key={column} className="space-y-2">
        <Label htmlFor={column} className="capitalize">
          {column.replace(/_/g, ' ')}
        </Label>
        {isTextarea ? (
          <Textarea
            id={column}
            value={formData[column] || ''}
            onChange={(e) => setFormData({ ...formData, [column]: e.target.value })}
            rows={4}
          />
        ) : isArray ? (
          <Textarea
            id={column}
            value={formData[column]?.join('\n') || ''}
            onChange={(e) => setFormData({ ...formData, [column]: e.target.value.split('\n').filter(Boolean) })}
            placeholder="Enter one item per line"
            rows={4}
          />
        ) : (
          <Input
            id={column}
            type="text"
            value={formData[column] || ''}
            onChange={(e) => setFormData({ ...formData, [column]: e.target.value })}
          />
        )}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
          <p className="text-sm text-muted-foreground mt-1">{data.length} records found</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={fetchTableData} variant="outline" size="sm">
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
          <p className="text-muted-foreground">No records found</p>
        </div>
      ) : (
        <div className="border rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  {columns.map((column) => (
                    <TableHead key={column} className="capitalize whitespace-nowrap">
                      {column.replace(/_/g, ' ')}
                    </TableHead>
                  ))}
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((row, index) => (
                  <TableRow key={row.id || index}>
                    {columns.map((column) => (
                      <TableCell key={column} className="max-w-xs">
                        {formatValue(row[column])}
                      </TableCell>
                    ))}
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          onClick={() => handleEdit(row)}
                          variant="ghost"
                          size="sm"
                        >
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

      {/* Create/Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editMode ? 'Edit' : 'Create'} Record</DialogTitle>
            <DialogDescription>
              {editMode ? 'Update the record details below' : 'Fill in the details to create a new record'}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-4">
              {columns.map((column) => renderFormField(column, selectedRow?.[column]))}
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={submitting}>
                {submitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {editMode ? 'Update' : 'Create'}
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
              Are you sure you want to delete this record? This action cannot be undone.
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
