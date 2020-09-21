import { CSS, PolymorphicComponent, ResponsiveCSSValue } from './_shared';

export declare type FlexDirection = ResponsiveCSSValue<CSS['flexDirection']>;

export declare type FlexProps = {
	/**
	 * Aligns children using CSS Flexbox `align-items`.
	 *
	 * @default 'center'
	 */
	align?: CSS['alignItems'];
	/**
	 * Automatically wraps children if they're not `FlexItem` or `FlexBlock` elements.
	 *
	 * @default true
	 */
	autoWrap?: boolean;
	/**
	 * Renders content vertically (`column`) or horizontally (`row`).
	 *
	 * @default 'row'
	 */
	direction?: FlexDirection;
	/**
	 * The amount of space between each child element.
	 *
	 * @default 2
	 */
	gap?: number;
	/**
	 * Justifies children using CSS Flexbox `justify-content`.
	 *
	 * @default 'space-between'
	 */
	justify?: CSS['justifyContent'];
	/**
	 * Determines if children should wrap.
	 *
	 * @default false
	 */
	wrap?: boolean;
};

/**
 * `Flex` is a primitive layout component that adaptively aligns child content horizontally or vertically. `Flex` powers components like `HStack` and `VStack`.
 *
 * @example
 * ```jsx
 * <Flex>
 * 	<FlexItem>...</FlexItem>
 * 	<FlexBlock>...</FlexBlock>
 * 	<View>...</View>
 * </Flex>
 * ```
 */
export declare const Flex: PolymorphicComponent<FlexProps>;

export declare type FlexItemProps = {
	/**
	 * The (CSS) display of the `FlexItem`.
	 */
	display: CSS['display'];
	/**
	 * Determines if `FlexItem` should render as an adaptive full-width block.
	 *
	 * @default true
	 */
	isBlock: boolean;
};

/**
 * `FlexItem` is a primitive layout component that aligns content within layout containers like `Flex`.
 *
 * @example
 * ```jsx
 * <Flex>
 * 	<FlexItem>...</FlexItem>
 * </Flex>
 * ```
 */
export declare const FlexItem: PolymorphicComponent<FlexItemProps>;

/**
 * `FlexBlock` is a primitive layout component that adaptively resizes content within layout containers like `Flex`.
 *
 * @example
 * ```jsx
 * <Flex>
 * 	<FlexBlock>...</FlexBlock>
 * </Flex>
 * ```
 */
export declare const FlexBlock: PolymorphicComponent<Omit<
	FlexItemProps,
	'isBlock'
>>;
