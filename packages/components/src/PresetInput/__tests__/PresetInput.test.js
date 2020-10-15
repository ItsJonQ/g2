import { render } from '@testing-library/react';
import React from 'react';

import { PresetInput } from '../index';

describe('props', () => {
	test('should render correctly', () => {
		const { container } = render(<PresetInput />);
		expect(container.firstChild).toMatchSnapshot();
	});
});
