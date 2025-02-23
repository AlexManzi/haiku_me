import type { Metadata } from "next";
import { Sriracha } from "next/font/google";
import "./globals.css";

const sriracha = Sriracha({
  variable: "--font-Sriracha",
  subsets: ["latin"],
  weight: ["400"]
});

export const metadata: Metadata = {
  title: "haiku_Me",
  description: "Haikus for every moment",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={sriracha.className}>
        {children}
      </body>
    </html>
  );
}
