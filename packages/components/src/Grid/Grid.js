import React from 'react';
import { useResponsiveValue } from '@g2/css';
import BaseView from '../BaseView';

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
		<BaseView
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
