import { render } from '@testing-library/react';
import React from 'react';

import { Button } from '../../button';
import { Select } from '../../Select';
import { TextInput } from '../../TextInput';
import { ControlGroup } from '../index';

describe('props', () => {
	test('should render correctly', () => {
		const { container } = render(
			<ControlGroup>
				<Button>Let It</Button>
				<Button>Go</Button>
			</ControlGroup>,
		);
		expect(container.firstChild).toMatchSnapshot();
	});

	test('should render mixed control types', () => {
		const { container } = render(
			<ControlGroup>
				<Select id="salutations" />
				<TextInput id="fname" />
				<Button>Let It</Button>
			</ControlGroup>,
		);
		expect(container.firstChild).toMatchSnapshot();
	});
});
