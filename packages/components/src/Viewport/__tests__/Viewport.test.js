import { render } from '@testing-library/react';
import React from 'react';

import { View } from '../../View';
import {
	Viewport,
	ViewportDesktop,
	ViewportMobile,
	ViewportPhablet,
	ViewportPhabletOnly,
	ViewportTablet,
	ViewportTabletOnly,
} from '../index';

describe('props', () => {
	test('should render correctly', () => {
		const { container } = render(
			<Viewport>
				<View />
			</Viewport>,
		);
		expect(container.firstChild).toMatchSnapshot();
	});

	test('should render breakpoint', () => {
		const { container } = render(
			<Viewport breakpoint="sm">
				<View />
			</Viewport>,
		);
		expect(container.firstChild).toMatchSnapshot();
	});

	test('should render media', () => {
		const { container } = render(
			<Viewport media="(min-width: 320px)">
				<View />
			</Viewport>,
		);
		expect(container.firstChild).toMatchSnapshot();
	});

	test('should render ViewportMobile', () => {
		const { container } = render(
			<ViewportMobile>
				<View />
			</ViewportMobile>,
		);
		expect(container.firstChild).toMatchSnapshot();
	});

	test('should render ViewportPhablet', () => {
		const { container } = render(
			<ViewportPhablet>
				<View />
			</ViewportPhablet>,
		);
		expect(container.firstChild).toMatchSnapshot();
	});

	test('should render ViewportPhabletOnly', () => {
		const { container } = render(
			<ViewportPhabletOnly>
				<View />
			</ViewportPhabletOnly>,
		);
		expect(container.firstChild).toMatchSnapshot();
	});

	test('should render ViewportTablet', () => {
		const { container } = render(
			<ViewportTablet>
				<View />
			</ViewportTablet>,
		);
		expect(container.firstChild).toMatchSnapshot();
	});

	test('should render ViewportTabletOnly', () => {
		const { container } = render(
			<ViewportTabletOnly>
				<View />
			</ViewportTabletOnly>,
		);
		expect(container.firstChild).toMatchSnapshot();
	});

	test('should render ViewportDesktop', () => {
		const { container } = render(
			<ViewportDesktop>
				<View />
			</ViewportDesktop>,
		);
		expect(container.firstChild).toMatchSnapshot();
	});
});
