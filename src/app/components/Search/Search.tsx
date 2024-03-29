import React, { useRef, useState } from "react";
import styles from "@/components/Search/Search.module.scss";
import { getGeoJson } from "@/lib/request";
import { CgClose } from "react-icons/cg";

type PropsType = {
  setLayerData: (data: any) => void;
};

type RequestPropsType = {
  keyword: string;
  features: string[];
};

const Search = ({ setLayerData }: PropsType) => {
  const [features, setFeatures] = useState<string[]>([]);
  const [keyword, setKeyword] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const searchBoxElement = useRef<HTMLDivElement>(null);
  const searchInput = useRef<HTMLInputElement>(null);

  const featuresList = [
    { name: "feature1", value: "サウナ" },
    { name: "feature2", value: "水風呂" },
    { name: "feature3", value: "温泉" },
    { name: "feature4", value: "露天風呂" },
    { name: "feature5", value: "岩盤浴" },
    { name: "feature6", value: "ジェットバス" },
    { name: "feature7", value: "岩風呂" },
    { name: "feature8", value: "電気風呂" },
    { name: "feature9", value: "水風呂" },
    { name: "feature10", value: "ジャグジー" },
    { name: "feature11", value: "打たせ湯" },
    { name: "feature12", value: "寝湯" },
  ];

  const search = async (props: RequestPropsType) => {
    const response = await getGeoJson(props);
    setLayerData(response.data);
  };

  const checkFeature = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (e.target.checked) {
      setFeatures([...features, value]);
    } else {
      setFeatures(features.filter((feature) => feature !== value));
    }
  };

  const clearKeyword = () => {
    if (searchInput.current === null) return;
    searchInput.current.value = "";
    setKeyword("");
    search({ keyword: "", features });
  };

  return (
    <div
      ref={searchBoxElement}
      className={`${styles.search} ${
        isOpen ? styles.searchOpen : styles.searchClose
      }`}
      onMouseOut={() => setIsOpen(false)}
      onMouseOver={() => setIsOpen(true)}
    >
      <div className={styles.searchInput}>
        <div className="custom-marker" />
        <div className={styles.searchInputWrapper}>
          <input
            ref={searchInput}
            name="keyword"
            type="text"
            placeholder="キーワード・駅名"
            className="input-text"
            onChange={(e) => setKeyword(e.target.value)}
          />
          <button onClick={clearKeyword}>
            <CgClose />
          </button>
        </div>
      </div>
      <div className={styles.searchOptions}>
        {featuresList.map((feature) => (
          <label key={feature.name} className="input-checkbox">
            <input
              type="checkbox"
              name={feature.name}
              value={feature.value}
              onChange={checkFeature}
            />

            {feature.value}
          </label>
        ))}
      </div>
      <button
        type="button"
        className={`button-primary ${styles.button}`}
        onClick={() => search({ keyword, features })}
      >
        検索
      </button>
    </div>
  );
};

export default Search;
