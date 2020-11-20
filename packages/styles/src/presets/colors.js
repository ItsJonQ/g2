import { colorize } from '@wp-g2/utils';

import { get } from '../core';
import { SUPPORTED_COLORS } from '../theme/config';
import { G2_COLORS } from '../theme/tokens';

/**
 * @typedef {{
	(value: import('tinycolor2').ColorInput): import('tinycolor2').Instance;
	// The system admin color.
	admin: string;
	// The system text color.
	text: string;
	// The system textInverted color.
	textInverted: string;
	// The system positive color.
	positive: string;
	// The system destructive color.
	destructive: string;
	// The system border color.
	border: string;
	// The system blue color.
	blue: string;
	// The system blue100 color.
	blue100: string;
	// The system blue300 color.
	blue300: string;
	// The system blue500 color.
	blue500: string;
	// The system blue700 color.
	blue700: string;
	// The system blue900 color.
	blue900: string;
	// The system red color.
	red: string;
	// The system red100 color.
	red100: string;
	// The system red300 color.
	red300: string;
	// The system red500 color.
	red500: string;
	// The system red700 color.
	red700: string;
	// The system red900 color.
	red900: string;
	// The system purple color.
	purple: string;
	// The system purple100 color.
	purple100: string;
	// The system purple300 color.
	purple300: string;
	// The system purple500 color.
	purple500: string;
	// The system purple700 color.
	purple700: string;
	// The system purple900 color.
	purple900: string;
	// The system green color.
	green: string;
	// The system green100 color.
	green100: string;
	// The system green300 color.
	green300: string;
	// The system green500 color.
	green500: string;
	// The system green700 color.
	green700: string;
	// The system green900 color.
	green900: string;
	// The system yellow color.
	yellow: string;
	// The system yellow100 color.
	yellow100: string;
	// The system yellow300 color.
	yellow300: string;
	// The system yellow500 color.
	yellow500: string;
	// The system yellow700 color.
	yellow700: string;
	// The system yellow900 color.
	yellow900: string;
	// The system orange color.
	orange: string;
	// The system orange100 color.
	orange100: string;
	// The system orange300 color.
	orange300: string;
	// The system orange500 color.
	orange500: string;
	// The system orange700 color.
	orange700: string;
	// The system orange900 color.
	orange900: string;
	// The system darkGray color.
	darkGray: string;
	// The system darkGray100 color.
	darkGray100: string;
	// The system darkGray300 color.
	darkGray300: string;
	// The system darkGray500 color.
	darkGray500: string;
	// The system darkGray700 color.
	darkGray700: string;
	// The system darkGray900 color.
	darkGray900: string;
	// The system lightGray color.
	lightGray: string;
	// The system lightGray100 color.
	lightGray100: string;
	// The system lightGray300 color.
	lightGray300: string;
	// The system lightGray500 color.
	lightGray500: string;
	// The system lightGray700 color.
	lightGray700: string;
	// The system lightGray900 color.
	lightGray900: string;
	// The system black color.
	black: string;
	// The system blueberry color.
	blueberry: string;
	// The system blueberryDark color.
	blueberryDark: string;
	// The system greens color.
	greens: string;
	// The system grey color.
	grey: string;
	// The system greyBlack color.
	greyBlack: string;
	// The system lightBlue color.
	lightBlue: string;
	// The system lightGrey color.
	lightGrey: string;
	// The system lighterGrey color.
	lighterGrey: string;
	// The system pomegrade color.
	pomegrade: string;
	// The system WordPress blue color.
	wordpressBlue: string;
	// The system white color.
	white: string;
 }} ColorInstance
 */

/** @type {ColorInstance} */
// @ts-ignore We add the missing properties below.
const color = (value) => {
	return colorize(value);
};

color.admin = get('colorAdmin');
color.text = get('colorText');
color.textInverted = get('colorTextInverted');
color.border = get('surfaceBorderColor');
color.positive = get('colorPositive');
color.destructive = get('colorDestructive');

/**
 * Add supported colors to the color() method
 */
SUPPORTED_COLORS.forEach((value) => {
	const shades = [null, 100, 300, 500, 700, 900];
	shades.forEach((shade) => {
		if (!shade) {
			// @ts-ignore Generated string passed to `get`
			color[value] = get(`${value}500`);
		} else {
			// @ts-ignore Generated string passed to `get`
			color[`${value}${shade}`] = get(`${value}${shade}`);
		}
	});
});

/**
 * Add G2 colors to the color() method
 */
Object.keys(G2_COLORS).forEach((value) => {
	// @ts-ignore Generated string passed to `get`
	color[value] = get(value);
});

export { color };
