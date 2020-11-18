import { is } from '@wp-g2/utils';

/**
 * Combines CSS values. Useful for complex shorthand values,
 * functions (e.g. calc()), and mixed string/JS values.
 *
 * @example
 * ```
 * const boxShadow = flow(
 * 	'0 1px',
 * 	get('boxShadowSpreadValue'),
 * 	'2px',
 * 	get('boxShadowColor')
 * )
 * ```
 *
 * ##### Combining groups
 *
 * Groups (Array<string>) can be passed into `flow()`, which are combined and
 * comma separated. Useful for compounded CSS values (e.g. `box-shadow`).
 *
 * @example
 * ```
 * const boxShadow = flow([
 * 		'0 1px',
 * 		get('boxShadowSpreadValue'),
 * 		'2px',
 * 		get('boxShadowColor')
 * 	], [
 * 		'0 10px',
 * 		get('boxShadowSpreadValue'),
 * 		'20px',
 * 		get('boxShadowColor')
 * 	]
 * )
 * ```
 *
 * @param {...string|Array<string>} args CSS values to combine.
 * @returns {string} The combined CSS string value.
 */
export function flow(...args) {
	const hasArrays = !!args.find(is.array);

	if (!hasArrays) {
		return args.join(' ');
	}

	const results = [];

	for (const arg of args) {
		if (is.array(arg)) {
			results.push(arg.join(' '));
		}
	}

	return results.join(',');
}

export function flowComma(...args) {
	return args.join(',');
}

export function calc(...args) {
	return flow('calc(', ...args, ')');
}

export function cubicBezier(...args) {
	return flowComma('cubic-bezier(', ...args, ')');
}

export function hsl(...args) {
	return flowComma('hsl(', ...args, ')');
}

export function hsla(...args) {
	return flowComma('hsla(', ...args, ')');
}

export function linearGradient(...args) {
	return flowComma('linear-gradient(', ...args, ')');
}

export function radialGradient(...args) {
	return flowComma('radial-gradient(', ...args, ')');
}

export function rgb(...args) {
	return flowComma('rgb(', ...args, ')');
}

export function rgba(...args) {
	return flowComma('rgba(', ...args, ')');
}
