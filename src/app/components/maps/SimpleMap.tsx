"use client";

import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import MapboxLanguage from "@mapbox/mapbox-gl-language";
import "mapbox-gl/dist/mapbox-gl.css";
import axios from "axios";

// Rest of the code...

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_STYLE_ACCESS_TOKEN ?? "";

export default function Map() {
  const mapContainerRef = useRef(null);

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
      customIcon.className = "custom-marker"; // CSS クラスを適用

      console.log(feature.geometry.coordinates);
      // マーカーを追加
      new mapboxgl.Marker(customIcon)
        .setLngLat(feature.geometry.coordinates) // ピンの位置を指定
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
      zoom: 15,
    });
    map.on("load", () => {
      setOriginalLayer(map);
    });

    const language = new MapboxLanguage({ defaultLanguage: "ja" });
    map.addControl(language);

    return () => map.remove(); // Clean up when component unmounts
  }, []);

  return (
    <div ref={mapContainerRef} style={{ width: "100%", height: "100vh" }} />
  );
}
