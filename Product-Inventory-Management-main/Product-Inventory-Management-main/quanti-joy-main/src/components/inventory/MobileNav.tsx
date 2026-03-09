import { NavLink, useLocation } from "react-router-dom";
import { LayoutDashboard, Package, AlertTriangle, FileBarChart, Box } from "lucide-react";

const links = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/products", label: "Products", icon: Package },
  { to: "/low-stock", label: "Alerts", icon: AlertTriangle },
  { to: "/reports", label: "Reports", icon: FileBarChart },
];

export function MobileNav() {
  const location = useLocation();

  return (
    <header className="md:hidden flex items-center justify-between border-b px-4 py-3 bg-card">
      <div className="flex items-center gap-2">
        <Box className="h-6 w-6 text-warning" />
        <span className="font-bold">StockPulse</span>
      </div>
      <nav className="flex gap-1">
        {links.map(({ to, icon: Icon }) => {
          const active = location.pathname === to;
          return (
            <NavLink key={to} to={to} className={`p-2 rounded-md ${active ? "bg-accent text-accent-foreground" : "text-muted-foreground"}`}>
              <Icon className="h-5 w-5" />
            </NavLink>
          );
        })}
      </nav>
    </header>
  );
}
