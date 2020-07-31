import { connect } from '@wp-g2/provider';
import React from 'react';

import { useControlGroupContext } from '../ControlGroup';
import * as styles from './BaseField.styles';

const { BaseFieldView } = styles;

function BaseField({ isFocused, ...props }) {
	const { styles: controlGroupStyles } = useControlGroupContext();
	console.log(controlGroupStyles);
	const cx = [controlGroupStyles, isFocused && styles.focus];

	return <BaseFieldView {...props} cx={cx} />;
}

export default connect(BaseField);
