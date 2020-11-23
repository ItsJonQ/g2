import React from 'react';

import { Heading } from '../Heading';
import { Spacer } from '../Spacer';

function AlertTitle({ title }) {
	if (!title) return null;

	return (
		<Spacer mb={0.5}>
			<Heading size={5}>{title}</Heading>
		</Spacer>
	);
}

export default AlertTitle;
