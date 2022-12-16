import type { CSSProperties } from 'react';
import { useMemo } from 'react';
import { useTimelineContext } from 'lib/components/TimelineProvider';
import { add } from 'date-fns';
import offsetCalculator from 'lib/utils/offsetCalculator';

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
  const timeline = useTimelineContext();
  const calcOffset = offsetCalculator(timeline);

  const { startDate, endDate } = timeline;
  const hasMoreCellsThanRequired = cells > MIN_CELLS_QTY;
  const cellSizeMs = Math.round((endDate.getTime() - startDate.getTime()) / (cells - 1));

  const headers = useMemo(
    () =>
      hasMoreCellsThanRequired
        ? new Array(cells).fill(null).reduce<Date[]>((dates, _, index) => {
            dates.push(add(startDate, { seconds: (cellSizeMs / MILLISECONDS_IN_SECOND) * index }));
            return dates;
          }, [])
        : [startDate, endDate],
    [hasMoreCellsThanRequired, cells, startDate, endDate, cellSizeMs],
  );

  const getHeaderStyles = (header: Date): CSSProperties => ({
    position: 'absolute',
    ...calcOffset(header),
  });

  return render({ headers, getHeaderStyles });
}
