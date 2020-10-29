import { useContextSystem } from '@wp-g2/context';
import { cx } from '@wp-g2/styles';
import { interpolate, noop, useControlledState } from '@wp-g2/utils';
import { useCallback, useMemo } from 'react';

import { useFormGroupContextId } from '../FormGroup';
import * as styles from './Slider.styles';

export function useSlider(props) {
	const {
		className,
		error,
		onChange = noop,
		id: idProp,
		isFocused = false,
		max = 100,
		min = 0,
		size = 'medium',
		style,
		value: valueProp,
		...otherProps
	} = useContextSystem(props, 'Slider');

	const [value, setValue] = useControlledState(valueProp, { initial: 50 });
	const id = useFormGroupContextId(idProp);

	const handleOnChange = useCallback(
		(event) => {
			const next = parseFloat(event.target.value);
			setValue(next);
			onChange(next, { event });
		},
		[onChange, setValue],
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
		onChange: handleOnChange,
		style: componentStyles,
		type: 'range',
		value,
	};
}
