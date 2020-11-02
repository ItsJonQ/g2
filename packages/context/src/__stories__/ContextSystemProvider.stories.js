import { ControlLabel, Radio, Text } from '@wp-g2/components';
import React from 'react';

import { ContextSystemProvider, useContextSystem } from '../index';

export default {
	component: ContextSystemProvider,
	title: 'Context/ContextSystemProvider/Basic',
};

function App() {
	return (
		<div>
			<ContextSystemProvider value={{ Text: { weight: 'bold' } }}>
				<Text>Donut</Text>
			</ContextSystemProvider>
		</div>
	);
}

export const _default = () => <App />;
