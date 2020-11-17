import { chevronDown, chevronUp, minus, plus } from '@wordpress/icons';
import { contextConnect, useContextSystem } from '@wp-g2/context';
import { cx, ui } from '@wp-g2/styles';
import { noop } from '@wp-g2/utils';
import React from 'react';

import { Button } from '../Button';
import { ControlGroup } from '../ControlGroup';
import * as styles from './Stepper.styles';

function Stepper(props, forwardedRef) {
	const {
		className,
		direction = 'horizontal',
		onIncrement = noop,
		onDecrement = noop,
		size,
		...otherProps
	} = useContextSystem(props, 'Stepper');

	const isVertical = direction === 'vertical';
	const controlGroupDirection = isVertical ? 'column' : 'row';

	const classes = cx(!isVertical && styles.Stepper, className);

	const AddIcon = isVertical ? chevronUp : plus;
	const MinusIcon = isVertical ? chevronDown : minus;

	const buttons = isVertical
		? [
				<ControlButton
					icon={AddIcon}
					isVertical={isVertical}
					key="plus"
					onClick={onIncrement}
					size={size}
				/>,
				<ControlButton
					icon={MinusIcon}
					isVertical={isVertical}
					key="minus"
					onClick={onDecrement}
					size={size}
				/>,
		  ]
		: [
				<ControlButton
					icon={MinusIcon}
					isVertical={isVertical}
					key="minus"
					onClick={onDecrement}
					size={size}
				/>,
				<ControlButton
					icon={AddIcon}
					isVertical={isVertical}
					key="plus"
					onClick={onIncrement}
					size={size}
				/>,
		  ];

	return (
		<ControlGroup
			className={classes}
			direction={controlGroupDirection}
			isItemBlock
			{...otherProps}
			ref={forwardedRef}
		>
			{buttons}
		</ControlGroup>
	);
}

const ControlButton = React.memo(({ isVertical, size, ...props }) => {
	let buttonSize = isVertical ? 'half' : 'medium';

	if (size === 'large') {
		buttonSize = isVertical ? 'halfLarge' : 'large';
	}
	if (size === 'small') {
		buttonSize = isVertical ? 'halfSmall' : 'small';
	}

	return (
		<Button
			{...ui.$('StepperButton')}
			{...props}
			iconSize={14}
			isBlock
			isControl
			size={buttonSize}
		/>
	);
});

export default contextConnect(Stepper, 'Stepper');
