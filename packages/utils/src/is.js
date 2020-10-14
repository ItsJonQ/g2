import baseIs from '@itsjonq/is';

export * from '@itsjonq/is';

baseIs.empty = function (o = {}) {
	return Object.keys(o).length === 0;
};

export function isEmpty(o = {}) {
	return Object.keys(o).length === 0;
}

export const is = baseIs;
