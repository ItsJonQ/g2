import { cx, ns } from '@wp-g2/styles';
import { hoistNonReactStatics, is, kebabCase, uniq } from '@wp-g2/utils';
import React, { forwardRef } from 'react';

import { useComponentsContext } from './ComponentsProvider';

const REACT_TYPEOF_KEY = '$$typeof';
const CONNECT_NAMESPACE = '__wpComponentsKey__';

export function componentsConnect<T>(
	Component: React.ComponentType<T>,
	namespace?: any,
	options: any = {},
): T {
	const { pure = true } = options;
	const displayName = is.array(namespace)
		? namespace[0]
		: namespace || Component.name;
	const key = namespace || Component.name;

	const render = ({ className, ...props }, forwardedRef) => {
		// eslint-disable-next-line
		const context = useComponentsContext();
		let contextProps;

		if (is.array(key)) {
			contextProps = key.reduce((acc, k) => {
				const v = context[k];
				return is.plainObject(v) ? { ...acc, ...v } : acc;
			}, {});
		} else {
			contextProps = context[key];
		}

		const initialMergedProps = is.plainObject(contextProps)
			? { ...contextProps, ...props }
			: props;

		const { children, renderChildren, ...mergedProps } = initialMergedProps;

		const classes = cx(getStyledClassNameFromKey(key), className);

		// Provides the ability to customize the render of the component.
		const rendered = is.function(renderChildren)
			? renderChildren({ children, ...mergedProps })
			: children;

		return (
			<Component
				{...ns(displayName)}
				{...(mergedProps as T)}
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

function getStyledClassName(displayName) {
	if (!displayName || !is.string(displayName)) return '';

	return `wp-components-${kebabCase(displayName)}`;
}

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

export function getConnectNamespace(Component) {
	return Component[CONNECT_NAMESPACE] || [];
}

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

export const connect = componentsConnect;
export const getNamespace = getConnectNamespace;
export const hasNamespace = hasConnectNamespace;
