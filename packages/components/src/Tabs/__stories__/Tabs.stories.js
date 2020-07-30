import React from 'react';

import { Tab, TabList, TabPanel, Tabs } from '../index';

export default {
	component: Tabs,
	title: 'Components/Tabs',
};

export const _default = () => {
	return (
		<Tabs>
			<TabList>
				<Tab>One</Tab>
				<Tab>Two</Tab>
				<Tab>Three</Tab>
			</TabList>
			<TabPanel>One</TabPanel>
			<TabPanel>Two</TabPanel>
			<TabPanel>Three</TabPanel>
		</Tabs>
	);
};
