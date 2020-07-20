import { connect, hasNamespace } from '@wp-g2/provider';
import { BaseView, css } from '@wp-g2/system';
import { getValidChildren } from '@wp-g2/utils';
import React from 'react';

import * as styles from './Flex.styles';
import { FlexContext } from './Flex.utils';
import FlexItem from './FlexItem';

export function Flex({
	_autoWrap = true,
	align = 'center',
	children,
	direction,
	gap = 2,
	justify = 'space-between',
	...props
}) {
	styles.Base = css({
		alignItems: align,
		flexDirection: direction,
		justifyContent: justify,
	});

	const classes = [styles.Flex, styles.Base];
	const gapValue = gap * 4;

	const isColumn = direction === 'column';
	const validChildren = getValidChildren(children);

	const clonedChildren = validChildren.map((child, index) => {
		const isFirst = index === 0;
		const isLast = index + 1 === validChildren.length;

		const _key = child.key || index;
		const contextValue = {
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
			<FlexContext.Provider key={_key} value={contextValue}>
				{_child}
			</FlexContext.Provider>
		);
	});

	return (
		<BaseView {...props} cx={classes}>
			{clonedChildren}
		</BaseView>
	);
}

export default connect(Flex);
