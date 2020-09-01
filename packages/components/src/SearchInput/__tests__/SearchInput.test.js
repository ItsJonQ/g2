import { render } from '@testing-library/react';
import React from 'react';

import { SearchInput } from '../index';

describe('props', () => {
	test('should render correctly', () => {
		const { container } = render(<SearchInput id="search" />);
		expect(container.firstChild).toMatchSnapshot();
	});

	test('should render isLoading', () => {
		const { container } = render(<SearchInput id="search" isLoading />);
		expect(container.firstChild).toMatchSnapshot();
	});

	test('should render placeholder', () => {
		const { container } = render(
			<SearchInput id="search" placeholder="Searching for..." />,
		);
		expect(container.firstChild).toMatchSnapshot();
	});

	test('should render prefix', () => {
		const { container } = render(
			<SearchInput id="search" prefix={<span>prefix</span>} />,
		);
		expect(container.firstChild).toMatchSnapshot();
	});

	test('should render suffix', () => {
		const { container } = render(
			<SearchInput id="search" suffix={<span>suffix</span>} />,
		);
		expect(container.firstChild).toMatchSnapshot();
	});

	test('should render value', () => {
		const { container } = render(<SearchInput id="search" value="q" />);
		expect(container.firstChild).toMatchSnapshot();
	});
});
