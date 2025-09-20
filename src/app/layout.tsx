import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Output Mystery",
  description: "Solve coding mysteries and master programming skills.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} h-full bg-gray-900 text-white antialiased`}>
        <div className="min-h-screen bg-gray-900">
          {children}
        </div>
      </body>
    </html>
  );
}
