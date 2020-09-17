import { get } from '../core';
import { alignment } from './alignments';
import { animation } from './animations';
import { background } from './backgrounds';
import { border, borderRadius } from './borders';
import { frame } from './dimensions';
import { font } from './fonts';
import { active, focus, hover } from './interactions';
import { mode } from './modes';
import { opacity } from './opacity';
import { position } from './positions';
import { shadow } from './shadows';
import { margin, padding, space } from './spacing';
import { $ } from './styleQuery';
import { offset, rotate, scale, scaleX, scaleY } from './transforms';
import { value } from './values';
import { zIndex } from './zIndex';

export const ui = {
	$,
	active,
	alignment,
	animation,
	background,
	border,
	borderRadius,
	focus,
	font,
	frame,
	get,
	hover,
	margin,
	mode,
	offset,
	opacity,
	padding,
	position,
	rotate,
	scale,
	scaleX,
	scaleY,
	shadow,
	space,
	value,
	zIndex,
};
