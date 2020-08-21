import { connect } from '@wp-g2/context';
import { FiChevronDown, FiChevronUp, FiMinus, FiPlus } from '@wp-g2/icons';
import { cx, ns } from '@wp-g2/styles';
import { noop } from '@wp-g2/utils';
import React from 'react';

import { Button } from '../Button';
import { ControlGroup } from '../ControlGroup';
import * as styles from './Stepper.styles';

function Stepper({
	className,
	direction = 'horizontal',
	onIncrement = noop,
	onDecrement = noop,
	size,
	...props
}) {
	const isVertical = direction === 'vertical';
	const controlGroupDirection = isVertical ? 'column' : 'row';

	const classes = cx([!isVertical && styles.Stepper, className]);

	const AddIcon = isVertical ? <FiChevronUp /> : <FiPlus />;
	const MinusIcon = isVertical ? <FiChevronDown /> : <FiMinus />;

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
					onClick={onIncrement}
					size={size}
				/>,
				<ControlButton
					icon={AddIcon}
					isVertical={isVertical}
					key="plus"
					onClick={onDecrement}
					size={size}
				/>,
		  ];

	return (
		<ControlGroup
			className={classes}
			direction={controlGroupDirection}
			isItemBlock
			{...props}
		>
			{buttons}
		</ControlGroup>
	);
}

function ControlButton({ isVertical, size, ...props }) {
	let buttonSize = isVertical ? 'half' : 'medium';

	if (size === 'large') {
		buttonSize = isVertical ? 'halfLarge' : 'large';
	}
	if (size === 'small') {
		buttonSize = isVertical ? 'halfSmall' : 'small';
	}

	return (
		<Button
			{...ns('StepperButton')}
			{...props}
			iconSize={14}
			isBlock
			isControl
			size={buttonSize}
		/>
	);
}

export default connect(Stepper, 'Stepper');
