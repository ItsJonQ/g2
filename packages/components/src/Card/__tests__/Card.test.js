import { render } from '@testing-library/react';
import React from 'react';

import { Button } from '../../Button';
import { Card, CardBody, CardFooter, CardHeader } from '../index';

describe('props', () => {
	test('should render correctly', () => {
		const { container } = render(
			<Card>
				<CardHeader title="Olaf" />
				<CardBody>Some people are worth melting for.</CardBody>
				<CardFooter>
					<Button variant="primary">Agree</Button>
				</CardFooter>
			</Card>,
		);
		expect(container.firstChild).toMatchSnapshot();
	});

	test('should render elevation', () => {
		const { container } = render(<Card elevation={5} />);
		expect(container.firstChild).toMatchSnapshot();
	});
});
