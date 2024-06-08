import ENDPOINT from "@/lib/request/endpoint";
import request from "@/lib/request/request";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useTokenStore } from "@/store";

export const useQueryUser = () => {
  const getUser = async () => {
    const res = await request.get(ENDPOINT.GET_USER);
    return res?.data;
  };

  return useQuery({
    queryKey: ["user"],
    queryFn: getUser,
    enabled: !!useTokenStore.getState().token,
  });
};

export const useQueryVisitedBath = () => {
  const getVisitedBath = async () => {
    const res = await request.get(ENDPOINT.GET_USER_VISITED_BATHS);
    return res?.data;
  };

  return useQuery({
    queryKey: ["visitedBath"],
    queryFn: getVisitedBath,
    enabled: !!useTokenStore.getState().token,
  });
};
