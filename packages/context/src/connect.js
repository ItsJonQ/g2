import { css, cx } from '@wp-g2/styles';
import { hoistNonReactStatics, is, kebabCase, uniq } from '@wp-g2/utils';
import React, { forwardRef } from 'react';

import { useComponentsContext } from './ComponentsProvider';
import { cns, ns } from './utils';

const REACT_TYPEOF_KEY = '$$typeof';

/**
 * Special key where the connected namespaces are stored.
 * This is attached to Context connected components as a static property.
 */
const CONNECT_NAMESPACE = '__wpComponentsKey__';

/**
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
	const displayName = is.array(namespace)
		? namespace[0]
		: namespace || Component.name;
	const key = namespace || Component.name;

	const render = ({ className, ...props }, forwardedRef) => {
		// eslint-disable-next-line
		const context = useComponentsContext();
		let contextProps;

		/**
		 * It's possible to connect (register) a component under multiple namespaces.
		 * This is done when passing the namespace as an array (Array<string>).
		 *
		 * To properly retrieve props from the Context system, we must accomodate
		 * both singular and multi connections.
		 */
		if (is.array(key)) {
			contextProps = key.reduce((acc, k) => {
				const v = context[k];
				return is.plainObject(v) ? { ...acc, ...v } : acc;
			}, {});
		} else {
			contextProps =
				context[key] ||
				// Fallback
				{};
		}

		const {
			_overrides: overrideProps = {},
			css: contextCSS,
			...otherContextProps
		} = contextProps;

		const initialMergedProps = is.plainObject(contextProps)
			? { ...otherContextProps, ...props }
			: props;

		const {
			children,
			css: cssProp,
			renderChildren,
			...mergedProps
		} = initialMergedProps;

		const classes = cx(
			// Resolve custom CSS from ComponentsProvider
			css(contextCSS),
			// Resolve custom CSS from props
			css(cssProp),
			getStyledClassNameFromKey(key),
			className,
		);

		// Provides the ability to customize the render of the component.
		const rendered = is.function(renderChildren)
			? renderChildren({ children, ...mergedProps })
			: children;

		return (
			<Component
				{...cns()}
				{...ns(displayName)}
				{...mergedProps}
				{...overrideProps}
				className={classes}
				forwardedRef={forwardedRef}
			>
				{rendered}
			</Component>
		);
	};

	const ForwardedComponent = forwardRef(render);
	const ConnectedComponent = pure
		? React.memo(ForwardedComponent)
		: ForwardedComponent;

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

	ConnectedComponent.displayName = displayName;
	ConnectedComponent[CONNECT_NAMESPACE] = uniq(mergedNamespace);

	return hoistNonReactStatics(ConnectedComponent, Component);
}

/**
 * Generates the connected component CSS className based on the namespace.
 *
 * @param {string} displayName The name of the connected component.
 * @returns {string} The generated CSS className.
 */
function getStyledClassName(displayName) {
	if (!displayName || !is.string(displayName)) return '';

	return `wp-components-${kebabCase(displayName)}`;
}

/**
 * Generates the connected component CSS className based on the namespace.
 *
 * @param {string} displayName The name of the connected component.
 * @returns {string} The generated CSS className.
 */
function getStyledClassNameFromKey(key) {
	if (!key) return '';

	if (is.array(key)) {
		return cx(uniq(key).map(getStyledClassName));
	}
	if (is.string(key)) {
		return getStyledClassName(key);
	}

	return '';
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
