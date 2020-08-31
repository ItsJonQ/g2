import { render } from '@testing-library/react';
import React from 'react';

import { flush } from '../../compiler';
import { createStyleSystem } from '../index';

describe('createStyleSystem', () => {
	afterAll(() => {
		flush();
	});

	test('should include a styled element, View, and styled component that renders', () => {
		const { View, core, styled } = createStyleSystem();
		const Box = styled.p`
			padding: 10px;
		`;
		const { container } = render(
			<>
				<core.input />
				<View as="span" />
				<Box />
			</>,
		);

		expect(container.querySelector('input')).toHaveStyle({
			boxSizing: 'border-box',
		});
		expect(container.querySelector('span')).toHaveStyle({
			boxSizing: 'border-box',
		});
		expect(container.querySelector('p')).toHaveStyle({
			boxSizing: 'border-box',
			padding: '10px',
		});
	});

	test('should render custom baseStyles', () => {
		const { View } = createStyleSystem({
			baseStyles: {
				background: 'blue',
			},
		});

		const { container } = render(<View />);

		expect(container.querySelector('div')).toHaveStyle({
			boxSizing: 'border-box',
			background: 'blue',
		});
	});

	test('should support multiple nested style system instances', () => {
		const { View } = createStyleSystem();
		const { View: AnotherView } = createStyleSystem({
			baseStyles: {
				padding: '2em',
			},
		});

		const { container } = render(
			<View>
				<AnotherView as="span" />
			</View>,
		);

		expect(container.querySelector('div')).toHaveStyle({
			boxSizing: 'border-box',
		});
		expect(container.querySelector('span')).toHaveStyle({
			boxSizing: 'border-box',
			padding: '2em',
		});
	});
});
