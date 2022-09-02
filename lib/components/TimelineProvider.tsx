import type { TimelineDirection } from 'lib/types';
import React, { createContext, useContext } from 'react';
import { LibError } from 'lib/utils';
import { DEFAULT_TIMELINE_DIRECTION } from 'lib/config';

export interface TimelineContextValue {
  startDate: Date;
  endDate: Date;
  direction: TimelineDirection;
}

export const TimelineCtx = createContext<TimelineContextValue | undefined>(undefined);

interface TimelineProviderProps {
  children: React.ReactElement;
  startDate: TimelineContextValue['startDate'];
  endDate: TimelineContextValue['endDate'];
  direction?: TimelineContextValue['direction'];
}

export default function TimelineProvider({
  children,
  startDate,
  endDate,
  direction = DEFAULT_TIMELINE_DIRECTION,
}: TimelineProviderProps) {
  return (
    <TimelineCtx.Provider
      value={{
        startDate,
        endDate,
        direction,
      }}
    >
      {children}
    </TimelineCtx.Provider>
  );
}

export const useTimelineContext = () => {
  const value = useContext(TimelineCtx);

  if (!value) {
    throw new LibError('"useTimelineContext" cannot be used outside of the TimelineCtx!');
  }

  return value;
};
