import { ContextSystemProvider } from '@wp-g2/context';
import { ThemeProvider, ui } from '@wp-g2/styles';
import { useLocalState } from '@wp-g2/utils';
import React from 'react';

import {
	Card,
	CardBody,
	ControlLabel,
	FormGroup,
	Panel,
	PanelBody,
	PanelHeader,
	Scrollable,
	Surface,
	Switch,
	Tab,
	TabList,
	TabPanel,
	Tabs,
	TextInput,
	View,
} from '../../index';

export const Sidebar = ({ children }) => {
	const [darkenedSidebar, setDarkenedSidebar] = useLocalState(
		'G2/Components/Sidebar/DarkenedSidebar',
		false,
	);
	const [outlinedControls, setOutlinedControls] = useLocalState(
		'G2/Components/Sidebar/outlinedControls',
		false,
	);
	const [darkMode, setDarkMode] = useLocalState(
		'G2/Components/Sidebar/darkMode',
		false,
	);

	const theme = {
		controlBackgroundColor: outlinedControls && ui.get('surfaceColor'),
		controlBorderColor: outlinedControls && ui.get('surfaceBorderColor'),
		controlSurfaceBoxShadow: outlinedControls ? 'none' : null,
	};

	return (
		<ContextSystemProvider
			value={{
				Grid: { gap: 2 },
				Icon: { size: 16 },
			}}
		>
			<View
				css={[
					ui.position.fixed,
					{ top: 8, left: 8 },
					ui.frame.width(240),
				]}
			>
				<Card>
					<CardBody>
						<FormGroup
							label="Darkend Sidebar"
							templateColumns="1fr 1fr"
						>
							<Switch
								checked={darkenedSidebar}
								onChange={setDarkenedSidebar}
							/>
						</FormGroup>
						<FormGroup
							label="Outlined Controls"
							templateColumns="1fr 1fr"
						>
							<Switch
								checked={outlinedControls}
								onChange={setOutlinedControls}
							/>
						</FormGroup>
						<FormGroup label="Dark Mode" templateColumns="1fr 1fr">
							<Switch checked={darkMode} onChange={setDarkMode} />
						</FormGroup>
					</CardBody>
				</Card>
			</View>
			<ThemeProvider isDark={darkMode} theme={theme}>
				<Surface
					css={`
						width: 280px;
						position: absolute;
						height: 100vh;
						top: 0;
						right: 0;
						border-left: 1px solid ${ui.get('colorDivider')};
					`}
					variant={darkenedSidebar ? 'secondary' : 'tertiary'}
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
				</Surface>
			</ThemeProvider>
		</ContextSystemProvider>
	);
};
