import { render } from '@testing-library/react';
import React from 'react';

import { Button } from '../../Button';
import { Tooltip } from '../index';

describe('props', () => {
	test('should render correctly', () => {
		const { container } = render(
			<Tooltip baseId="tooltip" content="Let It Go">
				<Button>Let It Go</Button>
			</Tooltip>,
		);
		expect(container.firstChild).toMatchSnapshot();
	});

	test('should render visible', () => {
		const { container } = render(
			<Tooltip baseId="tooltip" content="Let It Go" visible>
				<Button>Let It Go</Button>
			</Tooltip>,
		);
		expect(container.firstChild).toMatchSnapshot();
	});

	test('should render without children', () => {
		const { container } = render(
			<Tooltip baseId="tooltip" content="Let It Go" />,
		);
		expect(container.firstChild).toMatchSnapshot();
	});

	test('should render without animation', () => {
		const { container } = render(
			<Tooltip
				animated={false}
				baseId="tooltip"
				content="Let It Go"
				visible
			>
				<Button>Let It Go</Button>
			</Tooltip>,
		);
		expect(container.firstChild).toMatchSnapshot();
	});

	test('should render animatedDuration', () => {
		const { container } = render(
			<Tooltip
				animatedDuration={360}
				baseId="tooltip"
				content="Let It Go"
				visible
			>
				<Button>Let It Go</Button>
			</Tooltip>,
		);
		expect(container.firstChild).toMatchSnapshot();
	});

	test('should render without content', () => {
		const { container } = render(
			<Tooltip baseId="tooltip" visible>
				<Button>Let It Go</Button>
			</Tooltip>,
		);
		expect(container.firstChild).toMatchSnapshot();
	});

	test('should render gutter', () => {
		const { container } = render(
			<Tooltip baseId="tooltip" gutter={8} visible>
				<Button>Let It Go</Button>
			</Tooltip>,
		);
		expect(container.firstChild).toMatchSnapshot();
	});

	test('should render without modal', () => {
		const { container } = render(
			<Tooltip baseId="tooltip" modal={false} visible>
				<Button>Let It Go</Button>
			</Tooltip>,
		);
		expect(container.firstChild).toMatchSnapshot();
	});

	test('should render placement', () => {
		const { container } = render(
			<Tooltip baseId="tooltip" placement="bottom-start" visible>
				<Button>Let It Go</Button>
			</Tooltip>,
		);
		expect(container.firstChild).toMatchSnapshot();
	});
});
