import { render } from '@testing-library/react';
import React from 'react';

import { ArrowIndicator } from '../index';

describe('props', () => {
	test('should render correctly', () => {
		const { container } = render(<ArrowIndicator />);
		expect(container.firstChild).toMatchSnapshot();
	});

	test('should render with a custom size', () => {
		const { container } = render(<ArrowIndicator size={17} />);
		expect(container.firstChild).toMatchSnapshot();
	});
});
