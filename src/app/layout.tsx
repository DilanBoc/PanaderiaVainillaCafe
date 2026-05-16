import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "Vainilla y Canela | Panadería & Café Artesanal",
  description: "Descubre el sabor auténtico de Melgar. Panes de fermentación lenta, granizados únicos y el aroma dulce que te hace sentir en casa.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      <body className={`${plusJakarta.variable} ${playfair.variable} font-sans antialiased text-stone-900 bg-[#FBFBF9] overflow-x-hidden`}>
        {children}
      </body>
    </html>
  );
}
