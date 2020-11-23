import { contextConnect, useContextSystem } from '@wp-g2/context';
import { cx } from '@wp-g2/styles';
import React from 'react';

import { Button } from '../button';
import { ColorCircle } from '../ColorCircle';
import * as styles from './ColorControl.styles';

function ColorControl(props, forwardedRef) {
	const { children, className, color, ...otherProps } = useContextSystem(
		props,
		'ColorControl',
	);
	const classes = cx(styles.ColorControl, className);

	return (
		<Button
			className={classes}
			isBlock
			isControl
			isSubtle
			ref={forwardedRef}
			textAlign="left"
			variant="tertiary"
			{...otherProps}
			prefix={<ColorCircle color={color} size="small" />}
		>
			{children}
		</Button>
	);
}

export default contextConnect(ColorControl, 'ColorControl');
