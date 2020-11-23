import { render } from '@testing-library/react';
import React from 'react';

import { Button } from '../../button';
import { CardBody } from '../../Card';
import { Popover } from '../index';

describe('props', () => {
	test('should render correctly', () => {
		const { container } = render(
			<Popover baseId="popover" trigger={<Button>Show Yourself</Button>}>
				<CardBody>Into the Unknown</CardBody>
			</Popover>,
		);
		expect(container.firstChild).toMatchSnapshot();
	});

	test('should render visible', () => {
		const { container } = render(
			<Popover
				baseId="popover"
				trigger={<Button>Show Yourself</Button>}
				visible
			>
				<CardBody>Into the Unknown</CardBody>
			</Popover>,
		);
		expect(container.firstChild).toMatchSnapshot();
	});

	test('should render without trigger', () => {
		const { container } = render(
			<Popover baseId="popover" visible>
				<CardBody>Into the Unknown</CardBody>
			</Popover>,
		);
		expect(container.firstChild).toMatchSnapshot();
	});

	test('should render without content', () => {
		const { container } = render(
			<Popover
				baseId="popover"
				trigger={<Button>Show Yourself</Button>}
				visible
			/>,
		);
		expect(container.firstChild).toMatchSnapshot();
	});

	test('should render without animation', () => {
		const { container } = render(
			<Popover
				animated={false}
				baseId="popover"
				trigger={<Button>Show Yourself</Button>}
				visible
			>
				<CardBody>Into the Unknown</CardBody>
			</Popover>,
		);
		expect(container.firstChild).toMatchSnapshot();
	});

	test('should render gutter', () => {
		const { container } = render(
			<Popover
				baseId="popover"
				gutter={8}
				trigger={<Button>Show Yourself</Button>}
				visible
			>
				<CardBody>Into the Unknown</CardBody>
			</Popover>,
		);
		expect(container.firstChild).toMatchSnapshot();
	});

	test('should render label', () => {
		const { container } = render(
			<Popover
				baseId="popover"
				gutter={8}
				label="show"
				trigger={<Button>Show Yourself</Button>}
				visible
			>
				<CardBody>Into the Unknown</CardBody>
			</Popover>,
		);
		expect(container.firstChild).toMatchSnapshot();
	});

	test('should render without modal', () => {
		const { container } = render(
			<Popover
				baseId="popover"
				modal={false}
				trigger={<Button>Show Yourself</Button>}
				visible
			>
				<CardBody>Into the Unknown</CardBody>
			</Popover>,
		);
		expect(container.firstChild).toMatchSnapshot();
	});

	test('should render maxWidth', () => {
		const { container } = render(
			<Popover
				baseId="popover"
				maxWidth={321}
				trigger={<Button>Show Yourself</Button>}
				visible
			>
				<CardBody>Into the Unknown</CardBody>
			</Popover>,
		);
		expect(container.firstChild).toMatchSnapshot();
	});

	test('should render placement', () => {
		const { container } = render(
			<Popover
				animated={false}
				baseId="popover"
				gutter={8}
				placement="bottom-start"
				trigger={<Button>Show Yourself</Button>}
				visible
			>
				<CardBody>Into the Unknown</CardBody>
			</Popover>,
		);
		expect(container.firstChild).toMatchSnapshot();
	});
});
