import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ttymayor.com"),
  title: {
    default: "tantuyu 的技術站",
    template: "%s | tantuyu 的技術站",
  },
  description: "分享技術知識、記錄學習過程、探索 Web 開發的無限可能",
  keywords: ["部落格", "Web 開發", "tantuyu", "ttymayor", "彈塗魚", "tty"],
  authors: [{ name: "tantuyu" }],
  creator: "tantuyu",
  openGraph: {
    title: "tantuyu 的技術站",
    description: "分享技術知識、記錄學習過程、探索 Web 開發的無限可能",
    url: "https://tantuyu.com",
    siteName: "tantuyu 的技術站",
    images: [
      {
        url: "https://tantuyu.com/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "tantuyu 的技術站",
      },
    ],
    locale: "zh-TW",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "tantuyu 的技術站",
    description: "分享技術知識、記錄學習過程、探索 Web 開發的無限可能",
    images: ["https://tantuyu.com/twitter-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-TW" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <div className="mx-[3%] flex-1 px-4 py-12 md:mx-[10%] lg:mx-[15%]">
            {children}
          </div>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
