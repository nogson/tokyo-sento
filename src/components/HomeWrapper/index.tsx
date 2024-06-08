"use client";

import {
  Dispatch,
  SetStateAction,
  Suspense,
  createContext,
  useEffect,
  useState,
} from "react";
import MapWrapper from "@/components/MapWrapper";
import Search from "@/components/Search";
import News from "@/components/News";
import styles from "@/components/MapWrapper/MapWrapper.module.scss";
export const SearchFilterContext = createContext<
  [{}, Dispatch<SetStateAction<{}>>]
>([{}, () => {}]);

const HomeWrapper = () => {
  const [searchFilter, setSearchFilter] = useState({});
  

  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <div className={styles.news}>
          <News />
        </div>
        <SearchFilterContext.Provider value={[searchFilter, setSearchFilter]}>
          <Search />
          <MapWrapper />
        </SearchFilterContext.Provider>
      </Suspense>
    </>
  );
};

export default HomeWrapper;
