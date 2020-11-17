import { useContextSystem } from '@wp-g2/context';
import { cx } from '@wp-g2/styles';
import { noop, useControlledState, useUniqueId } from '@wp-g2/utils';
import { useCallback, useState } from 'react';
import { Checkbox, Radio } from 'reakit';

import { useFormGroupContext } from '../FormGroup';
import * as styles from './Switch.styles';

const ControlComponent = {
	checkbox: Checkbox,
	radio: Radio,
};

export function useSwitch(props) {
	const {
		checked: checkedProp,
		className,
		defaultValue,
		disabled = false,
		id: idProp,
		isFocused: isFocusedProp = false,
		error,
		onBlur = noop,
		onChange = noop,
		onFocus = noop,
		label,
		size = 'medium',
		type = 'checkbox',
		...otherProps
	} = useContextSystem(props, 'Switch');

	const [isFocused, setIsFocused] = useState(isFocusedProp);
	const [checked, setChecked] = useControlledState(checkedProp, {
		initial: defaultValue || false,
	});

	const uniqueId = useUniqueId(useSwitch, 'switch', idProp);
	const { horizontal, id: contextId } = useFormGroupContext();
	const id = idProp || contextId || uniqueId;

	const Component = ControlComponent[type] || Checkbox;

	const classes = cx(
		styles.Switch,
		styles[size],
		disabled && styles.disabled,
		contextId && horizontal && styles.formGroup,
		className,
	);

	const handleOnChange = useCallback(
		(event) => {
			const next = event.target.checked;
			setChecked(next);
			onChange(next, { event });
		},
		[onChange, setChecked],
	);

	const handleOnBlur = useCallback(
		(event) => {
			onBlur(event);
			setIsFocused(false);
		},
		[onBlur],
	);

	const handleOnFocus = useCallback(
		(event) => {
			onFocus(event);
			setIsFocused(true);
		},
		[onFocus],
	);

	return {
		...otherProps,
		checked,
		className: classes,
		Component,
		id,
		disabled,
		error,
		isFocused,
		label,
		onBlur: handleOnBlur,
		onChange: handleOnChange,
		onFocus: handleOnFocus,
		size,
	};
}
