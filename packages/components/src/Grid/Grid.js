import { connect } from '@wp-g2/provider';
import { BaseView, css, useResponsiveValue } from '@wp-g2/styles';
import React from 'react';

function Grid({
	align,
	columns,
	gap = 12,
	justify,
	rows,
	templateColumns,
	templateRows,
	...props
}) {
	const column = useResponsiveValue(columns);
	const row = useResponsiveValue(rows);

	const gridTemplateColumns =
		templateColumns || (!!columns && `repeat(${column}, 1fr)`);
	const gridTemplateRows = templateRows || (!!rows && `repeat(${row}, 1fr)`);

	const cx = css({
		alignItems: align,
		display: 'grid',
		gap,
		gridTemplateColumns,
		gridTemplateRows,
		justifyContent: justify,
	});

	return <BaseView {...props} cx={cx} />;
}

export default connect(Grid);
