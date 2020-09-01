import { render } from '@testing-library/react';
import React from 'react';

import { BaseView } from '../index';

describe('props', () => {
	test('should render correctly', () => {
		const { container } = render(
			<BaseView>
				<span>Some people are worth melting for.</span>
			</BaseView>,
		);
		expect(container.firstChild).toMatchSnapshot();
	});
});
