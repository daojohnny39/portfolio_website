import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Photography — Johnny Dao",
  description: "Cyberpunk 2077 virtual photography by Johnny Dao, recognized by CD Projekt Red",
};

export default function PhotographyLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <div className="photo-theme min-h-screen bg-[rgb(var(--bg))] text-[rgb(var(--fg))]">
      {children}
    </div>
  );
}
