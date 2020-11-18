import { is, uniq } from '@wp-g2/utils';
import React, { forwardRef } from 'react';

import { CONNECT_STATIC_NAMESPACE, REACT_TYPEOF_KEY } from './constants';

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
export function contextConnect(Component, namespace, options = {}) {
	const { memo = true } = options;

	let WrappedComponent = forwardRef(Component);
	if (memo) {
		WrappedComponent = React.memo(WrappedComponent);
	}

	return connectComponentWithNamespace(WrappedComponent, namespace);
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

	let mergedNamespace = Component[CONNECT_STATIC_NAMESPACE] || [displayName];

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
	Component[CONNECT_STATIC_NAMESPACE] = uniq(mergedNamespace);

	return Component;
}

/**
 * Attempts to retrieve the connected namespace from a component.
 *
 * @param {React.Component} Component The component to retrieve a namespace from.
 * @returns {Array<string>} The connected namespaces.
 */
export function getConnectNamespace(Component) {
	return (Component && Component[CONNECT_STATIC_NAMESPACE]) || [];
}

/**
 * Checks to see if a component is connected within the Context system.
 *
 * @param {React.Component} Component The component to retrieve a namespace from.
 * @param {Array<string>|string} match The namespace to check.
 * @returns {boolean} The result.
 */
export function hasConnectNamespace(Component, match) {
	if (!Component) return false;

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
