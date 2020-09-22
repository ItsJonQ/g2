import { PolymorphicComponent } from './_shared';
import { TextProps, TextSize } from './Text';
import { CSS } from './_shared';

export declare type HeadingSize = 1 | 2 | 3 | 4 | 5 | 6;

export declare type HeadingProps = TextProps & {
	/**
	 * `Heading` will typically render the sizes `1`, `2`, `3`, `4`, `5`, or `6`, which map to `h1`-`h6`. However, it can render any size, including non `px` values.
	 *
	 * @default 3
	 *
	 * @example
	 * ```jsx
	 * import { Heading, View } from `@wp-g2/components`
	 *
	 * function Example() {
	 *   return (
	 *     <View>
	 *       <Heading size={1}>Into The Unknown</Heading>
	 *       <Heading size={2}>Into The Unknown</Heading>
	 *       <Heading size={3}>Into The Unknown</Heading>
	 *       <Heading size={4}>Into The Unknown</Heading>
	 *       <Heading size={5}>Into The Unknown</Heading>
	 *       <Heading size={6}>Into The Unknown</Heading>
	 *     </View>
	 *   );
	 * }
	 * ```
	 */
	size: HeadingSize | TextSize | CSS['fontSize'];
};

/**
 * `Heading` renders headings and titles using the library's typography system.
 *
 * @example
 * ```jsx
 * import { Heading } from `@wp-g2/components`
 *
 * function Example() {
 *   return <Heading>Into The Unknown</Heading>;
 * }
 * ```
 */
export declare const Heading: PolymorphicComponent<HeadingProps, 'div'>;
