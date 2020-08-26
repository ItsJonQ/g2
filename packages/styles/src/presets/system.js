import { alignment } from './alignments';
import { animation } from './animations';
import { background } from './backgrounds';
import { border, borderRadius } from './borders';
import { frame } from './dimensions';
import { font } from './fonts';
import { active, focus, hover } from './interactions';
import { opacity } from './opacity';
import { position } from './positions';
import { shadow } from './shadows';
import { margin, padding } from './spacing';
import { offset, rotate, scale, scaleX, scaleY } from './transforms';
import { zIndex } from './zIndex';

export const system = {
	active,
	alignment,
	animation,
	background,
	border,
	borderRadius,
	focus,
	font,
	frame,
	hover,
	margin,
	offset,
	opacity,
	padding,
	position,
	rotate,
	scale,
	scaleX,
	scaleY,
	shadow,
	zIndex,
};

// TODO: Testing ui alias for system
export const ui = system;
