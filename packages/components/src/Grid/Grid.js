import { connect } from '@wp-g2/provider';
import { BaseView, useResponsiveValue } from '@wp-g2/styled';
import React from 'react';

function Grid({
	align,
	columns = 2,
	justify,
	rows,
	spacing = 3,
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
			{...props}
			__css={{
				alignItems: align,
				display: 'grid',
				gap: spacing,
				gridTemplateColumns,
				gridTemplateRows,
				justifyContent: justify,
			}}
		/>
	);
}

export default connect(Grid);
