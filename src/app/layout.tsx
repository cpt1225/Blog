import type { Metadata } from "next";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import { HeroUIProvider } from "@heroui/system";
import { Roboto } from "@/lib/fonts";


export const metadata: Metadata = {
  title: "墨语笔迹",
  description: "悟已往之不谏,知来者之可追",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={Roboto.className}
      >
        <SessionProvider>
          <HeroUIProvider>
            {children}
          </HeroUIProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
