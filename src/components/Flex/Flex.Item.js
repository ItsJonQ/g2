import React from 'react';
import BaseView from '../BaseView';

function FlexItem({ display, isBlock = false, sx, ...props }) {
	return (
		<BaseView
			sx={{
				display: isBlock ? 'block' : display,
				flex: isBlock ? 1 : null,
				minWidth: 0,
				maxWidth: '100%',
				...sx,
			}}
			{...props}
		/>
	);
}

FlexItem.displayName = 'FlexItem';

export default FlexItem;
