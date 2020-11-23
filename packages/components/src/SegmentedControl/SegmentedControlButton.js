import { cx, ui } from '@wp-g2/styles';
import React from 'react';
import { Radio } from 'reakit';

import * as styles from './SegmentedControl.styles';

const {
	ButtonContentView,
	ButtonView,
	LabelPlaceholderView,
	LabelView,
	SeparatorView,
} = styles;

function SegmentedControlButton({
	className,
	forwardedRef,
	isBlock = false,
	label,
	showSeparator,
	value,
	...props
}) {
	const isActive = props.state === value;

	const labelViewClasses = cx(isBlock && styles.labelBlock);
	const classes = cx(isActive && styles.buttonActive, className);

	return (
		<LabelView
			className={labelViewClasses}
			data-active={isActive}
			{...ui.$('SegmentedControlButtonLabel')}
		>
			<Radio
				{...props}
				as={ButtonView}
				className={classes}
				data-value={value}
				ref={forwardedRef}
				value={value}
			>
				<ButtonContentView {...ui.$('SegmentedControlButtonContent')}>
					{label}
				</ButtonContentView>
				<LabelPlaceholderView
					aria-hidden
					{...ui.$('SegmentedControlButtonContentPlaceholder')}
				>
					{label}
				</LabelPlaceholderView>
			</Radio>
			<SegmentedControlSeparator isActive={!showSeparator} />
		</LabelView>
	);
}

const SegmentedControlSeparator = React.memo(({ isActive }) => {
	const classes = cx(isActive && styles.separatorActive);

	return (
		<SeparatorView
			aria-hidden
			className={classes}
			{...ui.$('SegmentedControlButtonSeparator')}
		/>
	);
});

export default React.memo(SegmentedControlButton);
