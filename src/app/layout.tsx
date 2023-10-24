import "./globals.css";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { AlertProvider } from "@/context/AlertContext";
import { Analytics } from "@vercel/analytics/react";

const roboto = Roboto({
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Wordle ES",
  description: "Wordle ES app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <AlertProvider>
          {children}
          <Analytics />
        </AlertProvider>
      </body>
    </html>
  );
}
