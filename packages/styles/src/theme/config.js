import { get } from '@wp-g2/create-styles';

import { BACKGROUND_COLOR_PROPS, G2_COLORS, WORDPRESS_COLORS } from './tokens';

export const SUPPORTED_COLORS = [
	'blue',
	'red',
	'purple',
	'green',
	'yellow',
	'orange',
	'darkGray',
	'lightGray',
];

const ANIMATION_PROPS = {
	transitionDuration: '200ms',
	transitionDurationFast: '160ms',
	transitionDurationFaster: '120ms',
	transitionDurationFastest: '100ms',
	transitionTimingFunction: 'cubic-bezier(0.08, 0.52, 0.52, 1)',
	transitionTimingFunctionControl: 'cubic-bezier(0.12, 0.8, 0.32, 1)',
};

const COLOR_PROPS = {
	...WORDPRESS_COLORS,
	...BACKGROUND_COLOR_PROPS,
	colorAdmin: get('blueberry'),
	colorBodyBackground: get('white'),
	colorBodyBackgroundDark: '#18191A',
	colorDestructive: get('pomegrade'),
	colorDivider: 'rgba(0, 0, 0, 0.1)',
	colorPositive: get('greens'),
	colorScrollbarThumb: 'rgba(0, 0, 0, 0.2)',
	colorScrollbarThumbHover: 'rgba(0, 0, 0, 0.5)',
	colorScrollbarTrack: 'rgba(0, 0, 0, 0.04)',
	colorText: '#050505',
	colorTextInverted: get('white'),
};

const FONT_PROPS = {
	fontFamily:
		'Inter,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",sans-serif',
	fontFamilyMono: 'SFMono-Regular,Consolas,Liberation Mono,Menlo,monospace',
	fontSize: '13px',
	fontSizeH1: `calc(2.44 * ${get('fontSize')})`,
	fontSizeH2: `calc(1.95 * ${get('fontSize')})`,
	fontSizeH3: `calc(1.56 * ${get('fontSize')})`,
	fontSizeH4: `calc(1.25 * ${get('fontSize')})`,
	fontSizeH5: `calc(1 * ${get('fontSize')})`,
	fontSizeH6: `calc(0.8 * ${get('fontSize')})`,
	fontSizeInputMobile: '16px',
	fontSizeMobile: '15px',
	fontSizeSmall: `calc(0.92 * ${get('fontSize')})`,
	fontSizeXSmall: `calc(0.75 * ${get('fontSize')})`,
};

const SURFACE_PROPS = {
	surfaceBackgroundColor: get('surfaceColor'),
	surfaceBackgroundSubtleColor: '#F3F3F3',
	surfaceBackgroundTintColor: '#F5F5F5',
	surfaceBorderColor: 'rgba(0, 0, 0, 0.1)',
	surfaceBorderBoldColor: 'rgba(0, 0, 0, 0.15)',
	surfaceBorderSubtleColor: 'rgba(0, 0, 0, 0.05)',
	surfaceColor: get('white'),
};

const ELEVATION_PROPS = {
	elevationIntensity: 1,
};

const GRID_PROPS = {
	gridBase: '4px',
};

const CONTROL_PROPS = {
	controlBackgroundColor: 'rgba(0, 0, 0, 0.05)',
	controlBackgroundDimColor: 'rgba(0, 0, 0, 0.1)',
	controlBackgroundBrightColor: 'rgba(0, 0, 0, 0.03)',
	controlBorderColor: 'transparent',
	controlBorderColorHover: 'transparent',
	controlBorderColorSubtle: 'transparent',
	controlBorderRadius: '4px',
	controlBorderSubtleColor: 'rgba(0, 0, 0, 0.2)',
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
	controlPrimaryTextActiveColor: get('white'),
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
};

const CARD_PROPS = {
	cardBorderRadius: '8px',
	cardPaddingX: '12px',
	cardPaddingY: '12px',
	cardPadding: `${get('cardPaddingX')} ${get('cardPaddingY')}`,
	cardHeaderFooterPaddingY: '4px',
	cardHeaderHeight: '44px',
};

const BASE_THEME = {
	...G2_COLORS,
	...COLOR_PROPS,
	...CARD_PROPS,
	...CONTROL_PROPS,
	...ELEVATION_PROPS,
	...FONT_PROPS,
	...SURFACE_PROPS,
	...ANIMATION_PROPS,
	...BUTTON_PROPS,
	...GRID_PROPS,
};

export const config = BASE_THEME;
