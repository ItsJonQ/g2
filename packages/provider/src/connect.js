import { cx } from '@g2/css';
import { hoistNonReactStatics, is } from '@g2/utils';
import React, { forwardRef } from 'react';

import { useComponentsContext } from './ComponentsProvider';

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

	return hoistNonReactStatics(ConnectedComponent, Component);
}

function getStyledClassName(displayName) {
	return `wp-components-${displayName.replace(/ |_/g, '-').toLowerCase()}`;
}

export const connect = componentsConnect;
