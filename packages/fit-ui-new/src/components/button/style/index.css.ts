import { style } from '@vanilla-extract/css';
import { colors} from '@/themes/index.css'
const buttonStyles = style({
  backgroundColor: colors.backgroundColor,
  color: colors.color,
  padding: '8px 16px',
  borderRadius: '4px',
});

export {buttonStyles}