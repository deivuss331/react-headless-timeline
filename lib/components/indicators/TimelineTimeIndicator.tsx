import type { CSSProperties } from 'react';
import { useTimelineContext } from 'lib/components/TimelineProvider';
import offsetCalculator from 'lib/utils/offsetCalculator';

interface TimelineTimeIndicatorProps {
  render: (props: { getIndicatorStyles: (date: Date) => CSSProperties }) => JSX.Element | null;
}

export default function TimelineTimeIndicator({ render }: TimelineTimeIndicatorProps) {
  const timeline = useTimelineContext();

  const calcOffset = offsetCalculator(timeline);

  const getIndicatorStyles = (date: Date): CSSProperties => ({
    position: 'absolute',
    ...calcOffset(date),
  });

  return render({ getIndicatorStyles });
}
