import { render } from '@testing-library/react';
import React from 'react';

import { Select } from '../index';

describe('props', () => {
	const options = [
		{ value: 'olaf', label: 'Olaf' },
		{ value: 'samantha', label: 'Samantha' },
	];

	test('should render correctly', () => {
		const { container } = render(<Select id="select" options={options} />);
		expect(container.firstChild).toMatchSnapshot();
	});

	test('should render children', () => {
		const { container } = render(
			<Select id="select">
				<optgroup label="Snowmen">
					<option value="olaf">Olaf</option>
				</optgroup>
			</Select>,
		);
		expect(container.firstChild).toMatchSnapshot();
	});

	test('should render disabled', () => {
		const { container } = render(
			<Select disabled id="select" options={options} />,
		);
		expect(container.firstChild).toMatchSnapshot();
	});

	test('should render required', () => {
		const { container } = render(
			<Select id="select" options={options} required />,
		);
		expect(container.firstChild).toMatchSnapshot();
	});

	test('should render readOnly', () => {
		const { container } = render(
			<Select id="select" options={options} readOnly />,
		);
		expect(container.firstChild).toMatchSnapshot();
	});

	test('should render size', () => {
		const { container } = render(
			<Select id="select" options={options} size="small" />,
		);
		expect(container.firstChild).toMatchSnapshot();
	});
});
