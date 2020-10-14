import { render } from '@testing-library/react';
import React from 'react';

import { UnitInput } from '../index';

describe('props', () => {
	test('should render correctly', () => {
		const { container } = render(<UnitInput id="text-input" />);
		expect(container.firstChild).toMatchSnapshot();
	});
});
