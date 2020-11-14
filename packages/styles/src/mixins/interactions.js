import { css } from '../style-system';

/**
 * @param  {import('create-emotion').Interpolation[]} interpolatedStyles
 */
export function hover(...interpolatedStyles) {
	return css({
		'&:hover': css(...interpolatedStyles),
	});
}

/**
 * @param  {import('create-emotion').Interpolation[]} interpolatedStyles
 */
export function active(...interpolatedStyles) {
	return css({
		'&:active': css(...interpolatedStyles),
	});
}

/**
 * @param  {import('create-emotion').Interpolation[]} interpolatedStyles
 */
export function focus(...interpolatedStyles) {
	return css({
		'&:focus': css(...interpolatedStyles),
	});
}
