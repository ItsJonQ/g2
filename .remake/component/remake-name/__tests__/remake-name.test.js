import { render } from '@testing-library/react';
import React from 'react';

import { <%= name %> } from '../index';

describe('props', () => {
	test('should render correctly', () => {
		const { container } = render(<<%= name %>>I like warm hugs</<%= name %>>);
		expect(container.firstChild).toMatchSnapshot();
	});
});
