"use client";

import Detail from "@/components/Detail";
import Map from "@/components/MapWrapper/Map";
import styles from "@/components/MapWrapper/MapWrapper.module.scss";
import { Suspense, useContext, useEffect, useState } from "react";
import { useQueryGeoJson } from "@/lib/request/map";
import { SearchFilterContext } from "@/components/HomeWrapper";
import { useQueryVisitedBath } from "@/lib/request/user";
import { useQueryClient } from "@tanstack/react-query";

const MapWrapper = () => {
  const queryClient = useQueryClient();
  const [searchFilter] = useContext(SearchFilterContext);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const { data: layerData, status: layerDataStatus } =
    useQueryGeoJson(searchFilter);
  const { data: visitedBathData, status: visitedBathDataStatus } =
    useQueryVisitedBath();

  const isLoaded = () => {
    if (!!queryClient.getQueryData(["user"])) {
      return (
        layerDataStatus === "success" && visitedBathDataStatus === "success"
      );
    } else {

      return layerDataStatus === "success";
    }
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div>
        {/* 詳細情報を表示 */}
        {selectedMarker !== null && <Detail selectedMarker={selectedMarker} />}
        {isLoaded() ? (
          <Map
            layerData={layerData}
            visitedBathData={visitedBathData}
            setSelectedMarker={setSelectedMarker}
            selectedMarker={selectedMarker}
          />
        ) : (
          <div>MAP Loading...</div>
        )}
      </div>
    </Suspense>
  );
};

export default MapWrapper;
