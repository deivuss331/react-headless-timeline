import type { CSSProperties } from 'react';
import { useState, useEffect } from 'react';
import { addMinutes, differenceInMilliseconds, roundToNearestMinutes } from 'date-fns';
import { useOffsetCalculator } from 'lib/hooks';
import { useTimelineContext } from 'lib/components/TimelineProvider';

const MILLISECONDS_IN_SECOND = 1000;
const SECONDS_IN_MINUTE = 60;
const MILLISECONDS_IN_MINUTE = SECONDS_IN_MINUTE * MILLISECONDS_IN_SECOND;

const DEFAULT_UPDATE_INTERVAL: NonNullable<TimelineCurrentTimeProps['updateInterval']> = 'minute';

interface TimelineCurrentTimeProps {
  updateInterval?: 'second' | 'minute';
  render: (props: { currentTime: Date; styles: CSSProperties }) => JSX.Element | null;
}

export default function TimelineCurrentTime({
  updateInterval = DEFAULT_UPDATE_INTERVAL,
  render,
}: TimelineCurrentTimeProps) {
  const [currentTime, setCurrentTime] = useState(new Date());
  const { direction } = useTimelineContext();
  const calcOffset = useOffsetCalculator();

  const isSecondInterval = updateInterval === 'second';
  const isHorizontalTimeline = direction === 'horizontal';

  useEffect(() => {
    const now = new Date();
    const nearestMinFromNow = roundToNearestMinutes(now);
    const nextFullMinuteFromNow =
      +nearestMinFromNow < +now ? addMinutes(nearestMinFromNow, 1) : nearestMinFromNow;
    const nowToNextFullMinuteInMilliseconds = Math.abs(differenceInMilliseconds(now, nextFullMinuteFromNow));

    let interval = isSecondInterval
      ? setInterval(() => setCurrentTime(new Date()), MILLISECONDS_IN_SECOND)
      : undefined;

    const timeout = isSecondInterval
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

  const styles: CSSProperties = {
    position: 'absolute',
    ...(isHorizontalTimeline ? { left: calcOffset(currentTime) } : { top: calcOffset(currentTime) }),
  };

  return render({ currentTime, styles });
}
