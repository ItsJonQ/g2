import { render } from '@testing-library/react';
import React from 'react';

import { Initials } from '../index';

describe('props', () => {
	test('should render correctly', () => {
		const { container } = render(<Initials name="Elsa Oldenburg" />);
		expect(container.firstChild).toMatchSnapshot();
	});
});
