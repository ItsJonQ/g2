import React, { forwardRef } from 'react';
import { hoistNonReactStatics, is } from '@g2/utils';
import { useComponentsProvider } from './ComponentsProvider';

export function componentsConnect(Component, namespace) {
	const key = namespace || Component.name;

	const ConnectedComponent = forwardRef((props, forwardedRef) => {
		const ComponentsProvider = useComponentsProvider();
		const contextProps = ComponentsProvider[key];
		const mergedProps = is.plainObject(contextProps)
			? { ...contextProps, ...props }
			: props;

		return <Component {...mergedProps} forwardedRef={forwardedRef} />;
	});

	ConnectedComponent.displayName = key;

	return hoistNonReactStatics(ConnectedComponent, Component);
}

export const connect = componentsConnect;
