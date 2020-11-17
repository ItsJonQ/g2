import { render } from '@testing-library/react';
import React from 'react';

import { Icon } from '../index';

const MockIcon = () => <svg />;

describe('props', () => {
	test('should render correctly', () => {
		const { container } = render(<Icon icon={<MockIcon />} />);
		expect(container.firstChild).toMatchSnapshot();
	});

	test('should render fill', () => {
		const { container } = render(<Icon fill="red" icon={<MockIcon />} />);
		expect(container.firstChild).toMatchSnapshot();
	});

	test('should render size', () => {
		const { container } = render(<Icon icon={<MockIcon />} size={31} />);
		expect(container.firstChild).toMatchSnapshot();
	});
});
