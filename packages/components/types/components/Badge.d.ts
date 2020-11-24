import { PolymorphicComponent, CSS } from './_shared';

export declare type BadgeColor =
	| 'standard'
	| 'blue'
	| 'green'
	| 'orange'
	| 'purple'
	| 'red'
	| 'darkGray'
	| 'yellow';

export declare type BadgeProps = {
	/**
	 * The color of the `Badge`.
	 *
	 * @default 'standard'
	 */
	color?: BadgeColor;
	/**
	 * The (CSS) display of `Badge`.
	 *
	 * @default 'inline-block'
	 */
	display?: CSS['display'];
	/**
	 * Renders a bolder style variant.
	 *
	 * @default false
	 */
	isBold?: boolean;
	/**
	 * Renders a rounder style variant.
	 *
	 * @default false
	 */
	isRounded?: boolean;
	/**
	 * Truncates the text content.
	 *
	 * @default true
	 */
	truncate?: boolean;
};

/**
 * `Badge` is a component that displays the status of an object or of an action that’s been taken.
 *
 * @example
 * ```jsx
 * <Badge color="red">11</Badge>
 * ```
 */
export declare const Badge: PolymorphicComponent<'div', BadgeProps>;
