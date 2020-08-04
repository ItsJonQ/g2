import { MenuItem as ReakitMenuItem } from '@wp-g2/a11y';
import { connect } from '@wp-g2/context';
import { cx } from '@wp-g2/styles';
import React from 'react';

import { useMenuContext } from './Menu.Context';
import * as styles from './Menu.styles';

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
