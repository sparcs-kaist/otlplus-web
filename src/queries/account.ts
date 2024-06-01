import User from '@/shapes/model/session/User';
import Department from '@/shapes/model/subject/Department';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const QUERY_KEYS = {
  SESSION_INFO: 'sessionInfo',
  DEPARTMENT_OPTIONS: 'departmentOptions',
} as const;

export const useSessionInfo = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.SESSION_INFO],
    staleTime: Infinity,
    queryFn: async () => {
      return (
        await axios.get<User>('/session/info', {
          metadata: {
            gaCategory: 'User',
            gaVariable: 'GET / Instance',
          },
        })
      ).data;
    },
  });
};

export const useDepartmentOptions = () => {
  // const translate = useTranslatedString();
  return useQuery({
    queryKey: [QUERY_KEYS.DEPARTMENT_OPTIONS],
    staleTime: Infinity,
    queryFn: async () => {
      return (await axios.get<Department[][]>('/session/department-options')).data.flat(1);
    },
  });
};

export const useUpdateFavoriteDepartments = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ selectedDepartments }: { selectedDepartments: Set<string> }) => {
      return axios.post('/session/favorite-departments', {
        fav_department: Array.from(selectedDepartments).filter((d) => d !== 'ALL'),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.DEPARTMENT_OPTIONS] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.SESSION_INFO] });
    },
  });
};
