import { connect } from '@wp-g2/context';
import React from 'react';

import * as styles from './Switch.styles';
const { BackdropView } = styles;

function SwitchBackdrop({ checked = false, isFocused = false, ...props }) {
	const cx = [
		isFocused && styles.focus,
		checked && styles.backdropChecked,
		checked && isFocused && styles.checkedFocus,
	];

	return <BackdropView aria-hidden={true} {...props} cx={cx} />;
}

export default connect(SwitchBackdrop, 'SwitchBackdrop');
