import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Learn DevOps Now",
  description:
    "start your devops journey here",
  icons: {
    icon: "/devops.png",
  },
  openGraph: {
    title: "Learn DevOps Now - Thaung Htike Oo",
    description:
      "start your devops journey here",
    url: "https://www.learndevopsnow.it.com",
    siteName: "Learn DevOps Now - Thaung Htike Oo",
    images: [
      {
        url: "https://www.learndevopsnow.it.com/images/mylogo.png",
        width: 1200,
        height: 630,
        alt: "Learn DevOps Now - Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Learn DevOps Now - Thaung Htike Oo",
    description:
      "start your devops journey here",
    images: ["https://www.learndevopsnow.it.com/images/mylogo.png"],
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
