export { default as kebabCase } from 'lodash.kebabcase';
export { default as capitalize } from 'lodash.capitalize';
export { default as upperFirst } from 'lodash.upperfirst';

/**
 * Repeats a character x amount of times.
 * @param {string} char Character to repeat.
 * @param {number} n Number of times to repeat.
 * @return {string} String with repeated characters
 */
export function repeat(char, n, a) {
	return (a = []).join((a[n - 1] = char));
}

export function camel2hyphen(str) {
	return str
		.replace(/[A-Z]/g, function (match) {
			return '-' + match.toLowerCase();
		})
		.toLowerCase();
}
