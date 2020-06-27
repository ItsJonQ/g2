import React from 'react';
import View from '../View';

function StackItem({
	display = 'inline-block',
	isBlock = false,
	sx,
	...props
}) {
	return (
		<View
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

StackItem.displayName = 'StackItem';

export default StackItem;
