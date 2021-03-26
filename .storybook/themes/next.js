import { createTheme } from '@wp-g2/styles';

const theme = createTheme(({ get, theme, space }) => {
	return {
		...theme,
		buttonControlActiveStateColor: get('colorText'),
		cardBorderRadius: '4px',
		colorAdmin: '#3858E9',
		// controlBackgroundColor: 'transparent',
		controlBorderColor: get('colorText'),
		controlBorderColorHover: get('colorText'),
		controlBorderColorSubtle: 'transparent',
		controlBorderRadius: '2px',
		controlHeight: '36px',
		menuItemHeight: '32px',
		segmentedControlBackdropBackgroundColor: get('colorText'),
		segmentedControlButtonColorActive: 'transparent',
		segmentedControlBackdropBoxShadow: '0 0 6px 1px rgba(0, 0, 0, 0.1)',
		segmentedControlButtonActiveTextColor: get('colorTextInverted'),
		sliderThumbBackgroundColor: get('colorAdmin'),
		sliderThumbBorderColor: 'transparent',
		sliderThumbBoxShadow: 'none',
		// switchBackdropBackgroundColor: 'transparent',
		// switchBackdropBackgroundColorActive: get('colorText'),
		// switchBackdropBorderColor: get('colorText'),
		// switchBackdropBorderColorActive: get('colorText'),
		// switchBackdropBorderColorFocus: get('white'),
		switchPaddingOffset: '8px',
		// switchToggleBackgroundColor: get('colorText'),
		// switchToggleBackgroundColorActive: get('colorTextInverted'),
		// switchToggleBoxShadow: 'none',
	};
});

export default theme;
