import { createTheme } from '@wp-g2/styles';
import blueberry from './blueberry';

const theme = createTheme(({ get }) => {
	return {
		...blueberry,
		controlBackgroundColor: 'transparent',
		controlBorderColor: get('surfaceBorderColor'),
		controlBorderColorHover: get('surfaceBorderColor'),
		controlBorderColorSubtle: 'transparent',
		segmentedControlBackgroundColor: 'rgba(0, 0, 0, 0.05)',
		segmentedControlBackdropBorderColor: 'transparent',
		sliderThumbBackgroundColor: get('colorAdmin'),
		sliderThumbBorderColor: 'transparent',
		sliderThumbBoxShadow: 'none',
		switchBackdropBackgroundColor: 'rgba(0, 0, 0, 0.05)',
		switchToggleBorderColor: 'transparent',
	};
});

export default theme;
