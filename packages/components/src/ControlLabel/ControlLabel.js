import { contextConnect, useContextSystem } from '@wp-g2/context';
import React from 'react';

import { useFormGroupContext } from '../FormGroup';
import { Text } from '../Text';
import { View } from '../View';
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
	const __css = [styles.ControlLabel, styles[size]];

	return (
		<View cx={__css} {...otherProps} ref={forwardedRef}>
			<Text
				as="label"
				isBlock
				truncate={truncate}
				{...otherProps}
				htmlFor={htmlFor}
			>
				{children}
			</Text>
		</View>
	);
}

export default contextConnect(ControlLabel, 'ControlLabel');
