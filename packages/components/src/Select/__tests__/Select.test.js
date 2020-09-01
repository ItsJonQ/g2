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

	test('should render defaultValue', () => {
		const { container } = render(
			<Select defaultValue="olaf" id="select" options={options} />,
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
