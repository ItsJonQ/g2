import isPropValid from '@emotion/is-prop-valid';
import { is, mergeRefs } from '@wp-g2/utils';
import React, { forwardRef } from 'react';

import { css } from './css';
import { cx } from './cx';
import { injectGlobal } from './injectGlobal';
import { GLOBAL_CSS_VARIABLES, GLOBAL_DARK_MODE_CSS_VARIABLES } from './theme';

const shouldForwardProp = isPropValid;
const __INTERNAL_STATE__ = {
	didInjectGlobal: false,
};

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
		// eslint-disable-next-line
		useHydrateGlobals();

		const element = as || tagName;
		const classes = cx(cxProp, className, css(cssProp));
		const shouldUseAs = as && is.string(as);
		const shouldFilterProps = is.string(element);

		let newProps = {};

		for (let key in props) {
			if (shouldUseAs && key === 'as') continue;

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

function useHydrateGlobals() {
	if (__INTERNAL_STATE__.didInjectGlobal) return;

	injectGlobal`
		${GLOBAL_CSS_VARIABLES};
		${GLOBAL_DARK_MODE_CSS_VARIABLES};
	`;

	__INTERNAL_STATE__.didInjectGlobal = true;
}
