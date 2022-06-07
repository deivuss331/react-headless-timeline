import styled from 'styled-components';
import { transparentize } from 'polished';

export const StyledWrapper = styled.div`
  position: relative;
  min-width: 0;

  &:before {
    content: '';
    display: block;
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    width: 100%;
    height: 5px;
    border-radius: 200px;
    background: ${({ theme }) => transparentize(0.8, theme.color.grey)};
  }
`;
