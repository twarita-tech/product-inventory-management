import { useState, useMemo } from "react";
import { useInventory } from "@/contexts/InventoryContext";
import { ProductTable } from "@/components/inventory/ProductTable";
import { ProductFormDialog } from "@/components/inventory/ProductFormDialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Search } from "lucide-react";
import { Product } from "@/lib/inventory-store";
import { toast } from "sonner";

export default function Products() {
  const { products, addProduct, updateProduct, deleteProduct, categories } = useInventory();
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [stockFilter, setStockFilter] = useState("all");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchSearch = !search || p.name.toLowerCase().includes(search.toLowerCase()) || p.id.toLowerCase().includes(search.toLowerCase()) || p.category.toLowerCase().includes(search.toLowerCase());
      const matchCategory = categoryFilter === "all" || p.category === categoryFilter;
      const matchStock = stockFilter === "all" || (stockFilter === "in-stock" && p.quantity > p.lowStockThreshold) || (stockFilter === "low-stock" && p.quantity > 0 && p.quantity <= p.lowStockThreshold) || (stockFilter === "out-of-stock" && p.quantity === 0);
      return matchSearch && matchCategory && matchStock;
    });
  }, [products, search, categoryFilter, stockFilter]);

  const handleSubmit = (data: Omit<Product, "id" | "createdAt">) => {
    if (editingProduct) {
      updateProduct(editingProduct.id, data);
      toast.success("Product updated");
    } else {
      addProduct(data);
      toast.success("Product added");
    }
    setEditingProduct(null);
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    deleteProduct(id);
    toast.success("Product deleted");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Products</h1>
          <p className="text-muted-foreground">{products.length} total products</p>
        </div>
        <Button onClick={() => { setEditingProduct(null); setDialogOpen(true); }}>
          <Plus className="mr-2 h-4 w-4" /> Add Product
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search by name, ID, or category..." className="pl-9" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-full sm:w-[160px]"><SelectValue placeholder="Category" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
          </SelectContent>
        </Select>
        <Select value={stockFilter} onValueChange={setStockFilter}>
          <SelectTrigger className="w-full sm:w-[160px]"><SelectValue placeholder="Stock" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Stock</SelectItem>
            <SelectItem value="in-stock">In Stock</SelectItem>
            <SelectItem value="low-stock">Low Stock</SelectItem>
            <SelectItem value="out-of-stock">Out of Stock</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <ProductTable products={filtered} onEdit={handleEdit} onDelete={handleDelete} />

      <ProductFormDialog open={dialogOpen} onOpenChange={setDialogOpen} onSubmit={handleSubmit} product={editingProduct} categories={categories} />
    </div>
  );
}
