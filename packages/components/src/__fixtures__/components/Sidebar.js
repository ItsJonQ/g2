import { ComponentsProvider } from '@wp-g2/provider';
import { get } from '@wp-g2/styles';
import React from 'react';

import {
	ControlLabel,
	Panel,
	PanelBody,
	PanelHeader,
	Scrollable,
	Tab,
	TabList,
	TabPanel,
	Tabs,
	TextField,
	View,
} from '../../index';
import { ControlGroup } from './ControlGroup';

export const Sidebar = ({ children }) => {
	return (
		<ComponentsProvider
			value={{
				Grid: { gap: 8 },
				Icon: { size: 16 },
			}}
		>
			<View
				css={`
					width: 280px;
					position: absolute;
					height: 100vh;
					top: 0;
					right: 0;
					border-left: 1px solid ${get('colorDivider')};
				`}
			>
				<Tabs selectedId="block">
					<TabList>
						<Tab id="document">Document</Tab>
						<Tab id="block">Block</Tab>
					</TabList>
					<TabPanel
						css={{
							height: `calc(100vh - (${get(
								'controlHeightXLarge',
							)} + 1px))`,
						}}
					>
						<Scrollable css={{ paddingBottom: '20vh' }}>
							<Panel visible>
								<PanelHeader title="Status & Visibility" />
								<PanelBody>
									<ControlGroup>
										<ControlLabel>Visibility</ControlLabel>
										<ControlLabel>Public</ControlLabel>
									</ControlGroup>
									<ControlGroup>
										<ControlLabel>Slug</ControlLabel>
										<TextField value="/my-blog-post" />
									</ControlGroup>
								</PanelBody>
							</Panel>
							<Panel>
								<PanelHeader title="Excerpt" />
								<PanelBody>
									<ControlLabel>
										Write an excerpt (optional)
									</ControlLabel>
									<TextField
										maxRows={6}
										minRows={3}
										multiline
									/>
								</PanelBody>
							</Panel>
							<Panel>
								<PanelHeader title="Discussion" />
								<PanelBody>TBD</PanelBody>
							</Panel>
						</Scrollable>
					</TabPanel>
					<TabPanel
						css={{
							height: `calc(100vh - (${get(
								'controlHeightXLarge',
							)} + 1px))`,
						}}
					>
						<Scrollable css={{ paddingBottom: '20vh' }}>
							{children}
						</Scrollable>
					</TabPanel>
				</Tabs>
			</View>
		</ComponentsProvider>
	);
};
