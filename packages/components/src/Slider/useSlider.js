import { useContextSystem } from '@wp-g2/context';
import { cx } from '@wp-g2/styles';
import { interpolate, noop, useControlledState } from '@wp-g2/utils';
import { useCallback } from 'react';

import { useFormGroupContext } from '../FormGroup';
import * as styles from './Slider.styles';

export function useSlider(props) {
	const {
		className,
		onChange = noop,
		id: idProp,
		max = 100,
		min = 0,
		size = 'medium',
		style,
		value: valueProp,
		...otherProps
	} = useContextSystem(props, 'Slider');

	const [value, setValue] = useControlledState(valueProp, { initial: 50 });
	const { id: contextId } = useFormGroupContext();
	const id = idProp || contextId;

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

	const classes = cx(styles.Slider, styles[size], className);

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
