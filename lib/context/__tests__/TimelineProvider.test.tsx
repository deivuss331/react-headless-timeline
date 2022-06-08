import { renderHook } from '@testing-library/react-hooks';
import { set } from 'date-fns';
import { DEFAULT_TIMELINE_DIRECTION } from '../../config/constants';
import { ContextProvider } from '../../testUtils';
import { useTimelineProvider } from '../../hooks';

const CURRENT_DATE: Date = new Date();
const TODAY_START: Date = set(CURRENT_DATE, { hours: 0, minutes: 0, seconds: 0, milliseconds: 0 }); // Today 00:00:00
const TODAY_END: Date = set(CURRENT_DATE, { hours: 23, minutes: 59, seconds: 59, milliseconds: 0 }); // Today 23:59:59

describe('TimelineProvider', () => {
  it('Sets correct default timeline direction', () => {
    const { result } = renderHook(() => useTimelineProvider(), {
      wrapper: ContextProvider,
      initialProps: {
        startDate: TODAY_START,
        endDate: TODAY_END,
      },
    });

    expect(result.current.direction).toEqual(DEFAULT_TIMELINE_DIRECTION);
  });
});
