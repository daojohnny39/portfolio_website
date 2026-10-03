import type { Metadata } from "next";
import { Archivo, Space_Grotesk } from "next/font/google";
import { FoldTransitionProvider } from "@/components/core/Providers";
import { ScrollReset } from "@/components/core/ScrollReset";
import "./globals.css";

// Archivo and Space Grotesk belong to the photography page. The home page
// loads its own fonts in components/home/fonts.ts.
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
  title: "Johnny Dao",
  description:
    "Johnny Dao studies computer science at UMKC, researches AI-agent security in the ASSET lab, and builds desktop and iOS apps.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${archivo.variable} ${spaceGrotesk.variable}`}>
      <body className="font-[family-name:var(--font-space-grotesk)] antialiased">
        <ScrollReset />
        <FoldTransitionProvider>{children}</FoldTransitionProvider>
      </body>
    </html>
  );
}
