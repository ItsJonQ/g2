import { render } from '@testing-library/react';
import React from 'react';

import { Button } from '../../button';
import { ButtonGroup } from '../index';

describe('props', () => {
	test('should render correctly', () => {
		const { container } = render(
			<ButtonGroup baseId="ButtonGroup">
				<Button value="olaf">Olaf</Button>
				<Button value="elsa">Elsa</Button>
				<Button value="ana">Ana</Button>
			</ButtonGroup>,
		);
		expect(container.firstChild).toMatchSnapshot();
	});
});
