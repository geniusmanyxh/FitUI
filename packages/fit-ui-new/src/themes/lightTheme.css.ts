import {createTheme} from '@vanilla-extract/css';
import { colors } from './themeContract.css';

export const lightTheme = createTheme(colors, {
    color: '#000000',
    backgroundColor: '#ffffff',
  });