import { connect, hasNamespace } from '@wp-g2/context';
import { css, cx, ui } from '@wp-g2/styles';
import { getValidChildren } from '@wp-g2/utils';
import React from 'react';

import { Flex, FlexBlock } from '../Flex';
import { getAlignmentProps } from './HStack.utils';

function HStack({
	alignment = 'edge',
	children,
	className,
	forwardedRef,
	spacing = 2,
	...props
}) {
	const align = getAlignmentProps(alignment);
	const validChildren = getValidChildren(children);

	const clonedChildren = validChildren.map((child) => {
		const _isSpacer = hasNamespace(child, ['Spacer']);

		if (_isSpacer) {
			return (
				<FlexBlock
					key={child.key}
					{...child.props}
					{...ui.$('Spacer')}
				/>
			);
		}

		return child;
	});

	const classes = cx([
		css({
			[ui.createToken('HStackSpacing')]: ui.space(spacing),
		}),
		className,
	]);

	return (
		<Flex
			gap={spacing}
			justify="center"
			{...align}
			{...props}
			className={classes}
			ref={forwardedRef}
		>
			{clonedChildren}
		</Flex>
	);
}

export default connect(HStack, 'HStack');
