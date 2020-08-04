import { TabList as ReakitTabList } from '@wp-g2/a11y';
import { connect } from '@wp-g2/context';
import { mergeRefs } from '@wp-g2/utils';
import React from 'react';

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
