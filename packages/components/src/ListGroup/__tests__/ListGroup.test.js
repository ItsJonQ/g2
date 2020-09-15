import { render } from '@testing-library/react';
import React from 'react';

import { ListGroup } from '../index';

describe('props', () => {
	test('should render correctly', () => {
		const { container } = render(<ListGroup>I like warm hugs</ListGroup>);
		expect(container.firstChild).toMatchSnapshot();
	});
});
