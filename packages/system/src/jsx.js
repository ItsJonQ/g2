import { jsx as emotion } from '@emotion/core';
import { mergeRefs } from '@wp-g2/utils';
import React from 'react';

import { css } from './css';
import { cx } from './cx';

export const jsx = (type, props, ...children) => {
	const {
		// Internal props
		css: cssProp,
		cx: cxProp,
		// External props
		// eslint-disable-next-line
		as,
		className,
		forwardedRef,
		ref,
		...nextProps
	} = props || {};

	const element = as || type;
	let classes = className;

	if (cxProp || cssProp) {
		classes = cx(cxProp, css(cssProp), className);
	} else {
		classes = className;
	}

	if (classes) {
		nextProps.className = classes;
	}

	if (forwardedRef || ref) {
		nextProps.ref = mergeRefs([forwardedRef, ref]);
	}

	return emotion.apply(null, [element, nextProps, ...children]);
};
