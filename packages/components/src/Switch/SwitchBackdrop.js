import { cx, ui } from '@wp-g2/styles';
import React from 'react';

import { View } from '../View';
import * as styles from './Switch.styles';

function SwitchBackdrop({ error, isFocused = false, ...props }) {
	const __css = cx(
		styles.Backdrop,
		isFocused && styles.focus,
		error && styles.backdropError,
		error && isFocused && styles.backdropErrorFocus,
	);

	return (
		<View
			aria-hidden={true}
			{...ui.$('SwitchBackdrop')}
			{...props}
			cx={__css}
		/>
	);
}

export default React.memo(SwitchBackdrop);
