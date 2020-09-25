import { contextConnect, useContextSystem } from '@wp-g2/context';
import React from 'react';

import { Card, CardBody } from '../Card';
import { useListGroupContext } from './ListGroup.Context';

function ListGroupContent(props, forwardedRef) {
	const { children, ...otherProps } = useContextSystem(
		props,
		'ListGroupContent',
	);
	const { inset } = useListGroupContext();

	if (!inset) return children;

	return (
		<Card elevation={0} isBorderless {...otherProps} ref={forwardedRef}>
			<CardBody scrollable={false}>{children}</CardBody>
		</Card>
	);
}

export default contextConnect(ListGroupContent, 'ListGroupContent');
