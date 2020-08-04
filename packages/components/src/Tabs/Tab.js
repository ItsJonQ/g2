import { Tab as ReakitTab } from '@wp-g2/a11y';
import { connect } from '@wp-g2/provider';
import React from 'react';

import { useTabsContext } from './Tabs.Context';
import * as styles from './Tabs.styles';
const { TabView } = styles;

function Tab({ forwardedRef, ...props }) {
	const { tab } = useTabsContext();

	return <ReakitTab as={TabView} ref={forwardedRef} {...tab} {...props} />;
}

export default connect(Tab);
