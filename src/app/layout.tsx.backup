import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";

export const metadata: Metadata = {
  title: "Campero Rating Competition",
  description: "Rate the best camperos in town! 7-day food competition.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-teal-50">
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
