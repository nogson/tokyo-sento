import type { Metadata } from "next";
import "@/common/scss/reset.scss";
import "@/common/scss/globals.scss";
import "@/common/scss/common.scss";
import "@/common/scss/map.scss";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import "@mantine/carousel/styles.css";

import { baseFont } from "src/features/font";
import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { theme } from "@/features/theme";
import Header from "@/components/Header/Header";
import { Providers } from "@/lib/providers";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
    <html lang="ja">
      <head></head>
      <body className={baseFont.className}>
        <Providers>
          <MantineProvider theme={theme}>
            <Notifications position="top-center" />
            <Header />
            {children}
          </MantineProvider>
        </Providers>
      </body>
    </html>
  );
}
