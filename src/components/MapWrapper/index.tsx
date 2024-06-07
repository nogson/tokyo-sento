"use client";

import Detail from "@/components/Detail";
import Map from "@/components/MapWrapper/Map";
import styles from "@/components/MapWrapper/MapWrapper.module.scss";
import { Suspense, useContext, useEffect, useState } from "react";
import { useQueryGeoJson } from "@/lib/request/map";
import { SearchFilterContext } from "@/components/HomeWrapper";

const MapWrapper = () => {
  const [searchFilter] = useContext(SearchFilterContext);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const { data: layerData, status } = useQueryGeoJson(searchFilter);

  useEffect(() => {});
  const [layerDataRequest, setLayerDataRequest] = useState({});

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div>
        {/* 詳細情報を表示 */}
        {selectedMarker !== null && <Detail selectedMarker={selectedMarker} />}
        {layerData && status === "success" ? (
          <Map
            layerData={layerData}
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
