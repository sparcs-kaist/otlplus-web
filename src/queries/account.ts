import { useTranslatedString } from '@/hooks/useTranslatedString';
import User from '@/shapes/model/session/User';
import Department from '@/shapes/model/subject/Department';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

export const useSessionInfo = () => {
  return useQuery({
    queryKey: ['sessionInfo'],
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
  const translate = useTranslatedString();
  return useQuery({
    queryKey: ['departmentOptions'],
    staleTime: Infinity,
    queryFn: async () => {
      return (await axios.get<Department[][]>('/session/department-options')).data
        .flat(1)
        .map((d) => [String(d.id), `${translate(d, 'name')} (${d.code})`]);
    },
  });
};

export const useUpdateFavoriteDepartments = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ selectedDepartments }: { selectedDepartments: string[] }) => {
      return axios.post('/session/favorite-departments', {
        fav_department: Array.from(selectedDepartments).filter((d) => d !== 'ALL'),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['departmentOptions'] });
      queryClient.invalidateQueries({ queryKey: ['sessionInfo'] });
    },
  });
};
