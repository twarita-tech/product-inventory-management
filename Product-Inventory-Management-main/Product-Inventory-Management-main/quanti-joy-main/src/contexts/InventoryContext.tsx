import { createContext, useContext, ReactNode } from "react";
import { useInventoryStore } from "@/lib/inventory-store";

type InventoryContextType = ReturnType<typeof useInventoryStore>;

const InventoryContext = createContext<InventoryContextType | null>(null);

export function InventoryProvider({ children }: { children: ReactNode }) {
  const store = useInventoryStore();
  return <InventoryContext.Provider value={store}>{children}</InventoryContext.Provider>;
}

export function useInventory() {
  const ctx = useContext(InventoryContext);
  if (!ctx) throw new Error("useInventory must be used within InventoryProvider");
  return ctx;
}
