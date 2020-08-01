import { connect } from '@wp-g2/provider';
import { ns } from '@wp-g2/styles';
import React from 'react';
import { Radio } from 'reakit/Radio';

import * as styles from './SegmentedControl.styles';

const {
	ButtonContentView,
	ButtonView,
	LabelPlaceholderView,
	LabelView,
	SeparatorView,
} = styles;

function SegmentedControlSeparator({ isActive }) {
	const cx = [isActive && styles.separatorActive];

	return <SeparatorView cx={cx} />;
}

function SegmentedControlButton({
	forwardedRef,
	isBlock = false,
	label,
	showSeparator,
	value,
	...props
}) {
	const isActive = props.state === value;

	return (
		<LabelView
			cx={[isBlock && styles.labelBlock]}
			data-active={isActive}
			{...ns('SegmentedControlButtonLabel')}
		>
			<Radio
				{...props}
				as={ButtonView}
				cx={[isActive && styles.buttonActive]}
				data-value={value}
				ref={forwardedRef}
				value={value}
			>
				<ButtonContentView {...ns('SegmentedControlButtonContent')}>
					{label}
				</ButtonContentView>
				<LabelPlaceholderView
					aria-hidden
					{...ns('SegmentedControlButtonContentPlaceholder')}
				>
					{label}
				</LabelPlaceholderView>
			</Radio>
			<SegmentedControlSeparator
				isActive={!showSeparator}
				{...ns('SegmentedControlButtonSeparator')}
			/>
		</LabelView>
	);
}

export default connect(SegmentedControlButton);
