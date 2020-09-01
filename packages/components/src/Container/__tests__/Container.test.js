import { render } from '@testing-library/react';
import React from 'react';

import { Container } from '../index';

describe('props', () => {
	test('should render correctly', () => {
		const { container } = render(
			<Container>Some people are worth melting for.</Container>,
		);
		expect(container.firstChild).toMatchSnapshot();
	});

	test('should render alignment', () => {
		const { container } = render(
			<Container alignment="left">
				Some people are worth melting for.
			</Container>,
		);
		expect(container.firstChild).toMatchSnapshot();
	});

	test('should render width', () => {
		const { container } = render(
			<Container alignment="left" width={960}>
				Some people are worth melting for.
			</Container>,
		);
		expect(container.firstChild).toMatchSnapshot();
	});
});
