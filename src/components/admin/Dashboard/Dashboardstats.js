import React from "react";
import { Users, Package, ShoppingBag, ListChecks } from "lucide-react";

export default function DashboardStats({ stats }) {
  const cards = [
    {
      label: "Users",
      value: stats.users,
      icon: <Users size={32} className="text-success" />,
    },
    {
      label: "Products",
      value: stats.products,
      icon: <Package size={32} className="text-primary" />,
    },
    {
      label: "Orders",
      value: stats.orders,
      icon: <ShoppingBag size={32} className="text-warning" />,
    },
    {
      label: "Ingredients",
      value: stats.ingredients,
      icon: <ListChecks size={32} className="text-danger" />,
    },
  ];

  return (
    <div className="row g-3">
      {cards.map((card, index) => (
        <div className="col-md-3" key={index}>
          <div className="card shadow-sm text-center p-3">
            {card.icon}
            <h5 className="fw-bold my-2">{card.value}</h5>
            <p className="text-muted">{card.label}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
