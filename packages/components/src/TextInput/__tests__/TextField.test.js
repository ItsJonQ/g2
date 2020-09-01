import { render } from '@testing-library/react';
import React from 'react';

import { TextInput } from '../index';

describe('props', () => {
	test('should render correctly', () => {
		const { container } = render(<TextInput id="text-input" />);
		expect(container.firstChild).toMatchSnapshot();
	});

	test('should render align', () => {
		const { container } = render(
			<TextInput align="flex-start" id="text-input" />,
		);
		expect(container.firstChild).toMatchSnapshot();
	});

	test('should render disabled', () => {
		const { container } = render(<TextInput disabled id="text-input" />);
		expect(container.firstChild).toMatchSnapshot();
	});

	test('should render defaultValue', () => {
		const { container } = render(
			<TextInput defaultValue="Olaf" id="text-input" />,
		);
		expect(container.firstChild).toMatchSnapshot();
	});

	test('should render gap', () => {
		const { container } = render(<TextInput gap={4} id="text-input" />);
		expect(container.firstChild).toMatchSnapshot();
	});

	test('should render isRounded', () => {
		const { container } = render(<TextInput id="text-input" isRounded />);
		expect(container.firstChild).toMatchSnapshot();
	});

	test('should render isSeamless', () => {
		const { container } = render(<TextInput id="text-input" isSeamless />);
		expect(container.firstChild).toMatchSnapshot();
	});

	test('should render justify', () => {
		const { container } = render(
			<TextInput id="text-input" justify="space-around" />,
		);
		expect(container.firstChild).toMatchSnapshot();
	});

	test('should render multiline', () => {
		const { container } = render(
			<TextInput id="text-input" isResizable multiline />,
		);
		expect(container.firstChild).toMatchSnapshot();
	});

	test('should render prefix', () => {
		const { container } = render(
			<TextInput id="text-input" prefix={<span>prefix</span>} />,
		);
		expect(container.firstChild).toMatchSnapshot();
	});

	test('should render size', () => {
		const { container } = render(
			<TextInput id="text-input" size="small" />,
		);
		expect(container.firstChild).toMatchSnapshot();
	});

	test('should render suffix', () => {
		const { container } = render(
			<TextInput id="text-input" suffix={<span>suffix</span>} />,
		);
		expect(container.firstChild).toMatchSnapshot();
	});

	test('should render value', () => {
		const { container } = render(
			<TextInput id="text-input" value="Olaf" />,
		);
		expect(container.firstChild).toMatchSnapshot();
	});
});
