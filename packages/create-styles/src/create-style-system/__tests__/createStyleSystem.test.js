import { render } from '@testing-library/react';
import React from 'react';

import { createStyleSystem } from '../index';

describe('createStyleSystem', () => {
	test('should include a View that renders a styled div', () => {
		const { View } = createStyleSystem();
		const { container } = render(<View />);

		const el = container.querySelector('div');

		expect(el).toHaveStyle({ boxSizing: 'border-box' });
	});
});
