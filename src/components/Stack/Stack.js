import React from 'react';
import { getValidChildren } from '../../utils';
import View from '../View';
import StackItem from './Stack.Item';

function Stack({
	align,
	justify = 'space-between',
	children,
	direction = 'column',
	spacing = 2,
}) {
	const validChildren = getValidChildren(children);

	const clonedChildren = validChildren.map((child, index) => {
		const isColumn = direction === 'column';
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
		<View
			sx={{
				display: 'flex',
				flexDirection: direction,
				alignItems: align,
				justifyContent: justify,
			}}
		>
			{clonedChildren}
		</View>
	);
}

Stack.Item = StackItem;

export default Stack;
