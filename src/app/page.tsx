import styles from "@/page.module.scss";
import MapWrapper from "@/components/Maps/MapWrapper";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SENTO FUN TOKYO | 銭湯好きの為の銭湯ファンサイト",
  description: "銭湯好きの為の銭湯ファンサイトです。",
};

export default async function Home() {
  return (
    <main>
      <MapWrapper />
    </main>
  );
}
