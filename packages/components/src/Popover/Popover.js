import { BaseView } from '@g2/css';
import { connect } from '@g2/provider';
import React from 'react';

import { Card, CardBody } from '../Card';

function Popover({ ...props }) {
	return (
		<Card {...props}>
			<CardBody>Hello</CardBody>
		</Card>
	);
}

export default connect(Popover);
