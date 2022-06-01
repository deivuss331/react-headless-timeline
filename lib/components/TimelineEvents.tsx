import { useLeftOffsetCalculator, useWidthCalculator } from '../hooks';
import type { TimelineEvent } from '../types';

interface RenderProps {
  getEventStyles: (evt: TimelineEvent) => React.CSSProperties;
}

interface TimelineEventsProps {
  render: (props: RenderProps) => JSX.Element;
}

function TimelineEvents({ render }: TimelineEventsProps): JSX.Element {
  const calcLeftOffset = useLeftOffsetCalculator();
  const calcWidth = useWidthCalculator();

  const getEventStyles = (evt: TimelineEvent): React.CSSProperties => ({
    position: 'absolute',
    width: calcWidth(evt),
    left: calcLeftOffset(evt.startDate),
  });

  return render({ getEventStyles });
}

export default TimelineEvents;
