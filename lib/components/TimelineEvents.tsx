import type { CSSProperties } from 'react';
import type { TimelineEvent } from 'lib/types';
import { useOffsetCalculator, useSizeCalculator } from 'lib/hooks';
import { useTimelineContext } from 'lib/components/TimelineProvider';

interface TimelineEventsProps {
  render: (props: { getEventStyles: (evt: TimelineEvent) => CSSProperties }) => JSX.Element | null;
}

export default function TimelineEvents({ render }: TimelineEventsProps) {
  const { direction } = useTimelineContext();
  const calcOffset = useOffsetCalculator();
  const calcSize = useSizeCalculator();

  const isHorizontalTimeline = direction === 'horizontal';

  const getEventStyles = (evt: TimelineEvent): CSSProperties => ({
    position: 'absolute',
    ...(isHorizontalTimeline
      ? { width: calcSize(evt), left: calcOffset(evt.startDate) }
      : { height: calcSize(evt), top: calcOffset(evt.startDate) }),
  });

  return render({ getEventStyles });
}
