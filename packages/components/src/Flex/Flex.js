import { connect, hasNamespace } from '@wp-g2/provider';
import { css, useResponsiveValue } from '@wp-g2/styles';
import { getValidChildren } from '@wp-g2/utils';
import React from 'react';

import { View } from '../View';
import { FlexContext } from './Flex.Context';
import * as styles from './Flex.styles';
import FlexItem from './FlexItem';

export function Flex({
	_autoWrap = true,
	align = 'center',
	children,
	direction: directionProp,
	gap = 2,
	justify = 'space-between',
	wrap,
	...props
}) {
	const gapValue = gap * 4;
	const direction = useResponsiveValue(directionProp);

	const isColumn = direction?.includes('column');
	const validChildren = getValidChildren(children);

	const clonedChildren = validChildren.map((child, index) => {
		const isFirst = index === 0;
		const isLast = index + 1 === validChildren.length;

		const _key = child.key || index;
		const contextProps = {
			display: isColumn ? 'block' : undefined,
			gap: gapValue,
			isColumn,
			isFirst,
			isLast,
		};

		const _isSubComponent = hasNamespace(child, ['FlexBlock', 'FlexItem']);

		const _child =
			!_isSubComponent && _autoWrap ? (
				<FlexItem>{child}</FlexItem>
			) : (
				child
			);

		return (
			<FlexContext.Provider key={_key} value={contextProps}>
				{_child}
			</FlexContext.Provider>
		);
	});

	styles.Base = css({
		alignItems: isColumn ? 'normal' : align,
		flexDirection: direction,
		flexWrap: wrap ? 'wrap' : undefined,
		justifyContent: justify,
	});

	const classes = [styles.Flex, styles.Base];

	return (
		<View {...props} cx={classes}>
			{clonedChildren}
		</View>
	);
}

export default connect(Flex);
