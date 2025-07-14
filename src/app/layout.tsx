import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import Script from "next/script";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Entertainment Explorer | Discover Your Next Favorite Movie or Show",
  description:
    "Entertainment Explorer helps you effortlessly discover, track, and explore trending movies and TV shows tailored to your taste.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${outfit.variable} antialiased`}>
        <Providers>{children}</Providers>
        <Script src="https://www.youtube.com/iframe_api"></Script>
      </body>
    </html>
  );
}
