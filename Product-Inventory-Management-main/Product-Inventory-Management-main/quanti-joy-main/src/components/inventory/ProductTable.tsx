import { Product } from "@/lib/inventory-store";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Pencil, Trash2 } from "lucide-react";

interface ProductTableProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
}

function StockBadge({ product }: { product: Product }) {
  if (product.quantity === 0) return <Badge variant="destructive">Out of Stock</Badge>;
  if (product.quantity <= product.lowStockThreshold) return <Badge className="bg-warning text-warning-foreground hover:bg-warning/80">Low Stock</Badge>;
  return <Badge className="bg-success text-success-foreground hover:bg-success/80">In Stock</Badge>;
}

export function ProductTable({ products, onEdit, onDelete }: ProductTableProps) {
  if (products.length === 0) {
    return <div className="py-12 text-center text-muted-foreground">No products found.</div>;
  }

  return (
    <div className="rounded-lg border overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50">
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead className="text-right">Price</TableHead>
            <TableHead className="text-right">Qty</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Supplier</TableHead>
            <TableHead className="w-[100px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((p) => (
            <TableRow key={p.id}>
              <TableCell className="font-mono text-xs text-muted-foreground">{p.id}</TableCell>
              <TableCell className="font-medium">{p.name}</TableCell>
              <TableCell>{p.category}</TableCell>
              <TableCell className="text-right">${p.price.toFixed(2)}</TableCell>
              <TableCell className="text-right font-mono">{p.quantity}</TableCell>
              <TableCell><StockBadge product={p} /></TableCell>
              <TableCell className="text-muted-foreground">{p.supplier}</TableCell>
              <TableCell>
                <div className="flex gap-1">
                  <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => onEdit(p)}><Pencil className="h-4 w-4" /></Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive" onClick={() => onDelete(p.id)}><Trash2 className="h-4 w-4" /></Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
