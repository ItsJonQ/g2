import { css } from '../style-system';

/**
 * @param  {Parameters<css>} interpolatedStyles
 */
export function hover(...interpolatedStyles) {
	return css({
		'&:hover': css(...interpolatedStyles),
	});
}

/**
 * @param  {Parameters<css>} interpolatedStyles
 */
export function active(...interpolatedStyles) {
	return css({
		'&:active': css(...interpolatedStyles),
	});
}

/**
 * @param  {Parameters<css>} interpolatedStyles
 */
export function focus(...interpolatedStyles) {
	return css({
		'&:focus': css(...interpolatedStyles),
	});
}
