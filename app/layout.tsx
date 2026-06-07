import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/components/LanguageProvider";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "PataDaktari - Health Guidance for Nairobi",
  description:
    "Get guideline-based health triage guidance in English or Swahili. For Nairobi residents.",
  keywords: [
    "health",
    "triage",
    "Nairobi",
    "Kenya",
    "medical",
    "symptoms",
    "swahili",
  ],
  robots: "index, follow",
  openGraph: {
    title: "PataDaktari",
    description: "Health guidance for every Nairobi resident",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${dmSans.variable} h-full antialiased`}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="min-h-screen flex flex-col bg-gray-50">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
