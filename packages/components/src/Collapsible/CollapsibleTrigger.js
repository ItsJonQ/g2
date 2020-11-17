import { contextConnect, useContextSystem } from '@wp-g2/context';
import { cx } from '@wp-g2/styles';
import React from 'react';
import { Disclosure } from 'reakit';

import { useCollapsibleContext } from './Collapsible.Context';
import * as styles from './Collapsible.styles';

function CollapsibleTrigger(props, forwardedRef) {
	const { className, ...otherProps } = useContextSystem(
		props,
		'CollapsibleTrigger',
	);

	const { disclosure } = useCollapsibleContext();
	const classes = cx(styles.CollapsibleTrigger, className);

	return (
		<Disclosure
			{...otherProps}
			{...disclosure}
			className={classes}
			ref={forwardedRef}
		/>
	);
}

export default contextConnect(CollapsibleTrigger, 'CollapsibleTrigger');
