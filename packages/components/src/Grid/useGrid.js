import { useContextSystem } from '@wp-g2/context';
import { css, cx, useResponsiveValue } from '@wp-g2/styles';
import { useMemo } from 'react';

import { getAlignmentProps } from './Grid.utils';

/**
 * @param {import('@wp-g2/create-styles').ViewOwnProps<import('./types').Props, 'div'>} props
 */
export function useGrid(props) {
	const {
		align,
		alignment,
		className,
		columnGap,
		columns = 2,
		gap = 3,
		isInline = false,
		justify,
		rowGap,
		rows,
		templateColumns,
		templateRows,
		...otherProps
	} = useContextSystem(props, 'Grid');

	const column = useResponsiveValue(columns);
	const row = useResponsiveValue(rows);

	const gridTemplateColumns =
		templateColumns || (!!columns && `repeat(${column}, 1fr)`);
	const gridTemplateRows = templateRows || (!!rows && `repeat(${row}, 1fr)`);

	const classes = useMemo(() => {
		const alignmentProps = getAlignmentProps(alignment);

		const classes = css({
			alignItems: align,
			display: isInline ? 'inline-grid' : 'grid',
			gap,
			gridTemplateColumns,
			gridTemplateRows,
			gridRowGap: rowGap,
			gridColumnGap: columnGap,
			justifyContent: justify,
			verticalAlign: isInline ? 'middle' : null,
			...alignmentProps,
		});

		return cx(classes, className);
	}, [
		align,
		alignment,
		className,
		columnGap,
		gap,
		gridTemplateColumns,
		gridTemplateRows,
		isInline,
		justify,
		rowGap,
	]);

	return { ...otherProps, className: classes };
}
