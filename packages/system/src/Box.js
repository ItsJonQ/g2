import { mergeRefs } from '@wp-g2/utils';
import React, { forwardRef } from 'react';

import { css } from './css';
import { cx } from './cx';
import { system } from './system';

const styles = {
	Base: {
		MozOsxFontSmoothing: 'grayscale',
		WebkitFontSmoothing: 'antialiased',
		fontFamily: 'body',
		fontSize: 14,
	},
};

function BaseBox(
	{
		as,
		children,
		className,
		css: cssProp,
		cx: cxProp,
		forwardedRef,
		...props
	},
	ref,
) {
	const classes = cx(css(styles), css(cxProp), css(cssProp), className);
	const componentProps = {
		...props,
		as,
		children,
		className: classes,
		ref: mergeRefs([forwardedRef, ref]),
	};

	return <system.div {...componentProps} />;
}

const ForwardedBox = forwardRef(BaseBox);

export const Box = ForwardedBox;
export const BaseView = Box;
