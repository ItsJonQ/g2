import { contextConnect, useContextSystem } from '@wp-g2/context';
import React from 'react';

import { Card, CardBody } from '../Card';
import { VStack } from '../VStack';
import { useListGroupContext } from './ListGroup.Context';

function ListGroupContent(props, forwardedRef) {
	const { children, spacing, ...otherProps } = useContextSystem(
		props,
		'ListGroupContent',
	);
	const { inset } = useListGroupContext();

	if (!inset) return children;

	return (
		<Card elevation={0} isBorderless {...otherProps} ref={forwardedRef}>
			<CardBody scrollable={false}>
				<VStack spacing={spacing}>{children}</VStack>
			</CardBody>
		</Card>
	);
}

export default contextConnect(ListGroupContent, 'ListGroupContent');
