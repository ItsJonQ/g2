import { is } from './is';
import classNames from 'classnames';

export const classnames = classNames;
export const cx = classNames;

export function toPx(value) {
	return is.number(value) ? `${value}px` : value;
}
