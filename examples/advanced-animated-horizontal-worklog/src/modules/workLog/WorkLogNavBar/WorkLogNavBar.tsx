import { H1 } from 'ui/typography';
import { StyledWrapper } from './WorkLogNavBar.styles';
import WorkLogNav from '../WorkLogNav';

function WorkLogNavBar(): JSX.Element {
  return (
    <StyledWrapper>
      <H1>Work log</H1>
      <WorkLogNav />
    </StyledWrapper>
  );
}

export default WorkLogNavBar;
