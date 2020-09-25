import { Card, CardBody, Text } from '@wp-g2/components';
import { ui } from '@wp-g2/styles';
import React from 'react';

import { ContextSystemProvider } from '../index';

export default {
	component: ContextSystemProvider,
	title: 'Context/ContextSystemProvider',
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
			<ContextSystemProvider value={value}>
				<Card>
					<CardBody css={[{ border: '3px solid green' }]}>
						<Text optimizeReadabilityFor="blue">Card</Text>
					</CardBody>
				</Card>
			</ContextSystemProvider>
			<Card>
				<CardBody>
					<Text>Card</Text>
				</CardBody>
			</Card>
		</>
	);
};

export const shallow = () => {
	const value = {
		Card: {
			_shallow: true,
			css: {
				background: 'blue',
			},
			elevation: 5,
		},
	};

	return (
		<>
			<ContextSystemProvider value={value}>
				<Card>
					<CardBody css={[{ border: '3px solid green' }]}>
						<Text optimizeReadabilityFor="blue">Card</Text>
						<Card>
							<CardBody>
								<Text>Card</Text>
							</CardBody>
						</Card>
					</CardBody>
				</Card>
			</ContextSystemProvider>
		</>
	);
};
