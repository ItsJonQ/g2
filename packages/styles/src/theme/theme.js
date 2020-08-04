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

const DARK_GRAY_COLORS = {
	darkGray100: '#8F98A1',
	darkGray200: '#7E8993',
	darkGray300: '#6C7781',
	darkGray400: '#606A73',
	darkGray500: '#555D66',
	darkGray600: '#40464D',
	darkGray700: '#32373C',
	darkGray800: '#23282D',
	darkGray900: '#191E23',
};

const LIGHT_GRAY_COLORS = {
	lightGray100: '#fbfbfc',
	lightGray200: '#f3f4f5',
	lightGray300: '#edeff0',
	lightGray400: '#e8eaeb',
	lightGray500: '#e2e4e7',
	lightGray600: '#d7dade',
	lightGray700: '#ccd0d4',
	lightGray800: '#b5bcc2',
	lightGray900: '#a2aab2',
};

const RED_COLORS = {
	red100: '#fcebeb',
	red200: '#f1adad',
	red300: '#ea8484',
	red400: '#e35b5b',
	red500: '#dc3232',
	red600: '#c62d2d',
	red700: '#b02828',
	red800: '#9a2323',
	red900: '#841e1e',
};

const ORANGE_COLORS = {
	orange100: '#fef1ea',
	orange200: '#fbc5a9',
	orange300: '#f9a87e',
	orange400: '#f78b53',
	orange500: '#F56E28',
	orange600: '#d54e21',
	orange700: '#ca4a1f',
	orange800: '#c0461e',
	orange900: '#aa3e1a',
};

const YELLOW_COLORS = {
	yellow100: '#fff8e6',
	yellow200: '#ffe399',
	yellow300: '#ffd566',
	yellow400: '#ffc733',
	yellow500: '#ffb900',
	yellow600: '#f7a407',
	yellow700: '#ee8e0d',
	yellow800: '#e67914',
	yellow900: '#dd631a',
};

const GREEN_COLORS = {
	green100: '#edf8ee',
	green200: '#b5e1b9',
	green300: '#90d296',
	green400: '#6bc373',
	green500: '#46b450',
	green600: '#399648',
	green700: '#328540',
	green800: '##2c7337',
	green900: '#25612f',
};

const PURPLE_COLORS = {
	purple100: '#f3f1f8',
	purple200: '#cdc5e1',
	purple300: '#9b8bc3',
	purple400: '#9b8bc3',
	purple500: '#826eb4',
	purple600: '#685890',
	purple700: '#4e426c',
	purple800: '#41375a',
	purple900: '#342c48',
};

const BLUE_COLORS = {
	blue100: '#e6f6fb',
	blue200: '#99d9ed',
	blue300: '#66c6e4',
	blue400: '#33b3db',
	blue500: '#00a0d2',
	blue600: '#008ec2',
	blue700: '#0085ba',
	blue800: '#007cb2',
	blue900: '#005177',
};

const WORDPRESS_COLORS = {
	...DARK_GRAY_COLORS,
	...LIGHT_GRAY_COLORS,
	...RED_COLORS,
	...ORANGE_COLORS,
	...YELLOW_COLORS,
	...GREEN_COLORS,
	...PURPLE_COLORS,
	...BLUE_COLORS,
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
	...WORDPRESS_COLORS,
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
	fontSizeH1: `calc(2.44 * ${get('fontSize')})`,
	fontSizeH2: `calc(1.95 * ${get('fontSize')})`,
	fontSizeH3: `calc(1.56 * ${get('fontSize')})`,
	fontSizeH4: `calc(1.25 * ${get('fontSize')})`,
	fontSizeH5: `calc(1 * ${get('fontSize')})`,
	fontSizeH6: `calc(0.8 * ${get('fontSize')})`,
	fontSizeInputMobile: '16px',
	fontSizeSmall: '12px',
};

const SURFACE_PROPS = {
	surfaceBackgroundColor: get('surfaceColor'),
	surfaceBackgroundSubtleColor: '#EFEFF3',
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
	surfaceBackgroundTintColor: 'rgba(0, 0, 0, 0.1)',
	surfaceBorderColor: 'rgba(255, 255, 255, 0.1)',
	surfaceColor: '#292929',
};

const HIGH_CONTRAST_MODE_PROPS = {
	colorDivider: '#444',
	controlBorderColor: '#444',
	surfaceBorderColor: '#444',
};

const HIGH_CONTRAST_DARK_MODE_PROPS = {
	colorDivider: '#eee',
	controlBorderColor: '#eee',
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
