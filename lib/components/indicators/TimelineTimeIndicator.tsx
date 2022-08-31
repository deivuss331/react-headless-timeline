import type { CSSProperties } from 'react';
import { useOffsetCalculator } from 'lib/hooks';
import { useTimelineContext } from 'lib/components/TimelineProvider';

interface TimelineTimeIndicatorProps {
  render: (props: { getIndicatorStyles: (date: Date) => CSSProperties }) => JSX.Element | null;
}

export default function TimelineTimeIndicator({ render }: TimelineTimeIndicatorProps) {
  const { direction } = useTimelineContext();
  const calcOffset = useOffsetCalculator();

  const isHorizontalTimeline = direction === 'horizontal';

  const getIndicatorStyles = (date: Date): CSSProperties => ({
    position: 'absolute',
    ...(isHorizontalTimeline ? { left: calcOffset(date) } : { top: calcOffset(date) }),
  });

  return render({ getIndicatorStyles });
}
