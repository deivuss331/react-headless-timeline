import { renderHook } from '@testing-library/react-hooks';
import { set } from 'date-fns';
import type { TimelineContextValue } from '../../context/TimelineProvider';
import { ContextProvider } from '../../testUtils';
import useTimelineProvider from '../useTimelineProvider';

const CURRENT_DATE: Date = new Date();
const CONTEXT_VALUE: TimelineContextValue = {
  startDate: set(CURRENT_DATE, { hours: 10, minutes: 15, seconds: 50 }), // Today 10:15:50
  endDate: set(CURRENT_DATE, { hours: 15, minutes: 40, seconds: 12 }), // Today 15:40:12
  direction: 'vertical',
};

describe('useTimelineProvider', () => {
  it('Should return TimelineProvider value', () => {
    const { result } = renderHook(() => useTimelineProvider(), {
      wrapper: ContextProvider,
      initialProps: {
        ...CONTEXT_VALUE,
      },
    });

    const ctxValueKeys = Object.keys(CONTEXT_VALUE) as (keyof TimelineContextValue)[];

    ctxValueKeys.forEach((key) => {
      expect(result.current[key]).toEqual(CONTEXT_VALUE[key]);
    });
  });

  it('Should throw LibError if used outside of the TimelineContext', () => {
    const failMsg: string = "Hasn't thrown any error!";

    try {
      renderHook(() => useTimelineProvider());
      fail(failMsg);
    } catch (err) {
      expect(err).toBeInstanceOf(Error);
      expect(err.message).not.toBe(failMsg);
    }
  });
});
