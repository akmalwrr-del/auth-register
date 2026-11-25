"use client";

import React, { useState, useEffect } from "react";
import { Search, Plus, Edit2, Trash2, X } from "lucide-react";

export interface Student {
  id: number;
  nama: string;
  nis: string;
  kelas: string;
  jenisKelamin: "Laki-laki" | "Perempuan";
  tanggalLahir: string;
}

const INITIAL_STUDENTS: Student[] = [
  {
    id: 1,
    nama: "Aulia Rahma",
    nis: "20231102",
    kelas: "XI RPL 1",
    jenisKelamin: "Perempuan",
    tanggalLahir: "2006-09-03",
  },
  {
    id: 2,
    nama: "Rizky Maulana",
    nis: "20231103",
    kelas: "XI RPL 2",
    jenisKelamin: "Laki-laki",
    tanggalLahir: "2005-12-01",
  },
  {
    id: 3,
    nama: "Iqbal Maulana",
    nis: "20231110",
    kelas: "XI RPL 1",
    jenisKelamin: "Laki-laki",
    tanggalLahir: "2006-06-30",
  },
  {
    id: 4,
    nama: "Dimas Aditya",
    nis: "20231104",
    kelas: "XI RPL 1",
    jenisKelamin: "Laki-laki",
    tanggalLahir: "2006-03-15",
  },
  {
    id: 5,
    nama: "Siti Nurhaliza",
    nis: "20231105",
    kelas: "XI RPL 1",
    jenisKelamin: "Perempuan",
    tanggalLahir: "2006-07-22",
  },
  {
    id: 6,
    nama: "Bagas Pratama",
    nis: "20231106",
    kelas: "XI RPL 2",
    jenisKelamin: "Laki-laki",
    tanggalLahir: "2006-01-14",
  },
  {
    id: 7,
    nama: "Farah Diba",
    nis: "20231107",
    kelas: "X RPL 1",
    jenisKelamin: "Perempuan",
    tanggalLahir: "2007-04-18",
  },
  {
    id: 8,
    nama: "Kevin Sanjaya",
    nis: "20231108",
    kelas: "X RPL 1",
    jenisKelamin: "Laki-laki",
    tanggalLahir: "2007-08-09",
  },
  {
    id: 9,
    nama: "Nabila Putri",
    nis: "20231109",
    kelas: "X RPL 2",
    jenisKelamin: "Perempuan",
    tanggalLahir: "2007-11-25",
  },
  {
    id: 10,
    nama: "Fajar Ramadhan",
    nis: "20231111",
    kelas: "X RPL 2",
    jenisKelamin: "Laki-laki",
    tanggalLahir: "2007-02-10",
  },
];

