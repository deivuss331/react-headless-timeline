import React from 'react';
import { format } from 'date-fns';
import styled from 'styled-components';

interface CurrentTimeProps {
  currentTime: Date;
  style: React.CSSProperties;
}

const StyledHeader = styled.span`
  color: white;
  background: blue;
  z-index: 10;

  &:before {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    width: 1px;
    background: blue;
    transform: translateX(-100%);
    z-index: 10;
  }
`;

function CurrentTime({ currentTime, style }: CurrentTimeProps) {
  return (
    <div style={{ height: '100%', ...style }}>
      <StyledHeader>{format(currentTime, 'HH:mm')}</StyledHeader>
    </div>
  );
}

export default CurrentTime;
