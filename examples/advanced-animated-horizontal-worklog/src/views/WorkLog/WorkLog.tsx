import Timeline from 'react-headless-timeline';
import { set } from 'date-fns';
import { WORK_START_TIME, WORK_END_TIME } from 'config/constants';
import { useWorkLogCtx } from 'hooks';
import { Container } from 'ui/layout';
import { WorkLogNavBar, WorkLogEmployeeCard, WorkLogTimelineHeaders } from 'modules/workLog';
import { StyledCardsList, StyledTimelineWrapper } from './WorkLog.styles';

function WorkLog(): JSX.Element {
  const { records, activeDate } = useWorkLogCtx();

  const startDate: Date = set(activeDate, WORK_START_TIME);
  const endDate: Date = set(activeDate, WORK_END_TIME);

  return (
    <Timeline.Provider startDate={startDate} endDate={endDate}>
      <Container>
        <WorkLogNavBar />

        <StyledTimelineWrapper>
          <WorkLogTimelineHeaders />

          <StyledCardsList>
            {records.map((record) => (
              <li key={record.id}>
                <WorkLogEmployeeCard record={record} />
              </li>
            ))}
          </StyledCardsList>
        </StyledTimelineWrapper>
      </Container>
    </Timeline.Provider>
  );
}

export default WorkLog;
