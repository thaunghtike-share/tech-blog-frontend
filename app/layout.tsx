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
  title: "Learn DevOps Now - Hands-on Learning",
  description:
    "Start your DevOps journey with real-world labs, CI/CD, cloud, and more.",
  icons: {
    icon: "/devops.png",
  },
  openGraph: {
    title: "Learn DevOps Now",
    description:
      "start your devops journey here",
    url: "https://www.learndevopsnow.it.com",
    siteName: "Learn DevOps Now",
    images: [
      {
        url: "https://www.learndevopsnow.it.com/images/preview.png",
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
    title: "Learn DevOps Now - Hands-on Learning",
    description:
      "Start your DevOps journey with real-world labs, CI/CD, cloud, and more.",
    images: ["https://www.learndevopsnow.it.com/images/preview.png"],
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
