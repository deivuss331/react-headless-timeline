import { useState, useEffect } from 'react';
import { addMinutes, differenceInMilliseconds, roundToNearestMinutes } from 'date-fns';
import { useLeftOffsetCalculator } from '../hooks';

const MILLISECONDS_IN_SECOND: number = 1000;
const SECONDS_IN_MINUTE: number = 60;
const MINUTE_AS_MILLISECONDS: number = SECONDS_IN_MINUTE * MILLISECONDS_IN_SECOND;

type UpdateInterval = 'second' | 'minute';

interface RenderProps {
  currentTime: Date;
  styles: React.CSSProperties;
}

interface TimelineCurrentTimeProps {
  updateInterval?: UpdateInterval;
  render: (props: RenderProps) => JSX.Element;
}

function TimelineCurrentTime({ updateInterval = 'minute', render }: TimelineCurrentTimeProps): JSX.Element {
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  const calcLeftOffset = useLeftOffsetCalculator();

  const isSecondInterval: boolean = updateInterval === 'second';

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
          interval = setInterval(() => setCurrentTime(new Date()), MINUTE_AS_MILLISECONDS);
          setCurrentTime(new Date());
        }, nowToNextFullMinuteInMilliseconds);

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [updateInterval]);

  const styles: React.CSSProperties = {
    position: 'absolute',
    left: calcLeftOffset(currentTime),
  };

  return render({ currentTime, styles });
}

export default TimelineCurrentTime;
