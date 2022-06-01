import { add } from 'date-fns';
import { useTimelineProvider, useLeftOffsetCalculator } from '../hooks';

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
  const { startDate, endDate } = useTimelineProvider();
  const calcLeftOffset = useLeftOffsetCalculator();

  const isCellsQtyValid: boolean = cells > CELLS_MIN;

  const cellSizeMs: number = Math.round((endDate.getTime() - startDate.getTime()) / cells);
  const headers = isCellsQtyValid
    ? new Array(cells).fill(null).reduce<Date[]>((dates, _, index) => {
        dates.push(add(startDate, { seconds: (cellSizeMs / MILLISECONDS_IN_SECOND) * index }));
        return dates;
      }, [])
    : [startDate, endDate];

  const getHeaderStyles = (header: Date): React.CSSProperties => ({
    position: 'absolute',
    left: calcLeftOffset(header),
  });

  return render({ headers, getHeaderStyles });
}

export default TimelineHeaders;
