import { useContextSystem } from '@wp-g2/context';
import { css, cx, ui, useResponsiveValue } from '@wp-g2/styles';
import { useMemo } from 'react';

import * as styles from './Flex.styles';

export function useFlex(props) {
	const {
		align = 'center',
		className,
		direction: directionProp = 'row',
		expanded = true,
		gap = 2,
		justify = 'space-between',
		wrap = false,
		...otherProps
	} = useContextSystem(props, 'Flex');

	const direction = useResponsiveValue(directionProp);

	const isColumn = !!direction?.includes('column');
	const isReverse = direction?.includes('reverse');

	const classes = useMemo(() => {
		const sx = {};

		sx.Base = css({
			[ui.createToken('FlexGap')]: ui.space(gap),
			[ui.createToken('FlexItemDisplay')]: isColumn ? 'block' : null,
			[ui.createToken('FlexItemMarginBottom')]: isColumn
				? ui.get('FlexGap')
				: 0,
			[ui.createToken('FlexItemMarginRight')]:
				!isColumn && !isReverse ? ui.get('FlexGap') : 0,
			[ui.createToken('FlexItemMarginLeft')]:
				!isColumn && isReverse ? ui.get('FlexGap') : 0,
			alignItems: isColumn ? 'normal' : align,
			flexDirection: direction,
			flexWrap: wrap ? 'wrap' : null,
			justifyContent: justify,
			height: isColumn && expanded ? '100%' : null,
			width: !isColumn && expanded ? '100%' : null,
			/**
			 * Workaround to optimize DOM rendering.
			 * We'll enhance alignment with naive parent flex assumptions.
			 * Trade-off:
			 * Far less DOM less. However, UI rendering is not as reliable.
			 */
			'> * + *': {
				marginTop: isColumn ? ui.space(gap) : null,
				marginRight: !isColumn && isReverse ? ui.space(gap) : null,
				marginLeft: !isColumn && !isReverse ? ui.space(gap) : null,
			},
		});

		return cx(styles.Flex, sx.Base, className);
	}, [
		align,
		className,
		direction,
		expanded,
		gap,
		isColumn,
		isReverse,
		justify,
		wrap,
	]);

	return { ...otherProps, className: classes };
}
