import { render } from '@testing-library/react';
import React from 'react';

import { SelectDropdown } from '../index';

describe('props', () => {
	test('should render correctly', () => {
		const { container } = render(<SelectDropdown />);
		expect(container.firstChild).toMatchSnapshot();
	});
});
