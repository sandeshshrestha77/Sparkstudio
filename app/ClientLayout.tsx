'use client';
import React from "react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { usePathname } from 'next/navigation';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith('/admin');
  return (
    <>
      {!isAdmin && (
        <>
          <Navigation />
          <main className="flex-1">{children}</main>
          <Footer />
        </>
      )}
      {isAdmin && (
        <main className="flex-1">{children}</main>
      )}
    </>
  );
}
