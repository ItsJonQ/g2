import {
	connectAndForwardRefComponent,
	useContextSystem,
} from '@wp-g2/context';
import React from 'react';

import { useFormGroupContext } from '../FormGroup';
import { Text } from '../Text';
import { View } from '../View';
import * as styles from './ControlLabel.styles';

function ControlLabel(componentProps, forwardedRef) {
	const {
		children,
		htmlFor: htmlForProp,
		size = 'medium',
		truncate = true,
		...props
	} = useContextSystem(componentProps, 'ControlLabel');

	const { id: contextId } = useFormGroupContext();
	const htmlFor = htmlForProp || contextId;
	const __css = [styles.ControlLabel, styles[size]];

	return (
		<View cx={__css} {...props} ref={forwardedRef}>
			<Text
				as="label"
				isBlock
				truncate={truncate}
				{...props}
				htmlFor={htmlFor}
			>
				{children}
			</Text>
		</View>
	);
}

export default connectAndForwardRefComponent(ControlLabel, 'ControlLabel');
