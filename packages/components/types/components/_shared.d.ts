import { PropertiesFallback } from 'csstype';

export type CSS = PropertiesFallback<number | string>;
export type ResponsiveCSSValue<T> = Array<T | null> | T;

// Source: https://github.com/emotion-js/emotion/blob/master/packages/styled-base/types/helper.d.ts
type PropsOf<
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	E extends keyof JSX.IntrinsicElements | React.JSXElementConstructor<any>
> = JSX.LibraryManagedAttributes<E, React.ComponentPropsWithRef<E>>;

interface ViewOwnProps<E extends React.ElementType = React.ElementType> {
	/**
	 * Render the component as another React.Component or HTML Element.
	 * @example
	 * ```
	 * <View as="h1" />
	 * ```
	 */
	as?: E | string;
	/**
	 * Render custom CSS using the style system.
	 * @example
	 * ```
	 * <View css={`background: blue;`} />
	 * ```
	 */
	css?: any;
}

export type ViewProps<E extends React.ElementType> = ViewOwnProps<E> &
	Omit<PropsOf<E>, keyof ViewOwnProps>;

export type PolymorphicComponentProps<E extends React.ElementType, P> = P &
	ViewProps<E>;

export type PolymorphicComponent<P, D extends React.ElementType = 'div'> = <
	E extends React.ElementType = D
>(
	props: PolymorphicComponentProps<E, P>,
) => JSX.Element;

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
	/**
	 * Value for the form element.
	 */
	value?: any;
};

export declare type SizeRangeDefault =
	| 'xLarge'
	| 'large'
	| 'medium'
	| 'small'
	| 'xSmall';

export declare type SizeRangeReduced = 'large' | 'medium' | 'small';

export declare type PopperPlacement =
	| 'auto'
	| 'auto-start'
	| 'auto-end'
	| 'top'
	| 'top-start'
	| 'top-end'
	| 'right'
	| 'right-start'
	| 'right-end'
	| 'bottom'
	| 'bottom-start'
	| 'bottom-end'
	| 'left'
	| 'left-start'
	| 'left-end';

export declare type PopperProps = {
	/**
	 * Position of the popover element.
	 *
	 * @default 'auto'
	 *
	 * @see https://popper.js.org/docs/v1/#popperplacements--codeenumcode
	 */
	placement?: PopperPlacement;
};
