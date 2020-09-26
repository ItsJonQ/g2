import { cx, ui } from '@wp-g2/styles';
import React from 'react';

import { View } from '../View';
import * as styles from './Switch.styles';

function SwitchToggle({ checked = false, size = 'medium', ...props }) {
	const __css = cx([
		styles.Toggle,
		checked && styles.toggleChecked,
		size === 'large' && styles.toggleLarge,
		size === 'small' && styles.toggleSmall,
	]);

	return (
		<View
			aria-hidden={true}
			{...ui.$('SwitchToggle')}
			{...props}
			cx={__css}
		/>
	);
}

export default SwitchToggle;
