import { render } from '@testing-library/react';
import React from 'react';

import { Spacer } from '../../Spacer';
import { View } from '../../View';
import { HStack } from '../index';

describe('props', () => {
	test('should render correctly', () => {
		const { container } = render(
			<HStack>
				<View />
				<View />
			</HStack>,
		);
		expect(container.firstChild).toMatchSnapshot();
	});

	test('should render alignment', () => {
		const { container } = render(
			<HStack alignment="center">
				<View />
				<View />
			</HStack>,
		);
		expect(container.firstChild).toMatchSnapshot();
	});

	test('should render spacing', () => {
		const { container } = render(
			<HStack spacing={5}>
				<View />
				<View />
			</HStack>,
		);
		expect(container.firstChild).toMatchSnapshot();
	});

	test('should render Spacer', () => {
		const { container } = render(
			<HStack spacing={5}>
				<View />
				<Spacer />
				<View />
			</HStack>,
		);
		expect(container.firstChild).toMatchSnapshot();
	});
});
