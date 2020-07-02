import React, { forwardRef } from 'react';
import { Box as ThemeUIBox } from 'theme-ui';

import { withTheme } from '../styled';

const BaseBox = withTheme(ThemeUIBox);

BaseBox.defaultProps = {
	__css: {
		fontFamily: 'body',
		fontSize: 2,
	},
};

const EnhancedBaseBox = (
	{
		// Internal default sx values
		__sx: internalBaseStyles,
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

	return <BaseBox ref={ref} sx={mergedStyles} {...props} />;
};

export const Box = forwardRef(EnhancedBaseBox);
export const BaseView = Box;
