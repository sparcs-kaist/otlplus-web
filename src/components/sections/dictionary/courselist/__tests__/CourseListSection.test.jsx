/* eslint-env jest */
/* eslint-disable react/display-name, react/jsx-indent, react/jsx-indent-props */

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { I18nextProvider } from 'react-i18next';
import configureStore from 'redux-mock-store';
import i18n from 'i18next';
import ReactGA from 'react-ga4';
import { performSearchCourses } from '../../../../common/commonOperations';

import CourseListSection from '../CourseListSection';
import { CourseListCode } from '@/shapes/enum';

// Mock external dependencies
jest.mock('react-ga4');
jest.mock('../../../../common/boundClassNames', () => ({
  appBoundClassNames: (className) => className,
}));
jest.mock('../../../Scroller', () => ({ children, onScroll }) => (
  <div data-testid="scroller" onScroll={onScroll}>
    {children}
  </div>
));
jest.mock('./CourseSearchSubSection', () => () => (
  <div data-testid="course-search-subsection">Course Search</div>
));
jest.mock('../../../blocks/CourseBlock', () => ({ course, onClick, isRaised, isDimmed, isRead }) => (
  <div
    data-testid="course-block"
    data-course-id={course.id}
    data-is-raised={isRaised}
    data-is-dimmed={isDimmed}
    data-is-read={isRead}
    onClick={() => onClick(course)}
  >
    {course.title || course.old_code || `Course ${course.id}`}
  </div>
));
jest.mock('../../../../utils/courseUtils', () => ({
  isFocused: jest.fn((course, courseFocus) => courseFocus && courseFocus.course && courseFocus.course.id === course.id),
  isDimmedCourse: jest.fn((course, courseFocus) => courseFocus && courseFocus.course && courseFocus.course.id !== course.id),
}));
jest.mock('../../../../common/commonOperations', () => ({
  performSearchCourses: jest.fn(),
}));
jest.mock('../../../../common/searchOptions', () => ({
  getLabelOfValue: jest.fn((options, value) => `Label for ${value}`),
  getDepartmentOptions: jest.fn(() => []),
  getTypeOptions: jest.fn(() => []),
  getLevelOptions: jest.fn(() => []),
  getTermOptions: jest.fn(() => []),
}));

const mockStore = configureStore([]);

// Setup i18n for testing
i18n.init({
  lng: 'en',
  fallbackLng: 'en',
  resources: {
    en: {
      translation: {
        'ui.tab.search': 'Search',
        'ui.tab.basic': 'Basic',
        'ui.tab.major': 'Major',
        'ui.tab.humanity': 'Humanity',
        'ui.tab.taken': 'Taken',
        'ui.placeholder.loading': 'Loading...',
        'ui.placeholder.noResults': 'No results found',
        'js.property.name': 'name_en',
      },
    },
  },
});

