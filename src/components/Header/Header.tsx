"use client";
import React, { useState } from "react";
import styles from "@/components/Header/Header.module.scss";
import Image from "next/image";
import Logo from "@/common/images/logo.svg";
import Link from "next/link";
import Account from "./Account";
import { usePathname, useRouter } from "next/navigation";

const Header = () => {
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const pathname = usePathname();
  const { push } = useRouter();

  return (
    <>
      <header
        className={styles.header}
        onMouseLeave={() => setIsTooltipOpen(false)}
      >
        <Link href="/">
          <Image src={Logo} alt="Logo" priority onClick={() => push("/")} />
        </Link>
        {pathname !== "/login" && (
          <nav className={styles.nav}>
            <ul>
              <li>
                <Link href="/news">News</Link>
              </li>
              <li>
                <Link href="/about">About</Link>
              </li>
              <li>
                <Account
                  isTooltipOpen={isTooltipOpen}
                  setIsTooltipOpen={setIsTooltipOpen}
                />
              </li>
            </ul>
          </nav>
        )}
      </header>
    </>
  );
};

export default Header;
