import { createTheme } from '@wp-g2/styles';
import blueberry from './blueberry';

const theme = createTheme(({ get }) => {
	return {
		...blueberry,
		controlBackgroundColor: 'transparent',
		controlBorderColor: get('surfaceBorderColor'),
		controlBorderColorSubtle: 'transparent',
		controlBorderColorHover: get('surfaceBorderColor'),
		sliderThumbBorderColor: 'transparent',
		sliderThumbBoxShadow: 'none',
		sliderThumbBackground: get('colorAdmin'),
		switchBackdropBackground: 'transparent',
		switchBackdropBackgroundActive: get('colorText'),
		switchBackdropBorderColor: get('colorText'),
		switchToggleBackground: get('colorText'),
		switchToggleBackgroundActive: get('colorTextInverted'),
		switchToggleBoxShadow: 'none',
	};
});

export default theme;
