import { Checkbox, Radio } from '@wp-g2/a11y';
import { contextConnect, useContextSystem } from '@wp-g2/context';
import { cx, ui } from '@wp-g2/styles';
import { noop, useControlledState, useUniqueId } from '@wp-g2/utils';
import React, { useState } from 'react';

import { useFormGroupContext } from '../FormGroup';
import { View } from '../View';
import { VisuallyHidden } from '../VisuallyHidden';
import * as styles from './Switch.styles';
import Backdrop from './SwitchBackdrop';
import Toggle from './SwitchToggle';

const ControlComponent = {
	checkbox: Checkbox,
	radio: Radio,
};

function Switch(props, forwardedRef) {
	const {
		checked: checkedProp,
		className,
		disabled,
		defaultValue,
		id: idProp,
		onBlur = noop,
		onChange = noop,
		onFocus = noop,
		label,
		size = 'medium',
		type = 'checkbox',
		...otherProps
	} = useContextSystem(props, forwardedRef);

	const [isFocused, setIsFocused] = useState(false);
	const [checked, setChecked] = useControlledState(checkedProp, {
		initial: defaultValue || false,
	});

	const uniqueId = useUniqueId(Switch, 'switch', idProp);
	const { horizontal, id: contextId } = useFormGroupContext();
	const id = idProp || contextId || uniqueId;

	const Control = ControlComponent[type] || Checkbox;

	const __css = cx(
		styles.Switch,
		styles[size],
		contextId && horizontal && styles.formGroup,
	);

	const toggle = (event) => {
		setChecked(!checked);
		onChange(!checked, { event });
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
		<View as="label" {...otherProps} cx={__css} htmlFor={id}>
			<Backdrop checked={checked} isFocused={isFocused} size={size} />
			<Toggle checked={checked} size={size} />
			<Control
				{...otherProps}
				checked={checked}
				className={styles.inputHidden}
				disabled={disabled}
				id={id}
				onBlur={handleOnBlur}
				onChange={toggle}
				onFocus={handleOnFocus}
				ref={forwardedRef}
				{...ui.$('SwitchInput')}
			/>
			<VisuallyHidden {...ui.$('SwitchLabel')}>{label}</VisuallyHidden>
		</View>
	);
}

export default contextConnect(Switch, 'Switch');
