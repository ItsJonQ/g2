import { space } from '../mixins/space';
import { css } from '../style-system';
export { space } from '../mixins/space';

/**
 * @param {number} value
 */
export function margin(value) {
	return css({ margin: space(value) });
}

margin.x = (/** @type {number} */ v) =>
	css({ marginLeft: space(v), marginRight: space(v) });
margin.y = (/** @type {number} */ v) =>
	css({ marginBottom: space(v), marginTop: space(v) });
margin.top = (/** @type {number} */ v) => css({ marginTop: space(v) });
margin.bottom = (/** @type {number} */ v) => css({ marginBottom: space(v) });
margin.left = (/** @type {number} */ v) => css({ marginLeft: space(v) });
margin.right = (/** @type {number} */ v) => css({ marginRight: space(v) });

/**
 * @param {number} value
 */
export function padding(value) {
	return css({ padding: space(value) });
}

padding.x = (/** @type {number} */ v) =>
	css({ paddingLeft: space(v), paddingRight: space(v) });
padding.y = (/** @type {number} */ v) =>
	css({ paddingBottom: space(v), paddingTop: space(v) });
padding.top = (/** @type {number} */ v) => css({ paddingTop: space(v) });
padding.bottom = (/** @type {number} */ v) => css({ paddingBottom: space(v) });
padding.left = (/** @type {number} */ v) => css({ paddingLeft: space(v) });
padding.right = (/** @type {number} */ v) => css({ paddingRight: space(v) });
