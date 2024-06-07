import ENDPOINT from "@/lib/request/endpoint";
import request from "@/lib/request/request";
import { notifications } from "@mantine/notifications";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

type GetGeoJsonProps = {
  keyword?: string;
  features?: string[];
};

export const geojsonQerykey = ["geojson"] as const;

async function getGeoJson({
  keyword,
  features,
}: GetGeoJsonProps = {}): Promise<any> {
  const response = await request.get(ENDPOINT.GET_GIOJSON);
  const data = response!.data.features.filter((feature: any) => {
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
    response!.data.features = data;
  } else {
    notifications.clean();
    notifications.show({
      message: "該当する銭湯がありませんでした😔",
      withCloseButton: false,
      color: "red",
    });
  }

  return response;
}

export const useQueryGeoJson = (props: GetGeoJsonProps = {}) => {
  const getJsonA = async () => {
    const res = await getGeoJson(props);
    return res.data;
  };

  return useQuery({
    queryKey: geojsonQerykey,
    queryFn: getJsonA,
  });
};

export const useMutationGeoJson = ({
  keyword,
  features,
}: GetGeoJsonProps = {}): any => {
  const queryClient = useQueryClient();

  const getJson = async (props: GetGeoJsonProps) => {
    const res = await getGeoJson(props);
    return res.data;
  };

  return useMutation({
    mutationFn: getJson,
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: geojsonQerykey });
    },
  });
};
