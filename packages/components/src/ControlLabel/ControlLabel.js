import { connect } from '@wp-g2/context';
import React from 'react';

import { useFormGroupContext } from '../FormGroup';
import { Text } from '../Text';
import * as styles from './ControlLabel.styles';

const { ControlLabelView } = styles;

function ControlLabel({
	children,
	htmlFor: htmlForProp,
	size = 'medium',
	truncate = true,
	...props
}) {
	const { id: contextId } = useFormGroupContext();
	const htmlFor = htmlForProp || contextId;
	const cx = [styles[size]];

	return (
		<ControlLabelView cx={cx} {...props}>
			<Text
				as="label"
				isBlock
				truncate={truncate}
				{...props}
				htmlFor={htmlFor}
			>
				{children}
			</Text>
		</ControlLabelView>
	);
}

export default connect(ControlLabel, 'ControlLabel');
