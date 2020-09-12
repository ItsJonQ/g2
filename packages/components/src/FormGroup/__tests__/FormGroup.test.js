import { render } from '@testing-library/react';
import React from 'react';

import { ControlLabel } from '../../ControlLabel';
import { TextInput } from '../../TextInput';
import { FormGroup } from '../index';

describe('props', () => {
	test('should render correctly', () => {
		const { container } = render(
			<FormGroup id="fname" label="First name">
				<TextInput />
			</FormGroup>,
		);
		expect(container.firstChild).toMatchSnapshot();
	});

	test('should render label without prop correctly', () => {
		const { container } = render(
			<FormGroup id="fname">
				<ControlLabel htmlFor="fname" />
				<TextInput />
			</FormGroup>,
		);
		expect(container.firstChild).toMatchSnapshot();
	});

	test('should render alignLabel', () => {
		const { container } = render(
			<FormGroup alignLabel="right" id="fname" label="First name">
				<TextInput />
			</FormGroup>,
		);
		expect(container.firstChild).toMatchSnapshot();
	});

	test('should render vertically', () => {
		const { container } = render(
			<FormGroup horizontal={false} id="fname" label="First name">
				<TextInput />
			</FormGroup>,
		);
		expect(container.firstChild).toMatchSnapshot();
	});
});
