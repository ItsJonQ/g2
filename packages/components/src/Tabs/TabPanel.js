import { contextConnect, useContextSystem } from '@wp-g2/context';
import React from 'react';
import { TabPanel as ReakitTabPanel } from 'reakit';

import { useTabsContext } from './Tabs.Context';
import * as styles from './Tabs.styles';
const { TabPanelView } = styles;

function TabPanel(props, forwardedRef) {
	const { ...otherProps } = useContextSystem(props, 'TabPanel');
	const { tab } = useTabsContext();

	return (
		<ReakitTabPanel
			as={TabPanelView}
			ref={forwardedRef}
			{...tab}
			{...otherProps}
		/>
	);
}

export default contextConnect(TabPanel, 'TabPanel');
