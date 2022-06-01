import useTimelineProvider from './useTimelineProvider';
import { differenceInMilliseconds } from 'date-fns';

const useLeftOffsetCalculator = () => {
  const timeline = useTimelineProvider();

  return (startDate: Date) => {
    const timelineDatesDiff: number = Math.abs(
      differenceInMilliseconds(timeline.endDate, timeline.startDate),
    );
    const startDatesDiff: number = Math.abs(differenceInMilliseconds(startDate, timeline.startDate));
    const leftOffsetPercentage: number = (startDatesDiff * 100) / timelineDatesDiff;

    return `${leftOffsetPercentage}%`;
  };
};

export default useLeftOffsetCalculator;
