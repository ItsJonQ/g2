import { css } from '../style-system';

export function hover(...interpolatedStyles) {
	return css({
		'&:hover': css(...interpolatedStyles),
	});
}

export function active(...interpolatedStyles) {
	return css({
		'&:active': css(...interpolatedStyles),
	});
}

export function focus(...interpolatedStyles) {
	return css({
		'&:focus': css(...interpolatedStyles),
	});
}
