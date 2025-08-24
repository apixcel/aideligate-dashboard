import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AIDeligate Client Dashboard",
  description: "AIDeligate Client Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true} className={`${dmSans.variable} antialiased`}>
        <Toaster position="top-center" richColors />
        {children}
      </body>
    </html>
  );
}
