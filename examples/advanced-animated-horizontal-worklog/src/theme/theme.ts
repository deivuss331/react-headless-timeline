import { DefaultTheme } from 'styled-components';

export enum ColorEnum {
  BLACK = 'black',
  WHITE = 'white',
  GREY = 'grey',
  BACKGROUND = 'background',
  TIMELINE_WORK_EVENT = 'timelineWorkEvent',
  TIMELINE_BREAK_EVENT = 'timelineBreakEvent',
  TIMELINE_CURRENT_TIME = 'timelineCurrentTime',
}

export const theme: DefaultTheme = {
  fontFamily: {
    primary: '"Roboto", sans-serif',
  },
  color: {
    [ColorEnum.BLACK]: '#212232',
    [ColorEnum.WHITE]: '#FFF',
    [ColorEnum.BACKGROUND]: '#F9F9F9',
    [ColorEnum.GREY]: '#97A7B3',
    [ColorEnum.TIMELINE_WORK_EVENT]: '#009B72',
    [ColorEnum.TIMELINE_BREAK_EVENT]: '#8D8E8E',
    [ColorEnum.TIMELINE_CURRENT_TIME]: '#E3B23C',
  },
  space: {
    1: '5px',
    2: '10px',
    3: '15px',
    4: '20px',
    5: '25px',
    6: '30px',
    7: '35px',
    8: '40px',
    9: '45px',
    10: '50px',
  },
  radius: {
    base: '0',
  },
  fontWeight: {
    h1: '700',
    h2: '500',
  },
  fontSize: {
    h1: '24px',
    h2: '18px',
  },
  lineHeight: {
    h1: '32px',
    h2: '24px',
  },
};
