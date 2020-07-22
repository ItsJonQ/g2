import { useEffect, useState } from 'react';

import { breakpoints } from '../style-system/utils';
import { useTheme } from './useTheme';

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
			breakpoints.filter(
				(bp) =>
					window.matchMedia(`screen and (min-width: ${bp})`).matches,
			).length;

		const onResize = () => {
			const newValue = getIndex();
			if (value !== newValue) {
				setValue(newValue);
			}
		};

		onResize();
		window.addEventListener('resize', onResize);
		return () => window.removeEventListener('resize', onResize);
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
