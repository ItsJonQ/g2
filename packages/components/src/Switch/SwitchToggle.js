import { cx, ui } from '@wp-g2/styles';
import React from 'react';

import { View } from '../View';
import * as styles from './Switch.styles';

function SwitchToggle({ className, size = 'medium', ...props }) {
	const classes = cx(
		styles.Toggle,
		size === 'large' && styles.toggleLarge,
		size === 'small' && styles.toggleSmall,
		className,
	);

	return (
		<View
			aria-hidden={true}
			{...ui.$('SwitchToggle')}
			{...props}
			className={classes}
		/>
	);
}

export default React.memo(SwitchToggle);
