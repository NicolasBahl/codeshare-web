import React from "react";
import "@/styles/globals.css";
import { Noto_Sans } from "next/font/google";
import { AuthProvider } from "@/contexts/AuthProvider";

const notoSans = Noto_Sans({
  weight: ['400', '700'],
  subsets: ["latin"],
});

export const metadata = {
  title: "CodeShare",
  description: "Share code and collaborate with others",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={notoSans.className}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
