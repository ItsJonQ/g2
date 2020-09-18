import * as React from 'react';

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

export interface Connect {
	<T>(
		WrappedComponent:
			| ((props: T & ConnectedProps) => React.ReactNode)
			| React.ComponentClass<T & ConnectedProps>
			| React.FC<T & ConnectedProps>,
		namespace: string,
	): React.ComponentClass<T & ConnectedProps> | React.FC<T & ConnectedProps>;
}

export declare const connect: Connect;
