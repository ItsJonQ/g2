import { render } from '@testing-library/react';
import React from 'react';

import { BaseChoice } from '../index';

describe('props', () => {
	test('should render correctly', () => {
		const { container } = render(<BaseChoice>I like warm hugs</BaseChoice>);
		expect(container.firstChild).toMatchSnapshot();
	});
});
