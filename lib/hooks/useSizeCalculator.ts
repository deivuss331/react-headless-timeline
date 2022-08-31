import type { TimelineEvent } from 'lib/types';
import { differenceInMilliseconds } from 'date-fns';
import { useTimelineContext } from 'lib/components/TimelineProvider';

/**
 * Calculates item size
 * - CSS `height` property for vertical timeline
 * - CSS `width` property for horizontal timeline
 */
const useSizeCalculator = () => {
  const timeline = useTimelineContext();

  return ({ startDate, endDate }: TimelineEvent) => {
    const timelineDatesDiff = Math.abs(differenceInMilliseconds(timeline.endDate, timeline.startDate));
    const eventDatesDiff = Math.abs(differenceInMilliseconds(endDate, startDate));
    const sizePercentage = (eventDatesDiff * 100) / timelineDatesDiff;

    return `${sizePercentage}%`;
  };
};

export default useSizeCalculator;
