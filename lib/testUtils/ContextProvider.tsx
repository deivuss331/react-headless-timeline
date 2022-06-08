import React from 'react';
import type { WrapperComponent } from '@testing-library/react-hooks';
import { add } from 'date-fns';
import { TimelineProvider as Provider } from '../context';
import type { TimelineContextValue } from '../context/TimelineProvider';

const CURRENT_DATE: Date = new Date();
const NEXT_WEEK: Date = add(CURRENT_DATE, { days: 7 });

interface TimelineProviderProps extends Partial<TimelineContextValue> {
  children?: React.ReactElement;
}

function TimelineProvider({
  startDate = CURRENT_DATE,
  endDate = NEXT_WEEK,
  direction,
  children,
}: TimelineProviderProps): JSX.Element {
  return (
    <Provider startDate={startDate} endDate={endDate} direction={direction}>
      {children || <span />}
    </Provider>
  );
}

export default TimelineProvider as WrapperComponent<TimelineProviderProps>;
