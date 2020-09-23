import { ColorInterface } from './colors';

type CSSNumberValue = number | string;

/** Outputs a CSS number value, often with a unit. */
export declare interface ValueInterface {
	/** Clamps a number (unit) value between a min and max value. */
	clamp: (
		value: CSSNumberValue,
		min: CSSNumberValue,
		max: CSSNumberValue,
	) => string;
	/** Get a color value. */
	color: ColorInterface;
	/** Converts a value into pixels, if applicable. */
	px: (value: CSSNumberValue) => string;
	/** Calculates a value based on the internal grid system. */
	space: (value: CSSNumberValue) => string;
}
