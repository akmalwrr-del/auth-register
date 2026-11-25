import type { Metadata } from "next";
import "./globals.css";
import LayoutShell from "@/components/layout/layout-shell";

export const metadata: Metadata = {
  title: "SchoolApp - SMK Telekomunikasi Tunas Harapan",
  description: "Aplikasi manajemen siswa dan dashboard sekolah",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans antialiased">
        <LayoutShell>{children}</LayoutShell>
      </body>
    </html>
  );
}
