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
		sliderThumbBackgroundColor: get('colorAdmin'),
		switchBackdropBackgroundColor: 'rgba(0, 0, 0, 0.05)',
	};
});

export default theme;
