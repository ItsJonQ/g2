import React from 'react';

import { Card, CardBody } from '../index';

export default {
	component: Card,
	title: 'Components/Card',
};

export const _default = () => {
	return (
		<Card elevation={5} isBorderless>
			<CardBody>Card</CardBody>
		</Card>
	);
};
