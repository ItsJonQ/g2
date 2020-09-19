export { AsProp, ConnectedProps } from '@wp-g2/context';
import { PropertiesFallback } from 'csstype';

export type CSS = PropertiesFallback<number | string>;
export type ResponsiveCSSValue<T> = Array<T | null> | T;

/**
 * Render the component as another React.Component or HTML Element.
 * @example
 * ```
 * <View as="h1" />
 * ```
 */

export type FormElementProps = {
	/**
	 * The default (initial) state to use if `value` is undefined.
	 */
	defaultValue?: boolean;
	/**
	 * Determines if element is disabled.
	 */
	disabled?: boolean;
	/**
	 * Label for the form element.
	 */
	label?: string;
};
