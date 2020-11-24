import { CSS, PolymorphicComponent } from './_shared';

export declare type ColorCircleSize = 'medium' | 'small';

export declare type ColorCircleProps = {
	/**
	 * Color to display.
	 */
	color?: CSS['color'];
	/**
	 * Determines the size of `ColorCircle`.
	 *
	 * @default 'medium'
	 */
	size?: ColorCircleSize;
};

/**
 * `ColorCircle` is a component that renders a color within a circle UI.
 *
 * @example
 * ```jsx
 * <ColorCircle color="blue" />
 * ```
 */
export declare const ColorCircle: PolymorphicComponent<'div', ColorCircleProps>;
