import { render } from '@testing-library/react';
import React from 'react';

import { Button } from '../../Button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../index';

describe('props', () => {
	test('should render correctly', () => {
		const { container } = render(
			<Collapsible baseId="collapsible">
				<CollapsibleTrigger as={Button}>Show/Hide</CollapsibleTrigger>
				<CollapsibleContent>
					Some people are worth melting for.
				</CollapsibleContent>
			</Collapsible>,
		);
		expect(container.firstChild).toMatchSnapshot();
	});

	test('should render visible', () => {
		const { container } = render(
			<Collapsible baseId="collapsible" visible>
				<CollapsibleTrigger as={Button}>Show/Hide</CollapsibleTrigger>
				<CollapsibleContent>
					Some people are worth melting for.
				</CollapsibleContent>
			</Collapsible>,
		);
		expect(container.firstChild).toMatchSnapshot();
	});
});
