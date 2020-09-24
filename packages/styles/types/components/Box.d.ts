import * as React from 'react';
import { Emotion } from 'create-emotion';

export type InterpolatedCSS = Emotion['cx'] | Emotion['css'] | string;

// Source: https://github.com/emotion-js/emotion/blob/master/packages/styled-base/types/helper.d.ts
type PropsOf<
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	E extends keyof JSX.IntrinsicElements | React.JSXElementConstructor<any>
> = JSX.LibraryManagedAttributes<E, React.ComponentPropsWithRef<E>>;

export interface ViewOwnProps<E extends React.ElementType = React.ElementType> {
	/**
	 * Render the component as another React Component or HTML Element.
	 *
	 * @example
	 * ```jsx
	 * import { View } from `@wp-g2/components`
	 *
	 * function Example() {
	 * 	return <View as="h1" />
	 * }
	 * ```
	 */
	as?: E | string;
	/**
	 * Render custom CSS using the style system.
	 *
	 * @example
	 * ```jsx
	 * import { View } from `@wp-g2/components`
	 *
	 * function Example() {
	 * 	return <View css={`background: white;`} />
	 * }
	 * ```
	 */
	css?: InterpolatedCSS;
	/**
	 * Render custom CSS using the style system. The `cx` prop combines custom styling with the `css` prop.
	 * Typically used "internally" to establish based styles for a `View`.
	 *
	 * @example
	 * ```jsx
	 * import { View } from `@wp-g2/components`
	 *
	 * function Example() {
	 * 	return <View cx={`background: blue;`} css={`color: white;`} />
	 * }
	 * ```
	 */
	cx?: any;
}

type ViewProps<E extends React.ElementType> = ViewOwnProps<E> &
	Omit<PropsOf<E>, keyof ViewOwnProps>;

export type PolymorphicComponentProps<E extends React.ElementType, P> = P &
	ViewProps<E>;

export type PolymorphicComponent<P, D extends React.ElementType = 'div'> = <
	E extends React.ElementType = D
>(
	props: PolymorphicComponentProps<E, P>,
) => JSX.Element;

export type CreatePolymorphicComponent<
	P,
	D extends React.ElementType = 'div'
> = (
	/**
	 * Custom CSS styles for the styled component.
	 */
	styles: any,
) => <E extends React.ElementType = D>(
	props: PolymorphicComponentProps<E, P>,
) => JSX.Element;

export declare const Box: PolymorphicComponent<{}, 'div'>;
export declare const BaseView: PolymorphicComponent<{}, 'div'>;
export declare const View: PolymorphicComponent<{}, 'div'>;
