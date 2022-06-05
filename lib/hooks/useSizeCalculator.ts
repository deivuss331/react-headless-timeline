import useTimelineProvider from './useTimelineProvider';
import { differenceInMilliseconds } from 'date-fns';
import type { TimelineEvent } from '../types';

/**
 * Calculates item size - width or height
 */
const useSizeCalculator = () => {
  const timeline = useTimelineProvider();

  return ({ startDate, endDate }: TimelineEvent) => {
    const timelineDatesDiff: number = Math.abs(
      differenceInMilliseconds(timeline.endDate, timeline.startDate),
    );
    const eventDatesDiff: number = Math.abs(differenceInMilliseconds(endDate, startDate));
    const sizePercentage: number = (eventDatesDiff * 100) / timelineDatesDiff;

    return `${sizePercentage}%`;
  };
};

export default useSizeCalculator;
