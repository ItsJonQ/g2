import { render } from '@testing-library/react';
import React from 'react';

import { TextField } from '../index';

describe('props', () => {
	test('should render correctly', () => {
		const { container } = render(<TextField id="text-input" />);
		expect(container.firstChild).toMatchSnapshot();
	});
});
