import { NavLink, useLocation } from "react-router-dom";
import { LayoutDashboard, Package, AlertTriangle, FileBarChart, Box } from "lucide-react";

const links = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/products", label: "Products", icon: Package },
  { to: "/low-stock", label: "Low Stock", icon: AlertTriangle },
  { to: "/reports", label: "Reports", icon: FileBarChart },
];

export function AppSidebar() {
  const location = useLocation();

  return (
    <aside className="hidden md:flex w-60 shrink-0 flex-col bg-sidebar text-sidebar-foreground border-r border-sidebar-border">
      <div className="flex items-center gap-2 px-5 py-5 border-b border-sidebar-border">
        <Box className="h-7 w-7 text-sidebar-primary" />
        <span className="text-lg font-bold tracking-tight">StockPulse</span>
      </div>
      <nav className="flex-1 px-3 py-4 space-y-1">
        {links.map(({ to, label, icon: Icon }) => {
          const active = location.pathname === to;
          return (
            <NavLink
              key={to}
              to={to}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${active ? "bg-sidebar-accent text-sidebar-primary" : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"}`}
            >
              <Icon className="h-4 w-4" />
              {label}
            </NavLink>
          );
        })}
      </nav>
      <div className="px-5 py-4 border-t border-sidebar-border text-xs text-sidebar-foreground/50">
        © 2026 StockPulse
      </div>
    </aside>
  );
}
