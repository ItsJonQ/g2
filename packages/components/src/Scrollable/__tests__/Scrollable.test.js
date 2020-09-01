import { render } from '@testing-library/react';
import React from 'react';

import { Scrollable } from '../index';

describe('props', () => {
	test('should render correctly', () => {
		const { container } = render(
			<Scrollable>Some people are worth melting for.</Scrollable>,
		);
		expect(container.firstChild).toMatchSnapshot();
	});

	test('should render smoothScroll', () => {
		const { container } = render(
			<Scrollable smoothScroll>
				Some people are worth melting for.
			</Scrollable>,
		);
		expect(container.firstChild).toMatchSnapshot();
	});
});
