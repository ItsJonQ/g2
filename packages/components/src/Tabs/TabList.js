import { __ } from '@wordpress/i18n';
import { contextConnect, useContextSystem } from '@wp-g2/context';
import { mergeRefs } from '@wp-g2/utils';
import React from 'react';
import { TabList as ReakitTabList } from 'reakit';

import TabIndicator from './TabIndicator';
import { useTabsContext } from './Tabs.Context';
import * as styles from './Tabs.styles';
const { TabListView } = styles;

function TabList(props, forwardedRef) {
	const { children, label = __('Tabs'), ...otherProps } = useContextSystem(
		props,
		'TabList',
	);
	const { listRef, resizeListener, tab } = useTabsContext();

	return (
		<ReakitTabList
			aria-label={label}
			as={TabListView}
			ref={mergeRefs([forwardedRef, listRef])}
			{...tab}
			{...otherProps}
		>
			{resizeListener}
			{children}
			<TabIndicator />
		</ReakitTabList>
	);
}

export default contextConnect(TabList, 'TabList');
