import { render } from '@testing-library/react';
import { FiDownload } from '@wp-g2/icons';
import React from 'react';

import { BlankSlate } from '../index';

describe('props', () => {
	test('should render correctly', () => {
		const { container } = render(
			<BlankSlate
				description="Input your twitter URL"
				icon={<FiDownload />}
				title="Twitter Embed"
			>
				<input type="text" />
			</BlankSlate>,
		);
		expect(container.firstChild).toMatchSnapshot();
	});

	test('should render correctly without description and icon', () => {
		const { container } = render(
			<BlankSlate title="Twitter Embed">
				<input type="text" />
			</BlankSlate>,
		);
		expect(container.firstChild).toMatchSnapshot();
	});
});
