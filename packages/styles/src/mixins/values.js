/**
 * @param {string | number} value
 * @param {number} min
 * @param {number} max
 * @return {string}
 */
export function getClampValue(value, min, max) {
	return `max(${min}, min(${max}, ${value}))`;
}
