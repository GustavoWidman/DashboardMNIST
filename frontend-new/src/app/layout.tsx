import "./globals.css";

import { BACKEND } from "../constants";
import { Bot } from "lucide-react";
import { Inter } from "next/font/google";
import type { Metadata } from "next";
import SiteHeader from '../components/ui/navbar/index';
import { ThemeProvider } from "../components/theme-provider";
import { Toaster } from "../components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dashboard MNIST",
  description: "Classificador de imagens",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  console.log(BACKEND)

  return (
    <html lang="en">
      {/* <link rel="icon" href="/favicon.ico" sizes="any" /> */}
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SiteHeader
            segments={[
              { node: (
                <>
                  <Bot className="h-6 w-6" />
                  <span className="sr-only">Dashboard MNIST</span>
                </>
              ), href: '/classify' },
              { node: 'Classificar', href: '/classify' },
              { node: 'Treinar', href: '/train' },
              // { node: 'Sobre mim', href: '/about'},
            ]}
            auto_selected={true}
          />
          {children}
          <Toaster richColors />
        </ThemeProvider>
      </body>
    </html>
  );
}
