import { cx, ui } from '@wp-g2/styles';
import React from 'react';

import { View } from '../View';
import * as styles from './Switch.styles';

function SwitchBackdrop({ className, error, isFocused = false, ...props }) {
	const classes = cx(
		styles.Backdrop,
		isFocused && styles.focus,
		error && styles.backdropError,
		error && isFocused && styles.backdropErrorFocus,
		className,
	);

	return (
		<View
			aria-hidden={true}
			{...ui.$('SwitchBackdrop')}
			{...props}
			className={classes}
		/>
	);
}

export default React.memo(SwitchBackdrop);
