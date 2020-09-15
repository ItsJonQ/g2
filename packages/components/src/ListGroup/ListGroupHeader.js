import { ComponentsProvider, connect } from '@wp-g2/context';
import { is } from '@wp-g2/utils';
import React from 'react';

import { HStack } from '../HStack';
import { Spacer } from '../Spacer';
import { Subheading } from '../Subheading';
import { useListGroupContext } from './ListGroup.Context';

function ListGroupHeader({ children, ...props }) {
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
				<HStack {...props}>{clonedChildren}</HStack>
			</Spacer>
		</ComponentsProvider>
	);
}

export default connect(ListGroupHeader, 'ListGroupHeader');
