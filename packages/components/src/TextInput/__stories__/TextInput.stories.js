import React from 'react';
import NumberFormat from 'react-number-format';

import { Container } from '../../Container';
import { Text, VStack } from '../../index';
import { TextInput } from '../index';

export default {
	component: TextInput,
	title: 'Components/TextInput',
};

export const _default = () => {
	return <TextInput />;
};

export const number = () => {
	return (
		<Container
			css={`
				margin-top: 20vh;
			`}
			width={480}
		>
			<TextInput type="number" />
		</Container>
	);
};

export const numberStepper = () => {
	return (
		<Container
			css={`
				margin-top: 20vh;
			`}
			width={480}
		>
			<TextInput arrows="stepper" type="number" value="1" />
		</Container>
	);
};

export const multiline = () => {
	return <TextInput maxRows={6} minRows={3} multiline />;
};

export const custom = () => {
	return (
		<VStack>
			<Text>
				Rendered using <code>react-number-format</code>
			</Text>
			<TextInput
				as={NumberFormat}
				prefix={'$'}
				thousandSeparator={true}
			/>
		</VStack>
	);
};
