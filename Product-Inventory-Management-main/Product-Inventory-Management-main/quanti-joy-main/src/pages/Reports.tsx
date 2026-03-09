import { useInventory } from "@/contexts/InventoryContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Download, FileBarChart } from "lucide-react";
import { toast } from "sonner";

export default function Reports() {
  const { products, totalStock, lowStockProducts, categories } = useInventory();

  const categoryBreakdown = categories.map((cat) => {
    const items = products.filter((p) => p.category === cat);
    return { category: cat, count: items.length, totalQty: items.reduce((s, p) => s + p.quantity, 0), totalValue: items.reduce((s, p) => s + p.price * p.quantity, 0) };
  });

  const totalValue = products.reduce((s, p) => s + p.price * p.quantity, 0);

  const exportCSV = () => {
    const header = "ID,Name,Category,Price,Quantity,Supplier,Status\n";
    const rows = products.map((p) => `${p.id},${p.name},${p.category},${p.price},${p.quantity},${p.supplier},${p.quantity === 0 ? "Out of Stock" : p.quantity <= p.lowStockThreshold ? "Low Stock" : "In Stock"}`).join("\n");
    const blob = new Blob([header + rows], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "inventory-report.csv"; a.click();
    URL.revokeObjectURL(url);
    toast.success("Report exported as CSV");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
            <FileBarChart className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Reports</h1>
            <p className="text-muted-foreground">Inventory summary and analytics</p>
          </div>
        </div>
        <Button variant="outline" onClick={exportCSV}>
          <Download className="mr-2 h-4 w-4" /> Export CSV
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardContent className="p-5">
            <p className="text-sm text-muted-foreground">Total Products</p>
            <p className="text-3xl font-bold">{products.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <p className="text-sm text-muted-foreground">Total Stock Units</p>
            <p className="text-3xl font-bold">{totalStock.toLocaleString()}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <p className="text-sm text-muted-foreground">Total Inventory Value</p>
            <p className="text-3xl font-bold">${totalValue.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader><CardTitle className="text-base">Category Breakdown</CardTitle></CardHeader>
        <CardContent>
          <div className="rounded-lg border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead>Category</TableHead>
                  <TableHead className="text-right">Products</TableHead>
                  <TableHead className="text-right">Total Qty</TableHead>
                  <TableHead className="text-right">Total Value</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {categoryBreakdown.map((c) => (
                  <TableRow key={c.category}>
                    <TableCell className="font-medium">{c.category}</TableCell>
                    <TableCell className="text-right">{c.count}</TableCell>
                    <TableCell className="text-right font-mono">{c.totalQty}</TableCell>
                    <TableCell className="text-right font-mono">${c.totalValue.toLocaleString(undefined, { minimumFractionDigits: 2 })}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
