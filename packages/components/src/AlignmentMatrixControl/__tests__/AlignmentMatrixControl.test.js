import { render } from '@testing-library/react';
import React from 'react';

import { AlignmentMatrixControl } from '../index';

describe('props', () => {
	test('should render correctly', () => {
		const { container } = render(
			<AlignmentMatrixControl value="center center" />
		);
		expect(container.firstChild).toMatchSnapshot();
	});
});
