import { CSS, PolymorphicComponent } from './_shared';
import { HStackAlignment, HStackProps } from './HStack';

export declare type VStackProps = HStackProps & {
	/**
	 * @example
	 *```jsx
	 * import { VStack, Text, View } from `@wp-g2/components`
	 * import { ui } from `@wp-g2/styles`
	 *
	 * function Example() {
	 *   return (
	 *     <VStack alignment="center">
	 *       <View css={[ui.background.blue]}>
	 *         <Text>Ana</Text>
	 *       </View>
	 *       <View css={[ui.background.blue]}>
	 *         <Text>Elsa</Text>
	 *       </View>
	 *       <View css={[ui.background.blue]}>
	 *         <Text>Olaf</Text>
	 *       </View>
	 *     </VStack>
	 *   );
	 * }
	 *```
	 */
	alignment?: HStackAlignment | CSS['alignItems'];
	/**
	 * @example
	 * ```jsx
	 * import { VStack, Text, View } from `@wp-g2/components`
	 * import { ui } from `@wp-g2/styles`
	 *
	 * function Example() {
	 *   return (
	 *     <VStack alignment="center" spacing={8}>
	 *       <View css={[ui.background.blue]}>
	 *         <Text>Ana</Text>
	 *       </View>
	 *       <View css={[ui.background.blue]}>
	 *         <Text>Elsa</Text>
	 *       </View>
	 *       <View css={[ui.background.blue]}>
	 *         <Text>Olaf</Text>
	 *       </View>
	 *     </VStack>
	 *   );
	 * }
	 *```
	 */
	spacing?: CSS['width'];
};

/**
 * `VStack` (or Vertical Stack) is a layout component that arranges child elements in a vertical line.
 *
 * @remarks
 * `VStack` can render anything inside.
 *
 * @example
 * ```jsx
 * import { VStack, Text, View } from `@wp-g2/components`
 * import { ui } from `@wp-g2/styles`
 *
 * function Example() {
 *   return (
 *     <VStack css={[ui.frame.height(200)]}>
 *       <View css={[ui.background.blue]}>
 *         <Text>Ana</Text>
 *       </View>
 *       <View css={[ui.background.blue]}>
 *         <Text>Elsa</Text>
 *       </View>
 *       <View css={[ui.background.blue]}>
 *         <Text>Olaf</Text>
 *       </View>
 *     </VStack>
 *   );
 * }
 * ```
 */
export declare const VStack: PolymorphicComponent<'div', VStackProps>;
