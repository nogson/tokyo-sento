import axios from "axios";
type GetGeoJsonProps = {
  keyword?: string;
  features?: string[];
};

export async function getGeoJson({
  keyword,
  features,
}: GetGeoJsonProps = {}): Promise<any> {
  const response = await axios.get("/assets/json/map.geojson");
  const data = response.data.features.filter((feature: any) => {
    if (keyword) {
      // 複数のスペースを1つのスペースに変換
      // 全角スペースを半角スペースに変換
      // keywordにスペースが含まれる場合は、スペースで分割して配列にする
      const keywords = keyword
        .replace(/\s+/g, " ")
        .replace(/　/g, " ")
        .split(" ");
      // 配列の中にキーワードが含まれるかを確認
      return keywords.some((k) => {
        return (
          feature.properties.address.indexOf(k) !== -1 ||
          feature.properties.name.indexOf(k) !== -1
        );
      });
    }
    if (features) {
      return features.some((f) => feature.properties.features.includes(f));
    }
    return true;
  });

  // featuresを上書き
  if (data.length !== 0) {
    response.data.features = data;
  }

  return response;
}
