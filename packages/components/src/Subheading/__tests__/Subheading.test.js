import { render } from '@testing-library/react';
import React from 'react';

import { Subheading } from '../index';

describe('props', () => {
	test('should render correctly', () => {
		const { container } = render(
			<Subheading>Some people are worth melting for.</Subheading>,
		);
		expect(container.firstChild).toMatchSnapshot();
	});
});
