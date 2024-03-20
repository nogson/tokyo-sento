import React from "react";
import styles from "@/components/Search/Search.module.scss";
import Image from "next/image";
import Link from "next/link";

const Search = () => {
  return (
    <div className={styles.search}>
      <div className={styles.searchInput}>
        <div className="custom-marker" />
        <input
          type="text"
          placeholder="キーワード・駅名"
          className="input-text"
        />
      </div>
      <div className={styles.searchOptions}>
        <label className="input-checkbox">
          <input type="checkbox" />
          オプション1
        </label>
        <label className="input-checkbox">
          <input type="checkbox" />
          オプション2
        </label>
        <label className="input-checkbox">
          <input type="checkbox" />
          オプション3
        </label>
      </div>
      <button type="button" className={`button-primary ${styles.button}`}>
        検索
      </button>
    </div>
  );
};

export default Search;
