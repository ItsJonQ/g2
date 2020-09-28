import { CSS, PolymorphicComponent, ResponsiveCSSValue } from './_shared';

export declare type FlexDirection = ResponsiveCSSValue<CSS['flexDirection']>;

export declare type FlexProps = {
	/**
	 * Aligns children using CSS Flexbox `align-items`. Vertically aligns content if the `direction` is `row`, or horizontally aligns content if the `direction` is `column`.
	 *
	 * In the example below, `flex-start` will align the children content to the top.
	 *
	 * @default 'center'
	 *
	 * @example
	 * ```jsx
	 * import { Flex, Text, View } from `@wp-g2/components`
	 * import { ui } from `@wp-g2/styles`
	 *
	 * function Example() {
	 *   return (
	 *     <Flex align="flex-start">
	 *       <View css={[ui.background.blue, { height: 100 }]}>
	 *         <Text>Ana</Text>
	 *       </View>
	 *       <View css={[ui.background.blue]}>
	 *         <Text>Elsa</Text>
	 *       </View>
	 *     </Flex>
	 *   )
	 * }
	 * ```
	 */
	align?: CSS['alignItems'];
	/**
	 * Automatically wraps children if they're not `FlexItem` or `FlexBlock` elements.
	 *
	 * @default true
	 */
	// autoWrap?: boolean;
	/**
	 * The direction flow of the children content can be adjusted with `direction`. `column` will align children vertically and `row` will align children horizontally.
	 *
	 * @default 'row'
	 *
	 * @example
	 * ```jsx
	 * import { Flex, Text, View } from `@wp-g2/components`
	 * import { ui } from `@wp-g2/styles`
	 *
	 * function Example() {
	 *   return (
	 *     <Flex direction="column">
	 *       <View css={[ui.background.blue]}>
	 *         <Text>Ana</Text>
	 *       </View>
	 *       <View css={[ui.background.blue]}>
	 *         <Text>Elsa</Text>
	 *       </View>
	 *     </Flex>
	 *   )
	 * }
	 * ```
	 */
	direction?: FlexDirection;
	/**
	 * Spacing in between each child can be adjusted by using `gap`. The value of `gap` works as a multiplier to the library's grid system (base of `4px`).
	 *
	 * @default 2
	 *
	 * @example
	 * ```jsx
	 * import { Flex, Text, View } from `@wp-g2/components`
	 * import { ui } from `@wp-g2/styles`
	 *
	 * function Example() {
	 * 	return (
	 * 		<Flex justify="flex-start" gap={8}>
	 * 			<View css={[ui.background.blue]}>
	 * 				<Text>Ana</Text>
	 * 			</View>
	 * 			<View css={[ui.background.blue]}>
	 * 				<Text>Elsa</Text>
	 * 			</View>
	 * 		</Flex>
	 * 	)
	 * }
	 * ```
	 */
	gap?: number;
	/**
	 * Horizontally aligns content if the `direction` is `row`, or vertically aligns content if the `direction` is `column`.
	 * In the example below, `flex-start` will align the children content to the left.
	 *
	 * @default 'space-between'
	 *
	 * @example
	 * ```jsx
	 * import { Flex, Text, View } from `@wp-g2/components`
	 * import { ui } from `@wp-g2/styles`
	 *
	 * function Example() {
	 *   return (
	 *     <Flex justify="flex-start">
	 *       <View css={[ui.background.blue, { height: 100 }]}>
	 *         <Text>Ana</Text>
	 *       </View>
	 *       <View css={[ui.background.blue]}>
	 *         <Text>Elsa</Text>
	 *       </View>
	 *     </Flex>
	 *   )
	 * }
	 * ```
	 */
	justify?: CSS['justifyContent'];
	/**
	 * Determines if children should wrap.
	 *
	 * @default false
	 *
	 * @example
	 * ```jsx
	 * import { Flex, Text, View } from `@wp-g2/components`
	 * import { ui } from `@wp-g2/styles`
	 *
	 * function Example() {
	 *   return (
	 *     <Flex justify="flex-start" wrap>
	 *       <View css={[ui.background.blue, { width: 200 }]}>
	 *         <Text>Ana</Text>
	 *       </View>
	 *       <View css={[ui.background.blue, { width: 200 }]}>
	 *         <Text>Elsa</Text>
	 *       </View>
	 *       <View css={[ui.background.blue, { width: 200 }]}>
	 *         <Text>Olaf</Text>
	 *       </View>
	 *       <View css={[ui.background.blue, { width: 200 }]}>
	 *         <Text>Kristoff</Text>
	 *       </View>
	 *       <View css={[ui.background.blue, { width: 200 }]}>
	 *         <Text>Queen Iduna</Text>
	 *       </View>
	 *       <View css={[ui.background.blue, { width: 200 }]}>
	 *         <Text>King Agnarr</Text>
	 *       </View>
	 *       <View css={[ui.background.blue, { width: 200 }]}>
	 *         <Text>Yelena</Text>
	 *       </View>
	 *     </Flex>
	 *   )
	 * }
	 * ```
	 */
	wrap?: boolean;
};

/**
 * `Flex` is a primitive layout component that adaptively aligns child content horizontally or vertically. `Flex` powers components like `HStack` and `VStack`.
 *
 * @remarks
 * `Flex` is used with any of it's two sub-components, `FlexItem` and `FlexBlock`.
 *
 *
 * @example
 * ```jsx
 * import { Flex, FlexItem, FlexBlock, Text, View } from `@wp-g2/components`
 *
 * function Example() {
 *   return (
 *     <Flex>
 *       <FlexItem>
 *         <View css={[ui.background.blue]}>
 *           <Text>Ana</Text>
 *         </View>
 *       </FlexItem>
 *       <FlexBlock>
 *         <View css={[ui.background.blue]}>
 *           <Text>Elsa</Text>
 *         </View>
 *       </FlexBlock>
 *     </Flex>
 *   );
 * }
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
