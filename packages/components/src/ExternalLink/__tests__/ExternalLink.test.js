import { render } from '@testing-library/react';
import React from 'react';

import { ExternalLink } from '../index';

describe('props', () => {
	test('should render correctly', () => {
		const { container } = render(
			<ExternalLink href="https://wordpress.org">WordPress</ExternalLink>,
		);
		expect(container.firstChild).toMatchSnapshot();
	});
});
