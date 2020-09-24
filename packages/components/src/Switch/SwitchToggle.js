import { connect } from '@wp-g2/context';
import React from 'react';

import * as styles from './Switch.styles';
const { ToggleView } = styles;

function SwitchToggle({ checked = false, size = 'medium', ...props }) {
	const __css = [
		checked && styles.toggleChecked,
		size === 'large' && styles.toggleLarge,
		size === 'small' && styles.toggleSmall,
	];

	return <ToggleView aria-hidden={true} {...props} cx={__css} />;
}

export default connect(SwitchToggle, 'SwitchToggle');
