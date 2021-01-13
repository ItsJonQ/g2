/**
 * Breakpoint values based on Bootstrap
 * https://getbootstrap.com/docs/4.3/layout/overview/#responsive-breakpoints
 */
export const BREAKPOINTS = {
	xl: 1200,
	lg: 992,
	md: 768,
	sm: 576,
	xs: 575,
};

export function getBreakpointValue(breakpoint) {
	if (typeof breakpoint === 'number') {
		return { minWidth: breakpoint };
	}
	if (typeof breakpoint === 'string') {
		const value = BREAKPOINTS[breakpoint];
		return value ? { minWidth: value } : breakpoint;
	}

	return null;
}
