import { H2 } from 'ui/typography';
import type { WorkLogRecord } from 'types';
import WorkLogEmployeeEvents from '../WorkLogEmployeeEvents';
import { StyledCard } from './WorkLogEmployeeCard.styles';

interface IProps {
  record: WorkLogRecord;
}

function WorkLogEmployeeCard({ record }: IProps): JSX.Element {
  return (
    <StyledCard>
      <H2>{record.employee.fullName}</H2>
      <WorkLogEmployeeEvents events={record.events} />
    </StyledCard>
  );
}

export default WorkLogEmployeeCard;
