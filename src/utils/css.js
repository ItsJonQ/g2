import { is } from './is';

export function toPx(value) {
	return is.number(value) ? `${value}px` : value;
}
