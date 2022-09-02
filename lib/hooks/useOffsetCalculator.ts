import { differenceInMilliseconds } from 'date-fns';
import { useTimelineContext } from 'lib/components/TimelineProvider';

/**
 * Calculates item offset
 *
 * @returns
 * - CSS `top` property for vertical timeline
 * - CSS `left` property for horizontal timeline
 */
const useOffsetCalculator = () => {
  const timeline = useTimelineContext();

  return (startDate: Date) => {
    const timelineDatesDiff = Math.abs(differenceInMilliseconds(timeline.endDate, timeline.startDate));
    const startDatesDiff = Math.abs(differenceInMilliseconds(startDate, timeline.startDate));
    const offsetPercentage = (startDatesDiff * 100) / timelineDatesDiff;

    return `${offsetPercentage}%`;
  };
};

export default useOffsetCalculator;
