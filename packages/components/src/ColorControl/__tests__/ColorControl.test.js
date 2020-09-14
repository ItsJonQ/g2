import { render } from '@testing-library/react';
import React from 'react';

import { ColorControl } from '../index';

describe('props', () => {
	test('should render correctly', () => {
		const { container } = render(
			<ColorControl color="blue">I like warm hugs</ColorControl>,
		);
		expect(container.firstChild).toMatchSnapshot();
	});
});
