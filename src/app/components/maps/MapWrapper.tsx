"use client";

import Map from "@/components/maps/Map";
import Detail from "@/components/Detail/Detail";
import { use, useEffect, useState } from "react";

const MapWrapper = () => {
  const [selectedMarker, setSelectedMarker] = useState(null);

  useEffect(() => {
    console.log(selectedMarker);
  }, [selectedMarker]);

return (
    <div>
        {selectedMarker !== null && <Detail selectedMarker={selectedMarker} />}
        <Map
            setSelectedMarker={setSelectedMarker}
            selectedMarker={selectedMarker}
        />
    </div>
);
};

export default MapWrapper;
