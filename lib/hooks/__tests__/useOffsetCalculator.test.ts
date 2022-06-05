import { renderHook } from '@testing-library/react-hooks';
import { differenceInMilliseconds, set } from 'date-fns';
import { ContextProvider } from '../../testUtils';
import useOffsetCalculator from '../useOffsetCalculator';

const CURRENT_DATE: Date = new Date();
const TODAY_START: Date = set(CURRENT_DATE, { hours: 0, minutes: 0, seconds: 0, milliseconds: 0 }); // Today 00:00:00
const TODAY_END: Date = set(CURRENT_DATE, { hours: 23, minutes: 59, seconds: 59, milliseconds: 0 }); // Today 23:59:59

const EXAMPLE_EVENT = {
  startDate: set(CURRENT_DATE, { hours: 10, minutes: 0, seconds: 30 }), // Today 10:00:30
  endDate: set(CURRENT_DATE, { hours: 15, minutes: 30, seconds: 39 }), // Today 15:30:39
};

const getExpectedOffset = (eventStartDate: Date): string => {
  const timelineDatesDiff: number = Math.abs(differenceInMilliseconds(TODAY_END, TODAY_START));
  const startDatesDiff: number = Math.abs(differenceInMilliseconds(eventStartDate, TODAY_START));
  const offsetPercentage: number = (startDatesDiff * 100) / timelineDatesDiff;

  return `${offsetPercentage}%`;
};

describe('useOffsetCalculator', () => {
  test('Returns offset calculator function', () => {
    const { result } = renderHook(() => useOffsetCalculator(), {
      wrapper: ContextProvider,
      initialProps: {
        startDate: TODAY_START,
        endDate: TODAY_END,
      },
    });

    expect(result.current).toBeInstanceOf(Function);

    const expectedResult = getExpectedOffset(EXAMPLE_EVENT.startDate);
    const currentResult = result.current(EXAMPLE_EVENT.startDate);

    expect(expectedResult).toEqual(currentResult);
  });
});
