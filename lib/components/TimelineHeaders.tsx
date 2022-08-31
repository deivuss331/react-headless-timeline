import type { CSSProperties } from 'react';
import { add } from 'date-fns';
import { useOffsetCalculator } from 'lib/hooks';
import { useTimelineContext } from 'lib/components/TimelineProvider';

const MILLISECONDS_IN_SECOND = 1000;

const MIN_CELLS_QTY = 2;
const DEFAULT_CELLS_QTY = MIN_CELLS_QTY;

interface TimelineHeaderProps {
  cells?: number;
  render: (props: {
    headers: Date[];
    getHeaderStyles: (header: Date) => CSSProperties;
  }) => JSX.Element | null;
}

export default function TimelineHeaders({ cells = DEFAULT_CELLS_QTY, render }: TimelineHeaderProps) {
  const { startDate, endDate, direction } = useTimelineContext();
  const calcOffset = useOffsetCalculator();

  const hasMoreCellsThanRequired = cells > MIN_CELLS_QTY;
  const isHorizontalTimeline = direction === 'horizontal';

  const cellSizeMs = Math.round((endDate.getTime() - startDate.getTime()) / (cells - 1));
  const headers = hasMoreCellsThanRequired
    ? new Array(cells).fill(null).reduce<Date[]>((dates, _, index) => {
        dates.push(add(startDate, { seconds: (cellSizeMs / MILLISECONDS_IN_SECOND) * index }));
        return dates;
      }, [])
    : [startDate, endDate];

  const getHeaderStyles = (header: Date): CSSProperties => ({
    position: 'absolute',
    ...(isHorizontalTimeline ? { left: calcOffset(header) } : { top: calcOffset(header) }),
  });

  return render({ headers, getHeaderStyles });
}
