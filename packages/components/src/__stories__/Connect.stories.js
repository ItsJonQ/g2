import { ComponentsProvider, connect } from '@g2/provider';
import React from 'react';

import { BaseView, Text } from '../index';

export default {
	title: 'Example/Connect',
};

const SpecialText = connect(Text, 'SpecialText');

export const _default = () => {
	return (
		<ComponentsProvider value={{ Text: { isBlock: true } }}>
			<BaseView m="auto">
				<ComponentsProvider
					value={{ SpecialText: { size: 4, weight: 600 } }}
				>
					<SpecialText>Special Label</SpecialText>
				</ComponentsProvider>
				<SpecialText>Special Label</SpecialText>
			</BaseView>
		</ComponentsProvider>
	);
};
