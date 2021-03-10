import { space } from '../mixins/space';
import { css } from '../style-system';
export { space } from '../mixins/space';

export function getRtl() {
	return true;
	if (typeof window !== 'undefined') {
		return window?.document?.dir === 'rtl';
	}
	return false;
}

/**
 * @param {import('react').ReactText} value
 */
export function margin(value) {
	return css({ margin: space(value) });
}

margin.x = (/** @type {import('react').ReactText} */ v) =>
	css({ marginLeft: space(v), marginRight: space(v) });
margin.y = (/** @type {import('react').ReactText} */ v) =>
	css({ marginBottom: space(v), marginTop: space(v) });
margin.top = (/** @type {import('react').ReactText} */ v) =>
	css({ marginTop: space(v) });
margin.bottom = (/** @type {import('react').ReactText} */ v) =>
	css({ marginBottom: space(v) });
margin.start = (/** @type {import('react').ReactText} */ v) =>
	getRtl() ? css({ marginRight: space(v) }) : css({ marginLeft: space(v) });
margin.end = (/** @type {import('react').ReactText} */ v) =>
	getRtl() ? css({ marginLeft: space(v) }) : css({ marginRight: space(v) });

/**
 * @param {import('react').ReactText} value
 */
export function padding(value) {
	return css({ padding: space(value) });
}

padding.x = (/** @type {import('react').ReactText} */ v) =>
	css({ paddingLeft: space(v), paddingRight: space(v) });
padding.y = (/** @type {import('react').ReactText} */ v) =>
	css({ paddingBottom: space(v), paddingTop: space(v) });
padding.top = (/** @type {import('react').ReactText} */ v) =>
	css({ paddingTop: space(v) });
padding.bottom = (/** @type {import('react').ReactText} */ v) =>
	css({ paddingBottom: space(v) });
padding.start = (/** @type {import('react').ReactText} */ v) =>
	getRtl() ? css({ paddingRight: space(v) }) : css({ paddingLeft: space(v) });
padding.end = (/** @type {import('react').ReactText} */ v) =>
	getRtl() ? css({ paddingLeft: space(v) }) : css({ paddingRight: space(v) });

export const start = (/** @type {import('react').ReactText} */ v) =>
	getRtl() ? css({ right: v }) : css({ left: v });
export const end = (/** @type {import('react').ReactText} */ v) =>
	getRtl() ? css({ left: v }) : css({ right: v });

export const direction = (
	/** @type {import('react').CSSProperties['flexDirection']} */ direction,
) => {
	const isRtl = getRtl();
	if (!isRtl) return direction;

	switch (direction) {
		case 'column':
			return 'column-reverse';
		case 'row':
			return 'row-reverse';
		case 'column-reverse':
			return 'column';
		case 'row-reverse':
			return 'row';
		default:
			return direction;
	}
};
