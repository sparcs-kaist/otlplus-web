import { SemesterType } from '@/shapes/enum';
import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useSessionInfo } from './account';
import Lecture from '@/shapes/model/subject/Lecture';

export const useTimetables = ({ year, semester }: { year: number; semester: SemesterType }) => {
  const { data: user } = useSessionInfo();

  return useQuery({
    queryKey: ['timetables', { userId: user?.id, year, semester }],
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
  });
};

export const useDuplicateTimetable = () => {
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
  });
};

export const useReorderTimetable = () => {
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
  });
};

export const useDeleteTimetable = () => {
  return useMutation({
    mutationFn: ({ userID, timetableID }: { userID: number; timetableID: number }) => {
      return axios.delete(`/api/users/${userID}/timetables/${timetableID}`, {
        metadata: {
          gaCategory: 'Timetable',
          gaVariable: 'DELETE / Instance',
        },
      });
    },
  });
};
