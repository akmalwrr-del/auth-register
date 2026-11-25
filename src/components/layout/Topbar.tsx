"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { MoreHorizontal, LogOut, User, Settings, Shield } from "lucide-react";

export function TopBar() {
  const router = useRouter();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [userName, setUserName] = useState("User");
  const [userEmail, setUserEmail] = useState("user@example.com");
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("user");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.name) setUserName(parsed.name);
        if (parsed.email) setUserEmail(parsed.email);
      }
    } catch {
      // ignore
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    router.push("/auth/login");
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-slate-100 bg-white px-6 md:px-8">
      {/* School Name */}
      <div>
        <h1 className="text-base font-semibold text-slate-800 md:text-lg">
          SMK Telekomunikasi Tunas Harapan
        </h1>
      </div>

      {/* Right Action Menu */}
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setDropdownOpen((prev) => !prev)}
          aria-label="Menu Opsi"
          className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          <MoreHorizontal size={18} />
        </button>

        {/* Dropdown Popover */}
        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-56 origin-top-right rounded-xl border border-slate-100 bg-white p-2 shadow-lg ring-1 ring-black/5 animate-in fade-in-50 zoom-in-95">
            <div className="border-b border-slate-100 px-3 py-2">
              <p className="text-sm font-semibold text-slate-800">{userName}</p>
              <p className="truncate text-xs text-slate-500">{userEmail}</p>
            </div>

            <div className="py-1">
              <button
                onClick={() => {
                  setDropdownOpen(false);
                  router.push("/dashboard");
                }}
                className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              >
                <User size={16} />
                <span>Dashboard</span>
              </button>
              <button
                onClick={() => {
                  setDropdownOpen(false);
                  router.push("/dashboard/siswa");
                }}
                className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              >
                <Shield size={16} />
                <span>Kelola Siswa</span>
              </button>
            </div>

            <div className="border-t border-slate-100 pt-1">
              <button
                onClick={handleLogout}
                className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm font-medium text-red-600 hover:bg-red-50"
              >
                <LogOut size={16} />
                <span>Keluar</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

export default TopBar;
