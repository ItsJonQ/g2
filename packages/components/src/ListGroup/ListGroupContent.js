import { connect } from '@wp-g2/context';
import React from 'react';

import { Card, CardBody } from '../Card';
import { useListGroupContext } from './ListGroup.Context';

function ListGroupContent({ children, ...props }) {
	const { inset } = useListGroupContext();

	if (!inset)
		return (
			<Card elevation={0} isBorderless {...props}>
				{children}
			</Card>
		);

	return (
		<Card elevation={0} isBorderless {...props}>
			<CardBody scrollable={false}>{children}</CardBody>
		</Card>
	);
}

export default connect(ListGroupContent, 'ListGroupContent');
