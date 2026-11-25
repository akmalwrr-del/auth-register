"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { TopBar } from "@/components/layout/Topbar";
import { Menu, X } from "lucide-react";

const HIDE_SIDEBAR_ON = ["/auth/login", "/auth/register"];

export default function LayoutShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const hideSidebar = HIDE_SIDEBAR_ON.some((p) => pathname.startsWith(p));

  if (hideSidebar) {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-screen bg-[#f8fafc]">
      {/* Desktop Sidebar */}
      <div className="hidden md:block shrink-0">
        <AppSidebar />
      </div>

      {/* Mobile Sidebar Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-xs md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Drawer */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 transform bg-white transition-transform duration-300 ease-in-out md:hidden ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="relative h-full">
          <button
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Tutup Menu"
            className="absolute top-4 right-4 rounded-lg p-1 text-slate-500 hover:bg-slate-100"
          >
            <X size={20} />
          </button>
          <AppSidebar />
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col min-w-0">
        <div className="relative flex items-center">
          {/* Mobile hamburger trigger */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Buka Menu"
            className="md:hidden absolute left-4 z-40 p-2 text-slate-600 hover:text-slate-900 focus:outline-none"
          >
            <Menu size={22} />
          </button>
          <div className="w-full">
            <TopBar />
          </div>
        </div>

        <main className="flex-1 p-5 md:p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
