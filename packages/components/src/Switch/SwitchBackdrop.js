import { cx, ui } from '@wp-g2/styles';
import React from 'react';

import { View } from '../View';
import * as styles from './Switch.styles';

function SwitchBackdrop({ isFocused = false, ...props }) {
	const __css = cx(styles.Backdrop, isFocused && styles.focus);

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
