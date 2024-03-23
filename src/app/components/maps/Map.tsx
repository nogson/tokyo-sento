"use client";

import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import mapboxgl from "mapbox-gl";
import MapboxLanguage from "@mapbox/mapbox-gl-language";
import "mapbox-gl/dist/mapbox-gl.css";
import axios from "axios";
import style from "./Map.module.scss";

// Rest of the code...

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_STYLE_ACCESS_TOKEN ?? "";

type propsType = {
  setSelectedMarker: Dispatch<SetStateAction<null>>;
  selectedMarker: any;
};

export default function Map({ selectedMarker, setSelectedMarker }: propsType) {
  const mapContainerRef = useRef(null);

  const removeSelectedMarker = () => {
    const selectedMarkerElement = document.querySelector(
      ".custom-marker-selected"
    );
    if (selectedMarkerElement) {
      selectedMarkerElement.classList.remove("custom-marker-selected");
    }
  };

  const setOriginalLayer = async (map: mapboxgl.Map) => {
    const response = await axios.get("/assets/json/map.geojson");
    const data = response.data;
    map.addSource("publicBath", {
      type: "geojson",
      data,
    });

    data.features.forEach((feature: any) => {
      // カスタムアイコンの作成
      const customIcon = document.createElement("div");
      // CSS クラスを適用
      customIcon.className = "custom-marker";

      // popupを作成
      const divElement = document.createElement("div");
      const buttonElement = document.createElement("div");

      // TODO 営業中かどうかの判定
      divElement.innerHTML = `<h3><span class="open">営業中</span>${feature.properties.name}</h3>`;
      buttonElement.innerHTML = `<button class="button-primary-solid sm">詳しく見る</button>`;
      divElement.appendChild(buttonElement);

      // ポップアップの「詳しく見る」をクリックした時の処理
      buttonElement.addEventListener("click", (e) => {
        // mapをクリックした位置に移動
        map.flyTo({
          center: feature.geometry.coordinates,
          speed: 1,
          curve: 1,
          easing(t: number) {
            return t;
          },
        });
        setSelectedMarker(feature.properties);

        // 選択中のマーカーのCSSクラスを削除
        removeSelectedMarker();
        // 選択中のマーカーにCSSクラスを追加
        customIcon.className = "custom-marker custom-marker-selected";

        popup.remove();
      });

      const popup = new mapboxgl.Popup({
        offset: 25,
        className: "custom-popup", // Add your custom CSS class for the popup
      }).setDOMContent(divElement);

      // マーカーを追加
      const marker = new mapboxgl.Marker(customIcon)
        .setLngLat(feature.geometry.coordinates) // ピンの位置を指定
        .setPopup(popup) // ポップアップを追加
        .addTo(map);
    });
  };

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current!,
      style:
        process.env.NEXT_PUBLIC_MAPBOX_STYLE_URL ??
        "mapbox://styles/mapbox/streets-v12",
      center: [139.7670516, 35.6811673],
      zoom: 10,
    });
    map.on("load", () => {
      setOriginalLayer(map);
    });

    // mapにclickイベントを追加
    map.on("click", (e) => {
      // e.originalEvent.targetがcanvasの場合
      if (e.originalEvent.target === map.getCanvas()) {
        setSelectedMarker(null);
        removeSelectedMarker();
      }
    });

    const language = new MapboxLanguage({ defaultLanguage: "ja" });
    map.addControl(language);

    return () => map.remove(); // Clean up when component unmounts
  }, []);

  return <div className={style.mapContainer} ref={mapContainerRef} />;
}
