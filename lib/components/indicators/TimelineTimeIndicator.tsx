import { useOffsetCalculator, useTimelineProvider } from '../../hooks';

interface RenderProps {
  getIndicatorStyles: (date: Date) => React.CSSProperties;
}

interface TimelineTimeIndicatorProps {
  render: (props: RenderProps) => JSX.Element | null;
}

function TimelineTimeIndicator({ render }: TimelineTimeIndicatorProps) {
  const { direction } = useTimelineProvider();
  const calcOffset = useOffsetCalculator();

  const isHorizontalTimeline: boolean = direction === 'horizontal';

  const getIndicatorStyles = (date: Date): React.CSSProperties => ({
    position: 'absolute',
    ...(isHorizontalTimeline ? { left: calcOffset(date) } : { top: calcOffset(date) }),
  });

  return render({ getIndicatorStyles });
}

export default TimelineTimeIndicator;
