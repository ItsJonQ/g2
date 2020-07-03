export * from '@itsjonq/is';

export function isEmpty(o = {}) {
	return Object.keys(o).length === 0;
}
