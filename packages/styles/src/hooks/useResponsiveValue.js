import { useTheme } from '@wp-g2/create-styles';
import { useEffect, useState } from 'react';

import { breakpoints } from '../style-system';

// For SSR
let __window = {};
if (typeof window !== 'undefined') {
	__window = window;
}
const { addEventListener, matchMedia, removeEventListener } = __window;

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

export function useResponsiveValue(values, options = {}) {
	const { theme } = useTheme();
	const index = useBreakpointIndex(options);

	if (!Array.isArray(values)) return values;

	const array = typeof values === 'function' ? values(theme) : values;
	return array[index >= array.length ? array.length - 1 : index];
}
