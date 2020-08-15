import { alignment } from './alignments';
import { animation } from './animations';
import { background } from './backgrounds';
import { border, borderRadius } from './borders';
import { font } from './fonts';
import { active, focus, hover } from './interactions';
import { opacity } from './opacity';
import { position } from './positions';
import { shadow } from './shadows';
import { margin, padding } from './spacing';
import { offset, rotate, scale } from './transforms';

export const system = {
	active,
	alignment,
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
	position,
	rotate,
	scale,
	shadow,
};

// TODO: Testing ui alias for system
export const ui = system;
