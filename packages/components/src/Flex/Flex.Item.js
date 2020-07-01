import React from 'react';
import { BaseView } from '../BaseView';

export function FlexItem({ display, isBlock = false, ...props }) {
	return (
		<BaseView
			__sx={{
				display: isBlock ? 'block' : display,
				flex: isBlock ? 1 : null,
				minWidth: 0,
				maxWidth: '100%',
			}}
			{...props}
		/>
	);
}

FlexItem.displayName = 'FlexItem';
