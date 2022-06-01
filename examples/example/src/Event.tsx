import React from 'react';

interface EventProps {
  style: React.CSSProperties;
  children: React.ReactElement;
}

function Event({ children, style }: EventProps) {
  return (
    <span
      style={{
        border: '2px dashed red',
        textAlign: 'center',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        boxSizing: 'border-box',
        ...style,
      }}
    >
      {children}
    </span>
  );
}

export default Event;
