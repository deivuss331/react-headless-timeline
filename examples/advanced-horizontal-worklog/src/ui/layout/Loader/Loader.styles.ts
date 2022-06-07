import styled, { keyframes } from 'styled-components';

const rotate = keyframes`
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
`;

export const StyledLoader = styled.div`
  display: block;
  width: 32px;
  height: 32px;
  margin: 6px;
  border: ${({ theme }) => `3px solid ${theme.color.black}`};
  border-radius: 50%;
  animation: ${rotate} 0.8s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  animation-timing-function: ease-in-out;
  border-color: ${({ theme }) => `${theme.color.black} transparent transparent transparent`};
`;
