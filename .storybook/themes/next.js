import { createTheme } from '@wp-g2/styles';

const theme = createTheme(({ get, theme }) => {
	return {
		...theme,
		buttonControlActiveStateColor: get('colorText'),
		cardBorderRadius: '4px',
		colorAdmin: get('blueberry'),
		controlBackgroundColor: 'transparent',
		controlBorderColor: get('colorText'),
		controlBorderColorHover: get('colorText'),
		controlBorderColorSubtle: 'transparent',
		controlBorderRadius: '2px',
		controlHeight: '40px',
		sliderThumbBackgroundColor: get('colorAdmin'),
		sliderThumbBorderColor: 'transparent',
		sliderThumbBoxShadow: 'none',
		switchBackdropBackgroundColor: 'transparent',
		switchBackdropBackgroundColorActive: get('colorText'),
		switchBackdropBorderColor: get('colorText'),
		switchBackdropBorderColorActive: get('colorText'),
		switchBackdropBorderColorFocus: get('white'),
		switchPaddingOffset: '10px',
		switchToggleBackgroundColor: get('colorText'),
		switchToggleBackgroundColorActive: get('colorTextInverted'),
		switchToggleBoxShadow: 'none',
	};
});

export default theme;
