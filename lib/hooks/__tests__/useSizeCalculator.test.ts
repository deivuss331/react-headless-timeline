import { renderHook } from '@testing-library/react-hooks';
import { differenceInMilliseconds, set } from 'date-fns';
import { ContextProvider } from 'lib/testUtils';
import useSizeCalculator from '../useSizeCalculator';

const CURRENT_DATE = new Date();
const TODAY_START = set(CURRENT_DATE, { hours: 0, minutes: 0, seconds: 0, milliseconds: 0 }); // Today 00:00:00
const TODAY_END = set(CURRENT_DATE, { hours: 23, minutes: 59, seconds: 59, milliseconds: 0 }); // Today 23:59:59

const EXAMPLE_EVENT = {
  startDate: set(CURRENT_DATE, { hours: 10, minutes: 0, seconds: 30 }), // Today 10:00:30
  endDate: set(CURRENT_DATE, { hours: 15, minutes: 30, seconds: 39 }), // Today 15:30:39
};

const getExpectedOffset = (eventStartDate: Date, eventEndDate: Date) => {
  const timelineDatesDiff = Math.abs(differenceInMilliseconds(TODAY_END, TODAY_START));
  const eventDatesDiff = Math.abs(differenceInMilliseconds(eventEndDate, eventStartDate));
  const sizePercentage = (eventDatesDiff * 100) / timelineDatesDiff;

  return `${sizePercentage}%`;
};

describe('useSizeCalculator', () => {
  test('Returns size calculator function', () => {
    const { result } = renderHook(() => useSizeCalculator(), {
      wrapper: ContextProvider,
      initialProps: {
        startDate: TODAY_START,
        endDate: TODAY_END,
      },
    });

    expect(result.current).toBeInstanceOf(Function);

    const expectedResult = getExpectedOffset(EXAMPLE_EVENT.startDate, EXAMPLE_EVENT.endDate);
    const currentResult = result.current(EXAMPLE_EVENT);

    expect(expectedResult).toEqual(currentResult);
  });
});
