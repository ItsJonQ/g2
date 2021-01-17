import { useEffect, useRef } from 'react';

/**
 * Creates a reference for a prop. This is useful for preserving dependency
 * memoization for hooks like useCallback.
 *
 * @example
 * ```js
 * // Referencing a simple prop, used in a useCallback function.
 * const valueRef = usePropRef(value)
 *
 * const increment = React.useCallback(() => {
 *   const value = valueRef.current
 *   onChange(value + 1)
 * }, [onChange, valueRef])
 * ```
 *
 * ---
 *
 * Multiple props can be passed in using in `object`.
 *
 * @example
 * ```js
 * const propRefs = usePropRef({ value, step })
 *
 * const increment = React.useCallback(() => {
 *   const { value, step } = propRefs.current
 *   onChange(value + step)
 * }, [onChange, propRefs])
 * ```
 */
export function usePropRef(prop) {
	const propRef = useRef(prop);

	useEffect(() => {
		propRef.current = prop;
	}, [prop]);

	return propRef;
}
