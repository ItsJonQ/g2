import { Card, CardBody, Text } from '@wp-g2/components';
import { ui } from '@wp-g2/styles';
import React from 'react';

import { ComponentsProvider } from '../index';

export default {
	component: ComponentsProvider,
	title: 'Context/ComponentsProvider',
};

export const _default = () => {
	const value = {
		Card: {
			css: {
				background: 'blue',
			},
		},
		CardBody: {
			css: [
				`
				padding: 20px;
				*:hover > & {
					padding: 40px;
				}
			`,
				ui.animation.default,
			],
		},
	};

	return (
		<>
			<ComponentsProvider value={value}>
				<Card>
					<CardBody css={[{ border: '3px solid green' }]}>
						<Text optimizeReadabilityFor="blue">Card</Text>
					</CardBody>
				</Card>
			</ComponentsProvider>
			<Card>
				<CardBody>
					<Text>Card</Text>
				</CardBody>
			</Card>
		</>
	);
};
