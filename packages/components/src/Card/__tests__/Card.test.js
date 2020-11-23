import { render } from '@testing-library/react';
import React from 'react';

import { Button } from '../../button';
import {
	Card,
	CardBody,
	CardFooter,
	CardHeader,
	CardInnerBody,
} from '../index';

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
		const { container } = render(<Card elevation />);
		expect(container.firstChild).toMatchSnapshot();
	});

	test('should render no elevation', () => {
		const { container } = render(<Card elevation={false} />);
		expect(container.firstChild).toMatchSnapshot();
	});

	test('should render CardInnerBody', () => {
		const { container } = render(
			<Card>
				<CardHeader title="Olaf" />
				<CardInnerBody>
					Some people are worth melting for.
				</CardInnerBody>
				<CardFooter>
					<Button variant="primary">Agree</Button>
				</CardFooter>
			</Card>,
		);
		expect(container.firstChild).toMatchSnapshot();
	});
});
