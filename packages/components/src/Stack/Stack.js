import { useResponsiveValue } from '@g2/css';
import { connect } from '@g2/provider';
import { getValidChildren } from '@g2/utils';
import React from 'react';

import { Flex } from '../Flex';
import StackItem from './StackItem';

function Stack({
	align = null,
	children,
	direction = 'column',
	justify = 'space-between',
	spacing = 2,
	...props
}) {
	const validChildren = getValidChildren(children);
	const _direction = useResponsiveValue(direction);

	const clonedChildren = validChildren.map((child, index) => {
		const isColumn = _direction === 'column';
		const isLast = index + 1 === validChildren.length;

		const _key = child.key || index;
		const _isStackItem = child?.type?.displayName === 'StackItem';
		const _child = _isStackItem ? (
			child
		) : (
			<StackItem key={_key}>{child}</StackItem>
		);

		const childProps = {
			display: isColumn ? 'block' : undefined,
		};

		if (!isLast) {
			if (isColumn) {
				childProps.mb = spacing;
			} else {
				childProps.mr = spacing;
			}
		}

		return React.cloneElement(_child, childProps);
	});

	return (
		<Flex {...props} align={align} direction={direction} justify={justify}>
			{clonedChildren}
		</Flex>
	);
}

export default connect(Stack);
