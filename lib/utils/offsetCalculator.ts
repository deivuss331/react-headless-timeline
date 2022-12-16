import type { TimelineContextValue } from 'lib/components/TimelineProvider';
import { differenceInMilliseconds } from 'date-fns';

export default function offsetCalculator(timeline: TimelineContextValue) {
  return (startDate: Date): React.CSSProperties => {
    const timelineDatesDiff = Math.abs(differenceInMilliseconds(timeline.endDate, timeline.startDate));
    const startDatesDiff = Math.abs(differenceInMilliseconds(startDate, timeline.startDate));
    const offsetPercentage = (startDatesDiff * 100) / timelineDatesDiff;

    return {
      [timeline.direction === 'horizontal' ? 'left' : 'top']: `${offsetPercentage}%`,
    };
  };
}
