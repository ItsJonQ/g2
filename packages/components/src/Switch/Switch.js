import { Checkbox, Radio } from '@wp-g2/a11y';
import {
	connectAndForwardRefComponent,
	useContextSystem,
} from '@wp-g2/context';
import { ui } from '@wp-g2/styles';
import { noop, useControlledState, useUniqueId } from '@wp-g2/utils';
import React, { useState } from 'react';

import { useFormGroupContext } from '../FormGroup';
import { VisuallyHidden } from '../VisuallyHidden';
import * as styles from './Switch.styles';
import Backdrop from './SwitchBackdrop';
import Toggle from './SwitchToggle';

const { SwitchView } = styles;

const ControlComponent = {
	checkbox: Checkbox,
	radio: Radio,
};

function Switch(componentProps, forwardedRef) {
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
		...props
	} = useContextSystem(componentProps, forwardedRef);

	const [isFocused, setIsFocused] = useState(false);
	const [checked, setChecked] = useControlledState(checkedProp, {
		initial: defaultValue || false,
	});

	const uniqueId = useUniqueId(Switch, 'switch', idProp);
	const { horizontal, id: contextId } = useFormGroupContext();
	const id = idProp || contextId || uniqueId;

	const Control = ControlComponent[type] || Checkbox;

	const __css = [styles[size], contextId && horizontal && styles.formGroup];

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
		<SwitchView {...props} cx={__css} htmlFor={id}>
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
				{...ui.$('SwitchInput')}
			/>
			<VisuallyHidden {...ui.$('SwitchLabel')}>{label}</VisuallyHidden>
		</SwitchView>
	);
}

export default connectAndForwardRefComponent(Switch, 'Switch');
