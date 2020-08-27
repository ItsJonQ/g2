import isPropValid from '@emotion/is-prop-valid';
import { is, mergeRefs } from '@wp-g2/utils';
import React, { forwardRef } from 'react';

import { css, cx } from '../compiler';
import { useHydrateGlobalStyles } from '../hooks';
import { REDUCED_MOTION_MODE_ATTR } from './constants';
import { DEFAULT_STYLE_SYSTEM_OPTIONS } from './utils';

const shouldForwardProp = isPropValid;

const styles = {
	Base: css({
		boxSizing: 'border-box',
	}),
	reduceMotion: css`
		@media (prefers-reduced-motion) {
			transition: none !important;
		}
		${REDUCED_MOTION_MODE_ATTR} & {
			transition: none !important;
		}
	`,
};

const defaultOptions = DEFAULT_STYLE_SYSTEM_OPTIONS;

export const createCoreElement = (
	tagName = 'div',
	options = defaultOptions,
) => {
	const { baseStyles, globalStyles } = { ...defaultOptions, ...options };
	const compiledBaseStyles = css(baseStyles);

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
		useHydrateGlobalStyles({ globalStyles });

		const element = as || tagName;
		const className = !is.string(classNameProp)
			? cx(classNameProp)
			: classNameProp;

		const sx = sxProp && css(sxProp);

		const classes = cx(
			styles.Base,
			styles.reduceMotion,
			compiledBaseStyles,
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
