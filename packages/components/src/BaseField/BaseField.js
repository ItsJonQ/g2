import { contextConnect, useContextSystem } from '@wp-g2/context';
import { cx } from '@wp-g2/styles';
import React from 'react';

import { useControlGroupContext } from '../ControlGroup';
import { useFlex } from '../Flex';
import { View } from '../View';
import * as styles from './BaseField.styles';

function BaseField(props, forwardedRef) {
	const {
		className,
		isClickable = false,
		isFocused = false,
		isSubtle = false,
		...otherProps
	} = useContextSystem(props, 'BaseField');

	const { styles: controlGroupStyles } = useControlGroupContext();

	const classes = cx([
		styles.BaseField,
		controlGroupStyles,
		isClickable && styles.clickable,
		isFocused && styles.focus,
		isSubtle && styles.subtle,
		className,
	]);

	const flexProps = useFlex({ className: classes, ...otherProps });

	return <View {...flexProps} ref={forwardedRef} />;
}

export default contextConnect(BaseField, 'BaseField');
