import { connect, hasNamespace } from '@wp-g2/context';
import { css, ui, useResponsiveValue } from '@wp-g2/styles';
import { getValidChildren } from '@wp-g2/utils';
import React from 'react';

import { View } from '../View';
import { FlexContext } from './Flex.Context';
import * as styles from './Flex.styles';
import FlexItem from './FlexItem';

export function Flex({
	align = 'center',
	autoWrap = true,
	children,
	direction: directionProp = 'row',
	forwardedRef,
	gap = 2,
	justify = 'space-between',
	wrap = false,
	...props
}) {
	const direction = useResponsiveValue(directionProp);

	const isColumn = !!direction?.includes('column');
	const validChildren = getValidChildren(children);

	const clonedChildren = validChildren.map((child, index) => {
		const isFirst = index === 0;
		const isLast = index + 1 === validChildren.length;

		const _key = child.key || index;
		const contextProps = {
			display: isColumn ? 'block' : undefined,
			gap: ui.space(gap),
			isColumn,
			isFirst,
			isLast,
			isReverse: direction?.includes('reverse'),
		};

		const _isSubComponent = hasNamespace(child, ['FlexBlock', 'FlexItem']);

		const _child =
			!_isSubComponent && autoWrap ? <FlexItem>{child}</FlexItem> : child;

		return (
			<FlexContext.Provider key={_key} value={contextProps}>
				{_child}
			</FlexContext.Provider>
		);
	});

	const sx = {};

	sx.Base = css({
		alignItems: isColumn ? 'normal' : align,
		flexDirection: direction,
		flexWrap: wrap ? 'wrap' : undefined,
		justifyContent: justify,
	});

	const classes = [styles.Flex, sx.Base];

	return (
		<View {...props} cx={classes} ref={forwardedRef}>
			{clonedChildren}
		</View>
	);
}

export default connect(Flex, 'Flex');
