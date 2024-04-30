import {createTheme} from '@vanilla-extract/css';
import { colors } from './themeContract.css';

export const darkTheme = createTheme(colors, {
    color: '#ffffff',
    backgroundColor: '#000000',
});