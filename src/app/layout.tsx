import type { Metadata } from "next";
import "./globals.css";
import AppProvider from "@/provider/app-provider";

export const metadata: Metadata = {
  title: "Recipe Bloom",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-[#ebf5fb]  dark:bg-black">
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
