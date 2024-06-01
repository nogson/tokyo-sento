import React, { useState } from "react";
import Image from "next/image";
import NewsIcon from "@/assets/images/top/news.webp";
import styles from "@/components/News/News.module.scss";

const News: React.FC = () => {
  const [opened, setOpened] = useState<boolean>(false);

  return (
    <>
      <div
        className={`${styles.newsIcon} ${opened ? "opened" : "closed"}`}
        onClick={() => setOpened(!opened)}
      >
        <Image
          src={NewsIcon}
          alt="Search"
          width={100}
          height={100}
          sizes="100vw"
          priority
        />
      </div>

      <section className={`${styles.newsList} ${opened ? "opened" : "closed"}`}>
        <h2 className={styles.newsListTitle}>News</h2>
        <div className={styles.newsListScrollArea}>
          <dl>
            <dt>2024/05/24</dt>
            <dd>あああああああああああ</dd>
          </dl>
          <dl>
            <dt>2024/05/24</dt>
            <dd>あああああああああああ</dd>
          </dl>
        </div>
      </section>
    </>
  );
};

export default News;
