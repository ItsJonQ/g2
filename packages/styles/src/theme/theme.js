import {
	BACKGROUND_COLOR_PROPS,
	DARK_MODE_COLORS,
	DARK_MODE_RGBA_COLORS,
	G2_COLORS,
	WORDPRESS_COLORS,
} from './tokens';
import {
	get,
	transformValuesToReferences,
	transformValuesToVariables,
	transformValuesToVariablesString,
} from './utils';

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
		'Inter,Cabin,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",sans-serif',
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
	surfaceBackgroundSubtleColor: 'rgba(0, 0, 0, 0.05)',
	surfaceBackgroundTintColor: 'rgba(0, 0, 0, 0.04)',
	surfaceBorderColor: 'rgba(0, 0, 0, 0.06)',
	surfaceColor: get('white'),
};

const GRID_PROPS = {
	gridBase: '4px',
};

const CONTROL_PROPS = {
	controlBackgroundColor: 'rgba(0, 0, 0, 0.05)',
	controlBackgroundDimColor: 'rgba(0, 0, 0, 0.1)',
	controlBorderColor: 'transparent',
	controlBorderRadius: '4px',
	controlBorderSubtleColor: 'rgba(0, 0, 0, 0.2)',
	controlBoxShadowFocus: `0 0 0 2px ${get('controlBackgroundDimColor')}`,
	controlHeight: '30px',
	controlHeightLarge: '36px',
	controlHeightSmall: '24px',
	controlHeightXLarge: '44px',
	controlHeightXSmall: '20px',
	controlPaddingX: '8px',
	controlPaddingXLarge: '16px',
	controlPrimaryTextActiveColor: get('white'),
	controlPrimaryTextColor: get('white'),
	controlSurfaceBoxShadow:
		'0 1px 1px rgba(0, 0, 0, 0.2), 0 1px 2px rgba(0, 0, 0, 0.2)',
	controlSurfaceColor: get('white'),
	controlTextActiveColor: get('colorAdmin'),
};

const DARK_MODE_PROPS = {
	...DARK_MODE_COLORS,
	...DARK_MODE_RGBA_COLORS,
	colorDivider: 'rgba(255, 255, 255, 0.1)',
	colorScrollbarThumb: 'rgba(255, 255, 255, 0.2)',
	colorScrollbarThumbHover: 'rgba(255, 255, 255, 0.5)',
	colorScrollbarTrack: 'rgba(0, 0, 0, 0.04)',
	colorText: '#E4E6EB',
	colorTextInverted: '#050505',
	controlBackgroundColor: 'rgba(255, 255, 255, 0.1)',
	controlBackgroundDimColor: 'rgba(255, 255, 255, 0.2)',
	controlBorderSubtleColor: 'rgba(255, 255, 255, 0.5)',
	controlPrimaryTextActiveColor: get('black'),
	controlPrimaryTextColor: get('white'),
	controlSurfaceColor: 'rgba(255, 255, 255, 0.3)',
	controlTextActiveColor: get('white'),
	surfaceBackgroundColor: get('colorBodyBackgroundDark'),
	surfaceBackgroundSubtleColor: 'rgba(255, 255, 255, 0.05)',
	surfaceBackgroundTintColor: 'rgba(0, 0, 0, 0.1)',
	surfaceBorderColor: 'rgba(255, 255, 255, 0.1)',
	surfaceColor: '#292929',
};

const HIGH_CONTRAST_MODE_PROPS = {
	colorDivider: '#444',
	controlBorderColor: '#444',
	controlBorderSubtleColor: '#444',
	surfaceBorderColor: '#444',
};

const HIGH_CONTRAST_DARK_MODE_PROPS = {
	colorDivider: '#eee',
	controlBorderColor: '#eee',
	controlBorderSubtleColor: '#eee',
	surfaceBorderColor: '#eee',
};

export const BASE_THEME = {
	...G2_COLORS,
	...COLOR_PROPS,
	...CONTROL_PROPS,
	...FONT_PROPS,
	...SURFACE_PROPS,
	...ANIMATION_PROPS,
	...GRID_PROPS,
};

export const DARK_THEME = {
	...DARK_MODE_PROPS,
};

export const THEME = transformValuesToReferences(BASE_THEME);
export const GLOBAL_VARIABLES = transformValuesToVariables(BASE_THEME);
export const GLOBAL_CSS_VARIABLES = transformValuesToVariablesString(
	':root',
	BASE_THEME,
);

export const DARK_MODE_ATTR = '[data-system-ui-mode="dark"]';
export const HIGH_CONTRAST_MODE_MODE_ATTR =
	'[data-system-ui-contrast-mode="high"]';

export const COLOR_BLIND_MODE_ATTR = '[data-system-ui-color-blind-mode="true"]';
export const REDUCED_MOTION_MODE_ATTR =
	'[data-system-ui-reduced-motion-mode="true"]';

export const GLOBAL_DARK_MODE_CSS_VARIABLES = transformValuesToVariablesString(
	DARK_MODE_ATTR,
	DARK_MODE_PROPS,
);

export const GLOBAL_HIGH_CONTRAST_MODE_CSS_VARIABLES = transformValuesToVariablesString(
	HIGH_CONTRAST_MODE_MODE_ATTR,
	HIGH_CONTRAST_MODE_PROPS,
);

export const GLOBAL_HIGH_CONTRAST_DARK_MODE_CSS_VARIABLES = transformValuesToVariablesString(
	`${DARK_MODE_ATTR}${HIGH_CONTRAST_MODE_MODE_ATTR}`,
	HIGH_CONTRAST_DARK_MODE_PROPS,
);
