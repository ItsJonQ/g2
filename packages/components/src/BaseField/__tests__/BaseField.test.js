import { render } from '@testing-library/react';
import React from 'react';

import { BaseField } from '../index';

describe('props', () => {
	test('should render correctly', () => {
		const { container } = render(<BaseField />);
		expect(container.firstChild).toMatchSnapshot();
	});
});
