import * as React from 'react';
import { ConnectedProps, CSS } from './_shared';

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
	 * @default 'standard'
	 */
	color?: BadgeColor;
	/**
	 * The (CSS) display of `Badge`.
	 * @default 'inline-block'
	 */
	display?: CSS['display'];
	/**
	 * Renders a bolder style variant.
	 * @default false
	 */
	isBold?: boolean;
	/**
	 * Renders a rounder style variant.
	 * @default false
	 */
	isRounded?: boolean;
	/**
	 * Truncates the text content.
	 * @default true
	 */
	truncate?: boolean;
};

/**
 * `Badge` is a component that displays the status of an object or of an action that’s been taken.
 */
export declare const Badge: React.FC<BadgeProps & ConnectedProps>;
