import React from 'react';

import { css } from './css';
import { cx } from './cx';

export const createSystemElement = (tagName = 'div') => ({
	as,
	children,
	className,
	css: cssProp,
	cx: cxProp,
	ns,
	...props
}) => {
	const element = as || tagName;
	let displayName = ns || (typeof element === 'string' && element);

	if (typeof as === 'function') {
		displayName = as.displayName;
	}
	displayName = displayName || 'Component';

	const classes = cx(
		css(cssProp),
		cxProp,
		className,
		`wp-components-${displayName}`,
	);

	return React.createElement(
		element,
		{
			className: classes,
			'data-system': displayName,
			...props,
		},
		children,
	);
};
