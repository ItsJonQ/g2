import { space } from '../mixins/space';
import { css } from '../style-system';
export { space } from '../mixins/space';

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
margin.left = (/** @type {import('react').ReactText} */ v) =>
	css({ marginLeft: space(v) });
margin.right = (/** @type {import('react').ReactText} */ v) =>
	css({ marginRight: space(v) });

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
padding.left = (/** @type {import('react').ReactText} */ v) =>
	css({ paddingLeft: space(v) });
padding.right = (/** @type {import('react').ReactText} */ v) =>
	css({ paddingRight: space(v) });
