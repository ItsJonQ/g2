import { cx } from '@g2/css';
import { hoistNonReactStatics, is } from '@g2/utils';
import React, { forwardRef } from 'react';

import { useComponentsContext } from './ComponentsProvider';

const CONNECT_NAMESPACE = '__wpComponentsKey__';

export function componentsConnect(Component, namespace) {
	const key = namespace || Component.name;

	const ConnectedComponent = forwardRef(
		({ className, ...props }, forwardedRef) => {
			const context = useComponentsContext();
			const contextProps = context[key];
			const mergedProps = is.plainObject(contextProps)
				? { ...contextProps, ...props }
				: props;

			const classes = cx(getStyledClassName(key), className);

			return (
				<Component
					{...mergedProps}
					className={classes}
					forwardedRef={forwardedRef}
				/>
			);
		},
	);

	ConnectedComponent.displayName = key;
	ConnectedComponent[CONNECT_NAMESPACE] = key;

	return hoistNonReactStatics(ConnectedComponent, Component);
}

function getStyledClassName(displayName) {
	if (!displayName) return displayName;

	return `wp-components-${displayName.replace(/ |_/g, '-').toLowerCase()}`;
}

export function getConnectNamespace(Component) {
	return Component[CONNECT_NAMESPACE];
}

export const connect = componentsConnect;
