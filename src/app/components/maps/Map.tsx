"use client";

import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import MapboxLanguage from "@mapbox/mapbox-gl-language";
import "mapbox-gl/dist/mapbox-gl.css";
import axios from "axios";
import style from "./Map.module.scss";

// Rest of the code...

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_STYLE_ACCESS_TOKEN ?? "";

type propsType = {
  setSelectedMarker: any;
};

export default function Map({ setSelectedMarker }: propsType) {
  const mapContainerRef = useRef(null);

  const setOriginalLayer = async (map: mapboxgl.Map) => {
    const response = await axios.get("/assets/json/map.geojson");
    const data = response.data;
    map.addSource("publicBath", {
      type: "geojson",
      data,
    });

    const setMarker = () => {
      console.log("setMarker");
    };

    data.features.forEach((feature: any) => {
      // カスタムアイコンの作成

      const customIcon = document.createElement("div");

      customIcon.className = "custom-marker"; // CSS クラスを適用

      // popupを作成

      const popup = new mapboxgl.Popup({
        offset: 25,
        className: "custom-popup", // Add your custom CSS class for the popup
      }).setHTML(
        `<h3><span class="open">営業中</span>${feature.properties.name}</h3><div>
        <button class="button-primary-solid sm">詳しく見る</button>
        </div>`
      );

      // showDetailButtonをクリックしたら、詳細画面を表示

      const showDetailButton = document.querySelector(".showDetailButton");
      console.log(showDetailButton);
      showDetailButton?.addEventListener("click", () => {
        console.log("showDetailButton");
        //setSelectedMarker(feature.properties);
      });

      // マーカーを追加
      const marker = new mapboxgl.Marker(customIcon)
        .setLngLat(feature.geometry.coordinates) // ピンの位置を指定
        .setPopup(popup) // ポップアップを追加
        .addTo(map);

      marker.getElement().addEventListener("click", () => {
        // console.log(feature.properties);
        setSelectedMarker(feature.properties);
      });
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

    const language = new MapboxLanguage({ defaultLanguage: "ja" });
    map.addControl(language);

    return () => map.remove(); // Clean up when component unmounts
  }, []);

  return <div className={style.mapContainer} ref={mapContainerRef} />;
}
