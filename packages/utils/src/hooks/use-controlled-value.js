import { isNil } from 'lodash';
import { useState } from 'react';

/**
 * Simplified and improved implementation of useControlledState.
 *
 * @template T
 * @param {object} props
 * @param {T} [props.defaultValue]
 * @param {T} [props.value]
 * @param {(value: T) => void} [props.onChange]
 * @return {[T|undefined, (value: T) => void]}
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
