import { connect } from '@wp-g2/provider';
import { cx } from '@wp-g2/styles';
import React from 'react';
import { MenuItem as ReakitMenuItem } from 'reakit/Menu';

import * as styles from './Menu.styles';
import { useMenuContext } from './Menu.utils';

function MenuItem({ className, forwardedRef, ...props }) {
	const { menu } = useMenuContext();
	const classes = cx([styles.MenuItem, className]);

	return (
		<ReakitMenuItem
			{...props}
			{...menu}
			className={classes}
			ref={forwardedRef}
		/>
	);
}

export default connect(MenuItem);
