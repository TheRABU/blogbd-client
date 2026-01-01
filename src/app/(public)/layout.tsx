import Navbar from "@/src/components/shared/Navbar/Navbar";
import React from "react";

export default function PublicLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div>
      <Navbar />
      <main className="min-h-dvh">{children}</main>
    </div>
  );
}
