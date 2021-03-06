import useTimelineProvider from './useTimelineProvider';
import { differenceInMilliseconds } from 'date-fns';

/**
 * Calculates item offset
 * - CSS `top` property for vertical timeline
 * - CSS `left` property for horizontal timeline
 */
const useOffsetCalculator = () => {
  const timeline = useTimelineProvider();

  return (startDate: Date) => {
    const timelineDatesDiff: number = Math.abs(
      differenceInMilliseconds(timeline.endDate, timeline.startDate),
    );
    const startDatesDiff: number = Math.abs(differenceInMilliseconds(startDate, timeline.startDate));
    const offsetPercentage: number = (startDatesDiff * 100) / timelineDatesDiff;

    return `${offsetPercentage}%`;
  };
};

export default useOffsetCalculator;
