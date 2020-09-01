import { render } from '@testing-library/react';
import React from 'react';

import { Link } from '../index';

describe('props', () => {
	test('should render correctly', () => {
		const { container } = render(<Link href="#">Let it go</Link>);
		expect(container.firstChild).toMatchSnapshot();
	});

	test('should render isPlain', () => {
		const { container } = render(
			<Link href="#" isPlain>
				Let it go
			</Link>,
		);
		expect(container.firstChild).toMatchSnapshot();
	});
});
