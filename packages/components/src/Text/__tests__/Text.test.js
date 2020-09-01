import { render } from '@testing-library/react';
import React from 'react';

import { Text } from '../index';

describe('props', () => {
	test('should render correctly', () => {
		const { container } = render(
			<Text>Some people are worth melting for.</Text>,
		);
		expect(container.firstChild).toMatchSnapshot();
	});

	test('should render as another element', () => {
		const { container } = render(
			<Text as="div">Some people are worth melting for.</Text>,
		);
		expect(container.firstChild).toMatchSnapshot();
	});

	test('should render align', () => {
		const { container } = render(
			<Text align="center">Some people are worth melting for.</Text>,
		);
		expect(container.firstChild).toMatchSnapshot();
	});

	test('should render color', () => {
		const { container } = render(
			<Text color="orange">Some people are worth melting for.</Text>,
		);
		expect(container.firstChild).toMatchSnapshot();
	});

	test('should render display', () => {
		const { container } = render(
			<Text display="inline-flex">
				Some people are worth melting for.
			</Text>,
		);
		expect(container.firstChild).toMatchSnapshot();
	});

	test('should render highlighted words', () => {
		const { container } = render(
			<Text highlightWords={['worth']}>
				Some people are worth melting for.
			</Text>,
		);
		expect(container.firstChild).toMatchSnapshot();
	});

	test('should render isBlock', () => {
		const { container } = render(
			<Text isBlock>Some people are worth melting for.</Text>,
		);
		expect(container.firstChild).toMatchSnapshot();
	});

	test('should render lineHeight', () => {
		const { container } = render(
			<Text lineHeight={1.5}>Some people are worth melting for.</Text>,
		);
		expect(container.firstChild).toMatchSnapshot();
	});

	test('should render optimizeReadabilityFor', () => {
		const { container } = render(
			<Text optimizeReadabilityFor="blue">
				Some people are worth melting for.
			</Text>,
		);
		expect(container.firstChild).toMatchSnapshot();
	});

	test('should render size', () => {
		const { container } = render(
			<Text size={'title'}>Some people are worth melting for.</Text>,
		);
		expect(container.firstChild).toMatchSnapshot();
	});

	test('should render custom size', () => {
		const { container } = render(
			<Text size={15}>Some people are worth melting for.</Text>,
		);
		expect(container.firstChild).toMatchSnapshot();
	});

	test('should render truncate', () => {
		const { container } = render(
			<Text truncate>Some people are worth melting for.</Text>,
		);
		expect(container.firstChild).toMatchSnapshot();
	});

	test('should render upperCase', () => {
		const { container } = render(
			<Text upperCase>Some people are worth melting for.</Text>,
		);
		expect(container.firstChild).toMatchSnapshot();
	});

	test('should render variant', () => {
		const { container } = render(
			<Text variant="muted">Some people are worth melting for.</Text>,
		);
		expect(container.firstChild).toMatchSnapshot();
	});

	test('should render weight', () => {
		const { container } = render(
			<Text weight={700}>Some people are worth melting for.</Text>,
		);
		expect(container.firstChild).toMatchSnapshot();
	});
});
