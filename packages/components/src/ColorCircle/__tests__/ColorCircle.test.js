import { render } from '@testing-library/react';
import React from 'react';

import { ColorCircle } from '../index';

describe('props', () => {
	test('should render correctly', () => {
		const { container } = render(<ColorCircle color="blue" />);
		expect(container.firstChild).toMatchSnapshot();
	});
});
