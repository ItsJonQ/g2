import { connect } from '@wp-g2/context';
import { cx, noop, ns } from '@wp-g2/styles';
import React from 'react';
import { FiChevronDown, FiChevronUp, FiMinus, FiPlus } from 'react-icons/fi';

import { Button } from '../Button';
import { ControlGroup } from '../ControlGroup';
import * as styles from './IncrementalControl.styles';

function IncrementalControl({
	className,
	direction = 'vertical',
	onIncrement = noop,
	onDecrement = noop,
	size,
	...props
}) {
	const isVertical = direction === 'vertical';
	const controlGroupDirection = isVertical ? 'column' : 'row';

	const classes = cx([!isVertical && styles.IncrementalControl, className]);

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
			{...ns('IncrementalControlButton')}
			{...props}
			iconSize={14}
			isBlock
			isControl
			size={buttonSize}
		/>
	);
}

export default connect(IncrementalControl);
