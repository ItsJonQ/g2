import { connect } from '@wp-g2/context';
import { cx } from '@wp-g2/styles';
import React from 'react';

import { Collapsible } from '../Collapsible';
import { PanelContext } from './Panel.Context';
import * as styles from './Panel.styles';

function Panel({ animated = true, className, isSeamless = false, ...props }) {
	const classes = cx([styles.Panel, className]);

	return (
		<PanelContext.Provider value={{ isSeamless }}>
			<Collapsible {...props} animated={animated} className={classes} />
		</PanelContext.Provider>
	);
}

export default connect(Panel);
