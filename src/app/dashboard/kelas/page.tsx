"use client";

import React from "react";
import { GraduationCap, Users, BookOpen } from "lucide-react";

export default function KelasPage() {
  const kelasList = [
    { name: "XI RPL 1", waliKelas: "Budi Santoso, S.Kom", totalSiswa: 3 },
    { name: "XI RPL 2", waliKelas: "Siti Rahmawati, M.Pd", totalSiswa: 2 },
    { name: "X RPL 1", waliKelas: "Ahmad Fauzi, S.Kom", totalSiswa: 2 },
    { name: "X RPL 2", waliKelas: "Dewi Lestari, S.Pd", totalSiswa: 3 },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-800">
          Kelas
        </h1>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {kelasList.map((k, idx) => (
          <div
            key={k.name}
            style={{ animationDelay: `${idx * 75}ms` }}
            className="flex flex-col justify-between rounded-2xl border border-slate-100 bg-white p-5 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] animate-in fade-in-0 slide-in-from-bottom-3 duration-500 fill-mode-both transition-all hover:-translate-y-1 hover:shadow-md"
          >
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full">
                  Kelas Aktif
                </span>
                <h3 className="text-xl font-bold text-slate-800 mt-2">{k.name}</h3>
                <p className="text-xs text-slate-500 mt-1">
                  Wali: {k.waliKelas}
                </p>
              </div>
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-500 text-white shadow-sm shadow-emerald-500/20">
                <GraduationCap size={22} />
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span className="flex items-center gap-1.5">
                <Users size={15} />
                {k.totalSiswa} Siswa
              </span>
              <span className="font-semibold text-blue-600 hover:underline cursor-pointer">
                Detail
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
