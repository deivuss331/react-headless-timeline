import styled from 'styled-components';
import { transparentize } from 'polished';

export const StyledWrapper = styled.div`
  position: absolute;
  inset: 0;
  margin-left: 245px;
  margin-right: 25px;
`;

export const StyledHeaderWrapper = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.space[1]};
  grid-template-rows: auto 1fr;
  transform: translateX(-50%);
  height: 100%;
`;

export const StyledHeader = styled.span`
  color: ${({ theme }) => theme.color.grey};
`;

export const StyledHeaderLine = styled.span`
  display: block;
  height: 100%;
  width: 0;
  border-right: 1px solid ${({ theme }) => transparentize(0.5, theme.color.grey)};
  margin: auto;
`;
