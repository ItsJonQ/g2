export { config } from './config';
export { darkModeConfig } from './darkModeConfig';
export { highContrastModeConfig } from './highContrastModeConfig';
export { darkHighContrastModeConfig } from './darkHighContrastModeConfig';

/**
 * @typedef {
	| 'blue'
	| 'red'
	| 'purple'
	| 'green'
	| 'yellow'
	| 'orange'
	| 'darkGray'
	| 'lightGray'
	} SupportedColors
 */

/** @type {SupportedColors[]} */
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
