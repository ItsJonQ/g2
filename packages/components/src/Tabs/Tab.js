import { connect } from '@wp-g2/provider';
import React from 'react';
import { Tab as ReakitTab } from 'reakit/Tab';

import * as styles from './Tabs.styles';
import { useTabsContext } from './Tabs.utils';
const { TabView } = styles;

function Tab({ forwardedRef, ...props }) {
	const { tab } = useTabsContext();

	return <ReakitTab as={TabView} ref={forwardedRef} {...tab} {...props} />;
}

export default connect(Tab);
