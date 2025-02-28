import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Otomatik E-posta Gönderim Sistemi",
  description: "100'den fazla e-posta adresine otomatik gönderim yapın",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <body className={`${inter.variable} bg-gray-100 min-h-screen`}>
        <main className="container mx-auto p-4">{children}</main>
      </body>
    </html>
  );
}
