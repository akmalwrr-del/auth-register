"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Users, BarChart2 } from "lucide-react";

interface MenuItem {
  title: string;
  url: string;
  icon: React.ElementType;
}

const menuItems: MenuItem[] = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Siswa",
    url: "/dashboard/siswa",
    icon: Users,
  },
  {
    title: "Kelas",
    url: "/dashboard/kelas",
    icon: BarChart2,
  },
  {
    title: "Pelanggaran",
    url: "/dashboard/pelanggaran",
    icon: BarChart2,
  },
];

export function AppSidebar() {
  const pathname = usePathname();
  const [user, setUser] = useState<{ name: string; email: string }>({
    name: "User",
    email: "user@example.com",
  });

  useEffect(() => {
    try {
      const saved = localStorage.getItem("user");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.name) setUser(parsed);
      }
    } catch {
      // ignore
    }
  }, []);

  const firstLetter = (user.name || "User").charAt(0).toUpperCase();

  return (
    <aside className="flex h-screen w-64 flex-col justify-between border-r border-slate-200/70 bg-white p-4">
      <div className="flex flex-col gap-6">
        {/* Brand / Logo */}
        <Link href="/dashboard" className="group flex items-center gap-3 px-2 py-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-lg font-bold text-white shadow-sm transition-transform duration-200 group-hover:scale-105">
            S
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-800 transition-colors duration-200 group-hover:text-blue-600">
            SchoolApp
          </span>
        </Link>

        {/* Navigation Menu */}
        <nav className="flex flex-col gap-1.5">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              item.url === "/dashboard"
                ? pathname === "/dashboard"
                : pathname.startsWith(item.url);

            return (
              <Link
                key={item.title}
                href={item.url}
                className={`group flex items-center gap-3.5 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 active:scale-[0.98] ${
                  isActive
                    ? "bg-blue-600 text-white shadow-sm shadow-blue-500/20"
                    : "text-slate-500 hover:translate-x-0.5 hover:bg-slate-100/70 hover:text-slate-900"
                }`}
              >
                <Icon
                  size={19}
                  className={`transition-transform duration-200 group-hover:scale-110 ${
                    isActive ? "text-white" : "text-slate-400 group-hover:text-slate-600"
                  }`}
                />
                <span>{item.title}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* User Footer Profile */}
      <div className="border-t border-slate-100 pt-3">
        <div className="flex items-center gap-3 rounded-xl px-2 py-2 transition hover:bg-slate-50">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-900 text-sm font-semibold text-white">
            {firstLetter || "N"}
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-slate-800">
              {user.name}
            </p>
            <p className="truncate text-xs text-slate-400">{user.email}</p>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default AppSidebar;
