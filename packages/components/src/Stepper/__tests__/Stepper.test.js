import { render } from '@testing-library/react';
import React from 'react';

import { Stepper } from '../index';

describe('props', () => {
	test('should render correctly', () => {
		const { container } = render(<Stepper />);
		expect(container.firstChild).toMatchSnapshot();
	});

	test('should render vertically', () => {
		const { container } = render(<Stepper direction="vertical" />);
		expect(container.firstChild).toMatchSnapshot();
	});

	test('should render size', () => {
		const { container } = render(<Stepper size="small" />);
		expect(container.firstChild).toMatchSnapshot();
	});
});