export default function SiswaPage() {
  const [students, setStudents] = useState<Student[]>(INITIAL_STUDENTS);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedClass, setSelectedClass] = useState("Semua Kelas");
  const [pageSize, setPageSize] = useState(10);

  // Modal States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");
  const [editingStudentId, setEditingStudentId] = useState<number | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    nama: "",
    nis: "",
    kelas: "XI RPL 1",
    jenisKelamin: "Laki-laki" as "Laki-laki" | "Perempuan",
    tanggalLahir: "",
  });

  // Load from localStorage if present
  useEffect(() => {
    try {
      const saved = localStorage.getItem("schoolapp_students");
      if (saved) {
        setStudents(JSON.parse(saved));
      }
    } catch {
      // ignore
    }
  }, []);

  const saveStudents = (newStudents: Student[]) => {
    setStudents(newStudents);
    try {
      localStorage.setItem("schoolapp_students", JSON.stringify(newStudents));
    } catch {
      // ignore
    }
  };

  const openAddModal = () => {
    setModalMode("add");
    setEditingStudentId(null);
    setFormData({
      nama: "",
      nis: "",
      kelas: "XI RPL 1",
      jenisKelamin: "Laki-laki",
      tanggalLahir: "",
    });
    setIsModalOpen(true);
  };

  const openEditModal = (student: Student) => {
    setModalMode("edit");
    setEditingStudentId(student.id);
    setFormData({
      nama: student.nama,
      nis: student.nis,
      kelas: student.kelas,
      jenisKelamin: student.jenisKelamin,
      tanggalLahir: student.tanggalLahir,
    });
    setIsModalOpen(true);
  };

  const handleDelete = (id: number) => {
    if (confirm("Apakah Anda yakin ingin menghapus data siswa ini?")) {
      const updated = students.filter((s) => s.id !== id);
      saveStudents(updated);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nama || !formData.nis) {
      alert("Nama dan NIS wajib diisi!");
      return;
    }

    if (modalMode === "add") {
      const newStudent: Student = {
        id: Date.now(),
        ...formData,
      };
      saveStudents([...students, newStudent]);
    } else if (modalMode === "edit" && editingStudentId !== null) {
      const updated = students.map((s) =>
        s.id === editingStudentId ? { ...s, ...formData } : s
      );
      saveStudents(updated);
    }

    setIsModalOpen(false);
  };

  // Filter students
  const filteredStudents = students.filter((student) => {
    const matchQuery =
      student.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.nis.toLowerCase().includes(searchQuery.toLowerCase());
    const matchClass =
      selectedClass === "Semua Kelas" || student.kelas === selectedClass;
    return matchQuery && matchClass;
  });

  const displayedStudents = filteredStudents.slice(0, pageSize);

  return (
    <div className="flex flex-col gap-6">
      {/* Page Title */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-800">
          Siswa
        </h1>
      </div>

      {/* Main Table Card */}
      <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)]">
        {/* Toolbar Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          {/* Search & Filters */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Search Input */}
            <div className="relative">
              <Search
                size={17}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                type="text"
                placeholder="Cari..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-10 w-60 rounded-xl border border-slate-200 bg-white pl-9 pr-3 text-sm text-slate-800 placeholder-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
            </div>

            {/* Filter by Kelas */}
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <span className="font-medium whitespace-nowrap">Filter by Kelas:</span>
              <select
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                className="h-10 rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-700 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              >
                <option value="Semua Kelas">Semua Kelas</option>
                <option value="XI RPL 1">XI RPL 1</option>
                <option value="XI RPL 2">XI RPL 2</option>
                <option value="X RPL 1">X RPL 1</option>
                <option value="X RPL 2">X RPL 2</option>
              </select>
            </div>

            {/* Page Size */}
            <div>
              <select
                value={pageSize}
                onChange={(e) => setPageSize(Number(e.target.value))}
                className="h-10 rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-700 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              >
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
              </select>
            </div>
          </div>

          {/* Action Button: Tambah Siswa */}
          <button
            onClick={openAddModal}
            className="flex h-10 items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <span>Tambah Siswa</span>
          </button>
        </div>

        {/* Table */}
        <div className="mt-6 overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead>
              <tr className="border-b border-slate-100 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                <th className="py-4 px-4 text-center w-12">NO</th>
                <th className="py-4 px-4">NAMA</th>
                <th className="py-4 px-4">NIS</th>
                <th className="py-4 px-4">KELAS</th>
                <th className="py-4 px-4">JENIS KELAMIN</th>
                <th className="py-4 px-4">TANGGAL LAHIR</th>
                <th className="py-4 px-4 text-center">AKSI</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {displayedStudents.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-400">
                    Tidak ada data siswa yang cocok
                  </td>
                </tr>
              ) : (
                displayedStudents.map((student, index) => (
                  <tr
                    key={student.id}
                    className="transition hover:bg-slate-50/60"
                  >
                    <td className="py-4 px-4 text-center font-medium text-slate-700">
                      {index + 1}
                    </td>
                    <td className="py-4 px-4 font-semibold text-slate-800">
                      {student.nama}
                    </td>
                    <td className="py-4 px-4 text-slate-600">{student.nis}</td>
                    <td className="py-4 px-4 text-slate-600">{student.kelas}</td>
                    <td className="py-4 px-4 text-slate-600">
                      {student.jenisKelamin}
                    </td>
                    <td className="py-4 px-4 text-slate-600">
                      {student.tanggalLahir}
                    </td>
                    <td className="py-4 px-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        {/* Edit Button */}
                        <button
                          onClick={() => openEditModal(student)}
                          className="rounded-lg bg-amber-400 px-3.5 py-1.5 text-xs font-semibold text-white shadow-xs transition hover:bg-amber-500 focus:outline-none"
                        >
                          Edit
                        </button>
                        {/* Hapus Button */}
                        <button
                          onClick={() => handleDelete(student.id)}
                          className="rounded-lg bg-red-500 px-3.5 py-1.5 text-xs font-semibold text-white shadow-xs transition hover:bg-red-600 focus:outline-none"
                        >
                          Hapus
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Tambah / Edit Siswa */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl animate-in fade-in-50 zoom-in-95">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-lg font-bold text-slate-800">
                {modalMode === "add" ? "Tambah Siswa Baru" : "Edit Data Siswa"}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600">
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Aulia Rahma"
                  value={formData.nama}
                  onChange={(e) =>
                    setFormData({ ...formData, nama: e.target.value })
                  }
                  className="mt-1 h-10 w-full rounded-xl border border-slate-200 px-3 text-sm text-slate-800 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600">
                  NIS (Nomor Induk Siswa)
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 20231102"
                  value={formData.nis}
                  onChange={(e) =>
                    setFormData({ ...formData, nis: e.target.value })
                  }
                  className="mt-1 h-10 w-full rounded-xl border border-slate-200 px-3 text-sm text-slate-800 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600">
                  Kelas
                </label>
                <select
                  value={formData.kelas}
                  onChange={(e) =>
                    setFormData({ ...formData, kelas: e.target.value })
                  }
                  className="mt-1 h-10 w-full rounded-xl border border-slate-200 px-3 text-sm text-slate-800 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                >
                  <option value="XI RPL 1">XI RPL 1</option>
                  <option value="XI RPL 2">XI RPL 2</option>
                  <option value="X RPL 1">X RPL 1</option>
                  <option value="X RPL 2">X RPL 2</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600">
                  Jenis Kelamin
                </label>
                <div className="mt-2 flex gap-4">
                  <label className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
                    <input
                      type="radio"
                      name="jenisKelamin"
                      value="Laki-laki"
                      checked={formData.jenisKelamin === "Laki-laki"}
                      onChange={() =>
                        setFormData({ ...formData, jenisKelamin: "Laki-laki" })
                      }
                      className="text-blue-600 focus:ring-blue-500"
                    />
                    <span>Laki-laki</span>
                  </label>
                  <label className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
                    <input
                      type="radio"
                      name="jenisKelamin"
                      value="Perempuan"
                      checked={formData.jenisKelamin === "Perempuan"}
                      onChange={() =>
                        setFormData({ ...formData, jenisKelamin: "Perempuan" })
                      }
                      className="text-blue-600 focus:ring-blue-500"
                    />
                    <span>Perempuan</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600">
                  Tanggal Lahir
                </label>
                <input
                  type="date"
                  required
                  value={formData.tanggalLahir}
                  onChange={(e) =>
                    setFormData({ ...formData, tanggalLahir: e.target.value })
                  }
                  className="mt-1 h-10 w-full rounded-xl border border-slate-200 px-3 text-sm text-slate-800 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              </div>

              <div className="mt-4 flex justify-end gap-3 border-t border-slate-100 pt-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-blue-600 px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700"
                >
                  {modalMode === "add" ? "Simpan" : "Perbarui"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
