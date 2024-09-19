import User from '@/shapes/model/session/User';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const useFeed = (user: User) => {
  const userId = user?.id;
  return useInfiniteQuery({
    queryKey: ['feeds', userId],
    queryFn: async ({ pageParam }) => {
      const dateString = pageParam.toJSON().slice(0, 10); // pageParam을 date로 사용
      const response = await axios.get(`/api/users/${userId}/feeds`, {
        params: { date: dateString },
        metadata: {
          gaCategory: 'Feed',
          gaVariable: 'GET / List',
        },
      });
      return response.data;
    },
    getNextPageParam: (_, __, lastPageParam) => {
      const nextPageParam = new Date();
      nextPageParam.setDate(lastPageParam.getDate() - 1); // 다음 페이지 날짜 계산
      return nextPageParam;
    },
    initialPageParam: new Date(), // 첫 페이지는 현재 날짜
    enabled: !!user, // 유저가 있을 때만 쿼리 실행
  });
};

export const useNotices = () => {
  return useQuery({
    queryKey: ['notices'],
    queryFn: async () => {
      const now = new Date();
      const response = await axios.get('/api/notices', {
        params: {
          time: now.toJSON(),
          order: ['start_time', 'id'],
        },
        metadata: {
          gaCategory: 'Notice',
          gaVariable: 'GET / List',
        },
      });
      return response.data;
    },
  });
};
