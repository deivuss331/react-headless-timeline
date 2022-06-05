import { useOffsetCalculator, useSizeCalculator, useTimelineProvider } from '../hooks';
import type { TimelineEvent } from '../types';

interface RenderProps {
  getEventStyles: (evt: TimelineEvent) => React.CSSProperties;
}

interface TimelineEventsProps {
  render: (props: RenderProps) => JSX.Element;
}

function TimelineEvents({ render }: TimelineEventsProps): JSX.Element {
  const { direction } = useTimelineProvider();
  const calcOffset = useOffsetCalculator();
  const calcSize = useSizeCalculator();

  const isHorizontalTimeline: boolean = direction === 'horizontal';

  const getEventStyles = (evt: TimelineEvent): React.CSSProperties => ({
    position: 'absolute',
    ...(isHorizontalTimeline
      ? { width: calcSize(evt), left: calcOffset(evt.startDate) }
      : { height: calcSize(evt), top: calcOffset(evt.startDate) }),
  });

  return render({ getEventStyles });
}

export default TimelineEvents;
