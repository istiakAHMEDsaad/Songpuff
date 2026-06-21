import {
  useQuery,
  useInfiniteQuery,
  keepPreviousData,
} from "@tanstack/react-query";
import axiosInstance from "../lib/axios";

const fetchSongs = async ({ pageParam = 1, queryKey }) => {
  const [_, params] = queryKey;
  const { seed, region, likes } = params;

  const res = await axiosInstance.get("/songs", {
    params: { seed, page: pageParam, region, likes },
  });

  return res.data;
};

export const useGetSongs = (params, page) => {
  return useQuery({
    queryKey: ["songs", params, page],
    queryFn: () => fetchSongs({ pageParam: page, queryKey: ["songs", params] }),
    placeholderData: keepPreviousData,
  });
};

export const useInfiniteSongs = (params) => {
  return useInfiniteQuery({
    queryKey: ["infinite-songs", params],
    queryFn: fetchSongs,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage?.data?.length > 0 ? allPages.length + 1 : undefined;
    },
  });
};
