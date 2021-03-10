export function getRtl() {
	if (typeof window !== 'undefined') {
		return window?.document?.dir === 'rtl';
	}
	return false;
}

export const paddingStart = () => (getRtl() ? 'padding-right' : 'padding-left');
export const paddingEnd = () => (getRtl() ? 'padding-left' : 'padding-right');
export const marginStart = () => (getRtl() ? 'margin-right' : 'margin-left');
export const marginEnd = () => (getRtl() ? 'margin-left' : 'margin-right');
export const borderTopStartRadius = () =>
	getRtl() ? 'border-top-right-radius' : 'border-top-left-radius';
export const borderTopEndRadius = () =>
	getRtl() ? 'border-top-left-radius' : 'border-top-right-radius';
export const borderBottomStartRadius = () =>
	getRtl() ? 'border-bottom-right-radius' : 'border-bottom-left-radius';
export const borderBottomEndRadius = () =>
	getRtl() ? 'border-bottom-left-radius' : 'border-bottom-right-radius';
