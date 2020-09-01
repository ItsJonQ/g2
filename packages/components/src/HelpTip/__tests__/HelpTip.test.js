import { render } from '@testing-library/react';
import React from 'react';

import { HelpTip } from '../index';

describe('props', () => {
	test('should render correctly', () => {
		const { container } = render(
			<HelpTip baseId="help-tip">Need some help!</HelpTip>,
		);
		expect(container.firstChild).toMatchSnapshot();
	});

	test('should render iconSize', () => {
		const { container } = render(
			<HelpTip baseId="help-tip" iconSize={13}>
				Need some help!
			</HelpTip>,
		);
		expect(container.firstChild).toMatchSnapshot();
	});
});
