import { render } from '@testing-library/react';
import React from 'react';

import { BaseButton } from '../index';

describe('props', () => {
	test('should render correctly', () => {
		const { container } = render(<BaseButton>I like warm hugs</BaseButton>);
		expect(container.firstChild).toMatchSnapshot();
	});
});
