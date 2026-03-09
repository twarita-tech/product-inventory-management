import { useInventory } from "@/contexts/InventoryContext";
import { StatsCard } from "@/components/inventory/StatsCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Package, AlertTriangle, XCircle, Warehouse } from "lucide-react";

export default function Dashboard() {
  const { products, lowStockProducts, outOfStockProducts, totalStock, recentProducts } = useInventory();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Overview of your inventory at a glance.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard title="Total Products" value={products.length} icon={Package} />
        <StatsCard title="Total Stock" value={totalStock.toLocaleString()} icon={Warehouse} variant="success" />
        <StatsCard title="Low Stock Items" value={lowStockProducts.length} icon={AlertTriangle} variant="warning" />
        <StatsCard title="Out of Stock" value={outOfStockProducts.length} icon={XCircle} variant="destructive" />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader><CardTitle className="text-base">Low Stock Alerts</CardTitle></CardHeader>
          <CardContent>
            {lowStockProducts.length === 0 ? (
              <p className="text-sm text-muted-foreground">All items are well-stocked.</p>
            ) : (
              <div className="space-y-3">
                {lowStockProducts.map((p) => (
                  <div key={p.id} className="flex items-center justify-between rounded-lg border p-3">
                    <div>
                      <p className="font-medium text-sm">{p.name}</p>
                      <p className="text-xs text-muted-foreground">{p.category} · {p.supplier}</p>
                    </div>
                    <div className="text-right">
                      <Badge variant={p.quantity === 0 ? "destructive" : "outline"} className={p.quantity > 0 ? "border-warning text-warning" : ""}>
                        {p.quantity === 0 ? "Out of Stock" : `${p.quantity} left`}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-base">Recently Added</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentProducts.map((p) => (
                <div key={p.id} className="flex items-center justify-between rounded-lg border p-3">
                  <div>
                    <p className="font-medium text-sm">{p.name}</p>
                    <p className="text-xs text-muted-foreground">{p.category}</p>
                  </div>
                  <p className="text-xs text-muted-foreground">{p.createdAt}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
