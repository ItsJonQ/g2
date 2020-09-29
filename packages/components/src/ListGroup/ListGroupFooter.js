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
import { Text } from '../Text';
import { useListGroupContext } from './ListGroup.Context';
import * as styles from './ListGroup.styles';

const listGroupTextContextProps = {
	Text: { size: 'caption', variant: 'muted' },
};

function ListGroupFooter(props, forwardedRef) {
	const { children, className, ...otherProps } = useContextSystem(
		props,
		'ListGroupFooter',
	);
	const { inset } = useListGroupContext();
	const validChildren = React.Children.toArray(children);

	const clonedChildren = validChildren.map((child, index) => {
		const _key = child.key || index;
		const isTitle = is.string(child);

		return isTitle ? (
			<FlexItem isBlock key={_key}>
				<Text size="caption">{child}</Text>
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

export default contextConnect(ListGroupFooter, 'ListGroupFooter');
