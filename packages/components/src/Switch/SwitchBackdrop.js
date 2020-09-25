import React from 'react';

import { View } from '../View';
import * as styles from './Switch.styles';

function SwitchBackdrop({ checked = false, isFocused = false, ...props }) {
	const __css = [
		styles.Backdrop,
		isFocused && styles.focus,
		checked && styles.backdropChecked,
		checked && isFocused && styles.checkedFocus,
	];

	return <View aria-hidden={true} {...props} cx={__css} />;
}

export default SwitchBackdrop;
