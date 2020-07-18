import isPropValid from '@emotion/is-prop-valid';
import { is, mergeRefs } from '@wp-g2/utils';
import React, { forwardRef } from 'react';

import { css } from './css';
import { cx } from './cx';

const shouldForwardProp = isPropValid;

export const createSystemElement = (tagName = 'div') => {
	const render = (
		{
			// Internal props
			css: cssProp,
			cx: cxProp,
			// External props
			// eslint-disable-next-line
			as,
			children,
			className,
			forwardedRef,
			...props
		},
		ref,
	) => {
		const element = as || tagName;
		const classes = cx(cxProp, className, css(cssProp));
		const shouldUseAs = as && is.string(as);

		let newProps = {};

		for (let key in props) {
			if (shouldUseAs && key === 'as') continue;

			if (shouldForwardProp(key)) {
				newProps[key] = props[key];
			}
		}

		return React.createElement(
			element,
			{
				className: classes,
				ref: mergeRefs([forwardedRef, ref]),
				...newProps,
			},
			children,
		);
	};
	const SystemComponent = forwardRef(render);

	if (process.env.NODE_ENV === 'development') {
		const displayName = is.string(tagName) ? tagName : 'Component';

		SystemComponent.displayName = displayName;
	}

	return SystemComponent;
};
