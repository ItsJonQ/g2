import { render } from '@testing-library/react';
import React from 'react';

import { Panel, PanelBody, PanelHeader } from '../index';

describe('props', () => {
	test('should render correctly', () => {
		const { container } = render(
			<Panel id="panel">
				<PanelHeader title="Olaf" />
				<PanelBody>Some people are worth melting for.</PanelBody>
			</Panel>,
		);
		expect(container.firstChild).toMatchSnapshot();
	});

	test('should render seamless', () => {
		const { container } = render(
			<Panel id="panel" seamless>
				<PanelHeader title="Olaf" />
				<PanelBody>Some people are worth melting for.</PanelBody>
			</Panel>,
		);
		expect(container.firstChild).toMatchSnapshot();
	});

	test('should render visible', () => {
		const { container } = render(
			<Panel id="panel" visible>
				<PanelHeader title="Olaf" />
				<PanelBody>Some people are worth melting for.</PanelBody>
			</Panel>,
		);
		expect(container.firstChild).toMatchSnapshot();
	});
});
