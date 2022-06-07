import { PaletteColorOptions } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { theme } from './theme';

export const muiTheme = createTheme({
  spacing: parseInt(theme.space[1]),
  typography: {
    fontFamily: theme.fontFamily.primary,
  },
  palette: {
    primary: {
      main: theme.color.timelineWorkEvent,
    } as PaletteColorOptions,
  },
});
