"use client";

import { useQueryVisitedBath } from "@/lib/request/user";
import { isOpen } from "@/lib/utils/util";
import { VisitedBathDataType } from "@/types/Map";
import MapboxLanguage from "@mapbox/mapbox-gl-language";
import { Feature, FeatureCollection } from "geojson";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import style from "./Map.module.scss";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_STYLE_ACCESS_TOKEN ?? "";

type PropsType = {
  selectedMarker?: Feature | null;
  setSelectedMarker?: Dispatch<SetStateAction<null>>;
  layerData?: FeatureCollection;
  center?: [number, number];
  canSelectMarker?: boolean;
  zoom?: number;
};
const Map = ({
  selectedMarker = null,
  setSelectedMarker = () => {},
  layerData,
  center = [139.7670516, 35.6811673],
  canSelectMarker = true,
  zoom = 10,
}: PropsType) => {
  const { data: visitedBathData, status } = useQueryVisitedBath();
  const mapContainerRef = useRef(null);
  const removeSelectedMarker = () => {
    const selectedMarkerElement = document.querySelector(
      ".custom-marker-selected"
    );
    if (selectedMarkerElement) {
      selectedMarkerElement.classList.remove("custom-marker-selected");
    }
  };
  const checkVisited = (id: number) => {
    return visitedBath.includes(id);
  };

  const visitedBath = visitedBathData
    ? visitedBathData.map((data: VisitedBathDataType) => data.bathId)
    : [];

  const addClassToMaker = (customIcon: HTMLElement, id: number) => {
    // CSS クラスを適用
    if (!customIcon) return;
    customIcon.className = checkVisited(id)
      ? "custom-marker visited"
      : "custom-marker";
  };


  const setOriginalLayer = async (map: mapboxgl.Map) => {
    if (!layerData) return;
    const markerArr: mapboxgl.Marker[] = [];
    map.addSource("publicBath", {
      type: "geojson",
      data: layerData,
    });

    layerData.features.forEach((feature: any) => {
      // カスタムアイコンの作成
      const customIcon = document.createElement("div");
      // popupを作成
      const divElement = document.createElement("div");
      const buttonElement = document.createElement("div");
      const open = isOpen(
        feature.properties.businessHours,
        feature.properties.holiday
      );
      // TODO 営業中かどうかの判定
      let openElm = "";

      if (open) {
        openElm = `<span class="open">営業中</span>`;
      } else {
        openElm = `<span class="unknown">休業かも</span>`;
      }
      divElement.innerHTML = `<h3>${openElm} ${feature.properties.name}</h3>`;
      buttonElement.innerHTML = `<button class="button-primary-solid sm">詳しく見る</button>`;
      divElement.appendChild(buttonElement);

      // customIconにCSSクラスを追加
      addClassToMaker(customIcon, feature.id);

      // ポップアップの「詳しく見る」をクリックした時の処理
      buttonElement.addEventListener("click", (e) => {
        // mapをクリックした位置に移動
        map.flyTo({
          center: feature.geometry.coordinates,
          speed: 0.5,
          curve: 0.5,
          easing(t: number) {
            return t;
          },
        });
        setSelectedMarker(feature);

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
        .addTo(map);

      if (canSelectMarker) {
        marker.setPopup(popup); // ポップアップを追加
      }
    });
  };

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current!,
      style:
        process.env.NEXT_PUBLIC_MAPBOX_STYLE_URL ??
        "mapbox://styles/mapbox/streets-v12",
      center,
      zoom,
      minZoom: 8,
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
  }, [layerData]);


  return <div className={style.mapContainer} ref={mapContainerRef} />;
};

export default Map;
