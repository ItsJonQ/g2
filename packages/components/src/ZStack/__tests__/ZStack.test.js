import { render } from '@testing-library/react';
import React from 'react';

import { View } from '../../View';
import { ZStack } from '../index';

describe('props', () => {
	test('should render correctly', () => {
		const { container } = render(
			<ZStack>
				<View />
				<View />
			</ZStack>,
		);
		expect(container.firstChild).toMatchSnapshot();
	});

	test('should render isLayered', () => {
		const { container } = render(
			<ZStack isLayered>
				<View />
				<View />
			</ZStack>,
		);
		expect(container.firstChild).toMatchSnapshot();
	});

	test('should render isReversed', () => {
		const { container } = render(
			<ZStack isReversed>
				<View />
				<View />
			</ZStack>,
		);
		expect(container.firstChild).toMatchSnapshot();
	});

	test('should render offset', () => {
		const { container } = render(
			<ZStack offset={4}>
				<View />
				<View />
			</ZStack>,
		);
		expect(container.firstChild).toMatchSnapshot();
	});
});
