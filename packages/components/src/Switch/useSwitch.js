import { Checkbox, Radio } from '@wp-g2/a11y';
import { useContextSystem } from '@wp-g2/context';
import { cx } from '@wp-g2/styles';
import { noop, useControlledState, useUniqueId } from '@wp-g2/utils';
import { useCallback, useState } from 'react';

import { useFormGroupContext, useFormGroupContextId } from '../FormGroup';
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
		id: idProp,
		onBlur = noop,
		onChange = noop,
		onFocus = noop,
		label,
		size = 'medium',
		type = 'checkbox',
		...otherProps
	} = useContextSystem(props, 'Switch');

	const [isFocused, setIsFocused] = useState(false);
	const [checked, setChecked] = useControlledState(checkedProp, {
		initial: defaultValue || false,
	});

	const uniqueId = useUniqueId(useSwitch, 'switch', idProp);
	const { horizontal, id: contextId } = useFormGroupContext();
	const id = useFormGroupContextId(idProp || uniqueId);

	const Component = ControlComponent[type] || Checkbox;

	const classes = cx(
		styles.Switch,
		styles[size],
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
		isFocused,
		label,
		onBlur: handleOnBlur,
		onChange: handleOnChange,
		onFocus: handleOnFocus,
		size,
	};
}
