import React from 'react';

import { Card, CardBody } from '../../index';
import { Background } from '../index';

export default {
	component: Background,
	title: 'Components/Background',
};

export const _default = () => {
	return (
		<Background css={{ padding: 40 }}>
			<Card>
				<CardBody>Card</CardBody>
			</Card>
		</Background>
	);
};
