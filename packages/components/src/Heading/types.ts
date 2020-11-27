import { CSSProperties } from 'react';
import { Props as TextProps, TextSize } from '../Text/types';

export type HeadingSize = 1 | 2 | 3 | 4 | 5 | 6;

export type Props = TextProps & {
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
	size: HeadingSize | TextSize | CSSProperties['fontSize'];
};
