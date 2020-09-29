import { useContextSystem } from '@wp-g2/context';
import { css, cx, useResponsiveValue } from '@wp-g2/styles';

export function useGrid(props) {
	const {
		align,
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

	const classes = cx(__css, className);

	return {
		...otherProps,
		className: classes,
	};
}
