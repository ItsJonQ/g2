import { connect } from '@wp-g2/context';
import React from 'react';

import { useControlGroupContext } from '../ControlGroup';
import { Flex } from '../Flex';
import * as styles from './BaseField.styles';

const { BaseFieldView } = styles;

function BaseField({
	isClickable = false,
	isFocused = false,
	isSubtle = false,
	...props
}) {
	const { styles: controlGroupStyles } = useControlGroupContext();
	const __css = [
		controlGroupStyles,
		isClickable && styles.clickable,
		isFocused && styles.focus,
		isSubtle && styles.subtle,
	];

	return <BaseFieldView as={Flex} {...props} cx={__css} />;
}

export default connect(BaseField, 'BaseField');
