import React from 'react';
import { Radio } from 'reakit/Radio';

import * as styles from './SegmentedControl.styles';

const { Button, ButtonContent, Label, LabelPlaceholder } = styles;

// function SegmentedControlSeparator({ isActive }) {
// 	const cx = [styles.Separator, isActive && styles.separatorActive];

// 	return <BaseView className="sep" cx={cx} />;
// }

function SegmentedControlButton({ isFirst, label, value, ...props }) {
	const isActive = props.state === value;

	return (
		<Label cx={styles.Label} data-active={isActive}>
			<Radio
				{...props}
				as={Button}
				cx={[isActive && styles.buttonActive]}
				data-value={value}
				value={value}
			>
				<ButtonContent>{label}</ButtonContent>
				<LabelPlaceholder aria-hidden>{label}</LabelPlaceholder>
			</Radio>
		</Label>
	);
}

export default SegmentedControlButton;
