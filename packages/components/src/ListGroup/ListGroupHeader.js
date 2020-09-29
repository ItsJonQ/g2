import {
	contextConnect,
	ContextSystemProvider,
	useContextSystem,
} from '@wp-g2/context';
import { cx } from '@wp-g2/styles';
import { is } from '@wp-g2/utils';
import React from 'react';

import { FlexItem } from '../Flex';
import { HStack } from '../HStack';
import { Subheading } from '../Subheading';
import { useListGroupContext } from './ListGroup.Context';
import * as styles from './ListGroup.styles';

const listGroupTextContextProps = { Text: { size: 'subheading' } };

function ListGroupHeader(props, forwardedRef) {
	const { children, className, ...otherProps } = useContextSystem(
		props,
		'ListGroupHeader',
	);

	const { inset } = useListGroupContext();
	const validChildren = React.Children.toArray(children);

	const clonedChildren = validChildren.map((child, index) => {
		const _key = child.key || index;
		const isTitle = is.string(child);

		return isTitle ? (
			<FlexItem isBlock key={_key}>
				<Subheading>{child}</Subheading>
			</FlexItem>
		) : (
			child
		);
	});

	const classes = cx(inset && styles.headerFooterInset, className);

	return (
		<HStack {...otherProps} className={classes} ref={forwardedRef}>
			<ContextSystemProvider value={listGroupTextContextProps}>
				{clonedChildren}
			</ContextSystemProvider>
		</HStack>
	);
}

export default contextConnect(ListGroupHeader, 'ListGroupHeader');
