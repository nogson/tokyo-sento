"use client";

import Map from "@/components/Maps";
import Detail from "@/components/Detail/Detail";
import Search from "@/components/Search";

import { Suspense, useEffect, useState } from "react";
import { getGeoJson } from "@/lib/request/map";
import { FeatureCollection, GeoJsonProperties, Geometry } from "geojson";
import { useQueryVisitedBath } from "@/lib/request/user";

const MapWrapper = () => {
  const { data: visitedBathData, status } = useQueryVisitedBath();
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [layerData, setLayerData] = useState<
    FeatureCollection<Geometry, GeoJsonProperties>
  >({
    type: "FeatureCollection",
    features: [],
  });

  const getLayerData = async () => {
    const response = await getGeoJson();
    setLayerData(response.data);
  };

  useEffect(() => {
    getLayerData();
  }, []);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div>
        <Search setLayerData={setLayerData} />
        {/* 詳細情報を表示 */}
        {selectedMarker !== null && <Detail selectedMarker={selectedMarker} />}
        <Map
          layerData={layerData}
          setSelectedMarker={setSelectedMarker}
          selectedMarker={selectedMarker}
        />
      </div>
    </Suspense>
  );
};

export default MapWrapper;
