import { createRgbaColors, createTextColors, get } from '../utils';

export const CORE_PURPLE_COLORS = {
	purple100: '#f3f1f8',
	purple200: '#cdc5e1',
	purple300: '#B4A8D2',
	purple400: '#9b8bc3',
	purple500: '#826eb4',
	purple600: '#685890',
	purple700: '#4e426c',
	purple800: '#41375a',
	purple900: '#342c48',
};

export const CORE_DARK_GRAY_COLORS = {
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

export const CORE_LIGHT_GRAY_COLORS = {
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

export const CORE_RED_COLORS = {
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

export const CORE_ORANGE_COLORS = {
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

export const CORE_YELLOW_COLORS = {
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

export const CORE_GREEN_COLORS = {
	green100: '#edf8ee',
	green200: '#b5e1b9',
	green300: '#90d296',
	green400: '#6bc373',
	green500: '#46b450',
	green600: '#399648',
	green700: '#328540',
	green800: '#2c7337',
	green900: '#25612f',
};

export const CORE_BLUE_COLORS = {
	blue100: '#e6f6fb',
	blue200: '#99d9ed',
	blue300: '#66c6e4',
	blue400: '#33b3db',
	blue500: '#00a0d2',
	blue600: '#008ec2',
	blue700: '#0085ba',
	blue800: '#007cb2',
	blue900: '#0072A8',
};

export const DARK_GRAY_COLORS = {
	...CORE_DARK_GRAY_COLORS,
	...createTextColors(CORE_DARK_GRAY_COLORS),
	...createRgbaColors(CORE_DARK_GRAY_COLORS),
};

export const LIGHT_GRAY_COLORS = {
	...CORE_LIGHT_GRAY_COLORS,
	...createTextColors(CORE_LIGHT_GRAY_COLORS),
	...createRgbaColors(CORE_LIGHT_GRAY_COLORS),
};

export const RED_COLORS = {
	...CORE_RED_COLORS,
	...createTextColors(CORE_RED_COLORS),
	...createRgbaColors(CORE_RED_COLORS),
};

export const ORANGE_COLORS = {
	...CORE_ORANGE_COLORS,
	...createTextColors(CORE_ORANGE_COLORS),
	...createRgbaColors(CORE_ORANGE_COLORS),
};

export const YELLOW_COLORS = {
	...CORE_YELLOW_COLORS,
	...createTextColors(CORE_YELLOW_COLORS),
	...createRgbaColors(CORE_YELLOW_COLORS),
};

export const GREEN_COLORS = {
	...CORE_GREEN_COLORS,
	...createTextColors(CORE_GREEN_COLORS),
	...createRgbaColors(CORE_GREEN_COLORS),
};

export const PURPLE_COLORS = {
	...CORE_PURPLE_COLORS,
	...createTextColors(CORE_PURPLE_COLORS),
	...createRgbaColors(CORE_PURPLE_COLORS),
};

export const BLUE_COLORS = {
	...CORE_BLUE_COLORS,
	...createTextColors(CORE_BLUE_COLORS),
	...createRgbaColors(CORE_BLUE_COLORS),
};

export const WORDPRESS_COLORS = {
	...DARK_GRAY_COLORS,
	...LIGHT_GRAY_COLORS,
	...RED_COLORS,
	...ORANGE_COLORS,
	...YELLOW_COLORS,
	...GREEN_COLORS,
	...PURPLE_COLORS,
	...BLUE_COLORS,
};

export const G2_COLORS = {
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

export const BACKGROUND_COLOR_PROPS = {
	colorBackgroundBlue: get('blueRgba10'),
	colorBackgroundBlueText: get('blue800'),

	colorBackgroundDarkGray: get('darkGrayRgba10'),
	colorBackgroundDarkGrayText: get('darkGray800'),

	colorBackgroundGreen: get('greenRgba10'),
	colorBackgroundGreenText: get('green800'),

	colorBackgroundLightGray: get('lightGrayRgba10'),
	colorBackgroundLightGrayText: get('lightGray800'),

	colorBackgroundOrange: get('orangeRgba10'),
	colorBackgroundOrangeText: get('orange800'),

	colorBackgroundPurple: get('purpleRgba10'),
	colorBackgroundPurpleText: get('purple800'),

	colorBackgroundRed: get('redRgba10'),
	colorBackgroundRedText: get('red800'),

	colorBackgroundYellow: get('yellowRgba10'),
	colorBackgroundYellowText: get('yellow800'),
};

export const DARK_MODE_COLORS = {
	colorBackgroundBlue: get('blueRgba20'),
	colorBackgroundBlueText: get('blue200'),

	colorBackgroundDarkGray: get('darkGrayRgba20'),
	colorBackgroundDarkGrayText: get('white'),

	colorBackgroundGreen: get('greenRgba20'),
	colorBackgroundGreenText: get('green200'),

	colorBackgroundLightGray: get('lightGrayRgba20'),
	colorBackgroundLightGrayText: get('white'),

	colorBackgroundOrange: get('orangeRgba20'),
	colorBackgroundOrangeText: get('orange200'),

	colorBackgroundPurple: get('purpleRgba20'),
	colorBackgroundPurpleText: get('purple200'),

	colorBackgroundRed: get('redRgba20'),
	colorBackgroundRedText: get('red200'),

	colorBackgroundYellow: get('yellowRgba20'),
	colorBackgroundYellowText: get('yellow200'),
};

export const DARK_MODE_RGBA_COLORS = {
	...createRgbaColors(CORE_BLUE_COLORS, /* isDark */ true),
	...createRgbaColors(CORE_GREEN_COLORS, /* isDark */ true),
	...createRgbaColors(CORE_ORANGE_COLORS, /* isDark */ true),
	...createRgbaColors(CORE_PURPLE_COLORS, /* isDark */ true),
	...createRgbaColors(CORE_RED_COLORS, /* isDark */ true),
	...createRgbaColors(CORE_YELLOW_COLORS, /* isDark */ true),
	...createRgbaColors(CORE_DARK_GRAY_COLORS, /* isDark */ true),
	...createRgbaColors(CORE_LIGHT_GRAY_COLORS, /* isDark */ true),
};
