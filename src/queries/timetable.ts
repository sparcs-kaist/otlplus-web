import { SemesterType } from '@/shapes/enum';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useSessionInfo } from './account';
import Lecture from '@/shapes/model/subject/Lecture';

// TODO: TIMETABLE_QUERY_KEY 적용 + invalidateQueries variables 지정
const QUERY_KEYS = {
  TIMETABLES: 'timetables',
} as const;

export const useTimetables = ({ year, semester }: { year: number; semester: SemesterType }) => {
  const { data: user } = useSessionInfo();

  return useQuery({
    queryKey: [QUERY_KEYS.TIMETABLES, { userID: user?.id, year, semester }],
    enabled: !!user,
    staleTime: Infinity,
    queryFn: async () => {
      return (
        await axios.get(`/api/users/${user!.id}/timetables`, {
          params: {
            year: year,
            semester: semester,
            order: ['arrange_order', 'id'],
          },
          metadata: {
            gaCategory: 'Timetable',
            gaVariable: 'GET / List',
          },
        })
      ).data;
    },
  });
};

export const useCreateTimetable = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      userID,
      year,
      semester,
    }: {
      userID: number;
      year: number;
      semester: number;
    }) => {
      return axios.post(
        `/api/users/${userID}/timetables`,
        {
          year: year,
          semester: semester,
          lectures: [],
        },
        {
          metadata: {
            gaCategory: 'Timetable',
            gaVariable: 'POST / List',
          },
        },
      );
    },
    onSuccess: (_, { userID, year, semester }) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.TIMETABLES, { userID, year, semester }],
      });
    },
  });
};

export const useDuplicateTimetable = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      userID,
      year,
      semester,
      lecturesInOriginalTimetable,
    }: {
      userID: number;
      year: number;
      semester: SemesterType;
      lecturesInOriginalTimetable: Lecture[];
    }) => {
      return axios.post(
        `/api/users/${userID}/timetables`,
        {
          year: year,
          semester: semester,
          lectures: lecturesInOriginalTimetable.map((l) => l.id),
        },
        {
          metadata: {
            gaCategory: 'Timetable',
            gaVariable: 'POST / List',
          },
        },
      );
    },
    onSuccess: (_, { userID, year, semester }) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.TIMETABLES, { userID, year, semester }],
      });
    },
  });
};

export const useReorderTimetable = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      userID,
      draggingTimetableID,
      newArrangeOrder,
    }: {
      userID: number;
      draggingTimetableID: number;
      newArrangeOrder: number;
    }) => {
      return axios.post(
        `/api/users/${userID}/timetables/${draggingTimetableID}/reorder`,
        {
          arrange_order: newArrangeOrder,
        },
        {
          metadata: {
            gaCategory: 'Timetable',
            gaVariable: 'POST Reorder / Instance',
          },
        },
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.TIMETABLES] });
    },
  });
};

export const useDeleteTimetable = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ userID, timetableID }: { userID: number; timetableID: number }) => {
      return axios.delete(`/api/users/${userID}/timetables/${timetableID}`, {
        metadata: {
          gaCategory: 'Timetable',
          gaVariable: 'DELETE / Instance',
        },
      });
    },
    onSuccess: (_, { userID }) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.TIMETABLES, { userID }] });
    },
  });
};
