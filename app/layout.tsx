import type { Metadata, Viewport } from "next";
import { Inter, Manrope, Marck_Script, Playfair_Display, Rozha_One } from "next/font/google";
import { SmoothScroll } from "@/components/SmoothScroll";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const marck = Marck_Script({
  variable: "--font-marck",
  subsets: ["latin"],
  weight: "400",
});

const rozha = Rozha_One({
  variable: "--font-rozha",
  subsets: ["latin"],
  weight: "400",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["500"],
});

export const metadata: Metadata = {
  title: "Anwin & Bia | Wedding Invitation",
  description: "Save the date — January 4th, 2027. Anwin & Bia wedding invitation and RSVP.",
  appleWebApp: { capable: true, title: "Anwin & Bia", statusBarStyle: "default" },
  manifest: "/manifest.webmanifest",
};

export const viewport: Viewport = {
  themeColor: "#fffefa",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${manrope.variable} ${marck.variable} ${rozha.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-cream text-forest">
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
