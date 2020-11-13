import { useContextSystem } from '@wp-g2/context';
import { cx } from '@wp-g2/styles';
import {
	interpolate,
	noop,
	parseUnitValue,
	useControlledState,
} from '@wp-g2/utils';
import { useCallback, useMemo, useState } from 'react';

import { useFormGroupContextId } from '../FormGroup';
import * as styles from './Slider.styles';

export function useSlider(props) {
	const {
		className,
		defaultValue,
		error,
		onBlur = noop,
		onChange = noop,
		onFocus = noop,
		id: idProp,
		isFocused: isFocusedProp = false,
		max = 100,
		min = 0,
		size = 'medium',
		style,
		value: valueProp,
		...otherProps
	} = useContextSystem(props, 'Slider');
	const [initialValue] = parseUnitValue(valueProp);
	const [value, setValue] = useControlledState(initialValue, {
		initial: defaultValue || 50,
	});
	const id = useFormGroupContextId(idProp);
	const [isFocused, setIsFocused] = useState(isFocusedProp);

	const handleOnBlur = useCallback(
		(event) => {
			onBlur(event);
			setIsFocused(false);
		},
		[onBlur],
	);

	const handleOnChange = useCallback(
		(event) => {
			const next = parseFloat(event.target.value);
			setValue(next);
			onChange(next, { event });
		},
		[onChange, setValue],
	);

	const handleOnFocus = useCallback(
		(event) => {
			onFocus(event);
			setIsFocused(true);
		},
		[onFocus],
	);

	const currentValue = interpolate(value, [min, max], [0, 100]);
	const componentStyles = {
		...style,
		'--progress': `${currentValue}%`,
	};

	const classes = useMemo(
		() =>
			cx(
				styles.Slider,
				error && styles.error,
				styles[size],
				isFocused && styles.focused,
				error && isFocused && styles.focusedError,
				className,
			),
		[className, error, isFocused, size],
	);

	return {
		...otherProps,
		className: classes,
		id,
		max,
		min,
		onBlur: handleOnBlur,
		onChange: handleOnChange,
		onFocus: handleOnFocus,
		style: componentStyles,
		type: 'range',
		value,
	};
}
