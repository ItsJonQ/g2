import baseIs from '@itsjonq/is';

export * from '@itsjonq/is';

function isEmpty(o = {}) {
	return Object.keys(o).length === 0;
}

function isNumeric(o) {
	const obj = typeof o === 'string' ? o.replace(/,/g, '') : o;
	return (
		!isNaN(parseFloat(obj)) &&
		!isNaN(Number(obj)) &&
		isFinite(obj) &&
		Object.prototype.toString.call(obj).toLowerCase() !== '[object array]'
	);
}

function isNumericZero(o) {
	return o === 0 || o === '0';
}

baseIs.empty = isEmpty;
baseIs.numeric = isNumeric;
baseIs.numericZero = isNumericZero;

export const is = baseIs;
