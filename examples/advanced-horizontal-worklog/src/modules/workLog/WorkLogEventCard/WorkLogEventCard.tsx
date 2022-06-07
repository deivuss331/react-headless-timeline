import { format } from 'date-fns';
import { theme } from 'theme';
import type { WorkLogEvent } from 'types';
import { StyledCard } from './WorkLogEventCard.styles';

const DATE_FORMAT: string = 'HH:mm';

interface IProps {
  event: WorkLogEvent;
  style?: React.CSSProperties;
}

function WorkLogEventCard({
  event: { type, startDate, endDate },
  style: positionStyles,
}: IProps): JSX.Element {
  const backgroundColor: string =
    type === 'work' ? theme.color.timelineWorkEvent : theme.color.timelineBreakEvent;

  const label: string = `${format(startDate, DATE_FORMAT)} - ${format(endDate, DATE_FORMAT)}`;

  return (
    <StyledCard title={label} style={{ backgroundColor, ...positionStyles }}>
      <span>{label}</span>
    </StyledCard>
  );
}

export default WorkLogEventCard;
