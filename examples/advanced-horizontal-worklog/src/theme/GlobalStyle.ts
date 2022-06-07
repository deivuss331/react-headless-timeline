import { createGlobalStyle, DefaultTheme } from 'styled-components';
import { normalize } from 'polished';

export default createGlobalStyle<{ theme: DefaultTheme }>`
  ${normalize()}

  html {
    box-sizing: border-box;
    scroll-behavior: smooth;
    color: ${({ theme }) => theme.color.black};
    font-family: ${({ theme }) => theme.fontFamily.primary};
    background: ${({ theme }) => theme.color.background};
  } 

  * {
    &, &:before, &:after {
      box-sizing: inherit;
    }
  }
  
  h2 {
    margin: 0;
  }
`;
