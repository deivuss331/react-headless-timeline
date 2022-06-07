import Timeline from 'react-headless-timeline';
import WorkLogEventCard from 'modules/workLog/WorkLogEventCard';
import type { WorkLogEvent } from 'types';
import { StyledWrapper } from './WorkLogEmployeeEvents.styles';

interface IProps {
  events: WorkLogEvent[];
}

function WorkLogEmployeeEvents({ events }: IProps): JSX.Element {
  return (
    <StyledWrapper>
      <Timeline.Events
        render={({ getEventStyles }) => (
          <>
            {events.map((event) => (
              <WorkLogEventCard key={event.id} event={event} style={getEventStyles(event)} />
            ))}
          </>
        )}
      />
    </StyledWrapper>
  );
}

export default WorkLogEmployeeEvents;
