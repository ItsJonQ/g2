import { isNil } from 'lodash';
import { useState } from 'react';

/**
 * Simplified and improved implementation of useControlledState.
 *
 * @param {object} props
 * @param {string|number} [props.defaultValue]
 * @param {string|number} [props.value]
 * @param {() => void} [props.onChange]
 */
export function useControlledValue({
	defaultValue,
	onChange,
	value: valueProp,
}) {
	const hasValue = !isNil(valueProp);
	const initialValue = hasValue ? valueProp : defaultValue;

	const [state, setState] = useState(initialValue);

	const value = hasValue ? valueProp : state;
	const setValue = hasValue && !isNil(onChange) ? onChange : setState;

	return [value, setValue];
}
