import ENDPOINT from "@/lib/request/endpoint";
import request from "@/lib/request/request";
import { useQuery } from "@tanstack/react-query";

export const useQueryBathComments = (bathId: number) => {
  const getComments = async () => {
    const res = await request.get(
      ENDPOINT.GET_BATH_COMMENTS.replace("{bathId}", bathId.toString())
    );
    return res?.data;
  };

  return useQuery({
    queryKey: ["comments", bathId],
    queryFn: getComments,
  });
};

export const visitedBath = async (bathId: number) => {
  const res = await request.post(ENDPOINT.POST_VISITED_BATH, { bathId });
  return res;
};

export const postBathComment = async (bathId: number, content: string) => {
  const res = await request.post(
    ENDPOINT.POST_COMMENT.replace("{bathId}", bathId.toString()),
    { content }
  );
  return res;
};


