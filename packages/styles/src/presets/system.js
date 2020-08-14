import { animation } from './animations';
import { background } from './backgrounds';
import { border, borderRadius } from './borders';
import { font } from './fonts';
import { active, focus, hover } from './interactions';
import { offset } from './offsets';
import { opacity } from './opacity';
import { shadow } from './shadows';
import { margin, padding } from './spacing';

export const system = {
	active,
	animation,
	background,
	border,
	borderRadius,
	focus,
	font,
	hover,
	margin,
	offset,
	opacity,
	padding,
	shadow,
};

// TODO: Testing ui alias for system
export const ui = system;
