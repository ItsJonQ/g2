import isPropValid from '@emotion/is-prop-valid';
import { is, mergeRefs } from '@wp-g2/utils';
import React, { forwardRef } from 'react';

import { useHydrateGlobalStyles } from '../hooks';
import { css, cx } from '../style-system';
import { THEME } from '../theme';

const shouldForwardProp = isPropValid;

const styles = {
	Base: {
		MozOsxFontSmoothing: 'grayscale',
		WebkitFontSmoothing: 'antialiased',
		boxSizing: 'border-box',
		fontFamily: THEME['fontFamily'],
		fontSize: THEME['fontSize'],
		margin: 0,
	},
};

export const createSystemElement = (tagName = 'div') => {
	const render = (
		{
			// Internal props
			css: cssProp,
			cx: cxProp,
			sx: sxProp, // Legacy: From ThemeUI
			// External props
			// eslint-disable-next-line
			as,
			children,
			className: classNameProp,
			forwardedRef,
			...props
		},
		ref,
	) => {
		// eslint-disable-next-line
		useHydrateGlobalStyles();

		const element = as || tagName;
		const className = !is.string(classNameProp)
			? cx(classNameProp)
			: classNameProp;

		const sx = sxProp && css(sxProp);

		const classes = cx(
			css(styles.Base),
			cxProp,
			className,
			sx,
			css(cssProp),
		);
		const shouldFilterProps = is.string(element);

		let newProps = {};

		for (let key in props) {
			if (shouldFilterProps) {
				if (shouldForwardProp(key)) {
					newProps[key] = props[key];
				}
			} else {
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
