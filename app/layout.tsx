import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Road To Freedom Group | RTF",
  description:
    "Road To Freedom Group (RTF), an open AA home group meeting daily at the Log Cabin, 901 South Park St, Carrollton, GA.",
  keywords: [
    "AA meetings Carrollton GA",
    "Alcoholics Anonymous Carrollton GA",
    "open AA meeting",
    "Road To Freedom Group",
    "RTF",
    "Log Cabin Carrollton",
  ],
  robots: { index: true, follow: true },
  openGraph: {
    title: "Road To Freedom Group | RTF",
    description:
      "An open AA home group meeting daily at the Log Cabin in Carrollton, GA.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} h-full`}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className="min-h-full flex flex-col antialiased">
        <Navigation />
        <main className="flex-1 pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
