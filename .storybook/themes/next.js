import { createTheme } from '@wp-g2/styles';

const theme = createTheme(({ get }) => {
	return {
		cardBorderRadius: '4px',
		colorAdmin: get('blueberry'),
		controlBackgroundColor: 'transparent',
		controlBorderColor: get('colorText'),
		controlBorderColorHover: get('colorText'),
		controlBorderColorSubtle: 'transparent',
		controlBorderRadius: '2px',
		controlHeight: '40px',
		sliderThumbBackground: get('colorAdmin'),
		sliderThumbBorderColor: 'transparent',
		sliderThumbBoxShadow: 'none',
		switchBackdropBackground: 'transparent',
		switchBackdropBackgroundActive: get('colorText'),
		switchBackdropBorderColor: get('colorText'),
		switchBackdropBorderColorActive: get('colorText'),
		switchBackdropBorderColorFocus: get('white'),
		switchPaddingOffset: '10px',
		switchToggleBackground: get('colorText'),
		switchToggleBackgroundActive: get('colorTextInverted'),
		switchToggleBoxShadow: 'none',
	};
});

export default theme;
