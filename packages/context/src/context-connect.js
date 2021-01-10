import { uniq } from 'lodash';
import React, { forwardRef } from 'react';

import { CONNECT_STATIC_NAMESPACE } from './constants';

/**
 * Forwards ref (React.ForwardRef) and "Connects" (or registers) a component
 * within the Context system under a specified namespace.
 *
 * This is an (experimental) evolution of the initial connect() HOC.
 * The hope is that we can improve render performance by removing functional
 * component wrappers.
 *
 * @template P
 * @param {import('react').ForwardRefRenderFunction<import('@wp-g2/create-styles').ElementTypeFromViewOwnProps<P>, P>} Component The component to register into the Context system.
 * @param {Array<string>|string} namespace The namespace to register the component under.
 * @param {object} options
 * @param {boolean} [options.memo=true]
 * @return {import('@wp-g2/create-styles').PolymorphicComponent<import('@wp-g2/create-styles').ElementTypeFromViewOwnProps<P>, P>}
 */
export function contextConnect(Component, namespace, options = {}) {
	const { memo = true } = options;

	let WrappedComponent = forwardRef(Component);
	if (memo) {
		// @ts-ignore
		WrappedComponent = React.memo(WrappedComponent);
	}

	const displayName = Array.isArray(namespace)
		? namespace[0]
		: namespace || WrappedComponent.name;

	let mergedNamespace = WrappedComponent[CONNECT_STATIC_NAMESPACE] || [
		displayName,
	];

	/**
	 * Consolidate (merge) namespaces before attaching it to the WrappedComponent.
	 */
	if (Array.isArray(namespace)) {
		mergedNamespace = [...mergedNamespace, ...namespace];
	}
	if (typeof namespace === 'string') {
		mergedNamespace = [...mergedNamespace, namespace];
	}

	WrappedComponent.displayName = displayName;
	WrappedComponent[CONNECT_STATIC_NAMESPACE] = uniq(mergedNamespace);

	// @ts-ignore
	return WrappedComponent;
}

/**
 * Attempts to retrieve the connected namespace from a component.
 *
 * @param {import('react').ReactChild | undefined | {}} Component The component to retrieve a namespace from.
 * @returns {Array<string>} The connected namespaces.
 */
export function getConnectNamespace(Component) {
	if (!Component) return [];

	let namespaces = [];

	if (Component[CONNECT_STATIC_NAMESPACE]) {
		namespaces = Component[CONNECT_STATIC_NAMESPACE];
	}

	// @ts-ignore
	if (Component.type && Component.type[CONNECT_STATIC_NAMESPACE]) {
		// @ts-ignore
		namespaces = Component.type[CONNECT_STATIC_NAMESPACE];
	}

	return namespaces;
}

/**
 * Checks to see if a component is connected within the Context system.
 *
 * @param {import('react').ReactNode} Component The component to retrieve a namespace from.
 * @param {Array<string>|string} match The namespace to check.
 * @returns {boolean} The result.
 */
export function hasConnectNamespace(Component, match) {
	if (!Component) return false;

	if (typeof match === 'string') {
		return getConnectNamespace(Component).includes(match);
	}
	if (Array.isArray(match)) {
		return match.some((result) =>
			getConnectNamespace(Component).includes(result),
		);
	}

	return false;
}

export const getNamespace = getConnectNamespace;
export const hasNamespace = hasConnectNamespace;
