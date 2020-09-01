import { render } from '@testing-library/react';
import React from 'react';

import { Heading } from '../index';

describe('props', () => {
	test('should render correctly', () => {
		const { container } = render(
			<Heading>Some people are worth melting for.</Heading>,
		);
		expect(container.firstChild).toMatchSnapshot();
	});

	test('should render size', () => {
		const { container } = render(
			<Heading size={2}>Some people are worth melting for.</Heading>,
		);
		expect(container.firstChild).toMatchSnapshot();
	});

	test('should render as another element', () => {
		const { container } = render(
			<Heading as="h3" size={2}>
				Some people are worth melting for.
			</Heading>,
		);
		expect(container.firstChild).toMatchSnapshot();
	});
});
