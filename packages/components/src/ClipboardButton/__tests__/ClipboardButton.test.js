import { render } from '@testing-library/react';
import React from 'react';

import { ClipboardButton } from '../index';

describe('props', () => {
	test('should render correctly', () => {
		const { container } = render(
			<ClipboardButton>I like warm hugs</ClipboardButton>,
		);
		expect(container.firstChild).toMatchSnapshot();
	});
});
