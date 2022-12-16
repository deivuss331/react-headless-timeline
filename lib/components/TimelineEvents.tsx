import type { CSSProperties } from 'react';
import type { TimelineEvent } from 'lib/types';
import { useTimelineContext } from 'lib/components/TimelineProvider';
import offsetCalculator from 'lib/utils/offsetCalculator';
import sizeCalculator from 'lib/utils/sizeCalculator';

interface TimelineEventsProps {
  render: (props: { getEventStyles: (evt: TimelineEvent) => CSSProperties }) => JSX.Element | null;
}

export default function TimelineEvents({ render }: TimelineEventsProps) {
  const timeline = useTimelineContext();

  const calcOffset = offsetCalculator(timeline);
  const calcSize = sizeCalculator(timeline);

  const getEventStyles = (evt: TimelineEvent): CSSProperties => ({
    position: 'absolute',
    ...calcOffset(evt.startDate),
    ...calcSize(evt),
  });

  return render({ getEventStyles });
}
