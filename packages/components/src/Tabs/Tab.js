import { Tab as ReakitTab } from '@wp-g2/a11y';
import { contextConnect, useContextSystem } from '@wp-g2/context';
import { cx } from '@wp-g2/styles';
import React from 'react';

import { useTabsContext } from './Tabs.Context';
import * as styles from './Tabs.styles';
const { TabView } = styles;

function Tab(props, forwardedRef) {
	const { className, size, ...otherProps } = useContextSystem(props, 'Tab');
	const { tab } = useTabsContext();
	const classes = cx([styles[size], className]);

	return (
		<ReakitTab
			as={TabView}
			className={classes}
			ref={forwardedRef}
			{...tab}
			{...otherProps}
		/>
	);
}

export default contextConnect(Tab, 'Tab');
