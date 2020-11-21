import { createTheme } from '@wp-g2/styles';

const theme = createTheme(({ get, theme, space }) => {
	return {
		...theme,

		cardBorderRadius: '8px',

		colorAdmin: '#007BFF',

		controlBorderColor:
			'rgba(0, 0, 0, 0.16) rgba(0, 0, 0, 0.16) rgba(0, 0, 0, 0.24)',
		controlBorderColorHover: get('controlBorderColor'),
		controlBackgroundDimColor: 'rgba(0, 123, 255, 0.2)',
		controlBorderColorSubtle: 'transparent',
		controlBoxShadow: '0 1px 1px rgba(0, 0, 0, 0.06)',
		controlHeight: '24px',
		controlBorderRadius: '6px',

		fontSize: '13px',
		panelHeaderPadding: `${space(1.5)} ${space(3)}`,

		segmentedControlBackgroundColor: 'rgba(0, 0, 0, 0.05)',
		segmentedControlBackdropBorderColor: 'transparent',
		segmentedControlBackdropBoxShadow: get('controlSurfaceBoxShadow'),
		segmentedControlButtonColorActive: get(
			'segmentedControlBackgroundColor',
		),

		sliderThumbBackgroundColor: get('white'),
		sliderThumbBorderColor: get('controlBorderColor'),
		sliderThumbBoxShadow: `0 0 2px rgba(0, 0, 0, 0.2), ${get(
			'controlSurfaceBoxShadow',
		)}`,

		switchToggleBackgroundColor: get('controlPrimaryTextColor'),
		switchToggleBackgroundColorActive: get('controlPrimaryTextColor'),
		switchToggleBorderColor: 'transparent',
		switchToggleBoxShadow: get('controlSurfaceBoxShadow'),
		switchBackdropBackgroundColor: 'rgba(0, 0, 0, 0.05)',
		switchBackdropBackgroundColorActive: get('colorAdmin'),
		switchBackdropBorderColor: get('controlBorderColor'),
		switchBackdropBorderColorActive: get('colorAdmin'),
		switchBackdropBorderColorFocus: get('colorText'),
		switchToggleBackgroundColor: get('white'),
		switchPaddingOffset: '4px',

		surfaceColor: 'rgba(255, 255, 255, 0.2)',
		surfaceBackgroundColor: '#f6f6f6',
		surfaceBackdropFilter: 'blur(20px)',
	};
});

export default theme;
