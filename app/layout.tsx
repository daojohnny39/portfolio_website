import type { Metadata } from "next";
import { Archivo, Space_Grotesk } from "next/font/google";
import { CustomCursor } from "@/components/core/CustomCursor";
import { FoldTransitionProvider } from "@/components/core/Providers";
import "./globals.css";

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-archivo",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-space-grotesk",
});

export const metadata: Metadata = {
  title: "Johnny Dao — Portfolio",
  description: "Nhat (Johnny) Dao — CS @ UMKC, Software Developer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${archivo.variable} ${spaceGrotesk.variable}`}>
      <body className="font-[family-name:var(--font-space-grotesk)] antialiased">
        <FoldTransitionProvider>{children}</FoldTransitionProvider>
        <CustomCursor />
      </body>
    </html>
  );
}
