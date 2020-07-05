import React, { forwardRef } from 'react';
import { Box as ThemeUIBox } from 'theme-ui';

import { RENDERED_BASE_STYLES } from '../styled/utils';
import { withTheme } from '../styled/withTheme';

const BaseBox = withTheme(ThemeUIBox);

const defaultCSS = {
	MozOsxFontSmoothing: 'grayscale',
	WebkitFontSmoothing: 'antialiased',
	fontFamily: 'body',
	fontSize: 2,
};

const EnhancedBaseBox = (
	{
		// Internal default sx values
		as = 'div',
		children,
		forwardedRef,
		sx: customStyles,
		...props
	},
	ref,
) => {
	let mergedStyles = defaultCSS;
	if (customStyles) {
		mergedStyles = {
			...defaultCSS,
			...customStyles,
		};
	}

	const componentProps = {
		...props,
		as,
		children,
		ref: forwardedRef || ref,
		sx: mergedStyles,
	};

	return <BaseBox {...componentProps} />;
};

EnhancedBaseBox[RENDERED_BASE_STYLES] = true;

export const Box = forwardRef(EnhancedBaseBox);
export const BaseView = Box;
