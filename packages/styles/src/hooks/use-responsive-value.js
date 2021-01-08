import { useEffect, useState } from 'react';

import { breakpoints } from '../style-system';

// For SSR
let __window = {};
if (typeof window !== 'undefined') {
	__window = window;
}
const { addEventListener, matchMedia, removeEventListener } = __window;

/**
 * @param {object} [options]
 * @param {number} [options.defaultIndex=0]
 */
export const useBreakpointIndex = (options = {}) => {
	const { defaultIndex = 0 } = options;

	if (typeof defaultIndex !== 'number') {
		throw new TypeError(
			`Default breakpoint index should be a number. Got: ${defaultIndex}, ${typeof defaultIndex}`,
		);
	} else if (defaultIndex < 0 || defaultIndex > breakpoints.length - 1) {
		throw new RangeError(
			`Default breakpoint index out of range. Theme has ${breakpoints.length} breakpoints, got index ${defaultIndex}`,
		);
	}

	const [value, setValue] = useState(defaultIndex);

	useEffect(() => {
		const getIndex = () =>
			breakpoints.filter((bp) => {
				return matchMedia
					? matchMedia(`screen and (min-width: ${bp})`).matches
					: false;
			}).length;

		const onResize = () => {
			const newValue = getIndex();
			if (value !== newValue) {
				setValue(newValue);
			}
		};

		onResize();
		addEventListener('resize', onResize);
		return () => removeEventListener('resize', onResize);
	}, [value]);

	return value;
};

/**
 *
 * @template T
 * @param {(() => (T | undefined)[]) | (T | undefined)[]} values
 * @param {Parameters<useBreakpointIndex>[0]} options
 * @return {T | undefined}
 */
export function useResponsiveValue(values, options = {}) {
	const index = useBreakpointIndex(options);

	if (!Array.isArray(values) && typeof values !== 'function') return values;

	let array = values || [];
	if (typeof values === 'function') {
		array = values();
	}

	return array[index >= array.length ? array.length - 1 : index];
}
