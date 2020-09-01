import { render } from '@testing-library/react';
import React from 'react';

import { Background } from '../index';

describe('props', () => {
	test('should render correctly', () => {
		const { container } = render(
			<Background>Some people are worth melting for.</Background>,
		);
		expect(container.firstChild).toMatchSnapshot();
	});
});
