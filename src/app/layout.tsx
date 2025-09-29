import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import { Navigation } from "@/components/ui/navigation";
import { AuthProvider } from "@/lib/hooks/useAuth";
import "./globals.css";

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair-display",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Revura | Private Auto Auctions",
  description: "Exclusive invitation-only auctions for rare and limited supercars. By invitation only.",
  keywords: ["luxury cars", "supercars", "auctions", "private", "exclusive", "Malaysia"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${playfairDisplay.variable} ${inter.variable} antialiased bg-background text-foreground`}
      >
        <AuthProvider>
          <Navigation />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
