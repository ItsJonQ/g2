import {
	connectAndForwardRefComponent,
	ContextSystemProvider,
	useContextSystem,
} from '@wp-g2/context';
import { is } from '@wp-g2/utils';
import React from 'react';

import { HStack } from '../HStack';
import { Spacer } from '../Spacer';
import { Text } from '../Text';
import { useListGroupContext } from './ListGroup.Context';

function ListGroupFooter(props, forwardedRef) {
	const { children, ...otherProps } = useContextSystem(
		props,
		'ListGroupFooter',
	);
	const { inset } = useListGroupContext();
	const validChildren = React.Children.toArray(children);

	const clonedChildren = validChildren.map((child, index) => {
		const _key = child.key || index;
		const isTitle = is.string(child);

		return isTitle ? (
			<Spacer key={_key}>
				<Text size="caption">{child}</Text>
			</Spacer>
		) : (
			child
		);
	});

	return (
		<ContextSystemProvider
			value={{ Text: { size: 'caption', variant: 'muted' } }}
		>
			<Spacer mb={0} pt={1} px={inset ? 2 : 0}>
				<HStack {...otherProps} ref={forwardedRef}>
					{clonedChildren}
				</HStack>
			</Spacer>
		</ContextSystemProvider>
	);
}

export default connectAndForwardRefComponent(
	ListGroupFooter,
	'ListGroupFooter',
);
