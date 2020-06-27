import React from 'react';
import View from '../View';
import { useResponsiveValue } from '../../hooks';

function Grid({
	columns = 2,
	rows,
	spacing = 5,
	sx,
	templateColumns,
	templateRows,
	...props
}) {
	const column = useResponsiveValue(columns);
	const row = useResponsiveValue(rows);

	const gridTemplateColumns =
		templateColumns || (column && `repeat(${column}, 1fr)`);
	const gridTemplateRows = templateRows || (rows && `repeat(${row}, 1fr)`);

	return (
		<View
			sx={{
				...sx,
				display: 'grid',
				gridTemplateColumns,
				gridTemplateRows,
				gap: spacing,
			}}
			{...props}
		/>
	);
}

export default Grid;
