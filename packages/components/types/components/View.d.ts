import * as React from 'react';
import { PolymorphicComponent } from './_shared';

export declare type ViewProps = {
	/**
	 * Render the component as another React Component or HTML Element.
	 * @example
	 * ```
	 * <View as="h1" />
	 * ```
	 */
	as?: React.ReactElement | string;
	/**
	 * Render custom CSS using the style system.
	 * @example
	 * ```
	 * <View css={`background: blue;`} />
	 * ```
	 */
	css?: any;
	/**
	 * Render custom CSS using the style system. The `cx` prop combines custom styling with the `css` prop.
	 * Typically used "internally" to establish based styles for a `View`.
	 *
	 * @example
	 * ```
	 * <View cx={`background: blue;`} css={`color: white;`} />
	 * ```
	 */
	cx?: any;
};

/**
 * `View` is a core component that renders everything in the library. It is the principle component in the entire library.
 *
 * @example
 * ```jsx
 * <View>...</View>
 * ```
 */
export declare const View: PolymorphicComponent<ViewProps>;
