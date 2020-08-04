import { TabPanel as ReakitTabPanel } from '@wp-g2/a11y';
import { connect } from '@wp-g2/provider';
import React from 'react';

import { useTabsContext } from './Tabs.Context';
import * as styles from './Tabs.styles';
const { TabPanelView } = styles;

function TabPanel({ forwardedRef, ...props }) {
	const { tab } = useTabsContext();

	return (
		<ReakitTabPanel
			as={TabPanelView}
			ref={forwardedRef}
			{...tab}
			{...props}
		/>
	);
}

export default connect(TabPanel);
