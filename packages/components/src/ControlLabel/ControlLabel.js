import { contextConnect, useContextSystem } from '@wp-g2/context';
import { cx } from '@wp-g2/styles';
import React from 'react';

import { useFormGroupContext } from '../FormGroup';
import { Text } from '../Text';
import * as styles from './ControlLabel.styles';

function ControlLabel(props, forwardedRef) {
	const {
		children,
		htmlFor: htmlForProp,
		size = 'medium',
		truncate = true,
		...otherProps
	} = useContextSystem(props, 'ControlLabel');

	const { id: contextId } = useFormGroupContext();
	const htmlFor = htmlForProp || contextId;
	const __css = cx([styles.ControlLabel, styles[size]]);

	return (
		<Text
			as="label"
			cx={__css}
			isBlock
			truncate={truncate}
			{...otherProps}
			ref={forwardedRef}
			{...otherProps}
			htmlFor={htmlFor}
		>
			{children}
		</Text>
	);
}

export default contextConnect(ControlLabel, 'ControlLabel');
