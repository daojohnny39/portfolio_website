import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Night City Archive — Photography",
  description: "Cyberpunk 2077 in-game photography by Johnny Dao",
};

export default function PhotographyLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#fafafa]">
      {children}
    </div>
  );
}
