import { connect, hasNamespace } from '@wp-g2/context';
import { getValidChildren } from '@wp-g2/utils';
import React from 'react';

import { Flex, FlexBlock } from '../Flex';
import { getAlignmentProps } from './HStack.utils';

function HStack({ alignment, children, forwardedRef, spacing = 2, ...props }) {
	const align = getAlignmentProps(alignment);
	const validChildren = getValidChildren(children);

	const clonedChildren = validChildren.map((child) => {
		const _isSpacer = hasNamespace(child, ['Spacer']);

		if (_isSpacer) {
			return <FlexBlock key={child.key} {...child.props} />;
		}

		return child;
	});

	return (
		<Flex
			gap={spacing}
			justify="center"
			{...align}
			{...props}
			ref={forwardedRef}
		>
			{clonedChildren}
		</Flex>
	);
}

export default connect(HStack);
