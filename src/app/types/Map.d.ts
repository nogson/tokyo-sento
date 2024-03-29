export type MarkerPropsType = {
  type: "Feature";
  properties: {
    name: string;
    description: string;
    address: string;
    businessHours: string;
    holiday?: string;
    station?: string;
    homepage?: string;
    features?: string[];
  };
  geometry: {
    coordinates: [number, number];
  };
};
