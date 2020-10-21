import { contextConnect, useContextSystem } from '@wp-g2/context';
import { cx } from '@wp-g2/styles';
import { colorize } from '@wp-g2/utils';
import React from 'react';

import * as styles from './ColorCircle.styles';
const { ColorCircleView } = styles;

function ColorCircle(props, forwardedRef) {
	const {
		color: colorProp,
		size = 'medium',
		isActive = false,
		isInteractive = false,
		variant = 'default',
		style = {},
		...otherProps
	} = useContextSystem(props, 'ColorCircle');

	const backgroundColor = colorize(colorProp).toRgbString();
	const __css = cx(
		styles[size],
		styles[variant],
		styles.expand,
		isActive && styles.active,
		isInteractive && styles.interactive,
	);

	return (
		<ColorCircleView
			style={{ ...style, backgroundColor }}
			{...otherProps}
			cx={__css}
			ref={forwardedRef}
		/>
	);
}

export default contextConnect(ColorCircle, 'ColorCircle');
