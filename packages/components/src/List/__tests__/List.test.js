import { render } from '@testing-library/react';
import React from 'react';

import { List, ListItem } from '../index';

describe('props', () => {
	test('should render correctly', () => {
		const { container } = render(
			<List>
				<ListItem>Warm Hugs</ListItem>
			</List>,
		);
		expect(container.firstChild).toMatchSnapshot();
	});

	test('should render ordered list', () => {
		const { container } = render(
			<List type="ordered">
				<ListItem>Warm Hugs</ListItem>
			</List>,
		);
		expect(container.firstChild).toMatchSnapshot();
	});
});
