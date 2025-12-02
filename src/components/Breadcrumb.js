import { ChevronRight, Home } from "lucide-react";

export function Breadcrumb() {
  return (
    <nav className="d-flex align-items-center space-x-1 small mb-6">
      <Home className="h-4 w-4" />
      <ChevronRight className="h-4 w-4" />
      <span className="text-green-700">Products</span>
    </nav>
  );
}