import { useState, useCallback } from "react";

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  quantity: number;
  supplier: string;
  lowStockThreshold: number;
  createdAt: string;
}

const INITIAL_PRODUCTS: Product[] = [
  { id: "PRD-001", name: "Wireless Mouse", category: "Electronics", price: 29.99, quantity: 150, supplier: "TechParts Inc.", lowStockThreshold: 20, createdAt: "2026-03-01" },
  { id: "PRD-002", name: "USB-C Cable", category: "Accessories", price: 12.99, quantity: 8, supplier: "CableCo", lowStockThreshold: 25, createdAt: "2026-03-02" },
  { id: "PRD-003", name: "Mechanical Keyboard", category: "Electronics", price: 89.99, quantity: 45, supplier: "TechParts Inc.", lowStockThreshold: 10, createdAt: "2026-03-03" },
  { id: "PRD-004", name: "Monitor Stand", category: "Furniture", price: 49.99, quantity: 3, supplier: "OfficePro", lowStockThreshold: 5, createdAt: "2026-03-03" },
  { id: "PRD-005", name: "Webcam HD", category: "Electronics", price: 59.99, quantity: 62, supplier: "TechParts Inc.", lowStockThreshold: 15, createdAt: "2026-03-04" },
  { id: "PRD-006", name: "Desk Lamp", category: "Furniture", price: 34.99, quantity: 0, supplier: "OfficePro", lowStockThreshold: 5, createdAt: "2026-03-04" },
  { id: "PRD-007", name: "Notebook A5", category: "Stationery", price: 4.99, quantity: 200, supplier: "PaperWorld", lowStockThreshold: 50, createdAt: "2026-03-05" },
  { id: "PRD-008", name: "Bluetooth Speaker", category: "Electronics", price: 39.99, quantity: 12, supplier: "AudioMax", lowStockThreshold: 15, createdAt: "2026-03-05" },
];

export function useInventoryStore() {
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);

  const addProduct = useCallback((product: Omit<Product, "id" | "createdAt">) => {
    const id = `PRD-${String(products.length + 1).padStart(3, "0")}`;
    setProducts((prev) => [...prev, { ...product, id, createdAt: new Date().toISOString().split("T")[0] }]);
  }, [products.length]);

  const updateProduct = useCallback((id: string, updates: Partial<Product>) => {
    setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, ...updates } : p)));
  }, []);

  const deleteProduct = useCallback((id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  }, []);

  const lowStockProducts = products.filter((p) => p.quantity <= p.lowStockThreshold);
  const outOfStockProducts = products.filter((p) => p.quantity === 0);
  const totalStock = products.reduce((sum, p) => sum + p.quantity, 0);
  const categories = [...new Set(products.map((p) => p.category))];
  const recentProducts = [...products].sort((a, b) => b.createdAt.localeCompare(a.createdAt)).slice(0, 5);

  return { products, addProduct, updateProduct, deleteProduct, lowStockProducts, outOfStockProducts, totalStock, categories, recentProducts };
}
