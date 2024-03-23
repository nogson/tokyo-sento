import Image from "next/image";
import styles from "@/page.module.scss";
import Header from "@/components/Header/Header";
import Search from "@/components/Search/Search";
import MapWrapper from "@/components/maps/MapWrapper";

export default function Home() {
  return (
    <main>
      <Header />
      <Search />
      <MapWrapper />
    </main>
  );
}
