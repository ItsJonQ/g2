import { fireEvent, render, screen } from '@testing-library/react';
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
		const { container } = render(<Slider id="slider" value="40" />);
		expect(container.firstChild).toMatchSnapshot();
	});

	test('should render unit value', () => {
		const { container } = render(<Slider id="slider" value="40px" />);
		const input = container.querySelector('input');

		expect(container.firstChild).toMatchSnapshot();
		expect(input.value).toEqual('40');
	});

	test('should include unit in onChange callback (if value contains unit)', () => {
		let value = '40px';
		const setValue = (next) => (value = next);

		render(
			<Slider
				data-testid="slider"
				id="slider"
				onChange={setValue}
				value={value}
			/>,
		);

		const input = screen.getByTestId('slider');

		fireEvent.change(input, { target: { value: 13 } });

		// onChange callback value
		expect(value).toBe('13px');
	});

	test('should change unit in onChange callback, if incoming value unit changes', () => {
		let value = '40px';
		const setValue = (next) => (value = next);

		const { rerender } = render(
			<Slider
				data-testid="slider"
				id="slider"
				onChange={setValue}
				value={value}
			/>,
		);

		const input = screen.getByTestId('slider');

		expect(input.value).toBe('40');

		rerender(
			<Slider
				data-testid="slider"
				id="slider"
				onChange={setValue}
				value="100%"
			/>,
		);

		expect(input.value).toBe('100');

		fireEvent.change(input, { target: { value: 13 } });

		// onChange callback value
		expect(value).toBe('13%');
	});
});
