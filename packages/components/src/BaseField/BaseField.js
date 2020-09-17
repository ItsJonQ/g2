import { connect } from '@wp-g2/context';
import React from 'react';

import { useControlGroupContext } from '../ControlGroup';
import * as styles from './BaseField.styles';

const { BaseFieldView } = styles;

function BaseField({ isClickable, isFocused, isSubtle, ...props }) {
	const { styles: controlGroupStyles } = useControlGroupContext();
	const cx = [
		controlGroupStyles,
		isClickable && styles.clickable,
		isFocused && styles.focus,
		isSubtle && styles.subtle,
	];

	return <BaseFieldView {...props} cx={cx} />;
}

export default connect(BaseField, 'BaseField');
