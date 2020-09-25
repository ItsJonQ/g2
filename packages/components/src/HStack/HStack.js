import {
	connectAndForwardRefComponent,
	hasNamespace,
	useContextSystem,
} from '@wp-g2/context';
import { css, cx, ui } from '@wp-g2/styles';
import { getValidChildren } from '@wp-g2/utils';
import React from 'react';

import { Flex, FlexItem } from '../Flex';
import { getAlignmentProps } from './HStack.utils';

function HStack(componentProps, forwardedRef) {
	const {
		alignment = 'edge',
		children,
		className,
		spacing = 2,
		...props
	} = useContextSystem(componentProps, 'HStack');

	const align = getAlignmentProps(alignment);
	const validChildren = getValidChildren(children);

	const clonedChildren = validChildren.map((child) => {
		const _isSpacer = hasNamespace(child, ['Spacer']);

		if (_isSpacer) {
			return (
				<FlexItem
					isBlock
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

export default connectAndForwardRefComponent(HStack, 'HStack');
