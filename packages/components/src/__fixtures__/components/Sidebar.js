import { ComponentsProvider } from '@wp-g2/context';
import { ui } from '@wp-g2/styles';
import React from 'react';

import {
	ControlLabel,
	FormGroup,
	Panel,
	PanelBody,
	PanelHeader,
	Scrollable,
	Tab,
	TabList,
	TabPanel,
	Tabs,
	TextInput,
	View,
} from '../../index';

export const Sidebar = ({ children }) => {
	return (
		<ComponentsProvider
			value={{
				Grid: { gap: 2 },
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
					border-left: 1px solid ${ui.get('colorDivider')};
				`}
			>
				<Tabs selectedId="block">
					<TabList>
						<Tab id="document">Document</Tab>
						<Tab id="block">Block</Tab>
					</TabList>
					<TabPanel
						css={{
							height: `calc(100vh - (${ui.get(
								'controlHeightXLarge',
							)} + 1px))`,
						}}
					>
						<Scrollable css={{ paddingBottom: '20vh' }}>
							<Panel visible>
								<PanelHeader title="Status & Visibility" />
								<PanelBody>
									<FormGroup label="Visibility">
										<ControlLabel as="div">
											Public
										</ControlLabel>
									</FormGroup>
									<FormGroup label="Slug">
										<TextInput value="/my-blog-post" />
									</FormGroup>
								</PanelBody>
							</Panel>
							<Panel>
								<PanelHeader title="Excerpt" />
								<PanelBody>
									<ControlLabel>
										Write an excerpt (optional)
									</ControlLabel>
									<TextInput
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
							height: `calc(100vh - (${ui.get(
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
