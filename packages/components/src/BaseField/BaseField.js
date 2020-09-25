import {
	connectAndForwardRefComponent,
	useContextSystem,
} from '@wp-g2/context';
import React from 'react';

import { useControlGroupContext } from '../ControlGroup';
import { Flex } from '../Flex';
import * as styles from './BaseField.styles';

function BaseField(props, forwardedRef) {
	const {
		isClickable = false,
		isFocused = false,
		isSubtle = false,
		...otherProps
	} = useContextSystem(props, 'BaseField');

	const { styles: controlGroupStyles } = useControlGroupContext();

	const __css = [
		styles.BaseField,
		controlGroupStyles,
		isClickable && styles.clickable,
		isFocused && styles.focus,
		isSubtle && styles.subtle,
	];

	return <Flex {...otherProps} cx={__css} ref={forwardedRef} />;
}

export default connectAndForwardRefComponent(BaseField, 'BaseField');
