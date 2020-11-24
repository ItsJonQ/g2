import {
	PolymorphicComponent,
	FormElementProps,
	SizeRangeReduced,
} from './_shared';

export declare type SliderProps = FormElementProps & {
	/**
	 * Determines the size of `Slider`.
	 *
	 * @default 'medium'
	 *
	 * @example
	 * ```jsx
	 * import { Slider, Text } from `@wp-g2/components`
	 *
	 * function Example() {
	 * 	return <Slider size="small" />
	 * }
	 * ```
	 */
	size?: SizeRangeReduced;
};

/**
 * `Select` is a form component lets users choose a value within a range.
 *
 * @example
 * ```jsx
 * import { Slider } from `@wp-g2/components`
 *
 * function Example() {
 *   return (
 *     <Slider />
 *   );
 * }
 * ```
 */
export declare const Slider: PolymorphicComponent<'input', SliderProps>;
