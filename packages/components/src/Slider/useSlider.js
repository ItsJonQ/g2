import { useContextSystem } from '@wp-g2/context';
import { cx } from '@wp-g2/styles';
import {
	createUnitValue,
	interpolate,
	is,
	noop,
	parseUnitValue,
	useControlledState,
} from '@wp-g2/utils';
import { useCallback, useMemo, useState } from 'react';

import { useFormGroupContextId } from '../FormGroup';
import * as styles from './Slider.styles';

/**
 * @typedef OwnProps
 * @property {import('../utils/types').SizeRangeReduced} [size='medium'] Determines the size of `Slider`.
 */

/** @typedef {import('../BaseField/useBaseField').Props & import('../utils/types').FormElementProps<number> & OwnProps} Props */

/**
 * @param {import('@wp-g2/create-styles').ViewOwnProps<Props, 'input'>} props
 */
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
	const [initialValue, initialUnit] = parseUnitValue(valueProp);
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
			const nextValue = parseFloat(event.target.value);
			if (!is.numeric(nextValue)) return;

			let next = nextValue;

			if (initialUnit) {
				next = createUnitValue(nextValue, initialUnit);
			}

			setValue(nextValue);
			onChange(next, { event });
		},
		[onChange, setValue, initialUnit],
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
