import { render } from '@testing-library/react';
import React from 'react';

import { Spinner } from '../index';

describe('props', () => {
	test('should render correctly', () => {
		const { container } = render(<Spinner />);
		expect(container.firstChild).toMatchSnapshot();
	});

	test('should render color', () => {
		const { container } = render(<Spinner color="blue" />);
		expect(container.firstChild).toMatchSnapshot();
	});

	test('should render size', () => {
		const { container } = render(<Spinner size={31} />);
		expect(container.firstChild).toMatchSnapshot();
	});
});
