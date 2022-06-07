import Timeline from 'react-headless-timeline';
import { format } from 'date-fns';
import {
  StyledWrapper,
  StyledHeader,
  StyledHeaderWrapper,
  StyledHeaderLine,
} from './WorkLogTimelineHeaders.styles';

function WorkLogTimelineHeaders(): JSX.Element {
  return (
    <Timeline.Headers
      cells={9}
      render={({ headers, getHeaderStyles }) => (
        <StyledWrapper>
          {headers.map((header) => (
            <StyledHeaderWrapper key={header.getTime()} style={getHeaderStyles(header)}>
              <StyledHeader>{format(header, 'HH:mm')}</StyledHeader>
              <StyledHeaderLine />
            </StyledHeaderWrapper>
          ))}
        </StyledWrapper>
      )}
    />
  );
}

export default WorkLogTimelineHeaders;
