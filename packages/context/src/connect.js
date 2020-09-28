import { hoistNonReactStatics, is, uniq } from '@wp-g2/utils';
import React, { forwardRef } from 'react';

import { useContextSystem } from './useContextSystem';

const REACT_TYPEOF_KEY = '$$typeof';

/**
 * Special key where the connected namespaces are stored.
 * This is attached to Context connected components as a static property.
 */
const CONNECT_NAMESPACE = '__styleSystemContextKey__';

/**
 * # DEPRECATED
 * ## use contextConnect() instead.
 *
 * Connects a component to the G2 Context system using a higher-order component.
 * The workflow for this connect HOC is similar to that of Redux.
 *
 * @example
 * ```jsx
 * const HelloComponent = () => <div>Hello</div>
 * const ConnectedHello = connect(HelloComponent, 'Hello')
 * ```
 *
 * @param {React.Component} Component The component to connect.
 * @param {Array<string>|string} namespace The name for the component to be identified by the Context system.
 * @param {object} options Options to modify the connected component.
 * @returns {React.Component} The connected component.
 */
export function connect(Component, namespace, options = {}) {
	const { pure = true } = options;

	const render = (componentProps, forwardedRef) => {
		// eslint-disable-next-line
		const finalComponentProps = useContextSystem(
			componentProps,
			namespace,
			forwardedRef,
		);

		/**
		 * TODO: Revisit shallow.
		 *
		 * If "shallow" prop rendering is preferred, then we must "reset" the
		 * the prop values so that it is no longer passed down.
		 */
		// if (shallowProp) {
		// 	const nextContextProps = { ...contextProps };

		// 	if (is.array(key)) {
		// 		for (const k of key) {
		// 			nextContextProps[k] = {};
		// 		}
		// 	} else {
		// 		nextContextProps[key] = {};
		// 	}

		// 	return (
		// 		<ContextSystemProvider shallow value={nextContextProps}>
		// 			<Component {...finalComponentProps} />
		// 		</ContextSystemProvider>
		// 	);
		// }

		return <Component {...finalComponentProps} />;
	};

	const ForwardedComponent = forwardRef(render);
	const ConnectedComponent = pure
		? React.memo(ForwardedComponent)
		: ForwardedComponent;

	const NamespacedComponent = connectComponentWithNamespace(
		ConnectedComponent,
		namespace,
	);

	return hoistNonReactStatics(NamespacedComponent, Component);
}

/**
 * "Connects" (or registers) a component within the Context system under
 * a specified namespace.
 *
 * @param {React.ReactElement} Component The component to register into the Context system.
 * @param {Array<string>|string} namespace The namespace to register the component under.
 * @returns {React.ReactElement} The component, with registered namespace as static properties.
 */
export function connectComponentWithNamespace(Component, namespace) {
	const displayName = is.array(namespace)
		? namespace[0]
		: namespace || Component.name;

	let mergedNamespace = Component[CONNECT_NAMESPACE] || [displayName];

	/**
	 * Consolidate (merge) namespaces before attaching it to the component.
	 */
	if (is.array(namespace)) {
		mergedNamespace = [...mergedNamespace, ...namespace];
	}
	if (is.string(namespace)) {
		mergedNamespace = [...mergedNamespace, namespace];
	}

	Component.displayName = displayName;
	Component[CONNECT_NAMESPACE] = uniq(mergedNamespace);

	return Component;
}

/**
 * Forwards ref (React.ForwardRef) and "Connects" (or registers) a component
 * within the Context system under a specified namespace.
 *
 * This is an (experimental) evolution of the initial connect() HOC.
 * The hope is that we can improve render performance by removing functional
 * component wrappers.
 *
 * @param {React.ReactElement} Component The component to register into the Context system.
 * @param {Array<string>|string} namespace The namespace to register the component under.
 * @returns {React.ReactElement} The component, with registered namespace as static properties.
 */
export function contextConnect(Component, namespace) {
	const WrappedComponent = React.memo(forwardRef(Component));
	return connectComponentWithNamespace(WrappedComponent, namespace);
}

/**
 * Attempts to retrieve the connected namespace from a component.
 *
 * @param {React.Component} Component The component to retrieve a namespace from.
 * @returns {Array<string>} The connected namespaces.
 */
export function getConnectNamespace(Component) {
	return (Component && Component[CONNECT_NAMESPACE]) || [];
}

/**
 * Checks to see if a component is connected within the Context system.
 *
 * @param {React.Component} Component The component to retrieve a namespace from.
 * @param {Array<string>|string} match The namespace to check.
 * @returns {boolean} The result.
 */
export function hasConnectNamespace(Component, match) {
	const BaseComponent = Component[REACT_TYPEOF_KEY]
		? Component.type
		: Component;

	if (is.string(match)) {
		return getConnectNamespace(BaseComponent).includes(match);
	}
	if (is.array(match)) {
		return match.some((result) =>
			getConnectNamespace(BaseComponent).includes(result),
		);
	}

	return false;
}

export const getNamespace = getConnectNamespace;
export const hasNamespace = hasConnectNamespace;
