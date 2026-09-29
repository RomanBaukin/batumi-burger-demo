import type { Metadata } from "next";
import "./globals.css";
import { Oswald, Manrope } from "next/font/google";

const display = Oswald({
  subsets: ["latin", "cyrillic"],
  variable: "--font-display",
  display: "swap",
});
const body = Manrope({
  subsets: ["latin", "cyrillic"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ЖАР — бургеры у Чёрного моря · Демо",
  description:
    "Город у моря. Бургеры с огнём. Демо бургерной ЖАР в Батуми: выбирай любимое и собирай свой заказ.",
  metadataBase: new URL("https://batumi-burger-demo.vercel.app"),
  openGraph: {
    title: "ЖАР — бургеры у Чёрного моря",
    description: "Демонстрационный лендинг бургерной в Батуми.",
    locale: "ru_RU",
    type: "website",
    images: [
      {
        url: "/images/hero.webp",
        width: 1536,
        height: 1024,
        alt: "Фирменный бургер ЖАР",
      },
    ],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru" className={`${display.variable} ${body.variable}`}>
      <body>{children}</body>
    </html>
  );
}