describe('CourseListSection', () => {
  let store;

  const mockUser = {
    id: 1,
    departments: [
      { code: 'CS', name_en: 'Computer Science', name_ko: '컴퓨터과학과' },
      { code: 'MATH', name_en: 'Mathematics', name_ko: '수학과' },
    ],
  };

  const mockCourses = [
    {
      id: 1,
      old_code: 'CS101',
      title: 'Introduction to Programming',
      title_en: 'Introduction to Programming',
      department: 'CS',
      type: 'Major Required',
      credit: 3,
      userspecific_is_read: false,
    },
    {
      id: 2,
      old_code: 'CS201',
      title: 'Data Structures',
      title_en: 'Data Structures',
      department: 'CS',
      type: 'Major Required',
      credit: 3,
      userspecific_is_read: true,
    },
    {
      id: 3,
      old_code: 'MATH101',
      title: 'Calculus I',
      title_en: 'Calculus I',
      department: 'MATH',
      type: 'Major Required',
      credit: 3,
      userspecific_is_read: false,
    },
  ];

  const defaultState = {
    common: {
      user: {
        user: mockUser,
      },
    },
    dictionary: {
      list: {
        selectedListCode: CourseListCode.BASIC,
        lists: {
          [CourseListCode.BASIC]: { courses: mockCourses },
          [CourseListCode.SEARCH]: { courses: [] },
          [CourseListCode.HUMANITY]: { courses: mockCourses.slice(0, 1) },
          [CourseListCode.TAKEN]: { courses: mockCourses.slice(1, 2) },
        },
        readCourses: [mockCourses[1]],
      },
      courseFocus: {
        course: null,
        clicked: false,
      },
      search: {
        lastSearchOption: {
          keyword: '',
          type: ['ALL'],
          department: ['ALL'],
          grade: ['ALL'],
          term: ['ALL'],
          offset: 0,
          limit: 10,
        },
      },
    },
  };

  beforeEach(() => {
    store = mockStore(defaultState);
    jest.clearAllMocks();
    ReactGA.event.mockClear();
  });

  const renderComponent = (customState = {}) => {
    const finalState = { ...defaultState, ...customState };
    const finalStore = mockStore(finalState);

    return render(
      <Provider store={finalStore}>
        <I18nextProvider i18n={i18n}>
          <CourseListSection />
        </I18nextProvider>
      </Provider>
    );
  };

  describe('Component Rendering', () => {
    it('should render the course list section', () => {
      renderComponent();
      expect(screen.getByText('Basic')).toBeInTheDocument();
    });

    it('should render courses from the selected list', () => {
      renderComponent();
      expect(screen.getByText('Introduction to Programming')).toBeInTheDocument();
      expect(screen.getByText('Data Structures')).toBeInTheDocument();
      expect(screen.getByText('Calculus I')).toBeInTheDocument();
    });

    it('should render loading placeholder when courses are null', () => {
      const stateWithNullCourses = {
        dictionary: {
          ...defaultState.dictionary,
          list: {
            ...defaultState.dictionary.list,
            lists: {
              [CourseListCode.BASIC]: null,
            },
          },
        },
      };
      renderComponent(stateWithNullCourses);
      expect(screen.getByText('Loading...')).toBeInTheDocument();
    });

    it('should render no results placeholder when courses array is empty', () => {
      const stateWithEmptyCourses = {
        dictionary: {
          ...defaultState.dictionary,
          list: {
            ...defaultState.dictionary.list,
            lists: {
              [CourseListCode.BASIC]: { courses: [] },
            },
          },
        },
      };
      renderComponent(stateWithEmptyCourses);
      expect(screen.getByText('No results found')).toBeInTheDocument();
    });
  });

  describe('List Title Rendering', () => {
    it('should render basic tab title for basic courses', () => {
      renderComponent();
      expect(screen.getByText('Basic')).toBeInTheDocument();
    });

    it('should render search tab title with search icon', () => {
      const searchState = {
        dictionary: {
          ...defaultState.dictionary,
          list: {
            ...defaultState.dictionary.list,
            selectedListCode: CourseListCode.SEARCH,
          },
        },
      };
      renderComponent(searchState);
      expect(screen.getByText('Search')).toBeInTheDocument();
    });

    it('should render search title with search terms', () => {
      const searchStateWithTerms = {
        dictionary: {
          ...defaultState.dictionary,
          list: {
            ...defaultState.dictionary.list,
            selectedListCode: CourseListCode.SEARCH,
          },
          search: {
            lastSearchOption: {
              keyword: 'programming',
              type: ['Major Required'],
              department: ['CS'],
              grade: ['ALL'],
              term: ['ALL'],
              offset: 0,
              limit: 10,
            },
          },
        },
      };
      renderComponent(searchStateWithTerms);
      expect(screen.getByText(/Search/)).toBeInTheDocument();
    });

    it('should render humanity tab title', () => {
      const humanityState = {
        dictionary: {
          ...defaultState.dictionary,
          list: {
            ...defaultState.dictionary.list,
            selectedListCode: CourseListCode.HUMANITY,
          },
        },
      };
      renderComponent(humanityState);
      expect(screen.getByText('Humanity')).toBeInTheDocument();
    });

    it('should render taken tab title', () => {
      const takenState = {
        dictionary: {
          ...defaultState.dictionary,
          list: {
            ...defaultState.dictionary.list,
            selectedListCode: CourseListCode.TAKEN,
          },
        },
      };
      renderComponent(takenState);
      expect(screen.getByText('Taken')).toBeInTheDocument();
    });

    it('should render department major title', () => {
      const departmentState = {
        dictionary: {
          ...defaultState.dictionary,
          list: {
            ...defaultState.dictionary.list,
            selectedListCode: 'CS',
            lists: {
              CS: { courses: mockCourses },
            },
          },
        },
      };
      renderComponent(departmentState);
      expect(screen.getByText('Computer Science Major')).toBeInTheDocument();
    });
  });

  describe('Course Focus and Selection', () => {
    it('should handle course click and dispatch focus action', () => {
      renderComponent();
      const courseBlock = screen.getByTestId('course-block');
      fireEvent.click(courseBlock);

      const actions = store.getActions();
      expect(actions).toContainEqual(
        expect.objectContaining({
          type: expect.stringContaining('SET_COURSE_FOCUS'),
        }),
      );
    });

    it('should track course selection with ReactGA', () => {
      renderComponent();
      const courseBlock = screen.getByTestId('course-block');
      fireEvent.click(courseBlock);

      expect(ReactGA.event).toHaveBeenCalledWith({
        category: 'Dictionary - Selection',
        action: 'Selected Course',
        label: expect.stringContaining('Course : 1'),
      });
    });

    it('should clear focus when clicking focused course', () => {
      const focusedState = {
        dictionary: {
          ...defaultState.dictionary,
          courseFocus: {
            course: mockCourses[0],
            clicked: true,
          },
        },
      };
      renderComponent(focusedState);

      const courseBlock = screen.getByTestId('course-block');
      fireEvent.click(courseBlock);

      expect(ReactGA.event).toHaveBeenCalledWith({
        category: 'Dictionary - Selection',
        action: 'Unselected Course',
        label: expect.stringContaining('Course : 1'),
      });
    });

    it('should show raised state for focused course', () => {
      const focusedState = {
        dictionary: {
          ...defaultState.dictionary,
          courseFocus: {
            course: mockCourses[0],
            clicked: true,
          },
        },
      };
      renderComponent(focusedState);

      const courseBlock = screen.getByTestId('course-block');
      expect(courseBlock).toHaveAttribute('data-is-raised', 'true');
    });

    it('should show dimmed state for non-focused courses when one is focused', () => {
      const focusedState = {
        dictionary: {
          ...defaultState.dictionary,
          courseFocus: {
            course: mockCourses[0],
            clicked: true,
          },
        },
      };
      renderComponent(focusedState);

      const courseBlocks = screen.getAllByTestId('course-block');
      const nonFocusedBlock = courseBlocks.find((block) =>
        block.getAttribute('data-course-id') !== '1',
      );
      expect(nonFocusedBlock).toHaveAttribute('data-is-dimmed', 'true');
    });
  });

  describe('Search Functionality', () => {
    it('should render CourseSearchSubSection for search tab', () => {
      const searchState = {
        dictionary: {
          ...defaultState.dictionary,
          list: {
            ...defaultState.dictionary.list,
            selectedListCode: CourseListCode.SEARCH,
          },
        },
      };
      renderComponent(searchState);
      expect(screen.getByTestId('course-search-subsection')).toBeInTheDocument();
    });

    it('should not render CourseSearchSubSection for non-search tabs', () => {
      renderComponent();
      expect(screen.queryByTestId('course-search-subsection')).not.toBeInTheDocument();
    });

    it('should dispatch openSearch action when search title is clicked', () => {
      const searchState = {
        dictionary: {
          ...defaultState.dictionary,
          list: {
            ...defaultState.dictionary.list,
            selectedListCode: CourseListCode.SEARCH,
          },
        },
      };
      renderComponent(searchState);

      const searchTitle = screen.getByText('Search');
      fireEvent.click(searchTitle);

      const actions = store.getActions();
      expect(actions).toContainEqual(
        expect.objectContaining({
          type: expect.stringContaining('OPEN_SEARCH'),
        }),
      );
    });
  });

  describe('Scroll Handling and Infinite Loading', () => {
    it('should handle scroll to bottom and trigger course loading', async () => {
      const searchState = {
        dictionary: {
          ...defaultState.dictionary,
          list: {
            ...defaultState.dictionary.list,
            selectedListCode: CourseListCode.SEARCH,
            lists: {
              [CourseListCode.SEARCH]: { courses: mockCourses },
            },
          },
        },
      };
      renderComponent(searchState);

      const scroller = screen.getByTestId('scroller');
      fireEvent.scroll(scroller, {
        target: {
          scrollTop: 1000,
          scrollHeight: 1000,
          clientHeight: 500,
        },
      });

      expect(performSearchCourses).toHaveBeenCalled();
    });

    it('should update offset in lastSearchOption when loading more courses', () => {
      const searchState = {
        dictionary: {
          ...defaultState.dictionary,
          list: {
            ...defaultState.dictionary.list,
            selectedListCode: CourseListCode.SEARCH,
            lists: {
              [CourseListCode.SEARCH]: { courses: mockCourses },
            },
          },
        },
      };
      renderComponent(searchState);

      const scroller = screen.getByTestId('scroller');
      fireEvent.scroll(scroller, {
        target: {
          scrollTop: 1000,
          scrollHeight: 1000,
          clientHeight: 500,
        },
      });

      const actions = store.getActions();
      expect(actions).toContainEqual(
        expect.objectContaining({
          type: expect.stringContaining('SET_LAST_SEARCH_OPTION'),
        }),
      );
    });
  });

  describe('Course Read Status', () => {
    it('should show read status for courses marked as read', () => {
      renderComponent();
      const courseBlocks = screen.getAllByTestId('course-block');
      const readCourse = courseBlocks.find((block) =>
        block.getAttribute('data-course-id') === '2',
      );
      expect(readCourse).toHaveAttribute('data-is-read', 'true');
    });

    it('should show unread status for courses not marked as read', () => {
      renderComponent();
      const courseBlocks = screen.getAllByTestId('course-block');
      const unreadCourse = courseBlocks.find((block) =>
        block.getAttribute('data-course-id') === '1',
      );
      expect(unreadCourse).toHaveAttribute('data-is-read', 'false');
    });

    it('should consider userspecific_is_read property', () => {
      const stateWithUserSpecificRead = {
        dictionary: {
          ...defaultState.dictionary,
          list: {
            ...defaultState.dictionary.list,
            lists: {
              [CourseListCode.BASIC]: {
                courses: [
                  { ...mockCourses[0], userspecific_is_read: true },
                  ...mockCourses.slice(1),
                ],
              },
            },
            readCourses: [],
          },
        },
      };
      renderComponent(stateWithUserSpecificRead);

      const courseBlocks = screen.getAllByTestId('course-block');
      const readCourse = courseBlocks.find((block) =>
        block.getAttribute('data-course-id') === '1',
      );
      expect(readCourse).toHaveAttribute('data-is-read', 'true');
    });
  });

  describe('Component Lifecycle', () => {
    it('should set offset ref value on component mount', () => {
      const component = renderComponent();
      // This tests the componentDidMount behavior where offSetRef.current.value is set
      // Since we can't directly access the ref, we verify the component renders without errors
      expect(screen.getByText('Basic')).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('should handle missing user departments gracefully', () => {
      const stateWithoutDepartments = {
        common: {
          user: {
            user: { ...mockUser, departments: null },
          },
        },
        dictionary: defaultState.dictionary,
      };
      renderComponent(stateWithoutDepartments);
      expect(screen.getByText('Basic')).toBeInTheDocument();
    });

    it('should handle empty user departments array', () => {
      const stateWithEmptyDepartments = {
        common: {
          user: {
            user: { ...mockUser, departments: [] },
          },
        },
        dictionary: defaultState.dictionary,
      };
      renderComponent(stateWithEmptyDepartments);
      expect(screen.getByText('Basic')).toBeInTheDocument();
    });

    it('should handle courses without titles gracefully', () => {
      const stateWithTitlelessCourses = {
        dictionary: {
          ...defaultState.dictionary,
          list: {
            ...defaultState.dictionary.list,
            lists: {
              [CourseListCode.BASIC]: {
                courses: [
                  { id: 1, old_code: 'CS101' },
                  { id: 2 },
                ],
              },
            },
          },
        },
      };
      renderComponent(stateWithTitlelessCourses);
      expect(screen.getByText('CS101')).toBeInTheDocument();
      expect(screen.getByText('Course 2')).toBeInTheDocument();
    });

    it('should handle null courseFocus gracefully', () => {
      const stateWithNullFocus = {
        dictionary: {
          ...defaultState.dictionary,
          courseFocus: null,
        },
      };
      renderComponent(stateWithNullFocus);
      expect(screen.getByText('Basic')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('should render course blocks with proper structure', () => {
      renderComponent();
      const courseBlocks = screen.getAllByTestId('course-block');
      expect(courseBlocks).toHaveLength(3);
      courseBlocks.forEach((block) => {
        expect(block).toBeInTheDocument();
      });
    });

    it('should provide click handlers for course selection', () => {
      renderComponent();
      const courseBlock = screen.getByTestId('course-block');
      expect(courseBlock).toBeInTheDocument();
      // Click functionality is tested in the focus/selection tests
    });
  });

  describe('Integration with Redux', () => {
    it('should connect to Redux store and receive props', () => {
      renderComponent();
      // Verify that component receives data from Redux store
      expect(screen.getByText('Introduction to Programming')).toBeInTheDocument();
    });

    it('should dispatch actions when interacting with components', () => {
      renderComponent();
      const courseBlock = screen.getByTestId('course-block');
      fireEvent.click(courseBlock);

      const actions = store.getActions();
      expect(actions.length).toBeGreaterThan(0);
    });
  });
});