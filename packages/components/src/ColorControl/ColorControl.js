import { connect } from '@wp-g2/context';
import { cx } from '@wp-g2/styles';
import React from 'react';

import { Button } from '../Button';
import { ColorCircle } from '../ColorCircle';
import * as styles from './ColorControl.styles';

function ColorControl({ children, className, color, ...props }) {
	const classes = cx([styles.ColorControl, className]);

	return (
		<Button
			className={classes}
			isBlock
			isSubtle
			textAlign="left"
			variant="tertiary"
			{...props}
			prefix={<ColorCircle color={color} />}
		>
			{children}
		</Button>
	);
}

export default connect(ColorControl, 'ColorControl');
