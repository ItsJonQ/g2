import { render } from '@testing-library/react';
import React from 'react';

import { Divider } from '../index';

describe('props', () => {
	test('should render correctly', () => {
		const { container } = render(<Divider />);
		expect(container.firstChild).toMatchSnapshot();
	});

	test('should render marginTop', () => {
		const { container } = render(<Divider mt={5} />);
		expect(container.firstChild).toMatchSnapshot();
	});

	test('should render marginBottom', () => {
		const { container } = render(<Divider mb={5} />);
		expect(container.firstChild).toMatchSnapshot();
	});

	test('should render margin', () => {
		const { container } = render(<Divider m={7} />);
		expect(container.firstChild).toMatchSnapshot();
	});
});
