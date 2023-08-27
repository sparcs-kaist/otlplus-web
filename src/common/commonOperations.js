import axios from 'axios';
import ReactGA from 'react-ga4';
import i18n from 'i18next';
import { isSpecialLectureCourse } from '../utils/courseUtils';
import { getCourseOfItem } from '../utils/itemUtils';

export const performSearchCourses = (option, limit, beforeRequest, afterResponse) => {
  if (
    (!option.keyword || option.keyword.length === 0) &&
    (!option.type || option.type.includes('ALL')) &&
    (!option.department || option.department.includes('ALL')) &&
    (!option.grade || option.grade.includes('ALL'))
    // Should not check for option.term
  ) {
    // eslint-disable-next-line no-alert
    alert(i18n.t('ui.message.blankSearch'));
    return;
  }

  beforeRequest();
  axios
    .get('/api/courses', {
      params: {
        ...option,
        order: ['old_code'],
        limit: limit,
      },
      metadata: {
        gaCategory: 'Course',
        gaVariable: 'GET / List',
      },
    })
    .then((response) => {
      afterResponse(response.data);
    })
    .catch((error) => {});
};

export const performAddToTable = (
  lecture,
  selectedTimetable,
  user,
  fromString,
  beforeRequest,
  afterResponse,
) => {
  if (
    lecture.classtimes.some((ct1) =>
      selectedTimetable.lectures.some((l) =>
        l.classtimes.some(
          (ct2) => ct2.day === ct1.day && ct2.begin < ct1.end && ct2.end > ct1.begin,
        ),
      ),
    )
  ) {
    // eslint-disable-next-line no-alert
    alert(i18n.t('ui.message.timetableOverlap'));
    return;
  }

  beforeRequest();

  if (!user) {
    afterResponse();
  } else {
    axios
      .post(
        `/api/users/${user.id}/timetables/${selectedTimetable.id}/add-lecture`,
        {
          lecture: lecture.id,
        },
        {
          metadata: {
            gaCategory: 'Timetable',
            gaVariable: 'POST Update / Instance',
          },
        },
      )
      .then((response) => {
        afterResponse();
      })
      .catch((error) => {});
  }

  ReactGA.event({
    category: 'Timetable - Lecture',
    action: 'Added Lecture to Timetable',
    label: `Lecture : ${lecture.id} / From : ${fromString}`,
  });
};

export const performDeleteFromTable = (
  lecture,
  selectedTimetable,
  user,
  fromString,
  beforeRequest,
  afterResponse,
) => {
  beforeRequest();

  if (!user) {
    afterResponse();
  } else {
    axios
      .post(
        `/api/users/${user.id}/timetables/${selectedTimetable.id}/remove-lecture`,
        {
          lecture: lecture.id,
        },
        {
          metadata: {
            gaCategory: 'Timetable',
            gaVariable: 'POST Update / Instance',
          },
        },
      )
      .then((response) => {
        afterResponse();
      })
      .catch((error) => {});
  }

  ReactGA.event({
    category: 'Timetable - Lecture',
    action: 'Deleted Lecture from Timetable',
    label: `Lecture : ${lecture.id} / From : ${fromString}`,
  });
};

export const performAddToCart = (lecture, user, fromString, beforeRequest, afterResponse) => {
  beforeRequest();

  if (!user) {
    afterResponse();
  } else {
    axios
      .post(
        `/api/users/${user.id}/wishlist/add-lecture`,
        {
          lecture: lecture.id,
        },
        {
          metadata: {
            gaCategory: 'Wishlist',
            gaVariable: 'POST Update / Instance',
          },
        },
      )
      .then((response) => {
        afterResponse();
      })
      .catch((error) => {});
  }

  ReactGA.event({
    category: 'Timetable - Lecture',
    action: 'Added Lecture to Cart',
    label: `Lecture : ${lecture.id} / From : ${fromString}`,
  });
};

export const performDeleteFromCart = (lecture, user, fromString, beforeRequest, afterResponse) => {
  beforeRequest();

  if (!user) {
    afterResponse();
  } else {
    axios
      .post(
        `/api/users/${user.id}/wishlist/remove-lecture`,
        {
          lecture: lecture.id,
        },
        {
          metadata: {
            gaCategory: 'Wishlist',
            gaVariable: 'POST Update / Instance',
          },
        },
      )
      .then((response) => {
        afterResponse();
      })
      .catch((error) => {});
  }

  ReactGA.event({
    category: 'Timetable - Lecture',
    action: 'Deleted Lecture from Cart',
    label: `Lecture : ${lecture.id} / From : ${fromString}`,
  });
};

