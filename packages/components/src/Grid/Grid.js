import {
	connectAndForwardRefComponent,
	useContextSystem,
} from '@wp-g2/context';
import { css, useResponsiveValue } from '@wp-g2/styles';
import React from 'react';

import { View } from '../View';

function Grid(componentProps, forwardedRef) {
	const {
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
	} = useContextSystem(componentProps, 'Grid');

	const column = useResponsiveValue(columns);
	const row = useResponsiveValue(rows);

	const gridTemplateColumns =
		templateColumns || (!!columns && `repeat(${column}, 1fr)`);
	const gridTemplateRows = templateRows || (!!rows && `repeat(${row}, 1fr)`);

	const __css = css({
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

	return <View {...props} cx={__css} ref={forwardedRef} />;
}

export default connectAndForwardRefComponent(Grid, 'Grid');
