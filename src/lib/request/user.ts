import ENDPOINT from "@/lib/request/endpoint";
import request from "@/lib/request/request";
import { useQuery } from "@tanstack/react-query";

export const useQueryUser = () => {
  const getUser = async () => {
    const res = await request.get(ENDPOINT.GET_USER);
    return res?.data;
  };

  return useQuery({
    queryKey: ["user"],
    queryFn: getUser,
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
  });
};
