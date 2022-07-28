import { useState, useEffect } from 'react';
import { addMinutes, differenceInMilliseconds, roundToNearestMinutes } from 'date-fns';
import { useOffsetCalculator, useTimelineProvider } from '../../hooks';

const MILLISECONDS_IN_SECOND: number = 1000;
const SECONDS_IN_MINUTE: number = 60;
const MILLISECONDS_IN_MINUTE: number = SECONDS_IN_MINUTE * MILLISECONDS_IN_SECOND;

const UPDATE_INTERVAL_DEFAULT: UpdateInterval = 'minute';

type UpdateInterval = 'second' | 'minute';

interface RenderProps {
  currentTime: Date;
  styles: React.CSSProperties;
}

interface TimelineCurrentTimeProps {
  updateInterval?: UpdateInterval;
  render: (props: RenderProps) => JSX.Element | null;
}

function TimelineCurrentTime({ updateInterval = UPDATE_INTERVAL_DEFAULT, render }: TimelineCurrentTimeProps) {
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  const { direction } = useTimelineProvider();
  const calcOffset = useOffsetCalculator();

  const isSecondInterval: boolean = updateInterval === 'second';
  const isHorizontalTimeline: boolean = direction === 'horizontal';

  useEffect(() => {
    const now: Date = new Date();
    const nearestMinFromNow: Date = roundToNearestMinutes(now);
    const nextFullMinuteFromNow =
      +nearestMinFromNow < +now ? addMinutes(nearestMinFromNow, 1) : nearestMinFromNow;
    const nowToNextFullMinuteInMilliseconds: number = Math.abs(
      differenceInMilliseconds(now, nextFullMinuteFromNow),
    );

    let interval: NodeJS.Timer | undefined = isSecondInterval
      ? setInterval(() => setCurrentTime(new Date()), MILLISECONDS_IN_SECOND)
      : undefined;

    const timeout: NodeJS.Timeout | undefined = isSecondInterval
      ? undefined
      : setTimeout(() => {
          interval = setInterval(() => setCurrentTime(new Date()), MILLISECONDS_IN_MINUTE);
          setCurrentTime(new Date());
        }, nowToNextFullMinuteInMilliseconds);

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [updateInterval]);

  const styles: React.CSSProperties = {
    position: 'absolute',
    ...(isHorizontalTimeline ? { left: calcOffset(currentTime) } : { top: calcOffset(currentTime) }),
  };

  return render({ currentTime, styles });
}

export default TimelineCurrentTime;
