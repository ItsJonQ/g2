import { render } from '@testing-library/react';
import React from 'react';

import { Spacer } from '../../Spacer';
import { View } from '../../View';
import { VStack } from '../index';

describe('props', () => {
	test('should render correctly', () => {
		const { container } = render(
			<VStack>
				<View />
				<View />
			</VStack>,
		);
		expect(container.firstChild).toMatchSnapshot();
	});

	test('should render alignment', () => {
		const { container } = render(
			<VStack alignment="center">
				<View />
				<View />
			</VStack>,
		);
		expect(container.firstChild).toMatchSnapshot();
	});

	test('should render spacing', () => {
		const { container } = render(
			<VStack spacing={5}>
				<View />
				<View />
			</VStack>,
		);
		expect(container.firstChild).toMatchSnapshot();
	});

	test('should render Spacer', () => {
		const { container } = render(
			<VStack spacing={5}>
				<View />
				<Spacer />
				<View />
			</VStack>,
		);
		expect(container.firstChild).toMatchSnapshot();
	});
});
