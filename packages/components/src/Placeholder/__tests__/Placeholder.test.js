import { render } from '@testing-library/react';
import React from 'react';

import { Placeholder } from '../index';

describe('props', () => {
	test('should render correctly', () => {
		const { container } = render(<Placeholder />);
		expect(container.firstChild).toMatchSnapshot();
	});

	test('should render width', () => {
		const { container } = render(<Placeholder width={340} />);
		expect(container.firstChild).toMatchSnapshot();
	});

	test('should render height', () => {
		const { container } = render(<Placeholder height={340} />);
		expect(container.firstChild).toMatchSnapshot();
	});
});
