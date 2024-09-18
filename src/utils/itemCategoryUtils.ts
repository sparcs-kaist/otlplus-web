import { CategoryFirstIndex } from '@/shapes/enum';
import Planner from '@/shapes/model/planner/Planner';
import { PlannerItem } from '@/shapes/state/planner/ItemFocus';
import { AdditionalTrackType } from '@/shapes/enum';

/**
 * 아래 유틸들은 Planner 페이지에서 카테고리 아이템과 관련된 작업을 수행하기 위해서 사용됩니다. 
 * 카테고리는 졸업플래너 우측의 기초/전공/교양 과목의 이수 상황을 보여주는 바에서 사용됩니다. 
 * category 들은 모두 아래와 같이 3개의 숫자 배열로 이루어집니다.
 * [CategoryFirstIndex, N, M] 
      CategoryFirstIndex: 0, 1, 2, 3, 4 중 하나. 
          순서대로 기초, 전공, 연구, 교양, 기타.
      N: 
          세부 전공을 의미.  전공/부전/복수/심화/자유 등을 가르킴. 
      M: 
        0, 1 중 하나. 0이면 필수 과목, 1이면 선택 과목. 
      (ex. [0, 1, 0] => 기초 1번째 필수 과목)

 */
export const isIdenticalCategory = (category1: number[], category2: number[]) =>
  category1 &&
  category2 &&
  category1[0] === category2[0] &&
  category1[1] === category2[1] &&
  category1[2] === category2[2];

// 전공 트랙들만 모두 추출하여 반환하는 함수
export const getSeparateMajorTracks = (planner: Planner) => {
  if (!planner) {
    return [];
  }

  return [
    planner.major_track,
    ...planner.additional_tracks.filter((at) => at.type === AdditionalTrackType.DOUBLE),
    ...planner.additional_tracks.filter((at) => at.type === AdditionalTrackType.MINOR),
    ...planner.additional_tracks.filter((at) => at.type === AdditionalTrackType.INTERDISCIPLINARY),
  ];
};

//  각 트랙별로 할당된 카테고리를 반환하는 함수입니다.
// ex. 기초 필수 -> [0,0,0] , 기초 선택 -> [0,0,1]
export const getCategoryOfType = (planner: Planner, type: string, departmentCode?: string) => {
  switch (type) {
    case 'Basic Required':
      return [CategoryFirstIndex.BASIC, 0, 0];
    case 'Basic Elective':
      return [CategoryFirstIndex.BASIC, 0, 1];
    case 'Major Required': {
      const separateMajorTracks = getSeparateMajorTracks(planner);
      const targetTrack =
        separateMajorTracks.find((smt) => smt.department?.code === departmentCode) ||
        separateMajorTracks.find((smt) => smt.type === 'INTERDISCIPLINARY');
      if (targetTrack) {
        const secondIndex = separateMajorTracks.findIndex((smt) => smt.id === targetTrack.id);
        return [CategoryFirstIndex.MAJOR, secondIndex, 0];
      }
      return [CategoryFirstIndex.OTHERS, 0, 0];
    }
    case 'Major Elective':
    case 'Elective(Graduate)': {
      const separateMajorTracks = getSeparateMajorTracks(planner);
      const targetTrack =
        separateMajorTracks.find((smt) => smt.department?.code === departmentCode) ||
        separateMajorTracks.find((smt) => smt.type === AdditionalTrackType.INTERDISCIPLINARY);
      if (targetTrack) {
        const secondIndex = separateMajorTracks.findIndex((smt) => smt.id === targetTrack.id);
        return [CategoryFirstIndex.MAJOR, secondIndex, 1];
      }
      return [CategoryFirstIndex.OTHERS, 0, 0];
    }
    case 'Thesis Study(Undergraduate)':
      return [CategoryFirstIndex.RESEARCH, 0, 0];
    case 'Individual Study':
      return [CategoryFirstIndex.RESEARCH, 0, 1];
    case 'General Required':
    case 'Mandatory General Courses':
      return [CategoryFirstIndex.GENERAL_AND_HUMANITY, 0, 0];
    case 'Humanities & Social Elective':
      return [CategoryFirstIndex.GENERAL_AND_HUMANITY, 0, 1];
    case 'Other Elective':
      return [CategoryFirstIndex.OTHERS, 0, 0];
    default:
      break;
  }
  if (type?.startsWith('Humanities & Social Elective')) {
    return [CategoryFirstIndex.GENERAL_AND_HUMANITY, 0, 1];
  }
  return [CategoryFirstIndex.OTHERS, 0, 0];
};

// 아이템의 카테고리를 반환하는 헬퍼 함수입니다.
export const getCategoryOfItem = (planner: Planner, item: PlannerItem) => {
  switch (item.item_type) {
    case 'TAKEN':
      return getCategoryOfType(planner, item.lecture.type_en, item.lecture.department_code);
    case 'FUTURE':
      return getCategoryOfType(planner, item.course.type_en, item.course.department?.code);
    case 'ARBITRARY':
      return getCategoryOfType(planner, item.type_en, item.department?.code);
    default:
      return getCategoryOfType(planner, '', '');
  }
};

export const getColorOfCategory = (planner: Planner, category: number[]) => {
  switch (category[0]) {
    case 0:
      return 1;
    case 1:
      return 3 + ((category[1] * 2) % 7);
    case 2:
      return 11;
    case 3:
      return 14;
    case 4:
      return 17;
    default:
      return 17;
  }
};

export const getColorOfItem = (planner: Planner, item: PlannerItem) => {
  return getColorOfCategory(planner, getCategoryOfItem(planner, item));
};
