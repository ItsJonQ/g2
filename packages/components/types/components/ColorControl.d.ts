import { PolymorphicComponent } from './_shared';
import { ButtonProps } from './button';
import { ColorCircleProps } from './ColorCircle';

export declare type ColorControlProps = ButtonProps &
	Pick<ColorCircleProps, 'color'> & {};

/**
 * `ColorControl` is an actionable component allowing the user to modify a color. The color is rendered as a `ColorCircle` along with what the color represents.
 *
 * @example
 * ```jsx
 * <ColorControl color="blue">Background</ColorControl>
 * ```
 */
export declare const ColorControl: PolymorphicComponent<
	ColorControlProps,
	'button'
>;
