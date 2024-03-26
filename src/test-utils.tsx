import React, { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import Course from '@/shapes/model/subject/Course';
import { SemesterType } from '@/shapes/enum';
import Lecture from '@/shapes/model/subject/Lecture';
import Classtime from '@/shapes/model/subject/Classtime';

const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return children;
};

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
  render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react';
export { customRender as render };

export const sampleCourse: Course = {
  id: 0,
  old_code: '',
  type: '',
  type_en: '',
  title: '',
  title_en: '',
  summary: '',
  review_total_weight: 0,
  credit: 0,
  credit_au: 0,
  num_classes: 0,
  num_labs: 0,
  related_courses_prior: [],
  related_courses_posterior: [],
  professors: [],
  grade: 0,
  load: 0,
  speech: 0,
  userspecific_is_read: false,
};

export const sampleLecture: Lecture = {
  id: 0,
  title: '',
  title_en: '',
  course: 0,
  old_code: '',
  class_no: '',
  year: 0,
  semester: SemesterType.SPRING,
  code: '',
  department: 0,
  department_code: '',
  department_name: '',
  department_name_en: '',
  type: '',
  type_en: '',
  limit: 0,
  num_people: 0,
  is_english: false,
  num_classes: 0,
  num_labs: 0,
  credit: 0,
  credit_au: 0,
  common_title: '',
  common_title_en: '',
  class_title: '',
  class_title_en: '',
  review_total_weight: 0,
  professors: [],
  grade: 0,
  load: 0,
  speech: 0,
  classtimes: [],
  examtimes: [],
};

export const sampleClasstime: Classtime = {
  building_code: '',
  classroom: '',
  classroom_en: '',
  classroom_short: '',
  classroom_short_en: '',
  room_name: '',
  day: 0,
  begin: 0,
  end: 0,
};
