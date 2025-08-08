import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Head from "next/head";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Learn DevOps Now | Free DevOps Tutorials, Tools & Labs",
  description:
    "Learn DevOps Now with free tutorials, CI/CD guides, DevOps tools, and practice labs for beginners and professionals.",
  keywords: [
    "learn devops",
    "devops tutorials",
    "ci/cd",
    "devops tools",
    "practice labs",
    "cloud devops",
  ],
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/devops.png",
  },
  openGraph: {
    title: "Learn DevOps Now | Free DevOps Tutorials, Tools & Labs",
    description:
      "Learn DevOps Now with free tutorials, CI/CD guides, DevOps tools, and practice labs for beginners and professionals.",
    url: "https://www.learndevopsnow.it.com",
    siteName: "Learn DevOps Now",
    images: [
      {
        url: "https://www.learndevopsnow.it.com/images/mylogo.jpg",
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
    title: "Learn DevOps Now | Free DevOps Tutorials, Tools & Labs",
    description:
      "Learn DevOps Now with free tutorials, CI/CD guides, DevOps tools, and practice labs for beginners and professionals.",
    images: ["https://www.learndevopsnow.it.com/images/mylogo.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
