import { connect, hasNamespace } from '@wp-g2/provider';
import { cx } from '@wp-g2/styles';
import { getValidChildren } from '@wp-g2/utils';
import React from 'react';

import { Flex } from '../Flex';
import { ControlGroupContext } from './ControlGroup.Context';
import * as styles from './ControlGroup.styles';
import ControlGroupItem from './ControlGroupItem';

function ControlGroup({ children, direction = 'row', isItemBlock, ...props }) {
	const validChildren = getValidChildren(children);
	const isVertical = direction === 'column';

	const clonedChildren = validChildren.map((child, index) => {
		const isFirst = index === 0;
		const isLast = index + 1 === validChildren.length;
		const isOnly = isFirst && isLast;
		const isMiddle = !isFirst && !isLast;

		const _key = child.key || index;

		const contextStyles = cx([
			isFirst ? (isVertical ? styles.firstRow : styles.first) : undefined,
			isMiddle && styles.middle,
			isLast ? (isVertical ? styles.lastRow : styles.last) : undefined,
		]);

		const contextValue = {
			isFirst,
			isLast,
			isMiddle,
			isOnly,
			isVertical,
			styles: contextStyles,
		};

		const _isSubComponent = hasNamespace(child, [
			'ControlGroupItem',
			'FlexItem',
			'FlexBlock',
		]);

		const _child = _isSubComponent ? (
			child
		) : (
			<ControlGroupItem isBlock={isItemBlock}>{child}</ControlGroupItem>
		);

		return (
			<ControlGroupContext.Provider key={_key} value={contextValue}>
				{_child}
			</ControlGroupContext.Provider>
		);
	});

	return (
		<Flex {...props} _autoWrap={false} direction={direction} gap={0}>
			{clonedChildren}
		</Flex>
	);
}

export default connect(ControlGroup);
