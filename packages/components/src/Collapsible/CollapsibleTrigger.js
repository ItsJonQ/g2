import { connect } from '@wp-g2/provider';
import { cx } from '@wp-g2/styles';
import React from 'react';
import { Disclosure } from 'reakit/Disclosure';

import { useCollapsibleContext } from './Collapsible.Context';
import * as styles from './Collapsible.styles';

function CollapsibleTrigger({ className, forwardedRef, ...props }) {
	const { disclosure } = useCollapsibleContext();
	const classes = cx([styles.CollapsibleTrigger, className]);

	return (
		<Disclosure
			ref={forwardedRef}
			{...props}
			{...disclosure}
			className={classes}
		/>
	);
}

export default connect(CollapsibleTrigger);
