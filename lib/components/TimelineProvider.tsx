import type { TimelineDirection } from 'lib/types';
import React, { useContext, useMemo, createContext } from 'react';
import { LibError } from 'lib/utils';
import { DEFAULT_TIMELINE_DIRECTION } from 'lib/config';

export interface TimelineContextValue {
  startDate: Date;
  endDate: Date;
  direction: TimelineDirection;
}

export const TimelineCtx = createContext<TimelineContextValue | null>(null);

TimelineCtx.displayName = 'TimelineContext';

interface TimelineProviderProps extends Omit<TimelineContextValue, 'direction'> {
  children: React.ReactElement;
  direction?: TimelineContextValue['direction'];
}

export default function TimelineProvider({
  startDate,
  endDate,
  direction = DEFAULT_TIMELINE_DIRECTION,
  children,
}: TimelineProviderProps) {
  const value = useMemo<TimelineContextValue>(
    () => ({
      startDate,
      endDate,
      direction,
    }),
    [startDate, endDate, direction],
  );

  return <TimelineCtx.Provider value={value}>{children}</TimelineCtx.Provider>;
}

export const useTimelineContext = () => {
  const value = useContext(TimelineCtx);

  if (!value) {
    throw new LibError('"useTimelineContext" cannot be used outside of the TimelineContext!');
  }

  return value;
};
