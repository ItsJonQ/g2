import { PolymorphicComponent, CSS } from './_shared';

export declare type ArrowIndicatorDirection = 'top' | 'right' | 'down' | 'left';

export declare type ArrowIndicatorProps = {
	/**
	 * The direction of the `ArrowIndicator` icon.
	 *
	 * @default 'right'
	 */
	direction?: ArrowIndicatorDirection;
	/**
	 * The height of the `ArrowIndicator`.
	 */
	height?: CSS['height'];
	/**
	 * The arrow's icon size.
	 *
	 * @default 5
	 */
	iconSize?: CSS['width'];
	/**
	 * The height and width of the `ArrowIndicator`.
	 *
	 * @default 24
	 */
	size?: CSS['width'];
	/**
	 * The width of the `ArrowIndicator`.
	 */
	width?: CSS['width'];
};

/**
 * `ArrowIndicator` renders an arrow that represent the visibility of a Disclosure (collapsible) element.
 *
 * @example
 * ```jsx
 * <ArrowIndicator direction="down" />
 * ```
 */
export declare const ArrowIndicator: PolymorphicComponent<
	'div',
	ArrowIndicatorProps
>;
