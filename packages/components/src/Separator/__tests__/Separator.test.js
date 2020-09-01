import { render } from '@testing-library/react';
import React from 'react';

import { Separator } from '../index';

describe('props', () => {
	test('should render correctly', () => {
		const { container } = render(<Separator />);
		expect(container.firstChild).toMatchSnapshot();
	});

	test('should render marginTop', () => {
		const { container } = render(<Separator mt={5} />);
		expect(container.firstChild).toMatchSnapshot();
	});

	test('should render marginBottom', () => {
		const { container } = render(<Separator mb={5} />);
		expect(container.firstChild).toMatchSnapshot();
	});

	test('should render margin', () => {
		const { container } = render(<Separator m={7} />);
		expect(container.firstChild).toMatchSnapshot();
	});
});
