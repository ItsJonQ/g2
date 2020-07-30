import { connect } from '@wp-g2/provider';
import React from 'react';

import * as styles from './Switch.styles';
const { ToggleView } = styles;

function SwitchToggle({ checked = false, size = 'medium', ...props }) {
	const cx = [
		checked && styles.toggleChecked,
		size === 'large' && styles.toggleLarge,
		size === 'small' && styles.toggleSmall,
	];

	return <ToggleView aria-hidden={true} {...props} cx={cx} />;
}

export default connect(SwitchToggle);
