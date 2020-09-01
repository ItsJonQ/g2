import { render } from '@testing-library/react';
import React from 'react';

import { Lozenge } from '../index';

describe('props', () => {
	test('should render correctly', () => {
		const { container } = render(<Lozenge>Status</Lozenge>);
		expect(container.firstChild).toMatchSnapshot();
	});
});
