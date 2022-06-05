import React from 'react';
import { format } from 'date-fns';

interface HeaderProps {
  header: Date;
  style: React.CSSProperties;
}

function Header({ header, style }: HeaderProps) {
  return <span style={style}>{format(header, 'HH:mm')}</span>;
}

export default Header;
