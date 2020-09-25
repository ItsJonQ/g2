import {
	ComponentsProvider,
	connectAndForwardRefComponent,
	useContextSystem,
} from '@wp-g2/context';
import { is } from '@wp-g2/utils';
import React from 'react';

import { HStack } from '../HStack';
import { Spacer } from '../Spacer';
import { Subheading } from '../Subheading';
import { useListGroupContext } from './ListGroup.Context';

function ListGroupHeader(props, forwardedRef) {
	const { children, ...otherProps } = useContextSystem(
		props,
		'ListGroupHeader',
	);

	const { inset } = useListGroupContext();
	const validChildren = React.Children.toArray(children);

	const clonedChildren = validChildren.map((child, index) => {
		const _key = child.key || index;
		const isTitle = is.string(child);

		return isTitle ? (
			<Spacer key={_key}>
				<Subheading>{child}</Subheading>
			</Spacer>
		) : (
			child
		);
	});

	return (
		<ComponentsProvider value={{ Text: { size: 'subheading' } }}>
			<Spacer mb={0} px={inset ? 2 : 0}>
				<HStack {...otherProps} ref={forwardedRef}>
					{clonedChildren}
				</HStack>
			</Spacer>
		</ComponentsProvider>
	);
}

export default connectAndForwardRefComponent(
	ListGroupHeader,
	'ListGroupHeader',
);
