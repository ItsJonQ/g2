import { render } from '@testing-library/react';
import React from 'react';

import { Surface } from '../index';

describe('props', () => {
	test('should render correctly', () => {
		const { container } = render(
			<Surface>Some people are worth melting for.</Surface>,
		);
		expect(container.firstChild).toMatchSnapshot();
	});

	test('should render variants', () => {
		const { container } = render(
			<Surface variant="secondary">
				Some people are worth melting for.
			</Surface>,
		);
		expect(container.firstChild).toMatchSnapshot();
	});

	test('should render borders', () => {
		const { container } = render(
			<Surface border>Some people are worth melting for.</Surface>,
		);
		expect(container.firstChild).toMatchSnapshot();
	});

	test('should render borderLeft', () => {
		const { container } = render(
			<Surface borderLeft>Some people are worth melting for.</Surface>,
		);
		expect(container.firstChild).toMatchSnapshot();
	});

	test('should render borderRight', () => {
		const { container } = render(
			<Surface borderRight>Some people are worth melting for.</Surface>,
		);
		expect(container.firstChild).toMatchSnapshot();
	});

	test('should render borderTop', () => {
		const { container } = render(
			<Surface borderTop>Some people are worth melting for.</Surface>,
		);
		expect(container.firstChild).toMatchSnapshot();
	});

	test('should render borderBottom', () => {
		const { container } = render(
			<Surface borderBottom>Some people are worth melting for.</Surface>,
		);
		expect(container.firstChild).toMatchSnapshot();
	});
});
