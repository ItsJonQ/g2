import React, { forwardRef } from 'react';
import { Box as ThemeUIBox } from 'theme-ui';

import { withTheme } from '../styled/withTheme';

const BaseBox = withTheme(ThemeUIBox);

BaseBox.defaultProps = {
	__css: {
		MozOsxFontSmoothing: 'grayscale',
		WebkitFontSmoothing: 'antialiased',
		fontFamily: 'body',
		fontSize: 2,
	},
};

const EnhancedBaseBox = (
	{
		// Internal default sx values
		__sx: internalBaseStyles,
		as = 'div',
		children,
		forwardedRef,
		sx: customStyles,
		...props
	},
	ref,
) => {
	let mergedStyles;
	if (internalBaseStyles && customStyles) {
		mergedStyles = { ...internalBaseStyles, ...customStyles };
	} else {
		mergedStyles = customStyles || internalBaseStyles;
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

export const Box = forwardRef(EnhancedBaseBox);
export const BaseView = Box;
