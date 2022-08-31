import type { TimelineContextValue } from 'lib/components/TimelineProvider';
import { renderHook } from '@testing-library/react-hooks';
import { set } from 'date-fns';
import { useTimelineContext } from 'lib/components/TimelineProvider';
import { DEFAULT_TIMELINE_DIRECTION } from 'lib/config';
import { ContextProvider } from 'lib/testUtils';

const CURRENT_DATE = new Date();
const TODAY_START = set(CURRENT_DATE, { hours: 0, minutes: 0, seconds: 0, milliseconds: 0 }); // Today 00:00:00
const TODAY_END = set(CURRENT_DATE, { hours: 23, minutes: 59, seconds: 59, milliseconds: 0 }); // Today 23:59:59

describe('TimelineProvider', () => {
  it('Sets correct default timeline direction', () => {
    const { result } = renderHook(() => useTimelineContext(), {
      wrapper: ContextProvider,
      initialProps: {
        startDate: TODAY_START,
        endDate: TODAY_END,
      },
    });

    expect(result.current.direction).toEqual(DEFAULT_TIMELINE_DIRECTION);
  });
});

const CONTEXT_VALUE: TimelineContextValue = {
  startDate: set(CURRENT_DATE, { hours: 10, minutes: 15, seconds: 50 }), // Today 10:15:50
  endDate: set(CURRENT_DATE, { hours: 15, minutes: 40, seconds: 12 }), // Today 15:40:12
  direction: 'vertical',
};

describe('useTimelineContext', () => {
  it('Should return TimelineContext value', () => {
    const { result } = renderHook(() => useTimelineContext(), {
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
    const failMsg = "Hasn't thrown any error!";

    try {
      renderHook(() => useTimelineContext());
      fail(failMsg);
    } catch (err) {
      expect(err).toBeInstanceOf(Error);
      expect(err.message).not.toBe(failMsg);
    }
  });
});
