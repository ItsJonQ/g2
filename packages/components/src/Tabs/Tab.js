import { connect } from '@wp-g2/provider';
import React from 'react';
import { Tab as ReakitTab } from 'reakit/Tab';

import { useTabsContext } from './Tabs.Context';
import * as styles from './Tabs.styles';
const { TabView } = styles;

function Tab({ forwardedRef, ...props }) {
	const { tab } = useTabsContext();

	return <ReakitTab as={TabView} ref={forwardedRef} {...tab} {...props} />;
}

export default connect(Tab);
