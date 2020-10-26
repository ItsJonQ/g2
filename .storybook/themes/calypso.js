import { createTheme } from '@wp-g2/styles';

const theme = createTheme(({ get, space, theme }) => {
	return {
		...theme,

		//Buttons
		buttonTextColor: get('colorText'),

		buttonPrimaryColor: '#c9356e',
		buttonPrimaryColorHover: '#ab235a',
		buttonPrimaryColorActive: get('buttonPrimaryColorHover'),
		buttonPrimaryColorFocus: get('buttonPrimaryColorHover'),
		buttonPrimaryBorderColorHover: get('buttonPrimaryColorHover'),
		buttonPrimaryBorderColorActive: get('buttonPrimaryColorHover'),
		buttonPrimaryBorderColorFocus: get('buttonPrimaryColorHover'),

		buttonSecondaryColor: get('white'),
		buttonSecondaryBorderColor: get('controlBorderColor'),
		buttonSecondaryBorderColorActive: get('controlBorderColor'),
		buttonSecondaryBorderColorHover: get('controlBorderColor'),
		buttonSecondaryBorderColorFocus: get('colorAdmin'),
		buttonSecondaryTextColor: get('colorText'),
		buttonSecondaryTextColorActive: get('colorText'),
		buttonSecondaryTextColorFocus: get('colorText'),

		// Cards
		cardBorderRadius: '2px',
		cardPaddingX: space(4),
		cardPaddingY: space(4),

		// Controls
		controlBackgroundColor: '#fff',
		controlBorderColor: '#dcdcde',
		controlBorderColorHover: '#dcdcde',
		controlBorderRadius: '2px',
		controlHeight: '40px',
		controlHeightSmall: '34px',

		// Colors
		colorAdmin: '#135e96',
		colorBodyBackground: '#f6f7f7',
		colorText: '#101517',

		// Fonts
		fontFamily:
			'-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen-Sans", "Ubuntu", "Cantarell", "Helvetica Neue", sans-serif',
		fontFamilyMono:
			'Monaco, Consolas, "Andale Mono", "DejaVu Sans Mono", "Courier 10 Pitch", Courier, monospace',
		fontSize: '14px',
		fontSizeInputMobile: '16px',
		fontSizeMobile: '16px',
		fontSizeSmall: '12px',
		fontSizeXSmall: '11px',
		fontSizeH1: '24px',
		fontSizeH2: '20px',
		fontSizeH3: '16px',

		// Switch
		switchToggleBackgroundColor: get('controlPrimaryTextColor'),
		switchToggleBackgroundColorActive: get('controlPrimaryTextColor'),
		switchToggleBorderColor: get('controlPrimaryTextColor'),
		switchToggleBoxShadow: 'none',
		switchBackdropBackgroundColor: get('controlBackgroundDimColor'),
		switchBackdropBackgroundColorActive: get('colorAdmin'),
		switchBackdropBorderColor: get('controlBorderColor'),
		switchBackdropBorderColorActive: get('colorAdmin'),
		switchBackdropBorderColorFocus: get('colorText'),
		switchToggleBackgroundColor: get('white'),
		switchPaddingOffset: '8px',
	};
});

export default theme;
