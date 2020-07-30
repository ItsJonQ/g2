import { connect } from '@wp-g2/provider';
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
		<LabelView cx={[isBlock && styles.labelBlock]} data-active={isActive}>
			<Radio
				{...props}
				as={ButtonView}
				cx={[isActive && styles.buttonActive]}
				data-value={value}
				ref={forwardedRef}
				value={value}
			>
				<ButtonContentView>{label}</ButtonContentView>
				<LabelPlaceholderView aria-hidden>{label}</LabelPlaceholderView>
			</Radio>
			<SegmentedControlSeparator isActive={!showSeparator} />
		</LabelView>
	);
}

export default connect(SegmentedControlButton);
