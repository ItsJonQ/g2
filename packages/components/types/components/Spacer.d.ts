import { PolymorphicComponent } from './_shared';

export declare type SpacerProps = {
	/**
	 * Adjusts all margins.
	 */
	m?: number;
	/**
	 * Adjusts top and bottom margins.
	 */
	my?: number;
	/**
	 * Adjusts left and right margins.
	 */
	mx?: number;
	/**
	 * Adjusts top margins.
	 */
	mt?: number;
	/**
	 * Adjusts bottom margins.
	 *
	 * @default 2
	 */
	mb?: number;
	/**
	 * Adjusts left margins.
	 */
	ml?: number;
	/**
	 * Adjusts right margins.
	 */
	mr?: number;
	/**
	 * Adjusts all padding.
	 */
	p?: number;
	/**
	 * Adjusts top and bottom padding.
	 */
	py?: number;
	/**
	 * Adjusts left and right padding.
	 */
	px?: number;
	/**
	 * Adjusts top padding.
	 */
	pt?: number;
	/**
	 * Adjusts bottom padding.
	 */
	pb?: number;
	/**
	 * Adjusts left padding.
	 */
	pl?: number;
	/**
	 * Adjusts right padding.
	 */
	pr?: number;
};

/**
 * `Spacer` is a primitive layout component that providers inner (`padding`) or outer (`margin`) space in-between components. It can also be used to adaptively provide space within an `HStack` or `VStack`.
 *
 * @remarks
 * `Spacer` comes with a bunch of shorthand props to adjust `margin` and `padding`. The values of these props work as a multiplier to the library's grid system (base of `4px`).
 *
 *
 * @example
 * ```jsx
 * import { Spacer } from `@wp-g2/components`
 *
 * function Example() {
 *   return (
 *     <View>
 *       <Spacer>
 *         <Heading>Into The Unknown</Heading>
 *       </Spacer>
 *       <Text>
 *         Every day's a little harder as I feel your power grow. Don't you know
 *         there's part of me that longs to go.
 *       </Text>
 *     </View>
 *   );
 * }
 * ```
 */
export declare const Spacer: PolymorphicComponent<'div', SpacerProps>;
