"use client";

import React, { useState } from "react";
import {
  Users,
  GraduationCap,
  TrendingUp,
  AlertTriangle,
  BarChart2,
  Activity,
  Target,
  Shield,
  Award,
  Calendar,
} from "lucide-react";

export default function DashboardPage() {
  const [chartView, setChartView] = useState<"bar" | "pie">("bar");
  const [hoveredGender, setHoveredGender] = useState<"Laki-laki" | "Perempuan" | null>(null);
  const [hoveredBirthYear, setHoveredBirthYear] = useState<string | null>(null);

  // Data for Siswa per Kelas
  const classData = [
    { name: "XI RPL 1", count: 3, color: "bg-blue-600", hex: "#2563eb" },
    { name: "XI RPL 2", count: 2, color: "bg-pink-700", hex: "#be185d" },
    { name: "X RPL 1", count: 2, color: "bg-blue-900", hex: "#1e3a8a" },
    { name: "X RPL 2", count: 3, color: "bg-sky-600", hex: "#0284c7" },
  ];

  // Data for Tren Pelanggaran (Last 6 Months)
  const trendData = [
    { month: "Jul", value: 4 },
    { month: "Agu", value: 7 },
    { month: "Sep", value: 11 },
    { month: "Okt", value: 9 },
    { month: "Nov", value: 18 },
    { month: "Des", value: 20 },
  ];

  // Data for Jenis Pelanggaran (Top 5)
  const violationTypes = [
    { name: "Terlambat masuk kelas", count: 12, dotColor: "bg-red-500" },
    { name: "Tidak masuk tanpa keterangan", count: 4, dotColor: "bg-orange-500" },
    { name: "Tidak memakai sepatu hitam", count: 3, dotColor: "bg-amber-500" },
    { name: "Tidak mengerjakan tugas", count: 3, dotColor: "bg-amber-400" },
    { name: "Tidur saat pelajaran", count: 3, dotColor: "bg-lime-500" },
  ];

  // Data for Tingkat Pelanggaran
  const violationLevels = [
    { label: "Ringan", count: 36, dotColor: "bg-emerald-500" },
    { label: "Sedang", count: 25, dotColor: "bg-blue-500" },
    { label: "Berat", count: 8, dotColor: "bg-red-500" },
  ];

  // Data for Pelanggaran Terbanyak
  const topViolationClasses = [
    { rank: 1, name: "XI RPL 1", count: 36 },
    { rank: 2, name: "XI RPL 2", count: 21 },
    { rank: 3, name: "XII RPL 1", count: 12 },
  ];

  // Data for Distribusi Tahun Kelahiran Siswa
  const birthYearData = [
    { year: "2006", count: 6, percent: "60.0%", dotColor: "bg-blue-700" },
    { year: "2005", count: 3, percent: "30.0%", dotColor: "bg-red-800" },
    { year: "2025", count: 1, percent: "10.0%", dotColor: "bg-emerald-700" },
  ];

  return (
    <div className="flex flex-col gap-6">
      {/* Title */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-800">
          Dashboard Siswa
        </h1>
      </div>

      {/* 4 Stats Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {/* Card 1: Siswa */}
        <div className="group flex flex-col justify-between rounded-2xl border border-slate-100 bg-white p-5 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] animate-in fade-in-0 slide-in-from-bottom-3 duration-500 delay-75 fill-mode-both transition-all hover:-translate-y-1 hover:shadow-md">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">Siswa</p>
              <span className="mt-1 inline-block rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-semibold text-slate-600">
                Aktif
              </span>
            </div>
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-500 text-white shadow-sm shadow-blue-500/20 transition-transform duration-200 group-hover:scale-105">
              <Users size={22} />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-3xl font-bold text-slate-800">10</h3>
            <p className="mt-1 text-xs text-slate-400">Siswa aktif</p>
          </div>
        </div>

        {/* Card 2: Kelas */}
        <div className="group flex flex-col justify-between rounded-2xl border border-slate-100 bg-white p-5 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] animate-in fade-in-0 slide-in-from-bottom-3 duration-500 delay-100 fill-mode-both transition-all hover:-translate-y-1 hover:shadow-md">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">Kelas</p>
            </div>
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-500 text-white shadow-sm shadow-emerald-500/20 transition-transform duration-200 group-hover:scale-105">
              <GraduationCap size={22} />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-3xl font-bold text-slate-800">4</h3>
            <p className="mt-1 text-xs text-slate-400">Kelas aktif</p>
          </div>
        </div>

        {/* Card 3: Rata-rata/Kelas */}
        <div className="group flex flex-col justify-between rounded-2xl border border-slate-100 bg-white p-5 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] animate-in fade-in-0 slide-in-from-bottom-3 duration-500 delay-150 fill-mode-both transition-all hover:-translate-y-1 hover:shadow-md">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">Rata-rata/Kelas</p>
            </div>
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-500 text-white shadow-sm shadow-amber-500/20 transition-transform duration-200 group-hover:scale-105">
              <TrendingUp size={22} />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-3xl font-bold text-slate-800">3</h3>
            <p className="mt-1 text-xs text-slate-400">Siswa per kelas</p>
          </div>
        </div>

        {/* Card 4: Pelanggaran */}
        <div className="group flex flex-col justify-between rounded-2xl border border-slate-100 bg-white p-5 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] animate-in fade-in-0 slide-in-from-bottom-3 duration-500 delay-200 fill-mode-both transition-all hover:-translate-y-1 hover:shadow-md">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">Pelanggaran</p>
            </div>
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-red-500 text-white shadow-sm shadow-red-500/20 transition-transform duration-200 group-hover:scale-105">
              <AlertTriangle size={22} />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-3xl font-bold text-slate-800">69</h3>
            <p className="mt-1 text-xs text-slate-400">Total pelanggaran</p>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="flex flex-col gap-6">
        {/* Card: Siswa per Kelas / Gender Distribution */}
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] animate-in fade-in-0 slide-in-from-bottom-3 duration-500 delay-150 fill-mode-both">
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BarChart2 size={20} className="text-blue-600" />
              <h2 className="text-base font-bold text-slate-800">
                {chartView === "bar" ? "Siswa per Kelas" : "Distribusi Gender"}
              </h2>
            </div>

            {/* Toggle Button for Gender Distribution */}
            <button
              onClick={() =>
                setChartView((prev) => (prev === "bar" ? "pie" : "bar"))
              }
              className={`rounded-lg border px-3 py-1.5 text-xs font-semibold transition-all duration-200 active:scale-95 ${
                chartView === "pie"
                  ? "border-blue-500 bg-blue-50 text-blue-600"
                  : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
              }`}
            >
              {chartView === "bar" ? "Gender Distribution" : "Lihat Siswa per Kelas"}
            </button>
          </div>

          {/* View 1: Bar Chart (Image 1) */}
          {chartView === "bar" ? (
            <div className="relative pt-4 pb-2 animate-in fade-in-0 zoom-in-95 duration-300">
              <div className="flex h-64 w-full">
                {/* Y-axis labels */}
                <div className="flex flex-col justify-between pr-3 text-right text-xs font-medium text-slate-400">
                  <span>3</span>
                  <span>2.25</span>
                  <span>1.5</span>
                  <span>0.75</span>
                  <span>0</span>
                </div>

                {/* Grid & Bars Container */}
                <div className="relative flex flex-1 items-end justify-around border-b border-l border-slate-200 pl-4">
                  {/* Grid Lines */}
                  <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
                    <div className="border-b border-dashed border-slate-100 w-full" />
                    <div className="border-b border-dashed border-slate-100 w-full" />
                    <div className="border-b border-dashed border-slate-100 w-full" />
                    <div className="border-b border-dashed border-slate-100 w-full" />
                    <div className="w-full" />
                  </div>

                  {/* Bars */}
                  {classData.map((item) => {
                    const heightPercent = (item.count / 3) * 100;
                    return (
                      <div
                        key={item.name}
                        className="group relative z-10 flex flex-col items-center"
                        style={{ width: "18%" }}
                      >
                        {/* Tooltip on hover */}
                        <div className="absolute -top-8 hidden rounded bg-slate-800 px-2 py-0.5 text-xs font-medium text-white shadow group-hover:block animate-in fade-in-0 zoom-in-95 duration-150">
                          {item.count} Siswa
                        </div>

                        {/* Bar */}
                        <div
                          className="w-full rounded-t-sm transition-all duration-500 ease-out hover:opacity-90"
                          style={{
                            height: `${(heightPercent * 230) / 100}px`,
                            backgroundColor: item.hex,
                          }}
                        />

                        {/* X-axis label */}
                        <span className="mt-3 text-center text-xs font-medium text-slate-500 whitespace-nowrap">
                          {item.name}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ) : (
            /* View 2: Donut / Pie Chart (Image 2) */
            <div className="flex flex-col items-center justify-center py-6 animate-in fade-in-0 zoom-in-95 duration-300">
              <p className="text-sm font-semibold text-blue-600 mb-2">
                Laki-laki (60.0%)
              </p>

              {/* Pie SVG */}
              <div className="relative h-60 w-60">
                <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
                  {/* 60% Blue Slice (Laki-laki) */}
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="transparent"
                    stroke="#3b82f6"
                    strokeWidth="80"
                    strokeDasharray="150.796 251.327"
                    strokeDashoffset="0"
                  />
                  {/* 40% Pink Slice (Perempuan) */}
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="transparent"
                    stroke="#ec4899"
                    strokeWidth="80"
                    strokeDasharray="100.531 251.327"
                    strokeDashoffset="-150.796"
                  />
                  {/* Divider line style */}
                  <line
                    x1="50"
                    y1="50"
                    x2="95"
                    y2="50"
                    stroke="#ffffff"
                    strokeWidth="2"
                  />
                  <line
                    x1="50"
                    y1="50"
                    x2="20"
                    y2="20"
                    stroke="#ffffff"
                    strokeWidth="2"
                  />
                </svg>
              </div>

              <p className="text-sm font-semibold text-pink-600 mt-2 mb-4">
                Perempuan (40.0%)
              </p>

              {/* Legend */}
              <div className="flex items-center gap-6 text-xs font-medium text-slate-600">
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-xs bg-[#3b82f6]" />
                  <span>Laki-laki</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-xs bg-[#ec4899]" />
                  <span>Perempuan</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Card: Jenis Kelamin (Pie Chart) */}
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] animate-in fade-in-0 slide-in-from-bottom-3 duration-500 delay-200 fill-mode-both">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Users size={20} className="text-blue-600" />
              <h2 className="text-base font-bold text-slate-800">
                Jenis Kelamin
              </h2>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center py-2">
            <div className="relative flex h-64 w-full max-w-[380px] items-center justify-center">
              {/* Top-left label */}
              <span className="absolute top-2 left-2 sm:left-4 text-sm font-medium text-[#5b93f5]">
                Laki-laki (60.0%)
              </span>

              {/* Hover tooltip */}
              {hoveredGender && (
                <div className="pointer-events-none absolute top-1/2 left-1/2 z-20 -translate-x-1/2 -translate-y-1/2 rounded-lg bg-slate-800/90 px-3 py-1.5 text-xs font-medium text-white shadow-md whitespace-nowrap animate-in fade-in-0 zoom-in-95 duration-150">
                  {hoveredGender === "Laki-laki"
                    ? "Laki-laki: 6 Siswa (60.0%)"
                    : "Perempuan: 4 Siswa (40.0%)"}
                </div>
              )}

              {/* Pie SVG (60% Laki-laki, 40% Perempuan) */}
              <svg viewBox="0 0 100 100" className="h-44 w-44 sm:h-48 sm:w-48">
                {/* 60% Blue Slice (Laki-laki: 144deg clockwise to 0deg) */}
                <path
                  d="M 50 50 L 12.785 77.038 A 46 46 0 1 1 96 50 Z"
                  fill="#2573f5"
                  stroke="#ffffff"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                  className="cursor-pointer transition-opacity duration-200 hover:opacity-90"
                  onMouseEnter={() => setHoveredGender("Laki-laki")}
                  onMouseLeave={() => setHoveredGender(null)}
                />
                {/* 40% Pink Slice (Perempuan: 0deg clockwise to 144deg) */}
                <path
                  d="M 50 50 L 96 50 A 46 46 0 0 1 12.785 77.038 Z"
                  fill="#e63087"
                  stroke="#ffffff"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                  className="cursor-pointer transition-opacity duration-200 hover:opacity-90"
                  onMouseEnter={() => setHoveredGender("Perempuan")}
                  onMouseLeave={() => setHoveredGender(null)}
                />
              </svg>

              {/* Bottom-right label */}
              <span className="absolute bottom-2 right-2 sm:right-4 text-sm font-medium text-[#c94b84]">
                Perempuan (40.0%)
              </span>
            </div>

            {/* Legend */}
            <div className="mt-2 flex items-center gap-6 text-xs font-medium">
              <div className="flex items-center gap-2 text-[#2573f5]">
                <span className="h-3 w-3 bg-[#2573f5]" />
                <span>Laki-laki</span>
              </div>
              <div className="flex items-center gap-2 text-[#c94b84]">
                <span className="h-3 w-3 bg-[#e63087]" />
                <span>Perempuan</span>
              </div>
            </div>
          </div>
        </div>

        {/* Card 2: Tren Pelanggaran (Image 2) */}
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)]">
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Activity size={20} className="text-red-500" />
              <h2 className="text-base font-bold text-slate-800">
                Tren Pelanggaran
              </h2>
            </div>

            <span className="rounded-full bg-red-600 px-3.5 py-1 text-xs font-semibold text-white shadow-xs">
              6 Bulan Terakhir
            </span>
          </div>

          {/* Area / Line Chart with SVG */}
          <div className="relative pt-4 pb-2">
            <div className="flex h-56 w-full">
              {/* Y-axis labels */}
              <div className="flex flex-col justify-between pr-3 text-right text-xs font-medium text-slate-400">
                <span>20</span>
                <span>15</span>
                <span>10</span>
                <span>5</span>
                <span>0</span>
              </div>

              {/* Chart Canvas */}
              <div className="relative flex-1 border-b border-l border-slate-200">
                {/* Grid Lines */}
                <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
                  <div className="border-b border-dashed border-slate-100 w-full" />
                  <div className="border-b border-dashed border-slate-100 w-full" />
                  <div className="border-b border-dashed border-slate-100 w-full" />
                  <div className="border-b border-dashed border-slate-100 w-full" />
                  <div className="w-full" />
                </div>

                <svg
                  className="h-full w-full overflow-visible"
                  viewBox="0 0 500 200"
                  preserveAspectRatio="none"
                >
                  <defs>
                    <linearGradient id="redGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#ef4444" stopOpacity="0.35" />
                      <stop offset="100%" stopColor="#ef4444" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>

                  {/* Area fill under curve */}
                  <path
                    d="M 10 160 Q 90 140, 100 130 T 200 90 T 300 110 T 400 20 T 490 10 L 490 200 L 10 200 Z"
                    fill="url(#redGradient)"
                  />

                  {/* Smooth red line */}
                  <path
                    d="M 10 160 Q 90 140, 100 130 T 200 90 T 300 110 T 400 20 T 490 10"
                    fill="none"
                    stroke="#ef4444"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                  {/* Data Points */}
                  <circle cx="10" cy="160" r="4" fill="#ef4444" />
                  <circle cx="100" cy="130" r="4" fill="#ef4444" />
                  <circle cx="200" cy="90" r="4" fill="#ef4444" />
                  <circle cx="300" cy="110" r="4" fill="#ef4444" />
                  <circle cx="400" cy="20" r="4" fill="#ef4444" />
                  <circle cx="490" cy="10" r="4" fill="#ef4444" />
                </svg>

                {/* X-axis labels */}
                <div className="absolute -bottom-6 left-0 right-0 flex justify-between px-2 text-xs font-medium text-slate-500">
                  {trendData.map((d) => (
                    <span key={d.month}>{d.month}</span>
                  ))}
                </div>
              </div>
            </div>
            <div className="h-4" />
          </div>
        </div>

        {/* Card 3: Jenis Pelanggaran */}
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] animate-in fade-in-0 slide-in-from-bottom-3 duration-500 delay-300 fill-mode-both">
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-100 text-amber-600">
                <Target size={15} />
              </div>
              <h2 className="text-base font-bold text-slate-800">
                Jenis Pelanggaran
              </h2>
            </div>

            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
              Top 5
            </span>
          </div>

          <div className="space-y-2.5">
            {violationTypes.map((item) => (
              <div
                key={item.name}
                className="-mx-2 flex items-center justify-between gap-4 rounded-xl px-2 py-1.5 transition-colors duration-150 hover:bg-slate-50"
              >
                <div className="flex items-center gap-3">
                  <span className={`h-2.5 w-2.5 shrink-0 rounded-full ${item.dotColor}`} />
                  <span className="text-sm font-medium text-slate-700">
                    {item.name}
                  </span>
                </div>

                <div className="flex items-center gap-4">
                  <div className="h-2 w-16 rounded-full bg-slate-200" />
                  <span className="w-6 text-right text-sm font-semibold text-slate-800">
                    {item.count}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4">
            <span className="text-xs font-medium text-slate-500">
              Total pelanggaran
            </span>
            <span className="text-sm font-semibold text-slate-800">69</span>
          </div>
        </div>

        {/* Card 4 & 5: Tingkat Pelanggaran & Pelanggaran Terbanyak */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Left: Tingkat Pelanggaran */}
          <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)]">
            <div className="mb-6 flex items-center gap-2">
              <Shield size={18} className="text-purple-500" />
              <h2 className="text-base font-bold text-slate-800">
                Tingkat Pelanggaran
              </h2>
            </div>

            <div className="space-y-4">
              {violationLevels.map((level) => (
                <div
                  key={level.label}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <span className={`h-2.5 w-2.5 rounded-full ${level.dotColor}`} />
                    <span className="text-sm font-medium text-slate-700">
                      {level.label}
                    </span>
                  </div>
                  <span className="rounded-md bg-slate-50 px-2.5 py-1 text-xs font-semibold text-slate-700">
                    {level.count}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Pelanggaran Terbanyak */}
          <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)]">
            <div className="mb-6 flex items-center gap-2">
              <Award size={18} className="text-rose-500" />
              <h2 className="text-base font-bold text-slate-800">
                Pelanggaran Terbanyak
              </h2>
            </div>

            <div className="space-y-3.5">
              {topViolationClasses.map((cls) => (
                <div
                  key={cls.name}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-rose-100 text-xs font-bold text-rose-600">
                      {cls.rank}
                    </span>
                    <span className="text-sm font-medium text-slate-700">
                      {cls.name}
                    </span>
                  </div>
                  <span className="min-w-[30px] rounded-full bg-red-600 px-2.5 py-0.5 text-center text-xs font-bold text-white">
                    {cls.count}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Card 6: Distribusi Tahun Kelahiran Siswa */}
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)]">
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Calendar size={18} className="text-indigo-500" />
              <h2 className="text-base font-bold text-slate-800">
                Distribusi Tahun Kelahiran Siswa
              </h2>
            </div>

            <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-600">
              3 Tahun
            </span>
          </div>

          {/* Bar Chart */}
          <div className="relative pt-4 pb-2">
            <div className="flex h-56 w-full">
              {/* Y-axis labels */}
              <div className="flex flex-col justify-between pr-3 text-right text-xs font-medium text-slate-400">
                <span>8</span>
                <span>6</span>
                <span>4</span>
                <span>2</span>
                <span>0</span>
              </div>

              {/* Grid & Bars Container */}
              <div className="relative flex flex-1 items-end border-b border-l border-slate-300">
                {/* Grid Lines */}
                <div className="pointer-events-none absolute inset-0 flex flex-col justify-between">
                  <div className="w-full border-b border-dashed border-slate-100" />
                  <div className="w-full border-b border-dashed border-slate-100" />
                  <div className="w-full border-b border-dashed border-slate-100" />
                  <div className="w-full border-b border-dashed border-slate-100" />
                  <div className="w-full" />
                </div>

                {/* Columns */}
                {birthYearData.map((item, idx) => {
                  const isHovered = hoveredBirthYear === item.year;
                  const heightPercent = (item.count / 8) * 100;
                  return (
                    <div
                      key={item.year}
                      onMouseEnter={() => setHoveredBirthYear(item.year)}
                      onMouseLeave={() => setHoveredBirthYear(null)}
                      className={`relative z-10 flex h-full flex-1 cursor-pointer items-end justify-center px-3 sm:px-6 transition-colors ${
                        isHovered ? "bg-slate-300/75" : "bg-transparent"
                      }`}
                    >
                      {/* Floating Tooltip */}
                      {isHovered && (
                        <div
                          className={`pointer-events-none absolute top-1/2 z-20 -translate-y-1/2 rounded-xl border border-slate-100 bg-white px-4 py-3 shadow-lg whitespace-nowrap ${
                            idx === birthYearData.length - 1
                              ? "right-full mr-2"
                              : "left-1/2 -translate-x-1/2"
                          }`}
                        >
                          <p className="text-sm font-semibold text-slate-800">
                            {item.year}
                          </p>
                          <p className="mt-0.5 text-xs font-medium text-blue-500">
                            Tahun {item.year} : {item.count} siswa
                          </p>
                        </div>
                      )}

                      {/* Bar */}
                      <div
                        className="w-full rounded-t-sm bg-[#2573f5] transition-all duration-300"
                        style={{ height: `${heightPercent}%` }}
                      />

                      {/* X-axis label */}
                      <span className="absolute -bottom-6 text-xs font-medium text-slate-500">
                        {item.year}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="h-6" />
          </div>

          {/* Detail Distribusi Footer */}
          <div className="mt-4 border-t border-slate-100 pt-4">
            <p className="mb-3 text-xs font-semibold text-slate-600">
              Detail Distribusi
            </p>
            <div className="flex flex-wrap items-center gap-x-8 gap-y-2 text-xs">
              {birthYearData.map((item) => (
                <div key={item.year} className="flex items-center gap-2.5">
                  <span className={`h-2.5 w-2.5 rounded-full ${item.dotColor}`} />
                  <span className="font-medium text-slate-600">
                    Tahun {item.year}
                  </span>
                  <span className="font-bold text-slate-800">{item.count}</span>
                  <span className="text-slate-400">{item.percent}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
