import User from '@/shapes/model/session/User';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchFeeds = async (userId: number, date: Date) => {
  const dateString = date.toJSON().slice(0, 10);

  const response = await axios.get(`/api/users/${userId}/feeds`, {
    params: { date: dateString },
    metadata: {
      gaCategory: 'Feed',
      gaVariable: 'GET / List',
    },
  });
  return response.data;
};

const fetchNotices = async () => {
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
};

export const useFeed = (user: User) => {
  const userId = user?.id;
  return useInfiniteQuery({
    queryKey: ['feeds', userId],
    queryFn: ({ pageParam }) => {
      return fetchFeeds(userId, pageParam);
    },
    getNextPageParam: (_, __, lastPageParam) => {
      const nextPageParam = new Date();
      nextPageParam.setDate(lastPageParam.getDate() - 1);
      return nextPageParam;
    },
    initialPageParam: new Date(),
    enabled: !!user,
  });
};

export const useNotices = () => {
  return useQuery({
    queryKey: ['notices'],
    queryFn: fetchNotices,
  });
};
