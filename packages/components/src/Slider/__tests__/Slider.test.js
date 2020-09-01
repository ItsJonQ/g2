import { render } from '@testing-library/react';
import React from 'react';

import { Slider } from '../index';

describe('props', () => {
	test('should render correctly', () => {
		const { container } = render(<Slider id="slider" />);
		expect(container.firstChild).toMatchSnapshot();
	});

	test('should render min', () => {
		const { container } = render(<Slider id="slider" min="5" />);
		expect(container.firstChild).toMatchSnapshot();
	});

	test('should render max', () => {
		const { container } = render(<Slider id="slider" max="50" />);
		expect(container.firstChild).toMatchSnapshot();
	});

	test('should render size', () => {
		const { container } = render(<Slider id="slider" size="small" />);
		expect(container.firstChild).toMatchSnapshot();
	});

	test('should render value', () => {
		const { container } = render(<Slider id="slider" size="40" />);
		expect(container.firstChild).toMatchSnapshot();
	});
});
