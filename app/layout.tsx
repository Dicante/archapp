import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const geistInter = Inter({
  variable: "--font-Inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Easy Web App",
  description: "This is a simple web app for my cloud computing course.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistInter.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
