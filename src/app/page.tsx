import styles from "@/page.module.scss";
import type { Metadata } from "next";
import HomeWrapper from "@/components/HomeWrapper";

export const metadata: Metadata = {
  title: "SENTO FUN TOKYO | 銭湯好きの為の銭湯ファンサイト",
  description: "銭湯好きの為の銭湯ファンサイトです。",
};

export default async function Home() {
  return (
    <section>
      <HomeWrapper />
    </section>
  );
}
