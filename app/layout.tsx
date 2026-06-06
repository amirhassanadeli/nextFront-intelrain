// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

export const metadata: Metadata = {
  title: "IntelRain - AI Intelligence Company",
  description:
    "IntelRain is an AI company providing machine learning, automation, and data intelligence solutions.",
  keywords: ["AI", "Machine Learning", "Automation", "IntelRain"],
  authors: [{ name: "IntelRain" }],
  openGraph: {
    title: "IntelRain",
    description: "AI Intelligence Company",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" dir="rtl">
      <body className="bg-black text-white antialiased">
        <Navbar />

        <main className="pt-20 min-h-screen">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}