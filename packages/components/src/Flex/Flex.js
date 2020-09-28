import { contextConnect, useContextSystem } from '@wp-g2/context';
import { css, cx, ui, useResponsiveValue } from '@wp-g2/styles';
import React from 'react';

import { View } from '../View';
import * as styles from './Flex.styles';

export function Flex(props, forwardedRef) {
	const {
		align = 'center',
		children,
		direction: directionProp = 'row',
		gap = 2,
		justify = 'space-between',
		wrap = false,
		...otherProps
	} = useContextSystem(props, 'Flex');

	const direction = useResponsiveValue(directionProp);

	const isColumn = !!direction?.includes('column');
	const isReverse = direction?.includes('reverse');

	const sx = {};

	sx.Base = css({
		[ui.createToken('FlexGap')]: ui.space(gap),
		[ui.createToken('FlexItemDisplay')]: isColumn ? 'block' : undefined,
		[ui.createToken('FlexItemMarginBottom')]: isColumn
			? ui.get('FlexGap')
			: 0,
		[ui.createToken('FlexItemMarginRight')]:
			!isColumn && !isReverse ? ui.get('FlexGap') : 0,
		[ui.createToken('FlexItemMarginLeft')]:
			!isColumn && isReverse ? ui.get('FlexGap') : 0,
		alignItems: isColumn ? 'normal' : align,
		flexDirection: direction,
		flexWrap: wrap ? 'wrap' : undefined,
		justifyContent: justify,
		/**
		 * Workaround to optimize DOM rendering.
		 * We'll enhance alignment with naive parent flex assumptions.
		 * Trade-off:
		 * Far less DOM less. However, UI rendering is not as reliable.
		 */
		'> *': {
			marginBottom: isColumn ? ui.get('FlexGap') : null,
			marginLeft: !isColumn && isReverse ? ui.get('FlexGap') : null,
			marginRight: !isColumn && !isReverse ? ui.get('FlexGap') : null,
		},
		/**
		 * Workaround to help with performance. Using CSS rules to target rather
		 * than passing data via context.
		 */
		'> *:last-child': {
			marginBottom: isColumn && 0,
			marginRight: !isColumn && !isReverse && 0,
			marginLeft: !isColumn && isReverse && 0,
		},
	});

	const __css = cx([styles.Flex, sx.Base]);

	return (
		<View {...otherProps} cx={__css} ref={forwardedRef}>
			{children}
		</View>
	);
}

export default contextConnect(Flex, 'Flex');
