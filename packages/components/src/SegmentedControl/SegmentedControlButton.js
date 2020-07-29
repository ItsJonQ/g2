import { connect } from '@wp-g2/provider';
import React from 'react';
import { Radio } from 'reakit/Radio';

import * as styles from './SegmentedControl.styles';

const { Button, ButtonContent, Label, LabelPlaceholder, Separator } = styles;

function SegmentedControlSeparator({ isActive }) {
	const cx = [isActive && styles.separatorActive];

	return <Separator cx={cx} />;
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
		<Label cx={[isBlock && styles.labelBlock]} data-active={isActive}>
			<Radio
				{...props}
				as={Button}
				cx={[isActive && styles.buttonActive]}
				data-value={value}
				ref={forwardedRef}
				value={value}
			>
				<ButtonContent>{label}</ButtonContent>
				<LabelPlaceholder aria-hidden>{label}</LabelPlaceholder>
			</Radio>
			<SegmentedControlSeparator isActive={!showSeparator} />
		</Label>
	);
}

export default connect(SegmentedControlButton);
