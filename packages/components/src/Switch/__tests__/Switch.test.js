import { render } from '@testing-library/react';
import React from 'react';

import { Switch } from '../index';

describe('props', () => {
	test('should render correctly', () => {
		const { container } = render(<Switch id="switch" />);
		expect(container.firstChild).toMatchSnapshot();
	});

	test('should render checked', () => {
		const { container } = render(<Switch checked id="switch" />);
		expect(container.firstChild).toMatchSnapshot();
	});

	test('should render disabled', () => {
		const { container } = render(<Switch disabled id="switch" />);
		expect(container.firstChild).toMatchSnapshot();
	});

	test('should render defaultValue', () => {
		const { container } = render(
			<Switch defaultValue={true} id="switch" />,
		);
		expect(container.firstChild).toMatchSnapshot();
	});

	test('should render label', () => {
		const { container } = render(<Switch id="switch" label="Size" />);
		expect(container.firstChild).toMatchSnapshot();
	});

	test('should render size', () => {
		const { container } = render(<Switch id="switch" size="small" />);
		expect(container.firstChild).toMatchSnapshot();
	});

	test('should render type', () => {
		const { container } = render(<Switch id="switch" type="radio" />);
		expect(container.firstChild).toMatchSnapshot();
	});
});
