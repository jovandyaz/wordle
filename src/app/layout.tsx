import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AlertProvider } from "@/context/AlertContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Palabradeldia",
  description: "Wordle ES app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AlertProvider>{children}</AlertProvider>
      </body>
    </html>
  );
}
