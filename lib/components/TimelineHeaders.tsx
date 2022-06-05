import { add } from 'date-fns';
import { useTimelineProvider, useOffsetCalculator } from '../hooks';

const CELLS_MIN: number = 2;
const CELLS_DEFAULT: number = CELLS_MIN;

const MILLISECONDS_IN_SECOND: number = 1000;

interface RenderProps {
  headers: Date[];
  getHeaderStyles: (header: Date) => React.CSSProperties;
}

interface TimelineHeaderProps {
  cells?: number;
  render: (props: RenderProps) => JSX.Element;
}

function TimelineHeaders({ cells = CELLS_DEFAULT, render }: TimelineHeaderProps): JSX.Element {
  const { startDate, endDate, direction } = useTimelineProvider();
  const calcOffset = useOffsetCalculator();

  const isCellsQtyValid: boolean = cells > CELLS_MIN;
  const isHorizontalTimeline: boolean = direction === 'horizontal';

  const cellSizeMs: number = Math.round((endDate.getTime() - startDate.getTime()) / cells);
  const headers = isCellsQtyValid
    ? new Array(cells).fill(null).reduce<Date[]>((dates, _, index) => {
        dates.push(add(startDate, { seconds: (cellSizeMs / MILLISECONDS_IN_SECOND) * index }));
        return dates;
      }, [])
    : [startDate, endDate];

  const getHeaderStyles = (header: Date): React.CSSProperties => ({
    position: 'absolute',
    ...(isHorizontalTimeline ? { left: calcOffset(header) } : { top: calcOffset(header) }),
  });

  return render({ headers, getHeaderStyles });
}

export default TimelineHeaders;
