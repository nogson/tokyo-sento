import Image from "next/image";
import styles from "@/page.module.scss";
import Header from "@/components/Header/Header";
import MapWrapper from "@/components/Maps/MapWrapper";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SENTO FUN TOKYO | 銭湯好きの為の銭湯ファンサイト",
  description: "銭湯好きの為の銭湯ファンサイトです。",
};

export default function Home() {
  return (
    <main>
      <Header />
      <MapWrapper />
    </main>
  );
}
