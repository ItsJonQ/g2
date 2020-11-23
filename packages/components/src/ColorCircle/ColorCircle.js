import { check } from '@wordpress/icons';
import { contextConnect, useContextSystem } from '@wp-g2/context';
import { cx, ui } from '@wp-g2/styles';
import { colorize, getOptimalTextColor } from '@wp-g2/utils';
import React from 'react';

import { Icon } from '../Icon';
import * as styles from './ColorCircle.styles';
const { CheckboxIconView, ColorCircleView } = styles;

function ColorCircle(props, forwardedRef) {
	const {
		color: colorProp,
		size = 'medium',
		isActive = false,
		isInteractive = false,
		variant = 'default',
		style = {},
		className,
		...otherProps
	} = useContextSystem(props, 'ColorCircle');

	const backgroundColor = colorize(colorProp).toRgbString();
	const classes = cx(
		styles[size],
		styles[variant],
		styles.expand,
		isActive && styles.active,
		isInteractive && styles.interactive,
		className,
	);

	const iconColor = getOptimalTextColor(backgroundColor);

	return (
		<ColorCircleView
			data-active={isActive}
			style={{ ...style, backgroundColor }}
			{...otherProps}
			className={classes}
			ref={forwardedRef}
		>
			<CheckboxIconView {...ui.$('CheckboxIcon')} aria-hidden>
				<Icon fill={iconColor} icon={check} size={12} />
			</CheckboxIconView>
		</ColorCircleView>
	);
}

export default contextConnect(ColorCircle, 'ColorCircle');
