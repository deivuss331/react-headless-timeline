import 'styled-components';
import { ColorEnum } from 'theme';

declare module 'styled-components' {
  export interface DefaultTheme {
    fontFamily: {
      primary: string;
    };
    color: {
      [ColorEnum.BLACK]: string;
      [ColorEnum.WHITE]: string;
      [ColorEnum.GREY]: string;
      [ColorEnum.BACKGROUND]: string;
      [ColorEnum.TIMELINE_WORK_EVENT]: string;
      [ColorEnum.TIMELINE_BREAK_EVENT]: string;
      [ColorEnum.TIMELINE_CURRENT_TIME]: string;
    };
    space: {
      1: string;
      2: string;
      3: string;
      4: string;
      5: string;
      6: string;
      7: string;
      8: string;
      9: string;
      10: string;
    };
    radius: {
      base: string;
    };
    fontWeight: {
      h1: string;
      h2: string;
    };
    fontSize: {
      h1: string;
      h2: string;
    };
    lineHeight: {
      h1: string;
      h2: string;
    };
  }
}
