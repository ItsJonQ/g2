import React, { forwardRef } from 'react';
import { hoistNonReactStatics, is } from '@g2/utils';
import { useComponentsContext } from './ComponentsProvider';

export function componentsConnect(Component, namespace) {
	const key = namespace || Component.name;

	const ConnectedComponent = forwardRef((props, forwardedRef) => {
		const context = useComponentsContext();
		const contextProps = context[key];
		const mergedProps = is.plainObject(contextProps)
			? { ...contextProps, ...props }
			: props;

		return <Component {...mergedProps} forwardedRef={forwardedRef} />;
	});

	ConnectedComponent.displayName = key;

	return hoistNonReactStatics(ConnectedComponent, Component);
}

export const connect = componentsConnect;
