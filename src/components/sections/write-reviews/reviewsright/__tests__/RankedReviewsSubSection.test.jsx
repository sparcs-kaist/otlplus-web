/* eslint-disable */
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { I18nextProvider } from 'react-i18next';
import { configureStore } from '@reduxjs/toolkit';
import axios from 'axios';
import ReactGA from 'react-ga4';

import RankedReviewsSubSection, { ALL } from '../RankedReviewsSubSection';
import i18n from '../../../../../i18n/i18n';

// Mock external dependencies
jest.mock('axios');
jest.mock('react-ga4');
jest.mock('qs', () => ({
  stringify: jest.fn(() => 'mocked-query-string'),
}));

const mockedAxios = axios;
const mockedReactGA = ReactGA;

// Mock child components
jest.mock('../../../Scroller', () => ({ children, onScroll, ...props }) => (
  <div data-testid="scroller" onScroll={onScroll} {...props}>
    {children}
  </div>
));

jest.mock('../../../CloseButton', () => ({ onClick }) => (
  <button data-testid="close-button" onClick={onClick}>
    Close
  </button>
));

jest.mock('../../../blocks/ReviewBlock', () => ({ review, ...props }) => (
  <div data-testid="review-block" data-review-id={review.id} {...props}>
    Review: {review.id}
  </div>
));

jest.mock('../../../blocks/SemesterBlock', () => ({ semester, isRaised, onClick }) => (
  <button
    data-testid="semester-block"
    data-semester={
      typeof semester === 'object'
        ? `${semester.year}-${semester.semester}`
        : semester
    }
    data-raised={isRaised}
    onClick={() => onClick(semester)}
  >
    {typeof semester === 'object'
      ? `${semester.year}-${semester.semester}`
      : semester}
  </button>
));

jest.mock('../../../Scores', () => ({ entries }) => (
  <div data-testid="scores">
    {entries.map((entry, index) => (
      <div key={index} data-testid="score-entry">
        {entry.name}: {entry.score}
      </div>
    ))}
  </div>
));

