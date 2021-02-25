import { hasNamespace, useContextSystem } from '@wp-g2/context';
import { ui } from '@wp-g2/styles';
import { getValidChildren } from '@wp-g2/utils';
import React from 'react';

import { FlexItem, useFlex } from '../Flex';
import { getAlignmentProps } from './HStack.utils';

export function useHStack(props) {
	const {
		alignment = 'edge',
		children,
		className,
		direction,
		spacing = 2,
		...otherProps
	} = useContextSystem(props, 'HStack');

	const align = getAlignmentProps(alignment, direction);

	const validChildren = getValidChildren(children);
	const clonedChildren = validChildren.map((child, index) => {
		const _key = child.key || `hstack-${index}`;
		const _isSpacer = hasNamespace(child, ['Spacer']);

		if (_isSpacer) {
			return (
				<FlexItem
					isBlock
					key={_key}
					{...child.props}
					{...ui.$('Spacer')}
				/>
			);
		}

		return child;
	});

	const propsForFlex = {
		className,
		children: clonedChildren,
		direction,
		justify: 'center',
		...align,
		...otherProps,
		gap: spacing,
	};

	const flexProps = useFlex(propsForFlex);

	return flexProps;
}
