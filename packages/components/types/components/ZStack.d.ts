import { PolymorphicComponent } from './_shared';

export declare type ZStackProps = {
	/**
	 * Layers children elements on top of each other (first: highest z-index, last: lowest z-index).
	 *
	 * @default true
	 */
	isLayered?: boolean;
	/**
	 * Reverse the layer ordering (first: lowest z-index, last: highest z-index).
	 *
	 * @default false
	 */
	isReversed?: boolean;
	/**
	 * The amount of space between each child element.
	 */
	offset?: number;
};

/**
 * `ZStack` (Z-layer Stack) arranges and layers child elements on the z-axis.
 *
 * @example
 * ```jsx
 * <ZStack>
 * 	<View>...</View>
 * 	<View>...</View>
 * </ZStack>
 * ```
 */
export declare const ZStack: PolymorphicComponent<'div', ZStackProps>;
