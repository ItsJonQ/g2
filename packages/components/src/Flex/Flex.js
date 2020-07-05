import { BaseView, useResponsiveValue } from '@g2/css';
import { connect, hasNamespace } from '@g2/provider';
import { getValidChildren } from '@g2/utils';
import React from 'react';

import FlexItem from './FlexItem';

export function Flex({
	align = 'center',
	children,
	direction,
	gap = 2,
	justify = 'space-between',
	...props
}) {
	const validChildren = getValidChildren(children);
	const _direction = useResponsiveValue(direction);

	const clonedChildren = validChildren.map((child, index) => {
		const isColumn = _direction === 'column';
		const isLast = index + 1 === validChildren.length;

		const _key = child.key || index;
		const _isFlexSubComponent = hasNamespace(child, [
			'FlexBlock',
			'FlexItem',
		]);

		const _child = _isFlexSubComponent ? (
			child
		) : (
			<FlexItem key={_key}>{child}</FlexItem>
		);

		const childProps = {
			display: isColumn ? 'block' : undefined,
		};

		if (!isLast) {
			if (isColumn) {
				childProps.mb = gap;
			} else {
				childProps.mr = gap;
			}
		}

		return React.cloneElement(_child, childProps);
	});

	return (
		<BaseView
			{...props}
			__css={{
				alignItems: align,
				display: 'flex',
				flexDirection: direction,
				justifyContent: justify,
			}}
		>
			{clonedChildren}
		</BaseView>
	);
}

export default connect(Flex);
