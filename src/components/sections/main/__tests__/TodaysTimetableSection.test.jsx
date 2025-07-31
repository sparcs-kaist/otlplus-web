/* eslint-disable */
/* eslint-env jest */
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { jest } from '@jest/globals';
import TodaysTimetableSection from '../TodaysTimetableSection';

// Mock external dependencies
jest.mock('../../../hooks/useTimetable', () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock('../../../utils/dateUtils', () => ({
  formatTime: jest.fn((time) => time),
  isCurrentTime: jest.fn(() => false),
  getCurrentDate: jest.fn(() => '2024-01-15'),
}));

describe('TodaysTimetableSection', () => {
  const mockUseTimetable = require('../../../hooks/useTimetable').default;
  const { formatTime, isCurrentTime, getCurrentDate } = require('../../../utils/dateUtils');

  beforeEach(() => {
    jest.clearAllMocks();
    getCurrentDate.mockReturnValue('2024-01-15');
  });

  describe('Component Rendering', () => {
    it('should render without crashing', () => {
      mockUseTimetable.mockReturnValue({
        timetable: [],
        loading: false,
        error: null,
      });

      render(<TodaysTimetableSection />);
      expect(screen.getByRole('region')).toBeInTheDocument();
    });

    it('should render section title correctly', () => {
      mockUseTimetable.mockReturnValue({
        timetable: [],
        loading: false,
        error: null,
      });

      render(<TodaysTimetableSection />);
      expect(screen.getByText(/today's timetable/i)).toBeInTheDocument();
    });

    it('should apply correct CSS classes', () => {
      mockUseTimetable.mockReturnValue({
        timetable: [],
        loading: false,
        error: null,
      });

      const { container } = render(<TodaysTimetableSection />);
      const section = container.querySelector('section');
      expect(section).toHaveClass('todays-timetable-section');
    });
  });

  describe('Loading State', () => {
    it('should display loading spinner when loading is true', () => {
      mockUseTimetable.mockReturnValue({
        timetable: [],
        loading: true,
        error: null,
      });

      render(<TodaysTimetableSection />);
      expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
    });

    it('should not display timetable content when loading', () => {
      mockUseTimetable.mockReturnValue({
        timetable: [{ id: 1, subject: 'Math', time: '09:00' }],
        loading: true,
        error: null,
      });

      render(<TodaysTimetableSection />);
      expect(screen.queryByText('Math')).not.toBeInTheDocument();
    });

    it('should hide loading spinner when loading is false', () => {
      mockUseTimetable.mockReturnValue({
        timetable: [],
        loading: false,
        error: null,
      });

      render(<TodaysTimetableSection />);
      expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
    });
  });

  describe('Error Handling', () => {
    it('should display error message when error exists', () => {
      const errorMessage = 'Failed to load timetable';
      mockUseTimetable.mockReturnValue({
        timetable: [],
        loading: false,
        error: new Error(errorMessage),
      });

      render(<TodaysTimetableSection />);
      expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });

    it('should display generic error message for unknown errors', () => {
      mockUseTimetable.mockReturnValue({
        timetable: [],
        loading: false,
        error: {},
      });

      render(<TodaysTimetableSection />);
      expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
    });

    it('should not display timetable when error exists', () => {
      mockUseTimetable.mockReturnValue({
        timetable: [{ id: 1, subject: 'Math', time: '09:00' }],
        loading: false,
        error: new Error('Network error'),
      });

      render(<TodaysTimetableSection />);
      expect(screen.queryByText('Math')).not.toBeInTheDocument();
    });

    it('should provide retry functionality on error', () => {
      const mockRefresh = jest.fn();
      mockUseTimetable.mockReturnValue({
        timetable: [],
        loading: false,
        error: new Error('Network error'),
        refresh: mockRefresh,
      });

      render(<TodaysTimetableSection />);
      const retryButton = screen.getByText(/retry/i);
      fireEvent.click(retryButton);
      expect(mockRefresh).toHaveBeenCalledTimes(1);
    });
  });

  describe('Empty State', () => {
    it('should display empty state message when no timetable items', () => {
      mockUseTimetable.mockReturnValue({
        timetable: [],
        loading: false,
        error: null,
      });

      render(<TodaysTimetableSection />);
      expect(screen.getByText(/no classes scheduled for today/i)).toBeInTheDocument();
    });

    it('should display appropriate icon for empty state', () => {
      mockUseTimetable.mockReturnValue({
        timetable: [],
        loading: false,
        error: null,
      });

      render(<TodaysTimetableSection />);
      expect(screen.getByTestId('empty-calendar-icon')).toBeInTheDocument();
    });
  });

  describe('Timetable Content', () => {
    const mockTimetableData = [
      {
        id: 1,
        subject: 'Mathematics',
        time: '09:00',
        duration: 60,
        teacher: 'Mr. Smith',
        room: 'A101',
      },
      {
        id: 2,
        subject: 'Physics',
        time: '10:30',
        duration: 90,
        teacher: 'Dr. Johnson',
        room: 'B205',
      },
      {
        id: 3,
        subject: 'Chemistry',
        time: '13:00',
        duration: 45,
        teacher: 'Ms. Wilson',
        room: 'C301',
      },
    ];

    beforeEach(() => {
      formatTime.mockImplementation((time) => time);
    });

    it('should render all timetable items', () => {
      mockUseTimetable.mockReturnValue({
        timetable: mockTimetableData,
        loading: false,
        error: null,
      });

      render(<TodaysTimetableSection />);
      expect(screen.getByText('Mathematics')).toBeInTheDocument();
      expect(screen.getByText('Physics')).toBeInTheDocument();
      expect(screen.getByText('Chemistry')).toBeInTheDocument();
    });

    it('should display formatted time for each item', () => {
      formatTime.mockImplementation((time) => `${time} AM`);
      mockUseTimetable.mockReturnValue({
        timetable: mockTimetableData,
        loading: false,
        error: null,
      });

      render(<TodaysTimetableSection />);
      expect(screen.getByText('09:00 AM')).toBeInTheDocument();
      expect(screen.getByText('10:30 AM')).toBeInTheDocument();
    });

    it('should display teacher information', () => {
      mockUseTimetable.mockReturnValue({
        timetable: mockTimetableData,
        loading: false,
        error: null,
      });

      render(<TodaysTimetableSection />);
      expect(screen.getByText('Mr. Smith')).toBeInTheDocument();
      expect(screen.getByText('Dr. Johnson')).toBeInTheDocument();
      expect(screen.getByText('Ms. Wilson')).toBeInTheDocument();
    });

    it('should display room information', () => {
      mockUseTimetable.mockReturnValue({
        timetable: mockTimetableData,
        loading: false,
        error: null,
      });

      render(<TodaysTimetableSection />);
      expect(screen.getByText('A101')).toBeInTheDocument();
      expect(screen.getByText('B205')).toBeInTheDocument();
      expect(screen.getByText('C301')).toBeInTheDocument();
    });

    it('should display duration information', () => {
      mockUseTimetable.mockReturnValue({
        timetable: mockTimetableData,
        loading: false,
        error: null,
      });

      render(<TodaysTimetableSection />);
      expect(screen.getByText('60 min')).toBeInTheDocument();
      expect(screen.getByText('90 min')).toBeInTheDocument();
      expect(screen.getByText('45 min')).toBeInTheDocument();
    });
  });

  describe('Current Time Highlighting', () => {
    const mockTimetableData = [
      { id: 1, subject: 'Mathematics', time: '09:00', duration: 60 },
      { id: 2, subject: 'Physics', time: '10:30', duration: 90 },
    ];

    it('should highlight current class', () => {
      isCurrentTime.mockImplementation((time) => time === '09:00');
      mockUseTimetable.mockReturnValue({
        timetable: mockTimetableData,
        loading: false,
        error: null,
      });

      render(<TodaysTimetableSection />);
      const mathClass = screen.getByText('Mathematics').closest('.timetable-item');
      expect(mathClass).toHaveClass('current-class');
    });

    it('should not highlight non-current classes', () => {
      isCurrentTime.mockImplementation(() => false);
      mockUseTimetable.mockReturnValue({
        timetable: mockTimetableData,
        loading: false,
        error: null,
      });

      render(<TodaysTimetableSection />);
      const mathClass = screen.getByText('Mathematics').closest('.timetable-item');
      expect(mathClass).not.toHaveClass('current-class');
    });

    it('should update highlighting when time changes', async () => {
      isCurrentTime.mockImplementation((time) => time === '09:00');
      mockUseTimetable.mockReturnValue({
        timetable: mockTimetableData,
        loading: false,
        error: null,
      });

      const { rerender } = render(<TodaysTimetableSection />);

      isCurrentTime.mockImplementation((time) => time === '10:30');
      rerender(<TodaysTimetableSection />);

      await waitFor(() => {
        const physicsClass = screen.getByText('Physics').closest('.timetable-item');
        expect(physicsClass).toHaveClass('current-class');
      });
    });
  });

  describe('Interactive Features', () => {
    const mockTimetableData = [
      { id: 1, subject: 'Mathematics', time: '09:00', duration: 60, clickable: true },
    ];

    it('should handle item clicks when clickable', () => {
      const mockOnItemClick = jest.fn();
      mockUseTimetable.mockReturnValue({
        timetable: mockTimetableData,
        loading: false,
        error: null,
        onItemClick: mockOnItemClick,
      });

      render(<TodaysTimetableSection />);
      const mathItem = screen.getByText('Mathematics');
      fireEvent.click(mathItem);
      expect(mockOnItemClick).toHaveBeenCalledWith(mockTimetableData[0]);
    });

    it('should show hover effects on interactive items', () => {
      mockUseTimetable.mockReturnValue({
        timetable: mockTimetableData,
        loading: false,
        error: null,
      });

      render(<TodaysTimetableSection />);
      const mathItem = screen.getByText('Mathematics').closest('.timetable-item');
      fireEvent.mouseEnter(mathItem);
      expect(mathItem).toHaveClass('hovered');
    });

    it('should support keyboard navigation', () => {
      mockUseTimetable.mockReturnValue({
        timetable: mockTimetableData,
        loading: false,
        error: null,
      });

      render(<TodaysTimetableSection />);
      const mathItem = screen.getByText('Mathematics');
      mathItem.focus();
      expect(mathItem).toHaveFocus();

      fireEvent.keyDown(mathItem, { key: 'Enter' });
      // Verify Enter key handling if applicable
    });
  });

  describe('Accessibility', () => {
    const mockTimetableData = [
      { id: 1, subject: 'Mathematics', time: '09:00', duration: 60 },
    ];

    it('should have proper ARIA labels', () => {
      mockUseTimetable.mockReturnValue({
        timetable: mockTimetableData,
        loading: false,
        error: null,
      });

      render(<TodaysTimetableSection />);
      expect(screen.getByRole('region')).toHaveAttribute('aria-label', "Today's timetable");
    });

    it('should have proper heading structure', () => {
      mockUseTimetable.mockReturnValue({
        timetable: mockTimetableData,
        loading: false,
        error: null,
      });

      render(<TodaysTimetableSection />);
      expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument();
    });

    it('should provide screen reader friendly time announcements', () => {
      mockUseTimetable.mockReturnValue({
        timetable: mockTimetableData,
        loading: false,
        error: null,
      });

      render(<TodaysTimetableSection />);
      expect(screen.getByText('09:00')).toHaveAttribute(
        'aria-label',
        expect.stringContaining('9:00'),
      );
    });

    it('should support high contrast mode', () => {
      mockUseTimetable.mockReturnValue({
        timetable: mockTimetableData,
        loading: false,
        error: null,
      });

      const { container } = render(<TodaysTimetableSection />);
      const section = container.querySelector('section');
      expect(section).toHaveAttribute('data-high-contrast', 'supported');
    });
  });

  describe('Performance and Optimization', () => {
    it('should memoize timetable items to prevent unnecessary re-renders', () => {
      const mockTimetableData = [
        { id: 1, subject: 'Mathematics', time: '09:00' },
      ];

      mockUseTimetable.mockReturnValue({
        timetable: mockTimetableData,
        loading: false,
        error: null,
      });

      const { rerender } = render(<TodaysTimetableSection />);
      const initialRender = screen.getByText('Mathematics');

      rerender(<TodaysTimetableSection />);
      const secondRender = screen.getByText('Mathematics');

      // Verify memoization is working (implementation-specific)
      expect(initialRender).toBe(secondRender);
    });

    it('should handle large timetable datasets efficiently', () => {
      const largeTimetableData = Array.from({ length: 100 }, (_, i) => ({
        id: i + 1,
        subject: `Subject ${i + 1}`,
        time: `${9 + (i % 8)}:00`,
        duration: 60,
      }));

      mockUseTimetable.mockReturnValue({
        timetable: largeTimetableData,
        loading: false,
        error: null,
      });

      const startTime = performance.now();
      render(<TodaysTimetableSection />);
      const endTime = performance.now();

      expect(endTime - startTime).toBeLessThan(1000); // Should render in under 1 second
    });
  });

  describe('Edge Cases and Error Boundaries', () => {
    it('should handle malformed timetable data gracefully', () => {
      const malformedData = [
        { id: 1, subject: null, time: undefined },
        { id: 2, subject: '', time: 'invalid-time' },
        {
          /* missing required fields */
        },
      ];

      mockUseTimetable.mockReturnValue({
        timetable: malformedData,
        loading: false,
        error: null,
      });

      expect(() => render(<TodaysTimetableSection />)).not.toThrow();
    });

    it('should handle missing hook data', () => {
      mockUseTimetable.mockReturnValue(null);
      expect(() => render(<TodaysTimetableSection />)).not.toThrow();
    });

    it('should handle undefined timetable array', () => {
      mockUseTimetable.mockReturnValue({
        timetable: undefined,
        loading: false,
        error: null,
      });

      render(<TodaysTimetableSection />);
      expect(screen.getByText(/no classes scheduled/i)).toBeInTheDocument();
    });

    it('should handle network timeouts gracefully', async () => {
      const timeoutError = new Error('Request timeout');
      timeoutError.code = 'TIMEOUT';

      mockUseTimetable.mockReturnValue({
        timetable: [],
        loading: false,
        error: timeoutError,
      });

      render(<TodaysTimetableSection />);
      expect(screen.getByText(/connection timeout/i)).toBeInTheDocument();
    });
  });

  describe('Data Formatting and Display', () => {
    it('should handle different time formats correctly', () => {
      const timeFormats = [
        { time: '09:00', expected: '9:00 AM' },
        { time: '13:30', expected: '1:30 PM' },
        { time: '00:00', expected: '12:00 AM' },
      ];

      timeFormats.forEach(({ time, expected }) => {
        formatTime.mockReturnValue(expected);
        mockUseTimetable.mockReturnValue({
          timetable: [{ id: 1, subject: 'Test', time }],
          loading: false,
          error: null,
        });

        const { unmount } = render(<TodaysTimetableSection />);
        expect(screen.getByText(expected)).toBeInTheDocument();
        unmount();
      });
    });

    it('should handle subjects with special characters', () => {
      mockUseTimetable.mockReturnValue({
        timetable: [
          { id: 1, subject: 'Physics & Chemistry', time: '09:00' },
          { id: 2, subject: 'Math - Advanced', time: '10:00' },
          { id: 3, subject: 'English (Literature)', time: '11:00' },
        ],
        loading: false,
        error: null,
      });

      render(<TodaysTimetableSection />);
      expect(screen.getByText('Physics & Chemistry')).toBeInTheDocument();
      expect(screen.getByText('Math - Advanced')).toBeInTheDocument();
      expect(screen.getByText('English (Literature)')).toBeInTheDocument();
    });

    it('should truncate long subject names appropriately', () => {
      const longSubject = 'Very Long Subject Name That Should Be Truncated For Display';
      mockUseTimetable.mockReturnValue({
        timetable: [{ id: 1, subject: longSubject, time: '09:00' }],
        loading: false,
        error: null,
      });

      render(<TodaysTimetableSection />);
      const subjectElement = screen.getByText(longSubject, { exact: false });
      expect(subjectElement).toHaveAttribute('title', longSubject);
    });
  });
});