import React from 'react';
import { format } from 'date-fns';
import styled from 'styled-components';
import Timeline from 'react-headless-timeline';

interface TimeIndicatorProps {
  label: string;
  date: Date;
}

const StyledHeader = styled.span`
  color: white;
  background: red;
  z-index: 10;

  &:before {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    width: 1px;
    background: red;
    transform: translateX(-100%);
    z-index: 10;
  }
`;

function TimeIndicator({ label, date }: TimeIndicatorProps) {
  return (
    <Timeline.Indicators.Time
      render={({ getIndicatorStyles }) => (
        <div style={{ height: '100%', ...getIndicatorStyles(date) }}>
          <StyledHeader>
            {label} - {format(date, 'HH:mm')}
          </StyledHeader>
        </div>
      )}
    />
  );
}

export default TimeIndicator;
