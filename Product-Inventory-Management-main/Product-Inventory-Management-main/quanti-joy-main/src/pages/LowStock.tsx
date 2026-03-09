import { useInventory } from "@/contexts/InventoryContext";
import { ProductTable } from "@/components/inventory/ProductTable";
import { ProductFormDialog } from "@/components/inventory/ProductFormDialog";
import { Product } from "@/lib/inventory-store";
import { AlertTriangle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function LowStock() {
  const { lowStockProducts, updateProduct, deleteProduct, categories } = useInventory();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const handleEdit = (product: Product) => { setEditingProduct(product); setDialogOpen(true); };
  const handleDelete = (id: string) => { deleteProduct(id); toast.success("Product deleted"); };
  const handleSubmit = (data: Omit<Product, "id" | "createdAt">) => {
    if (editingProduct) { updateProduct(editingProduct.id, data); toast.success("Product updated"); }
    setEditingProduct(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-warning/10">
          <AlertTriangle className="h-5 w-5 text-warning" />
        </div>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Low Stock Alerts</h1>
          <p className="text-muted-foreground">{lowStockProducts.length} items need attention</p>
        </div>
      </div>
      <ProductTable products={lowStockProducts} onEdit={handleEdit} onDelete={handleDelete} />
      <ProductFormDialog open={dialogOpen} onOpenChange={setDialogOpen} onSubmit={handleSubmit} product={editingProduct} categories={categories} />
    </div>
  );
}
