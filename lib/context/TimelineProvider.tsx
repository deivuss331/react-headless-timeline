import React, { createContext } from 'react';
import type { TimelineDirection } from '../types';
import { DEFAULT_TIMELINE_DIRECTION } from '../config/constants';

export interface TimelineContextValue {
  startDate: Date;
  endDate: Date;
  direction: TimelineDirection;
}

export const TimelineCtx = createContext<TimelineContextValue | undefined>(undefined);

interface IProviderProps {
  children: React.ReactElement;
  startDate: TimelineContextValue['startDate'];
  endDate: TimelineContextValue['endDate'];
  direction?: TimelineContextValue['direction'];
}

function TimelineProvider({
  children,
  startDate,
  endDate,
  direction = DEFAULT_TIMELINE_DIRECTION,
}: IProviderProps): JSX.Element {
  const value: TimelineContextValue = {
    startDate,
    endDate,
    direction,
  };

  return <TimelineCtx.Provider value={value}>{children}</TimelineCtx.Provider>;
}

export default TimelineProvider;
