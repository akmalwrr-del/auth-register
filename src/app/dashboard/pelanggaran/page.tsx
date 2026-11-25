"use client";

import React from "react";
import { AlertTriangle, ShieldAlert, CheckCircle2 } from "lucide-react";

export default function PelanggaranPage() {
  const pelanggaranList = [
    {
      id: 1,
      siswa: "Dimas Aditya",
      kelas: "XI RPL 1",
      jenis: "Terlambat Masuk Sekolah",
      poin: 5,
      tanggal: "2026-11-20",
      status: "Selesai",
    },
    {
      id: 2,
      siswa: "Rizky Maulana",
      kelas: "XI RPL 2",
      jenis: "Atribut Seragam Tidak Lengkap",
      poin: 5,
      tanggal: "2026-11-18",
      status: "Diproses",
    },
    {
      id: 3,
      siswa: "Iqbal Maulana",
      kelas: "XI RPL 1",
      jenis: "Meninggalkan Kelas Tanpa Izin",
      poin: 10,
      tanggal: "2026-11-15",
      status: "Selesai",
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-800">
          Pelanggaran
        </h1>
      </div>

      <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)]">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-bold text-slate-800">
            Daftar Catatan Pelanggaran Siswa
          </h2>
          <span className="rounded-full bg-red-100 text-red-700 text-xs font-semibold px-3 py-1">
            Total: 69 Pelanggaran
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead>
              <tr className="border-b border-slate-100 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                <th className="py-3 px-4">SISWA</th>
                <th className="py-3 px-4">KELAS</th>
                <th className="py-3 px-4">JENIS PELANGGARAN</th>
                <th className="py-3 px-4">POIN</th>
                <th className="py-3 px-4">TANGGAL</th>
                <th className="py-3 px-4">STATUS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {pelanggaranList.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50/60">
                  <td className="py-4 px-4 font-semibold text-slate-800">
                    {p.siswa}
                  </td>
                  <td className="py-4 px-4">{p.kelas}</td>
                  <td className="py-4 px-4">{p.jenis}</td>
                  <td className="py-4 px-4 font-semibold text-red-600">
                    +{p.poin}
                  </td>
                  <td className="py-4 px-4">{p.tanggal}</td>
                  <td className="py-4 px-4">
                    <span
                      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        p.status === "Selesai"
                          ? "bg-emerald-50 text-emerald-700"
                          : "bg-amber-50 text-amber-700"
                      }`}
                    >
                      {p.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
