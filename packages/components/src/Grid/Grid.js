import { connect } from '@wp-g2/context';
import { css, useResponsiveValue } from '@wp-g2/styles';
import React from 'react';

import { View } from '../View';

function Grid({
	align,
	columnGap,
	columns = 2,
	gap = 3,
	isInline = false,
	justify,
	rowGap,
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
		display: isInline ? 'inline-grid' : 'grid',
		gap,
		gridTemplateColumns,
		gridTemplateRows,
		gridRowGap: rowGap,
		gridColumnGap: columnGap,
		justifyContent: justify,
		verticalAlign: isInline ? 'middle' : null,
	});

	return <View {...props} cx={cx} />;
}

export default connect(Grid, 'Grid');
