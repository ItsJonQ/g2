import React from 'react';
import View from '../View';

function LayoutGrid({ columns = 2, spacing = 5, sx, ...props }) {
	return (
		<View
			sx={{
				...sx,
				display: 'grid',
				gridTemplateColumns: `repeat(${columns}, 1fr)`,
				gap: spacing,
			}}
			{...props}
		/>
	);
}

export default LayoutGrid;
