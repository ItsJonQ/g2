import * as React from 'react';
import { PolymorphicComponent } from './_shared';

export declare type ViewProps = {
	/**
	 * Render the component as another React Component or HTML Element.
	 *
	 * @example
	 * ```jsx
	 * import { View } from `@wp-g2/components`
	 *
	 * function Example() {
	 * 	return <View as="h1"><span>Olaf</span></View>
	 * }
	 * ```
	 */
	as?: React.ReactElement | string;
	/**
	 * Render custom CSS using the style system.
	 *
	 * @example
	 * ```jsx
	 * import { View } from `@wp-g2/components`
	 *
	 * function Example() {
	 * 	return <View css={`background: blue;`}><span>Olaf</span></View>
	 * }
	 * ```
	 */
	css?: any;
	/**
	 * Render custom CSS using the style system. The `cx` prop combines custom styling with the `css` prop.
	 * Typically used "internally" to establish based styles for a `View`.
	 *
	 * @example
	 * ```jsx
	 * import { View } from `@wp-g2/components`
	 * import { css } from `@wp-g2/styles`
	 *
	 * function Example() {
	 * 	return <View cx={[css`background: blue;`]} css={`color: white;`}><span>Olaf</span></View>
	 * }
	 * ```
	 */
	cx?: any;
};

/**
 * `View` is a core component that renders everything in the library. It is the principle component in the entire library.
 *
 * @example
 * ```jsx
 * import { Text, View } from `@wp-g2/components`
 *
 * function Example() {
 *   return (
 *     <View>
 *       <Text>Into The Unknown</Text>
 *     </View>
 *   );
 * }
 * ```
 */
export declare const View: PolymorphicComponent<ViewProps>;
