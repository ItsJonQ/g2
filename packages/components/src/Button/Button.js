import { contextConnect, useContextSystem } from '@wp-g2/context';
import { cx } from '@wp-g2/styles';
import { noop } from '@wp-g2/utils';
import React from 'react';

import { BaseButton } from '../base-button';
import { useButtonGroupContext } from '../ButtonGroup';
import * as styles from './button-styles';

function Button(props, forwardedRef) {
	const {
		children,
		className,
		currentColor,
		icon,
		isActive: isActiveProp = false,
		isControl = false,
		isSubtle = false,
		onClick = noop,
		size = 'medium',
		variant = 'secondary',
		...otherProps
	} = useContextSystem(props, 'Button');

	const { buttonGroup, enableSelectNone } = useButtonGroupContext();
	const isWithinButtonGroup = !!buttonGroup;
	const isButtonGroupActive =
		isWithinButtonGroup && buttonGroup?.state === otherProps.value;

	const isActive = isActiveProp || isButtonGroupActive;
	const isIconOnly = !!icon && !children;

	const handleOnClickWithinButtonGroup = React.useCallback(
		(event) => {
			if (
				isWithinButtonGroup &&
				enableSelectNone &&
				isButtonGroupActive
			) {
				event.preventDefault();
				event.stopPropagation();
				buttonGroup.setState(null);
			}
		},
		[
			buttonGroup,
			enableSelectNone,
			isButtonGroupActive,
			isWithinButtonGroup,
		],
	);

	const handleOnClick = React.useCallback(
		(event) => {
			onClick(event);
			handleOnClickWithinButtonGroup(event);
		},
		[handleOnClickWithinButtonGroup, onClick],
	);

	const classes = cx(
		styles.Button,
		styles[variant],
		styles[size],
		isControl && styles.control,
		isSubtle && styles.subtle,
		isSubtle && isControl && styles.subtleControl,
		isButtonGroupActive && styles.subtleControlActive,
		isIconOnly && styles.icon,
		currentColor && styles.currentColor,
		className,
	);

	return (
		<BaseButton
			className={classes}
			icon={icon}
			isActive={isActive}
			onClick={handleOnClick}
			ref={forwardedRef}
			{...otherProps}
		>
			{children}
		</BaseButton>
	);
}

export default contextConnect(Button, 'Button');