export const performAddToPlanner = (
  course,
  year,
  semester,
  selectedPlanner,
  user,
  fromString,
  beforeRequest,
  afterResponse,
) => {
  const duplicateFutureItems = selectedPlanner.future_items.filter(
    (fi) =>
      !fi.is_excluded &&
      !isSpecialLectureCourse(getCourseOfItem(fi)) &&
      getCourseOfItem(fi).id === course.id,
  );
  if (duplicateFutureItems.length > 0) {
    // eslint-disable-next-line no-alert
    alert('동일한 과목의 수강 예정이 이미 추가되어 있습니다.');
    return;
  }

  const duplicateTakenItems = selectedPlanner.taken_items.filter(
    (ti) =>
      !ti.is_excluded &&
      !isSpecialLectureCourse(getCourseOfItem(ti)) &&
      getCourseOfItem(ti).id === course.id,
  );
  if (duplicateTakenItems.length > 0) {
    // eslint-disable-next-line no-alert
    const userConfirmed = window.confirm(
      '동일한 과목의 수강 기록이 플래너에 이미 추가되어 있습니다. 정말 추가하시겠습니까? 이전에 수강한 과목은 제외 처리됩니다.',
    );
    if (!userConfirmed) {
      return;
    }
  }

  beforeRequest();

  if (!user) {
    const id = this._createRandomItemId();
    const item = {
      id: id,
      item_type: 'FUTURE',
      is_excluded: false,
      course: course,
      year: year,
      semester: semester,
    };
    afterResponse(item, duplicateTakenItems);
  } else {
    axios
      .post(
        `/api/users/${user.id}/planners/${selectedPlanner.id}/add-future-item`,
        {
          course: course.id,
          year: year,
          semester: semester,
        },
        {
          metadata: {
            gaCategory: 'Planner',
            gaVariable: 'POST Update / Instance',
          },
        },
      )
      .then((response) => {
        afterResponse(response.data, duplicateTakenItems);
      })
      .catch((error) => {});
  }
};

export const performAddArbitraryToPlanner = (
  course,
  year,
  semester,
  selectedPlanner,
  user,
  fromString,
  beforeRequest,
  afterResponse,
) => {
  beforeRequest();

  if (!user) {
    const id = this._createRandomItemId();
    const item = {
      id: id,
      item_type: 'ARBITRARY',
      is_excluded: false,
      year: year,
      semester: semester,
      department: course.department,
      type: course.type,
      type_en: course.type_en,
      credit: course.credit,
      credit_au: course.credit_au,
    };
    afterResponse(item);
  } else {
    axios
      .post(
        `/api/users/${user.id}/planners/${selectedPlanner.id}/add-arbitrary-item`,
        {
          year: year,
          semester: semester,
          department: course.department ? course.department.id : undefined,
          type: course.type,
          type_en: course.type_en,
          credit: course.credit,
          credit_au: course.credit_au,
        },
        {
          metadata: {
            gaCategory: 'Planner',
            gaVariable: 'POST Update / Instance',
          },
        },
      )
      .then((response) => {
        afterResponse(response.data);
      })
      .catch((error) => {});
  }
};

export const performSubmitReview = (
  existingReview,
  lecture,
  content,
  grade,
  speech,
  load,
  isUploading,
  fromString,
  beforeRequest,
  afterResponse,
) => {
  if (content.length === 0) {
    // eslint-disable-next-line no-alert
    alert(i18n.t('ui.message.emptyContent'));
    return;
  }
  if (grade === undefined || load === undefined || speech === undefined) {
    // eslint-disable-next-line no-alert
    alert(i18n.t('ui.message.scoreNotSelected'));
    return;
  }
  if (isUploading) {
    // eslint-disable-next-line no-alert
    alert(i18n.t('ui.message.alreadyUploading'));
    return;
  }

  beforeRequest();

  if (!existingReview) {
    axios
      .post(
        '/api/reviews',
        {
          lecture: lecture.id,
          content: content,
          grade: grade,
          speech: speech,
          load: load,
        },
        {
          metadata: {
            gaCategory: 'Review',
            gaVariable: 'POST / List',
          },
        },
      )
      .then((response) => {
        afterResponse(response.data);
      })
      .catch((error) => {});

    ReactGA.event({
      category: 'Review',
      action: 'Uploaded Review',
      label: `Lecture : ${lecture.id} / From : ${fromString}`,
    });
  } else {
    axios
      .patch(
        `/api/reviews/${existingReview.id}`,
        {
          content: content,
          grade: grade,
          speech: speech,
          load: load,
        },
        {
          metadata: {
            gaCategory: 'Review',
            gaVariable: 'POST / List',
          },
        },
      )
      .then((response) => {
        afterResponse(response.data);
      })
      .catch((error) => {});

    ReactGA.event({
      category: 'Review',
      action: 'Edited Review',
      label: `Lecture : ${lecture.id} / From : ${fromString}`,
    });
  }
};
