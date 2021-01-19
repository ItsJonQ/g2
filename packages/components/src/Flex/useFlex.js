import { useContextSystem } from '@wp-g2/context';
import { css, cx, ui, useResponsiveValue } from '@wp-g2/styles';
import { useMemo } from 'react';

import * as styles from './Flex.styles';

/**
 * @typedef FlexProps
 * @property {import('react').CSSProperties['alignItems']} [align='center']
 * @property {import('react').CSSProperties['alignItems']} [alignItems]
 * @property {import('../utils/types').ResponsiveCSSValue<import('react').CSSProperties['flexDirection']>} [direction='row']
 * @property {boolean} [expanded]
 * @property {number | string} [gap]
 * @property {import('react').CSSProperties['justifyContent']} [justify]
 * @property {import('react').CSSProperties['justifyContent']} [justifyContent]
 * @property {boolean} [wrap=false]
 */

/**
 * @param {import('@wp-g2/create-styles').ViewOwnProps<FlexProps, 'div'>} props
 */
export function useFlex(props) {
	const {
		align = 'center',
		alignItems,
		className,
		direction: directionProp = 'row',
		expanded = true,
		gap = 2,
		isInline = false,
		justify = 'space-between',
		justifyContent,
		wrap = false,
		...otherProps
	} = useContextSystem(props, 'Flex');

	const direction = useResponsiveValue(directionProp);

	const isColumn =
		typeof direction === 'string' && !!direction.includes('column');
	const isReverse =
		typeof direction === 'string' && direction.includes('reverse');

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
			alignItems: alignItems || isColumn ? 'normal' : align,
			display: isInline ? 'inline-flex' : 'flex',
			flexDirection: direction,
			flexWrap: wrap ? 'wrap' : undefined,
			justifyContent: justifyContent || justify,
			height: isColumn && expanded ? '100%' : undefined,
			width: !isColumn && expanded && !isInline ? '100%' : undefined,
			/**
			 * Workaround to optimize DOM rendering.
			 * We'll enhance alignment with naive parent flex assumptions.
			 *
			 * Trade-off:
			 * Far less DOM less. However, UI rendering is not as reliable.
			 */
			'> * + *:not(marquee)': {
				marginTop: isColumn ? ui.space(gap) : undefined,
				marginRight: !isColumn && isReverse ? ui.space(gap) : undefined,
				marginLeft: !isColumn && !isReverse ? ui.space(gap) : undefined,
			},
			/**
			 * Improves stability of width/height rendering.
			 * https://github.com/ItsJonQ/g2/pull/149
			 */
			'> *': {
				minWidth: !isColumn ? 0 : null,
				minHeight: isColumn ? 0 : null,
			},
		});

		return cx(sx.Base, className);
	}, [
		align,
		alignItems,
		className,
		direction,
		expanded,
		gap,
		isColumn,
		isInline,
		isReverse,
		justify,
		justifyContent,
		wrap,
	]);

	return { ...otherProps, className: classes };
}
