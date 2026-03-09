import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Product } from "@/lib/inventory-store";

interface ProductFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: Omit<Product, "id" | "createdAt">) => void;
  product?: Product | null;
  categories: string[];
}

const EMPTY = { name: "", category: "", price: 0, quantity: 0, supplier: "", lowStockThreshold: 10 };

export function ProductFormDialog({ open, onOpenChange, onSubmit, product, categories }: ProductFormDialogProps) {
  const [form, setForm] = useState(EMPTY);

  useEffect(() => {
    if (product) {
      setForm({ name: product.name, category: product.category, price: product.price, quantity: product.quantity, supplier: product.supplier, lowStockThreshold: product.lowStockThreshold });
    } else {
      setForm(EMPTY);
    }
  }, [product, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.category || !form.supplier) return;
    onSubmit(form);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{product ? "Edit Product" : "Add New Product"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-2">
          <div className="grid gap-2">
            <Label htmlFor="name">Product Name</Label>
            <Input id="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="category">Category</Label>
              <Select value={form.category} onValueChange={(v) => setForm({ ...form, category: v })}>
                <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                <SelectContent>
                  {[...categories, "Electronics", "Accessories", "Furniture", "Stationery", "Other"].filter((v, i, a) => a.indexOf(v) === i).map((c) => (
                    <SelectItem key={c} value={c}>{c}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="supplier">Supplier</Label>
              <Input id="supplier" value={form.supplier} onChange={(e) => setForm({ ...form, supplier: e.target.value })} required />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="price">Price ($)</Label>
              <Input id="price" type="number" min="0" step="0.01" value={form.price} onChange={(e) => setForm({ ...form, price: +e.target.value })} required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="quantity">Quantity</Label>
              <Input id="quantity" type="number" min="0" value={form.quantity} onChange={(e) => setForm({ ...form, quantity: +e.target.value })} required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="threshold">Low Stock At</Label>
              <Input id="threshold" type="number" min="0" value={form.lowStockThreshold} onChange={(e) => setForm({ ...form, lowStockThreshold: +e.target.value })} required />
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
            <Button type="submit">{product ? "Save Changes" : "Add Product"}</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
