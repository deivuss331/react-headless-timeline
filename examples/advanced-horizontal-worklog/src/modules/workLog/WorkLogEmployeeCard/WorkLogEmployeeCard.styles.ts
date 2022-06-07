import styled from 'styled-components';
import { transparentize } from 'polished';

export const StyledCard = styled.div`
  border-radius: ${({ theme }) => theme.radius.base};
  padding: ${({ theme }) => theme.space[4]} ${({ theme }) => theme.space[5]};
  background: ${({ theme }) => transparentize(0.9, theme.color.grey)};
  display: grid;
  gap: ${({ theme }) => theme.space[4]};
  grid-template-columns: 200px 1fr;
`;
