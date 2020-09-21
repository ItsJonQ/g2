import * as React from 'react';
import { HTMLTagName } from './_tags';

// TODO: Fix type with PolymorphicComponent implementation

/**
 * Render the component as another React.Component or HTML Element.
 * @example
 * ```
 * <View as="h1" />
 * ```
 */
export type AsProp = HTMLTagName | React.Component;

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

export interface Connect {
	<T>(
		/**
		 * The component to connect.
		 */
		WrappedComponent:
			| ((props: T & ConnectedProps) => React.ReactNode)
			| React.ComponentClass<T>
			| React.FC<T>,
		/**
		 * The namespace for the component.
		 */
		namespace: string,
	): React.ComponentClass<T> | React.FC<T>;
}

/**
 * A higher-order component that "connects" a component the Context system, registering it under a defined namespace.
 *
 * @example
 * ```jsx
 * const ConnectedComponent = connect(MyComponent, 'MyComponent')
 * ```
 */
export declare const connect: Connect;
