import { useComponentsContext } from '@wp-g2/provider';
import { is } from '@wp-g2/utils';
import React from 'react';

import { css } from './css';
import { cx } from './cx';

export const createSystemElement = (tagName = 'div') => ({
	// Internal props
	css: cssProp,
	cx: cxProp,
	ns,
	// External props
	// eslint-disable-next-line
	as,
	children,
	className,
	...props
}) => {
	const context = useComponentsContext();
	let contextProps;

	if (ns) {
		if (is.array(ns)) {
			contextProps = ns.reduce((acc, k) => {
				const v = context[k];
				return is.plainObject(v) ? { ...acc, ...v } : acc;
			}, {});
		} else {
			contextProps = context[ns];
		}
	}

	const mergedProps = is.plainObject(contextProps)
		? { ...contextProps, ...props }
		: props;

	const element = as || tagName;
	let displayName = ns || (is.string(element) && element);

	if (is.function(as)) {
		displayName = as.displayName;
	}
	displayName = displayName || 'Component';

	const classes = cx(cxProp, className, css(cssProp));

	return React.createElement(
		element,
		{
			className: classes,
			'data-system': displayName,
			...mergedProps,
		},
		children,
	);
};
