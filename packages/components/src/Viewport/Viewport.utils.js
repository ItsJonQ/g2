import { is } from '@wp-g2/utils';

/**
 * Breakpoint values based on Bootstrap
 * https://getbootstrap.com/docs/4.3/layout/overview/#responsive-breakpoints
 */
export const BREAKPOINTS = {
	lg: 992,
	md: 768,
	sm: 576,
	xl: 1200,
	xs: 575,
};

export function getBreakpointValue(breakpoint) {
	if (is.number(breakpoint)) {
		return { minWidth: breakpoint };
	}
	if (is.string(breakpoint)) {
		const value = BREAKPOINTS[breakpoint];
		return value ? { minWidth: value } : breakpoint;
	}

	return null;
}
