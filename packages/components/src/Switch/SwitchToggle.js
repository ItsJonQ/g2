import React from 'react';

import { View } from '../View';
import * as styles from './Switch.styles';

function SwitchToggle({ checked = false, size = 'medium', ...props }) {
	const __css = [
		styles.Toggle,
		checked && styles.toggleChecked,
		size === 'large' && styles.toggleLarge,
		size === 'small' && styles.toggleSmall,
	];

	return <View aria-hidden={true} {...props} cx={__css} />;
}

export default SwitchToggle;
