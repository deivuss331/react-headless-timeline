import useTimelineProvider from './useTimelineProvider';
import { differenceInMilliseconds } from 'date-fns';
import type { TimelineEvent } from '../types';

const useWidthCalculator = () => {
  const timeline = useTimelineProvider();

  return ({ startDate, endDate }: TimelineEvent) => {
    const timelineDatesDiff: number = Math.abs(
      differenceInMilliseconds(timeline.endDate, timeline.startDate),
    );
    const eventDatesDiff: number = Math.abs(differenceInMilliseconds(endDate, startDate));
    const widthPercentage: number = (eventDatesDiff * 100) / timelineDatesDiff;

    return `${widthPercentage}%`;
  };
};

export default useWidthCalculator;
