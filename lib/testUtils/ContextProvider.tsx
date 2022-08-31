import type { WrapperComponent } from '@testing-library/react-hooks';
import type { TimelineContextValue } from 'lib/components/TimelineProvider';
import React from 'react';
import { add } from 'date-fns';
import { TimelineProvider as Provider } from 'lib/components';

const DAYS_IN_WEEK = 7;

const CURRENT_DATE = new Date();
const NEXT_WEEK = add(CURRENT_DATE, { days: DAYS_IN_WEEK });

interface TimelineProviderProps extends Partial<TimelineContextValue> {
  children?: React.ReactElement;
}

function TimelineProvider({
  startDate = CURRENT_DATE,
  endDate = NEXT_WEEK,
  direction,
  children,
}: TimelineProviderProps) {
  return (
    <Provider startDate={startDate} endDate={endDate} direction={direction}>
      {children || <span />}
    </Provider>
  );
}

export default TimelineProvider as WrapperComponent<TimelineProviderProps>;
