import { connect } from '@wp-g2/provider';
import { noop, useControlledState, useUniqueId } from '@wp-g2/utils';
import React, { useState } from 'react';
import { Checkbox } from 'reakit/Checkbox';
import { Radio } from 'reakit/Radio';
import { VisuallyHidden } from 'reakit/VisuallyHidden';

import * as styles from './Switch.styles';
import Backdrop from './SwitchBackdrop';
import Toggle from './SwitchToggle';

const { SwitchView } = styles;

const ControlComponent = {
	checkbox: Checkbox,
	radio: Radio,
};

function Switch({
	checked: checkedProp,
	className,
	disabled,
	forwardedRef,
	onBlur = noop,
	onChange = noop,
	onFocus = noop,
	label,
	size = 'medium',
	type = 'checkbox',
	...props
}) {
	const [isFocused, setIsFocused] = useState(false);
	const [checked, setChecked] = useControlledState(checkedProp, {
		initial: false,
	});
	const id = useUniqueId(Switch, 'switch', props.id);
	const Control = ControlComponent[type] || Checkbox;

	const cx = [styles[size]];

	const toggle = (changeProps) => {
		setChecked(!checked);
		onChange(!checked, changeProps);
	};

	const handleOnBlur = (event) => {
		onBlur(event);
		setIsFocused(false);
	};

	const handleOnFocus = (event) => {
		onFocus(event);
		setIsFocused(true);
	};

	return (
		<SwitchView {...props} cx={cx} htmlFor={id}>
			<Backdrop checked={checked} isFocused={isFocused} size={size} />
			<Toggle checked={checked} size={size} />
			<Control
				{...props}
				checked={checked}
				className={styles.inputHidden}
				disabled={disabled}
				id={id}
				onBlur={handleOnBlur}
				onChange={toggle}
				onFocus={handleOnFocus}
				ref={forwardedRef}
			/>
			<VisuallyHidden>{label}</VisuallyHidden>
		</SwitchView>
	);
}

export default connect(Switch);
