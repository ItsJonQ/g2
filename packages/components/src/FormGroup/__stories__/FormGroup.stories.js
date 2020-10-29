import React from 'react';

import { HelpTip, Text, TextInput } from '../../index';
import { FormGroup } from '../index';

export default {
	component: FormGroup,
	title: 'Components/FormGroup',
};

export const _default = () => {
	return (
		<FormGroup label="Form Group">
			<TextInput />
		</FormGroup>
	);
};

export const _labelHidden = () => {
	return (
		<FormGroup label="Form Group" labelHidden>
			<TextInput />
		</FormGroup>
	);
};

export const _help = () => {
	return (
		<FormGroup
			help={
				<Text>
					<HelpTip>Info</HelpTip> Hwdwada
				</Text>
			}
			label="Form Group"
		>
			<TextInput />
		</FormGroup>
	);
};
