import type { CSSProperties } from 'react';
import { useState, useEffect } from 'react';
import { useTimelineContext } from 'lib/components/TimelineProvider';
import {
  addMinutes,
  differenceInMilliseconds,
  roundToNearestMinutes,
  secondsToMilliseconds,
  minutesToMilliseconds,
} from 'date-fns';
import offsetCalculator from 'lib/utils/offsetCalculator';

interface TimelineCurrentTimeProps {
  render: (props: { currentTime: Date; styles: CSSProperties }) => JSX.Element | null;
  updateInterval?: 'second' | 'minute';
}

export default function TimelineCurrentTime({ updateInterval = 'minute', render }: TimelineCurrentTimeProps) {
  const [currentTime, setCurrentTime] = useState(new Date());
  const timeline = useTimelineContext();

  const calcOffset = offsetCalculator(timeline);

  const isSecondInterval = updateInterval === 'second';

  useEffect(() => {
    const now = new Date();
    const nearestMinFromNow = roundToNearestMinutes(now);
    const nextFullMinuteFromNow =
      +nearestMinFromNow < +now ? addMinutes(nearestMinFromNow, 1) : nearestMinFromNow;
    const nowToNextFullMinuteInMilliseconds = Math.abs(differenceInMilliseconds(now, nextFullMinuteFromNow));

    const updateCurrentTime = () => setCurrentTime(roundToNearestMinutes(new Date()));

    let interval = isSecondInterval ? setInterval(updateCurrentTime, secondsToMilliseconds(1)) : undefined;

    const timeout = isSecondInterval
      ? undefined
      : setTimeout(() => {
          interval = setInterval(updateCurrentTime, minutesToMilliseconds(1));
          updateCurrentTime();
        }, nowToNextFullMinuteInMilliseconds);

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [updateInterval, isSecondInterval]);

  const styles: CSSProperties = {
    position: 'absolute',
    ...calcOffset(currentTime),
  };

  return render({ currentTime, styles });
}
