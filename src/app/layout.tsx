import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Focus Streak",
  description: "Track your focus sessions and build productive streaks",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-background antialiased">
        {children}
      </body>
    </html>
  );
}
