import * as _is from '@itsjonq/is';

export const is = _is;

export function isEmpty(o = {}) {
	return Object.keys(o).length === 0;
}
