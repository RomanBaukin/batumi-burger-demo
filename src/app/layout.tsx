import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Демо бургерной · Подготовка",
  description: "Демонстрационный проект бургерной в Батуми для портфолио.",
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ru"><body>{children}</body></html>;
}
