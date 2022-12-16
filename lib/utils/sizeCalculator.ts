import type { TimelineEvent } from 'lib/types';
import type { TimelineContextValue } from 'lib/components/TimelineProvider';
import { differenceInMilliseconds } from 'date-fns';

export default function sizeCalculator(timeline: TimelineContextValue) {
  return ({ startDate, endDate }: TimelineEvent): React.CSSProperties => {
    const timelineDatesDiff = Math.abs(differenceInMilliseconds(timeline.endDate, timeline.startDate));
    const eventDatesDiff = Math.abs(differenceInMilliseconds(endDate, startDate));
    const sizePercentage = (eventDatesDiff * 100) / timelineDatesDiff;

    return {
      [timeline.direction === 'horizontal' ? 'width' : 'height']: `${sizePercentage}%`,
    };
  };
}
