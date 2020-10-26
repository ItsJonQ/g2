import { createTheme } from '@wp-g2/styles';

const theme = createTheme(({ get, theme, space }) => {
	return {
		...theme,

		cardBorderRadius: '4px',

		colorAdmin: '#007BFF',

		controlBorderColor:
			'rgba(0, 0, 0, 0.16) rgba(0, 0, 0, 0.16) rgba(0, 0, 0, 0.24)',
		controlBorderColorHover: get('controlBorderColor'),
		controlBorderColorSubtle: 'transparent',
		controlBoxShadow: '0 1px 1px rgba(0, 0, 0, 0.06)',
		controlHeight: '24px',
		controlBorderRadius: '3px',

		fontSize: '12px',
		panelHeaderPadding: `${space(1.5)} ${space(3)}`,

		segmentedControlBackdropBorderColor: get('surfaceBorderColor'),

		sliderThumbBackground: get('white'),
		sliderThumbBorderColor: get('controlBorderColor'),
		sliderThumbBoxShadow: `0 0 2px rgba(0, 0, 0, 0.2), ${get(
			'controlSurfaceBoxShadow',
		)}`,

		switchToggleBackground: get('controlPrimaryTextColor'),
		switchToggleBackgroundActive: get('controlPrimaryTextColor'),
		switchToggleBorderColor: 'transparent',
		switchToggleBoxShadow: get('controlSurfaceBoxShadow'),
		switchBackdropBackground: 'rgba(0, 0, 0, 0.05)',
		switchBackdropBackgroundActive: get('colorAdmin'),
		switchBackdropBorderColor: get('controlBorderColor'),
		switchBackdropBorderColorActive: get('colorAdmin'),
		switchBackdropBorderColorFocus: get('colorText'),
		switchToggleBackground: get('white'),
		switchPaddingOffset: '4px',

		surfaceBackgroundColor: '#f6f6f6',
	};
});

export default theme;
