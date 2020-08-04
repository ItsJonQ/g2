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
	red150: '#F2D7D7',
	red200: '#f1adad',
	red300: '#ea8484',
	red400: '#e35b5b',
	red500: '#dc3232',
	red600: '#c62d2d',
	red700: '#b02828',
	red800: '#9a2323',
	red900: '#841e1e',
	redRgba10: 'rgba(220, 50, 50, 0.1)',
	redRgba20: 'rgba(220, 50, 50, 0.2)',
	redRgba40: 'rgba(220, 50, 50, 0.4)',
	redRgba50: 'rgba(220, 50, 50, 0.5)',
	redRgba70: 'rgba(220, 50, 50, 0.7)',
};

const ORANGE_COLORS = {
	orange100: '#fef1ea',
	orange150: '#F4DDD6',
	orange200: '#fbc5a9',
	orange300: '#f9a87e',
	orange400: '#f78b53',
	orange500: '#F56E28',
	orange600: '#d54e21',
	orange700: '#ca4a1f',
	orange800: '#c0461e',
	orange900: '#aa3e1a',
	orangeRgba10: 'rgba(245, 110, 40, 0.1)',
	orangeRgba20: 'rgba(245, 110, 40, 0.2)',
	orangeRgba40: 'rgba(245, 110, 40, 0.4)',
	orangeRgba50: 'rgba(245, 110, 40, 0.5)',
	orangeRgba70: 'rgba(245, 110, 40, 0.7)',
};

const YELLOW_COLORS = {
	yellow100: '#fff8e6',
	yellow150: '#F5E4D2',
	yellow200: '#ffe399',
	yellow300: '#ffd566',
	yellow400: '#ffc733',
	yellow500: '#ffb900',
	yellow600: '#f7a407',
	yellow700: '#ee8e0d',
	yellow800: '#e67914',
	yellow900: '#dd631a',
	yellowRgba10: 'rgba(255, 185, 0, 0.1)',
	yellowRgba20: 'rgba(255, 185, 0, 0.2)',
	yellowRgba40: 'rgba(255, 185, 0, 0.4)',
	yellowRgba50: 'rgba(255, 185, 0, 0.5)',
	yellowRgba70: 'rgba(255, 185, 0, 0.7)',
};

const GREEN_COLORS = {
	green100: '#edf8ee',
	green150: '#D9EEDA',
	green200: '#b5e1b9',
	green300: '#90d296',
	green400: '#6bc373',
	green500: '#46b450',
	green600: '#399648',
	green700: '#328540',
	green800: '#2c7337',
	green900: '#25612f',
	greenRgba10: 'rgba(70, 180, 80, 0.1)',
	greenRgba20: 'rgba(70, 180, 80, 0.2)',
	greenRgba40: 'rgba(70, 180, 80, 0.4)',
	greenRgba50: 'rgba(70, 180, 80, 0.5)',
	greenRgba70: 'rgba(70, 180, 80, 0.7)',
};

const PURPLE_COLORS = {
	purple100: '#f3f1f8',
	purple150: '#E9DDE4',
	purple200: '#cdc5e1',
	purple300: '#9b8bc3',
	purple400: '#9b8bc3',
	purple500: '#826eb4',
	purple600: '#685890',
	purple700: '#4e426c',
	purple800: '#41375a',
	purple900: '#342c48',
	purpleRgba10: 'rgba(130, 110, 180, 0.1)',
	purpleRgba20: 'rgba(130, 110, 180, 0.2)',
	purpleRgba40: 'rgba(130, 110, 180, 0.4)',
	purpleRgba50: 'rgba(130, 110, 180, 0.5)',
	purpleRgba70: 'rgba(130, 110, 180, 0.7)',
};

const BLUE_COLORS = {
	blue100: '#e6f6fb',
	blue150: '#D2E2F1',
	blue200: '#99d9ed',
	blue300: '#66c6e4',
	blue400: '#33b3db',
	blue500: '#00a0d2',
	blue600: '#008ec2',
	blue700: '#0085ba',
	blue800: '#007cb2',
	blue900: '#005177',
	blueRgba10: 'rgba(0, 160, 210, 0.1)',
	blueRgba20: 'rgba(0, 160, 210, 0.2)',
	blueRgba40: 'rgba(0, 160, 210, 0.4)',
	blueRgba50: 'rgba(0, 160, 210, 0.5)',
	blueRgba70: 'rgba(0, 160, 210, 0.7)',
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

const BACKGROUND_COLOR_PROPS = {
	colorBackgroundBlue: get('blueRgba10'),
	colorBackgroundBlueText: get('blue800'),
	colorBackgroundGreen: get('greenRgba10'),
	colorBackgroundGreenText: get('green800'),
	colorBackgroundOrange: get('orangeRgba10'),
	colorBackgroundOrangeText: get('orange800'),
	colorBackgroundPurple: get('purpleRgba10'),
	colorBackgroundPurpleText: get('purple800'),
	colorBackgroundRed: get('redRgba10'),
	colorBackgroundRedText: get('red800'),
	colorBackgroundYellow: get('yellowRgba10'),
	colorBackgroundYellowText: get('yellow800'),
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
	colorBackgroundBlue: get('blueRgba20'),
	colorBackgroundBlueText: get('white'),
	colorBackgroundGreen: get('greenRgba20'),
	colorBackgroundGreenText: get('white'),
	colorBackgroundOrange: get('orangeRgba20'),
	colorBackgroundOrangeText: get('white'),
	colorBackgroundPurple: get('purpleRgba20'),
	colorBackgroundPurpleText: get('white'),
	colorBackgroundRed: get('redRgba20'),
	colorBackgroundRedText: get('white'),
	colorBackgroundYellow: get('yellowRgba20'),
	colorBackgroundYellowText: get('white'),
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
