import { render } from '@testing-library/react';
import React from 'react';

import { Badge } from '../index';

describe('props', () => {
	test('should render correctly', () => {
		const { container } = render(<Badge>Status</Badge>);
		expect(container.firstChild).toMatchSnapshot();
	});

	test('should render color', () => {
		const { container } = render(<Badge color="red">Status</Badge>);
		expect(container.firstChild).toMatchSnapshot();
	});

	test('should render display', () => {
		const { container } = render(<Badge display="block">Status</Badge>);
		expect(container.firstChild).toMatchSnapshot();
	});

	test('should render isBold', () => {
		const { container } = render(<Badge isBold>Status</Badge>);
		expect(container.firstChild).toMatchSnapshot();
	});

	test('should render isRounded', () => {
		const { container } = render(<Badge isRounded>Status</Badge>);
		expect(container.firstChild).toMatchSnapshot();
	});

	test('should render truncate', () => {
		const { container } = render(<Badge truncate>Status</Badge>);
		expect(container.firstChild).toMatchSnapshot();
	});
});