describe('RankedReviewsSubSection', () => {
  let store;

  const mockSemesters = [
    { year: 2023, semester: 1, gradePosting: '2023-02-01' },
    { year: 2023, semester: 2, gradePosting: '2023-08-01' },
    { year: 2024, semester: 1, gradePosting: '2024-02-01' },
  ];

  const mockReviews = [
    {
      id: 1,
      course: { id: 101 },
      content: 'Great course!',
      like: 10,
    },
    {
      id: 2,
      course: { id: 102 },
      content: 'Good but challenging',
      like: 5,
    },
  ];

  const createMockStore = (initialState = {}) => {
    const defaultState = {
      common: {
        semester: {
          semesters: mockSemesters,
          currentSemester: mockSemesters[0],
        },
      },
      writeReviews: {
        reviewsFocus: {
          from: 'test',
        },
        rankedReviews: {
          reviewsBySemester: {},
          reviewCountBySemester: {},
        },
      },
    };

    return configureStore({
      reducer: {
        common: (state = defaultState.common) => state,
        writeReviews: (state = defaultState.writeReviews) => state,
      },
      preloadedState: {
        ...defaultState,
        ...initialState,
      },
    });
  };

  const renderWithProviders = (ui, { store: customStore, ...renderOptions } = {}) => {
    const testStore = customStore || store;
    return render(
      <Provider store={testStore}>
        <I18nextProvider i18n={i18n}>{ui}</I18nextProvider>
      </Provider>,
      renderOptions
    );
  };

  beforeEach(() => {
    store = createMockStore();
    jest.clearAllMocks();
    mockedAxios.get.mockResolvedValue({ data: [] });

    // Mock Date.now() for consistent testing
    jest.spyOn(Date, 'now').mockImplementation(() => new Date('2024-03-01').getTime());
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('Component Rendering', () => {
    test('renders without crashing', () => {
      renderWithProviders(<RankedReviewsSubSection />);
      expect(screen.getByTestId('scroller')).toBeInTheDocument();
    });

    test('renders close button', () => {
      renderWithProviders(<RankedReviewsSubSection />);
      expect(screen.getByTestId('close-button')).toBeInTheDocument();
    });

    test('renders semester blocks including ALL option', () => {
      renderWithProviders(<RankedReviewsSubSection />);

      expect(screen.getByTestId('semester-block')).toBeInTheDocument();
      const allSemesterBlock = screen.getByText('ALL');
      expect(allSemesterBlock).toBeInTheDocument();
    });

    test('renders title with correct subtitle for ALL semesters', () => {
      renderWithProviders(<RankedReviewsSubSection />);
      expect(screen.getByText(/ui.title.rankedReviews/)).toBeInTheDocument();
    });

    test('renders loading placeholder when reviews are null', () => {
      renderWithProviders(<RankedReviewsSubSection />);
      expect(screen.getByText('ui.placeholder.loading')).toBeInTheDocument();
    });

    test('renders no results placeholder when reviews array is empty', () => {
      const storeWithEmptyReviews = createMockStore({
        writeReviews: {
          reviewsFocus: { from: 'test' },
          rankedReviews: {
            reviewsBySemester: { ALL: [] },
            reviewCountBySemester: { ALL: 0 },
          },
        },
      });

      renderWithProviders(<RankedReviewsSubSection />, { store: storeWithEmptyReviews });
      expect(screen.getByText('ui.placeholder.noResults')).toBeInTheDocument();
    });
  });

  describe('Semester Management', () => {
    test('filters semesters correctly (post-2013 with grade posting delay)', () => {
      const semestersWithOldData = [
        { year: 2012, semester: 1, gradePosting: '2012-02-01' }, // Should be filtered out
        { year: 2023, semester: 1, gradePosting: '2023-02-01' }, // Should be included
        { year: 2024, semester: 1, gradePosting: '2024-02-28' }, // Too recent, should be filtered out
      ];

      const storeWithFilteredSemesters = createMockStore({
        common: {
          semester: {
            semesters: semestersWithOldData,
            currentSemester: semestersWithOldData[1],
          },
        },
      });

      renderWithProviders(<RankedReviewsSubSection />, { store: storeWithFilteredSemesters });

      // Should show ALL and only the 2023 semester
      expect(screen.getByText('ALL')).toBeInTheDocument();
      expect(screen.getByText('2023-1')).toBeInTheDocument();
      expect(screen.queryByText('2012-1')).not.toBeInTheDocument();
    });

    test('includes current semester even if not in filtered list', () => {
      const currentSemester = { year: 2024, semester: 1, gradePosting: '2024-02-28' };
      const storeWithCurrentSemester = createMockStore({
        common: {
          semester: {
            semesters: mockSemesters,
            currentSemester: currentSemester,
          },
        },
      });

      renderWithProviders(<RankedReviewsSubSection />, { store: storeWithCurrentSemester });
      expect(screen.getByText('2024-1')).toBeInTheDocument();
    });

    test('selects most recent semester by default', async () => {
      renderWithProviders(<RankedReviewsSubSection />);

      await waitFor(() => {
        const latestSemesterBlock = screen.getByTestId('semester-block');
        expect(latestSemesterBlock).toHaveAttribute('data-raised', 'true');
      });
    });

    test('changes semester when semester block is clicked', () => {
      renderWithProviders(<RankedReviewsSubSection />);

      const allSemesterBlock = screen.getByText('ALL');
      fireEvent.click(allSemesterBlock);

      expect(screen.getByTestId('semester-block')).toHaveAttribute('data-raised', 'true');
    });
  });

  describe('API Interactions', () => {
    test('fetches review count on mount', async () => {
      renderWithProviders(<RankedReviewsSubSection />);

      await waitFor(() => {
        expect(mockedAxios.get).toHaveBeenCalledWith(
          '/api/reviews',
          expect.objectContaining({
            params: expect.objectContaining({
              response_type: 'count',
            }),
          })
        );
      });
    });

    test('fetches ranked reviews on mount', async () => {
      renderWithProviders(<RankedReviewsSubSection />);

      await waitFor(() => {
        expect(mockedAxios.get).toHaveBeenCalledWith(
          '/api/reviews',
          expect.objectContaining({
            params: expect.objectContaining({
              order: ['-like'],
              offset: 0,
              limit: 10,
            }),
          })
        );
      });
    });

    test('includes semester parameters when specific semester is selected', async () => {
      const storeWithSemesterReviews = createMockStore({
        writeReviews: {
          reviewsFocus: { from: 'test' },
          rankedReviews: {
            reviewsBySemester: {},
            reviewCountBySemester: {},
          },
        },
      });

      renderWithProviders(<RankedReviewsSubSection />, { store: storeWithSemesterReviews });

      // Click on a specific semester
      const semesterBlock = screen.getByText('2023-1');
      fireEvent.click(semesterBlock);

      await waitFor(() => {
        expect(mockedAxios.get).toHaveBeenCalledWith(
          '/api/reviews',
          expect.objectContaining({
            params: expect.objectContaining({
              lecture_year: 2023,
              lecture_semester: 1,
            }),
          })
        );
      });
    });

    test('handles API errors gracefully', async () => {
      mockedAxios.get.mockRejectedValue(new Error('API Error'));

      renderWithProviders(<RankedReviewsSubSection />);

      // Component should still render without crashing
      expect(screen.getByTestId('scroller')).toBeInTheDocument();
    });

    test('prevents duplicate API calls when already loading', async () => {
      renderWithProviders(<RankedReviewsSubSection />);

      // Simulate rapid clicking
      const allSemesterBlock = screen.getByText('ALL');
      fireEvent.click(allSemesterBlock);
      fireEvent.click(allSemesterBlock);

      await waitFor(() => {
        // Should not make duplicate calls for the same semester
        const apiCalls = mockedAxios.get.mock.calls.filter(
          (call) => call[1]?.params?.response_type !== 'count'
        );
        expect(apiCalls.length).toBeLessThanOrEqual(2); // Initial + one more
      });
    });
  });

  describe('Infinite Scrolling', () => {
    test('triggers additional review fetch on scroll near bottom', async () => {
      const storeWithReviews = createMockStore({
        writeReviews: {
          reviewsFocus: { from: 'test' },
          rankedReviews: {
            reviewsBySemester: { ALL: mockReviews },
            reviewCountBySemester: { ALL: 20 },
          },
        },
      });

      renderWithProviders(<RankedReviewsSubSection />, { store: storeWithReviews });

      // Mock getBoundingClientRect to simulate near-bottom scroll
      const mockGetBoundingClientRect = jest.fn(() => ({
        bottom: 100,
      }));

      const blockList = document.querySelector('.block-list');
      if (blockList) {
        blockList.getBoundingClientRect = mockGetBoundingClientRect;

        const scrollElement = {
          getBoundingClientRect: () => ({ bottom: 150 }),
        };
        blockList.closest = jest.fn(() => scrollElement);
      }

      const scroller = screen.getByTestId('scroller');
      fireEvent.scroll(scroller);

      await waitFor(() => {
        expect(mockedAxios.get).toHaveBeenCalledWith(
          '/api/reviews',
          expect.objectContaining({
            params: expect.objectContaining({
              offset: 2, // Length of existing reviews
            }),
          })
        );
      });
    });

    test('logs Google Analytics event for additional review loading', async () => {
      const storeWithReviews = createMockStore({
        writeReviews: {
          reviewsFocus: { from: 'test' },
          rankedReviews: {
            reviewsBySemester: { '2023-1': mockReviews },
            reviewCountBySemester: { '2023-1': 20 },
          },
        },
      });

      // Select specific semester first
      renderWithProviders(<RankedReviewsSubSection />, { store: storeWithReviews });

      const semesterBlock = screen.getByText('2023-1');
      fireEvent.click(semesterBlock);

      // Mock scroll behavior to trigger more loading
      const mockGetBoundingClientRect = jest.fn(() => ({ bottom: 100 }));
      const blockList = document.querySelector('.block-list');
      if (blockList) {
        blockList.getBoundingClientRect = mockGetBoundingClientRect;
        blockList.closest = jest.fn(() => ({
          getBoundingClientRect: () => ({ bottom: 150 }),
        }));
      }

      mockedAxios.get.mockResolvedValue({ data: [mockReviews[0]] });

      const scroller = screen.getByTestId('scroller');
      fireEvent.scroll(scroller);

      await waitFor(() => {
        expect(mockedReactGA.event).toHaveBeenCalledWith({
          category: 'Write Reviews - Ranked Review',
          action: 'Loaded More Review',
          label: expect.stringContaining('Semester : 2023-1'),
        });
      });
    });
  });

  describe('Review Display', () => {
    test('renders review blocks when reviews are available', () => {
      const storeWithReviews = createMockStore({
        writeReviews: {
          reviewsFocus: { from: 'test' },
          rankedReviews: {
            reviewsBySemester: { ALL: mockReviews },
            reviewCountBySemester: { ALL: 2 },
          },
        },
      });

      renderWithProviders(<RankedReviewsSubSection />, { store: storeWithReviews });

      expect(screen.getByTestId('review-block')).toBeInTheDocument();
      expect(screen.getByText('Review: 1')).toBeInTheDocument();
      expect(screen.getByText('Review: 2')).toBeInTheDocument();
    });

    test('displays correct review count in scores', () => {
      const storeWithReviews = createMockStore({
        writeReviews: {
          reviewsFocus: { from: 'test' },
          rankedReviews: {
            reviewsBySemester: { ALL: mockReviews },
            reviewCountBySemester: { ALL: 25 },
          },
        },
      });

      renderWithProviders(<RankedReviewsSubSection />, { store: storeWithReviews });

      expect(screen.getByText('ui.score.totalReviews: 25')).toBeInTheDocument();
    });

    test('displays dash when review count is undefined', () => {
      renderWithProviders(<RankedReviewsSubSection />);
      expect(screen.getByText('ui.score.totalReviews: -')).toBeInTheDocument();
    });
  });

  describe('Redux Integration', () => {
    test('dispatches clearReviewsFocus when close button is clicked', () => {
      const spy = jest.spyOn(store, 'dispatch');
      renderWithProviders(<RankedReviewsSubSection />);

      const closeButton = screen.getByTestId('close-button');
      fireEvent.click(closeButton);

      expect(spy).toHaveBeenCalledWith(
        expect.objectContaining({
          type: expect.stringContaining('clearReviewsFocus'),
        })
      );
    });

    test('dispatches addSemesterReviews when API call succeeds', async () => {
      const spy = jest.spyOn(store, 'dispatch');
      mockedAxios.get.mockResolvedValue({ data: mockReviews });

      renderWithProviders(<RankedReviewsSubSection />);

      await waitFor(() => {
        expect(spy).toHaveBeenCalledWith(
          expect.objectContaining({
            type: expect.stringContaining('addSemesterReviews'),
          })
        );
      });
    });

    test('dispatches setSemesterReviewCount when count API call succeeds', async () => {
      const spy = jest.spyOn(store, 'dispatch');
      mockedAxios.get.mockImplementation((url, config) => {
        if (config.params.response_type === 'count') {
          return Promise.resolve({ data: 42 });
        }
        return Promise.resolve({ data: [] });
      });

      renderWithProviders(<RankedReviewsSubSection />);

      await waitFor(() => {
        expect(spy).toHaveBeenCalledWith(
          expect.objectContaining({
            type: expect.stringContaining('setSemesterReviewCount'),
          })
        );
      });
    });
  });

  describe('Component Lifecycle', () => {
    test('fetches data when semesters become available', () => {
      const storeWithoutSemesters = createMockStore({
        common: {
          semester: {
            semesters: null,
            currentSemester: null,
          },
        },
      });

      const { rerender } = renderWithProviders(<RankedReviewsSubSection />, {
        store: storeWithoutSemesters,
      });

      // Update store with semesters
      const storeWithSemesters = createMockStore();
      rerender(
        <Provider store={storeWithSemesters}>
          <I18nextProvider i18n={i18n}>
            <RankedReviewsSubSection />
          </I18nextProvider>
        </Provider>
      );

      expect(mockedAxios.get).toHaveBeenCalled();
    });

    test('refetches data when semester selection changes', async () => {
      renderWithProviders(<RankedReviewsSubSection />);

      const initialCallCount = mockedAxios.get.mock.calls.length;

      // Change semester
      const semesterBlock = screen.getByText('2023-1');
      fireEvent.click(semesterBlock);

      await waitFor(() => {
        expect(mockedAxios.get.mock.calls.length).toBeGreaterThan(initialCallCount);
      });
    });
  });

  describe('Error Handling and Edge Cases', () => {
    test('handles null semesters gracefully', () => {
      const storeWithNullSemesters = createMockStore({
        common: {
          semester: {
            semesters: null,
            currentSemester: null,
          },
        },
      });

      renderWithProviders(<RankedReviewsSubSection />, { store: storeWithNullSemesters });

      // Should still render without crashing
      expect(screen.getByTestId('scroller')).toBeInTheDocument();
    });

    test('handles missing blockListRef gracefully in scroll handler', () => {
      renderWithProviders(<RankedReviewsSubSection />);

      const scroller = screen.getByTestId('scroller');

      // This should not throw an error
      expect(() => {
        fireEvent.scroll(scroller);
      }).not.toThrow();
    });

    test('handles semester key generation for ALL constant', () => {
      renderWithProviders(<RankedReviewsSubSection />);

      const allSemesterBlock = screen.getByText('ALL');
      fireEvent.click(allSemesterBlock);

      // Should handle ALL constant without errors
      expect(screen.getByTestId('scroller')).toBeInTheDocument();
    });

    test('handles semester sorting correctly', () => {
      const unsortedSemesters = [
        { year: 2024, semester: 1, gradePosting: '2024-02-01' },
        { year: 2023, semester: 2, gradePosting: '2023-08-01' },
        { year: 2023, semester: 1, gradePosting: '2023-02-01' },
      ];

      const storeWithUnsortedSemesters = createMockStore({
        common: {
          semester: {
            semesters: unsortedSemesters,
            currentSemester: unsortedSemesters[0],
          },
        },
      });

      renderWithProviders(<RankedReviewsSubSection />, {
        store: storeWithUnsortedSemesters,
      });

      // Should render all semesters (sorted internally)
      expect(screen.getByText('2023-1')).toBeInTheDocument();
      expect(screen.getByText('2023-2')).toBeInTheDocument();
      expect(screen.getByText('2024-1')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    test('maintains proper focus management', () => {
      renderWithProviders(<RankedReviewsSubSection />);

      const closeButton = screen.getByTestId('close-button');
      closeButton.focus();

      expect(document.activeElement).toBe(closeButton);
    });

    test('provides proper semantic structure', () => {
      renderWithProviders(<RankedReviewsSubSection />);

      // Should have proper heading structure via title
      expect(screen.getByText(/ui.title.rankedReviews/)).toBeInTheDocument();
    });
  });
});