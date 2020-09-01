import { render } from '@testing-library/react';
import React from 'react';

import { View } from '../../View';
import { VisuallyHidden } from '../index';

describe('props', () => {
	test('should render correctly', () => {
		const { container } = render(
			<VisuallyHidden>
				<View />
			</VisuallyHidden>,
		);
		expect(container.firstChild).toMatchSnapshot();
	});
});
