import * as React from 'react';
import { Emotion } from 'create-emotion';

type InterpolatedCSS = Emotion['cx'] | Emotion['css'] | string;

// Source: https://github.com/emotion-js/emotion/blob/master/packages/styled-base/types/helper.d.ts
type PropsOf<
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	E extends keyof JSX.IntrinsicElements | React.JSXElementConstructor<any>
> = JSX.LibraryManagedAttributes<E, React.ComponentPropsWithRef<E>>;

interface ViewOwnProps<E extends React.ElementType = React.ElementType> {
	/**
	 * Render the component as another React Component or HTML Element.
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
	css?: InterpolatedCSS;
}

type ViewProps<E extends React.ElementType> = ViewOwnProps<E> &
	Omit<PropsOf<E>, keyof ViewOwnProps>;

type PolymorphicComponentProps<E extends React.ElementType, P> = P &
	ViewProps<E>;

export type PolymorphicComponent<P, D extends React.ElementType = 'div'> = <
	E extends React.ElementType = D
>(
	props: PolymorphicComponentProps<E, P>,
) => JSX.Element;

export type CreatePolymorphicComponent<
	P,
	D extends React.ElementType = 'div'
> = <E extends React.ElementType = D>(
	/**
	 * Custom CSS styles for the styled component.
	 */
	styles: any,
) => (props: PolymorphicComponentProps<E, P>) => JSX.Element;

export declare const Box: PolymorphicComponent<{}, 'div'>;
export declare const BaseView: PolymorphicComponent<{}, 'div'>;
export declare const View: PolymorphicComponent<{}, 'div'>;
