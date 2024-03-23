"use client";

import Map from "@/components/maps/Map";
import Detail from "@/components/Detail/Detail";
import { use, useState } from "react";

const MapWrapper = () => {
  const [selectedMarker, setSelectedMarker] = useState(null);

  return (
    <div>
      <Detail selectedMarker={selectedMarker} />
      <Map setSelectedMarker={setSelectedMarker} />
    </div>
  );
};

export default MapWrapper;
