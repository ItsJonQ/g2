import { Card, CardBody, Text, View } from '@wp-g2/components';
import { ui } from '@wp-g2/styles';
import React from 'react';

import { ContextSystemProvider } from '../index';

const SomeContext = React.createContext();
const useSomeContext = () => React.useContext(SomeContext);

export default {
	component: ContextSystemProvider,
	title: 'Context/ContextSystemProvider',
};

const innerContext = {
	Card: {
		css: {
			background: 'white',
		},
	},
};

const InnerContent = React.memo(() => {
	const state = useSomeContext();
	const isEven = state % 2 === 0;
	const style = isEven ? { background: 'red' } : null;
	return <View css={style}>{state}</View>;
});

const InnerCard = React.memo(() => {
	return (
		<View css={{ padding: 40 }}>
			<Card>
				<CardBody css={[{ border: '3px solid green' }]}>
					<InnerContent />
				</CardBody>
			</Card>
		</View>
	);
});

export const Default = () => {
	const [state, update] = React.useState(0);
	const forceUpdate = () => update((prev) => prev + 1);

	const value = {
		Card: {
			css: {
				background: state % 2 === 0 ? 'blue' : 'yellow',
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
			<SomeContext.Provider value={state}>
				<button onClick={forceUpdate}>Force Update</button>
				<ContextSystemProvider value={value}>
					<Card>
						<CardBody css={[{ border: '3px solid green' }]}>
							<Text optimizeReadabilityFor="blue">Card</Text>
							<ContextSystemProvider value={innerContext}>
								<InnerCard />
							</ContextSystemProvider>
						</CardBody>
					</Card>
				</ContextSystemProvider>
				<Card>
					<CardBody>
						<Text>Card</Text>
					</CardBody>
				</Card>
			</SomeContext.Provider>
		</>
	);
};
