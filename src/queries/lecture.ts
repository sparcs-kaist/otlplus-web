import LectureLastSearchOption from '@/shapes/state/timetable/LectureLastSearchOption';
import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';

const RELATED_REVIEW_LIMIT = 100;
const SEARCHED_LECTURE_LIMIT = 300;

export const useAddLectureToTimetable = () => {
  return useMutation({
    mutationFn: async ({
      userID,
      lectureID,
      selectedTimetableID,
    }: {
      userID: number;
      lectureID: number;
      selectedTimetableID: number;
    }) => {
      return await axios.post(
        `/api/users/${userID}/timetables/${selectedTimetableID}/add-lecture`,
        {
          lecture: lectureID,
        },
        {
          metadata: {
            gaCategory: 'Timetable',
            gaVariable: 'POST Update / Instance',
          },
        },
      );
    },
  });
};

export const useRemoveLectureFromTimetable = () => {
  return useMutation({
    mutationFn: async ({
      userID,
      lectureID,
      selectedTimetableID,
    }: {
      userID: number;
      lectureID: number;
      selectedTimetableID: number;
    }) => {
      return axios.post(
        `/api/users/${userID}/timetables/${selectedTimetableID}/remove-lecture`,
        {
          lecture: lectureID,
        },
        {
          metadata: {
            gaCategory: 'Timetable',
            gaVariable: 'POST Update / Instance',
          },
        },
      );
    },
  });
};

export const useAddLectureToCart = () => {
  return useMutation({
    mutationFn: async ({ userID, lectureID }: { userID: number; lectureID: number }) => {
      return axios.post(
        `/api/users/${userID}/wishlist/add-lecture`,
        {
          lecture: lectureID,
        },
        {
          metadata: {
            gaCategory: 'Wishlist',
            gaVariable: 'POST Update / Instance',
          },
        },
      );
    },
  });
};

export const useDeleteLectureFromCart = () => {
  return useMutation({
    mutationFn: async ({ userID, lectureID }: { userID: number; lectureID: number }) => {
      return axios.post(
        `/api/users/${userID}/wishlist/remove-lecture`,
        {
          lecture: lectureID,
        },
        {
          metadata: {
            gaCategory: 'Wishlist',
            gaVariable: 'POST Update / Instance',
          },
        },
      );
    },
  });
};

export const useLoadLectureRelatedReviews = ({
  focusedLectureID,
}: {
  focusedLectureID: number;
}) => {
  return useQuery({
    queryKey: [],
    staleTime: Infinity,
    queryFn: async () => {
      return (
        await axios.get(`/api/lectures/${focusedLectureID}/related-reviews`, {
          params: {
            order: ['-written_datetime', '-id'],
            limit: RELATED_REVIEW_LIMIT,
          },
          metadata: {
            gaCategory: 'Lecture',
            gaVariable: 'GET Related Reviews / Instance',
          },
        })
      ).data;
    },
  });
}; // LectureDetailSection

export const useLecturesByOption = () => {
  return useMutation({
    mutationFn: async ({
      year,
      semester,
      option,
      group,
    }: {
      year: number;
      semester: number;
      option?: LectureLastSearchOption;
      group?: string;
    }) => {
      return axios.get('/api/lectures', {
        params: {
          year,
          semester,
          ...option,
          group,
          order: ['old_code', 'class_no'],
          limit: SEARCHED_LECTURE_LIMIT,
        },
        metadata: {
          gaCategory: 'Timetable',
          gaVariable: 'POST / List',
        },
      });
    },
  });
}; // LectureListTabs, LectureSearchSubSection

export const useLecturesInCart = ({ userID }: { userID: number }) => {
  return useQuery({
    queryKey: [],
    staleTime: Infinity,
    queryFn: async () => {
      return (
        await axios.get(`/api/users/${userID}/wishlist`, {
          metadata: {
            gaCategory: 'User',
            gaVariable: 'GET Wishlist / Instance',
          },
        })
      ).data;
    },
  });
}; // LectureListTabs

export const useLectureAutocomplete = ({
  year,
  semester,
  value,
}: {
  year: number;
  semester: number;
  value: string;
}) => {
  return useQuery({
    queryKey: [],
    staleTime: Infinity,
    queryFn: async () => {
      return (
        await axios.get('/api/lectures/autocomplete', {
          params: {
            year: year,
            semester: semester,
            keyword: value,
          },
          metadata: {
            gaCategory: 'Lecture',
            gaVariable: 'GET Autocomplete / List',
          },
        })
      ).data;
    },
  });
}; // LectureSearchSubSection
