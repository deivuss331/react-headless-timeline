import { format } from 'date-fns';
import { IconButton } from '@mui/material';
import { ArrowLeft, ArrowRight } from '@mui/icons-material';
import { useWorkLogCtx } from 'hooks';
import { StyledNav } from './WorkLogNav.styles';

function WorkLogNav(): JSX.Element {
  const { activeDate, handlePrevDay, handleNextDay } = useWorkLogCtx();

  return (
    <StyledNav>
      <IconButton onClick={handlePrevDay} aria-label="Yesterday">
        <ArrowLeft />
      </IconButton>

      <p>{format(activeDate, 'do MMMM yyyy')}</p>

      <IconButton onClick={handleNextDay} aria-label="Tomorrow">
        <ArrowRight />
      </IconButton>
    </StyledNav>
  );
}

export default WorkLogNav;
