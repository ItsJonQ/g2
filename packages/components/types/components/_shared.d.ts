import * as React from 'react';
import { PropertiesFallback } from 'csstype';

export type CSS = PropertiesFallback<number | string>;

/**
 * Render the component as another React.Component or HTML Element.
 * @example
 * ```
 * <View as="h1" />
 * ```
 */
export type AsProp = string | React.Component;

export type ConnectedProps = React.HTMLAttributes<any> &
	React.RefAttributes<any> & {
		/**
		 * Render the component as another React.Component or HTML Element.
		 * @example
		 * ```
		 * <View as="h1" />
		 * ```
		 */
		as?: AsProp;
		/**
		 * Render custom CSS using the style system.
		 * @example
		 * ```
		 * <View css={`background: blue;`} />
		 * ```
		 */
		css?: any;
	};
