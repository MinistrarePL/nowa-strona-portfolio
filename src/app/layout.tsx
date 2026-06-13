import type { Metadata } from "next";
import { Abyssinica_SIL, Manrope } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const abyssinica = Abyssinica_SIL({
  variable: "--font-abyssinica",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Portfolio personalne",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pl"
      className={`${manrope.variable} ${abyssinica.variable} dark h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#050505] font-sans text-foreground">
        {children}
      </body>
    </html>
  );
}
