import styles from "@/components/Search/Search.module.scss";
import { useMutationGeoJson } from "@/lib/request/map";
import { CloseButton, Input } from "@mantine/core";
import React, { useContext, useRef, useState } from "react";
import { MarkerRequestPropsType } from "@/types/Map";
import { SearchFilterContext } from "@/components/HomeWrapper";
// type PropsType = {
//   setLayerData: (data: any) => void;
//   setLayerDataRequest: (data: MarkerRequestPropsType) => void;
// };

const Search = () => {
  const [, setSearchFilter] = useContext(SearchFilterContext);
  const [features, setFeatures] = useState<string[]>([]);
  const [keyword, setKeyword] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const searchBoxElement = useRef<HTMLDivElement>(null);
  const mutationGeoJson = useMutationGeoJson();

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

  const search = async (props: MarkerRequestPropsType) => {
    console.log("search", props);
    // setLayerDataRequest(props);
    // const response = await getGeoJson(props);
    // setLayerData(response.data);
    mutationGeoJson.mutate(props);
    setSearchFilter(props);
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
          <Input
            value={keyword}
            placeholder="キーワード・駅名"
            onChange={(event) => setKeyword(event.currentTarget.value)}
            rightSectionPointerEvents="all"
            rightSection={
              <CloseButton
                aria-label="Clear input"
                onClick={clearKeyword}
                style={{ display: keyword ? undefined : "none" }}
              />
            }
            size="md"
            radius="xl"
          />
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
