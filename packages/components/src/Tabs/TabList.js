import { connect } from '@wp-g2/provider';
import { mergeRefs } from '@wp-g2/utils';
import React from 'react';
import { TabList as ReakitTabList } from 'reakit/Tab';

import TabIndicator from './TabIndicator';
import { useTabsContext } from './Tabs.Context';
import * as styles from './Tabs.styles';
const { TabListView } = styles;

function TabList({ children, forwardedRef, label = 'Tabs', ...props }) {
	const { listRef, resizeListener, tab } = useTabsContext();

	return (
		<ReakitTabList
			aria-label={label}
			as={TabListView}
			ref={mergeRefs([forwardedRef, listRef])}
			{...tab}
			{...props}
		>
			{resizeListener}
			{children}
			<TabIndicator />
		</ReakitTabList>
	);
}

export default connect(TabList);
