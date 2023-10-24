import "./globals.css";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { AlertProvider } from "@/context/AlertContext";

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
        <AlertProvider>{children}</AlertProvider>
      </body>
    </html>
  );
}
