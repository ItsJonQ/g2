import {
	get,
	transformValuesToReferences,
	transformValuesToVariables,
	transformValuesToVariablesString,
} from './utils';

const ANIMATION_PROPS = {
	transitionDuration: '200ms',
	transitionDurationFast: '160ms',
	transitionDurationFaster: '120ms',
	transitionDurationFastest: '100ms',
	transitionTimingFunction: 'cubic-bezier(0.08, 0.52, 0.52, 1)',
	transitionTimingFunctionControl: 'cubic-bezier(0.12, 0.8, 0.32, 1)',
};

const G2_COLORS = {
	black: '#000000',
	blueberry: '#3858E9',
	blueberryDark: '#1D35B4',
	greens: '#33F078',
	grey: '#40464D',
	greyBlack: '#1E1E1E',
	lightBlue: '#33F078',
	lightGrey: '#40464D',
	lighterGrey: '#dddddd',
	pomegrade: '#E26F56',
	white: '#ffffff',
};

const COLOR_PROPS = {
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
	fontSize: '13px',
	fontSizeSmall: '12px',
};

const SURFACE_PROPS = {
	surfaceBackgroundColor: get('surfaceColor'),
	surfaceBackgroundSubtleColor: '#EFEFF3',
	surfaceBorderColor: 'rgba(0, 0, 0, 0.06)',
	surfaceColor: get('white'),
};

const GRID_PROPS = {
	gridBase: 4,
};

const CONTROL_PROPS = {
	controlBackgroundColor: 'rgba(0, 0, 0, 0.05)',
	controlBackgroundDimColor: 'rgba(0, 0, 0, 0.1)',
	controlBorderColor: 'transparent',
	controlBorderRadius: '4px',
	controlBorderSubtleColor: 'rgba(0, 0, 0, 0.2)',
	controlHeight: '30px',
	controlHeightLarge: '36px',
	controlHeightSmall: '24px',
	controlHeightXLarge: '44px',
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
	surfaceBackgroundSubtleColor: get('colorBodyBackgroundDark'),
	surfaceBorderColor: 'rgba(255, 255, 255, 0.1)',
	surfaceColor: '#292929',
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

export const GLOBAL_DARK_MODE_CSS_VARIABLES = transformValuesToVariablesString(
	'[data-system-ui-mode="dark"]',
	DARK_MODE_PROPS,
);
