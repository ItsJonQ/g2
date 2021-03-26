import { createTheme } from '@wp-g2/styles';

const theme = createTheme(({ get, space, theme }) => {
	const COLOR_PROPS = {
		colorAdmin: '#3858E9',
		colorText: '#3a3b3c',
	};

	const CONTROL_PROPS = {
		controlBackgroundColor: 'rgba(0, 0, 0, 0.05)',
		controlBackgroundColorHover: 'rgba(0, 0, 0, 0.05)',
		controlBackgroundDimColor: 'rgba(0, 0, 0, 0.1)',
		controlBackgroundBrightColor: 'rgba(0, 0, 0, 0.03)',
		controlBorderColor: 'transparent',
		controlBorderColorHover: 'transparent',
		controlBorderColorSubtle: 'transparent',
		controlBorderRadius: '4px',
		controlBorderSubtleColor: 'rgba(0, 0, 0, 0.2)',
		controlBoxShadow: 'transparent',
		controlBoxShadowFocus: `0 0 0 2px ${get('controlBackgroundDimColor')}`,
		controlHeight: '30px',
		controlHeightLarge: '36px',
		controlHeightSmall: '24px',
		controlHeightXLarge: '44px',
		controlHeightXSmall: '20px',
		controlHeightXXSmall: '12px',
		controlPaddingX: '8px',
		controlPaddingXLarge: '16px',
		controlPaddingXSmall: '4px',
		controlPrimaryTextColorActive: get('white'),
		controlPrimaryTextColor: get('white'),
		controlSurfaceBoxShadow:
			'0 1px 1px rgba(0, 0, 0, 0.2), 0 1px 2px rgba(0, 0, 0, 0.2)',
		controlSurfaceColor: get('white'),
		controlTextActiveColor: get('colorAdmin'),
	};

	const BUTTON_PROPS = {
		buttonPrimaryColor: get('colorAdmin'),
		buttonPrimaryTextColor: get('controlPrimaryTextColor'),
		buttonPrimaryTextColorActive: get('controlPrimaryTextColor'),

		buttonSecondaryColor: 'transparent',
		buttonSecondaryColorHover: get('controlBackgroundColor'),
		buttonSecondaryColorActive: get('controlBackgroundColor'),
		buttonSecondaryColorFocus: get('controlBackgroundColor'),
		buttonSecondaryBorderColor: get('buttonPrimaryColor'),
		buttonSecondaryTextColor: get('buttonPrimaryColor'),
		buttonSecondaryTextColorActive: get('buttonPrimaryColor'),
		buttonSecondaryTextColorFocus: get('buttonPrimaryColor'),
		buttonSecondaryBorderColorHover: get('buttonPrimaryColor'),
		buttonSecondaryBorderColorActive: get('buttonPrimaryColor'),
	};

	const CARD_PROPS = {
		cardBorderRadius: '8px',
		cardPaddingX: space(3),
		cardPaddingY: space(3),
		cardPadding: `${get('cardPaddingX')} ${get('cardPaddingY')}`,
		cardHeaderFooterPaddingY: space(1),
		cardHeaderHeight: '44px',
	};

	const SEGMENTED_CONTROL_PROPS = {
		segmentedControlFontSize: '12px',
		segmentedControlBackdropBackgroundColor: get('surfaceColor'),
		segmentedControlBackdropBorderColor: get('surfaceColor'),
		segmentedControlBackdropBoxShadow: get('controlSurfaceBoxShadow'),
		segmentedControlButtonActiveTextColor: get('colorAdmin'),
	};

	const SLIDER_PROPS = {
		sliderThumbBackgroundColor: get('white'),
		sliderThumbBorderColor: get('controlBorderColor'),
		sliderThumbBoxShadow: `0 0 2px rgba(0, 0, 0, 0.2), ${get(
			'controlSurfaceBoxShadow',
		)}`,
	};

	const SWITCH_PROPS = {
		switchToggleBackgroundColor: get('controlPrimaryTextColor'),
		switchToggleBackgroundColorActive: get('controlPrimaryTextColor'),
		switchToggleBorderColor: get('controlBorderColor'),
		switchToggleBoxShadow: get('controlSurfaceBoxShadow'),
		switchBackdropBackgroundColor: get('controlBackgroundColor'),
		switchBackdropBackgroundColorActive: get('colorAdmin'),
		switchBackdropBorderColor: get('controlBorderColor'),
		switchBackdropBorderColorActive: get('colorAdmin'),
		switchBackdropBorderColorFocus: get('colorText'),
		switchToggleBackgroundColor: get('white'),
		switchPaddingOffset: '4px',
	};

	return {
		...theme,
		...BUTTON_PROPS,
		...CARD_PROPS,
		...COLOR_PROPS,
		...CONTROL_PROPS,
		...SEGMENTED_CONTROL_PROPS,
		...SLIDER_PROPS,
		...SWITCH_PROPS,
	};
});

export default theme;
