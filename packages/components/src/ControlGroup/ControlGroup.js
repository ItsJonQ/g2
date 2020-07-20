import { connect, hasNamespace } from '@wp-g2/provider';
import { getValidChildren } from '@wp-g2/utils';
import React from 'react';

import { Flex } from '../Flex';
import { ControlGroupContext } from './ControlGroup.utils';
import ControlGroupItem from './ControlGroupItem';

function ControlGroup({ children, ...props }) {
	const validChildren = getValidChildren(children);

	const clonedChildren = validChildren.map((child, index) => {
		const isFirst = index === 0;
		const isLast = index + 1 === validChildren.length;
		const isOnly = isFirst && isLast;
		const isMiddle = !isFirst && !isLast;

		const _key = child.key || index;
		const contextValue = {
			isFirst,
			isLast,
			isMiddle,
			isOnly,
		};

		const _isSubComponent = hasNamespace(child, [
			'ControlGroupItem',
			'FlexItem',
			'FlexBlock',
		]);

		const _child = _isSubComponent ? (
			child
		) : (
			<ControlGroupItem>{child}</ControlGroupItem>
		);

		return (
			<ControlGroupContext.Provider key={_key} value={contextValue}>
				{_child}
			</ControlGroupContext.Provider>
		);
	});

	return (
		<Flex {...props} _autoWrap={false} gap={0}>
			{clonedChildren}
		</Flex>
	);
}

export default connect(ControlGroup);
