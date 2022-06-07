import styled from 'styled-components';

export const StyledCardsList = styled.ul`
  list-style-type: none;
  padding: 0;
  display: grid;
  gap: ${({ theme }) => theme.space[2]};
`;

export const StyledTimelineWrapper = styled.div`
  position: relative;
  padding-top: ${({ theme }) => theme.space[4]};
`;
