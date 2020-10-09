import { contextConnect, useContextSystem } from '@wp-g2/context';
import { cx } from '@wp-g2/styles';
import React from 'react';

import { BaseButton } from '../BaseButton';
import * as styles from './Button.styles';

function Button(props, forwardedRef) {
	const {
		children,
		className,
		currentColor,
		icon,
		isControl = false,
		isSubtle = false,
		size = 'medium',
		variant = 'secondary',
		...otherProps
	} = useContextSystem(props, 'Button');

	const isIconOnly = !!icon && !children;

	const classes = cx(
		styles.Button,
		styles[variant],
		styles[size],
		isSubtle && styles.subtle,
		isControl && styles.control,
		isSubtle && isControl && styles.subtleControl,
		isIconOnly && styles.icon,
		currentColor && styles.currentColor,
		className,
	);

	return (
		<BaseButton
			className={classes}
			icon={icon}
			ref={forwardedRef}
			{...otherProps}
		>
			{children}
		</BaseButton>
	);
}

export default contextConnect(Button, 'Button');
