import { Cormorant_Garamond, Karla } from "next/font/google";

export const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-cormorant",
});

export const karla = Karla({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  variable: "--font-karla",
});
