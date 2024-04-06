import React from "react";
import styles from "@/components/Header/Header.module.scss";
import Image from "next/image";
import Logo from "@/common/images/logo.svg";
import IconMyPage from "@/common/images/icon_mypage.svg";
import Link from "next/link";

const Header = () => {
  return (
    <header className={styles.header}>
      <Image src={Logo} alt="Logo" priority />
      <nav className={styles.nav}>
        <ul>
          <li>
            <Link href="/news">News</Link>
          </li>
          <li>
            <Link href="/news">
              <Image src={IconMyPage} alt="Next.js Logo" priority />
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
