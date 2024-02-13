import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/app/components/Navbar";

// const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: "Dream Home",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-full w-full">
        <Navbar/>
        {children}
      </body>
    </html>
  );
}
