import {
	isArray,
	isBoolean,
	isDate,
	isFunction,
	isMap,
	isNaN,
	isNil,
	isNull,
	isNumber,
	isObject,
	isObjectLike,
	isPlainObject,
	isRegExp,
	isSet,
	isString,
	isSymbol,
	isUndefined,
	isWeakMap,
	isWeakSet,
} from 'lodash';

/**
 * Returns the object type of the given payload
 */
function isType(type) {
	return (o) => {
		return {}.toString.call(o).slice(8, -1) === type;
	};
}

const numeric = (o) => {
	const obj = typeof o === 'string' ? o.replace(/,/g, '') : o;
	return (
		!isNaN(parseFloat(obj)) &&
		!isNaN(Number(obj)) &&
		isFinite(obj) &&
		Object.prototype.toString.call(obj).toLowerCase() !== '[object array]'
	);
};

const numericZero = (o) => {
	return o === 0 || o === '0';
};

const empty = (o = {}) => {
	return Object.keys(o).length === 0;
};

export const is = {
	blob: isType('Blob'),
	defined: (o) => !isNil(o),
	empty,
	file: isType('File'),
	numeric,
	numericZero,

	/**
	 * Re-exports from lodash
	 */
	array: isArray,
	boolean: isBoolean,
	date: isDate,
	function: isFunction,
	map: isMap,
	nan: isNaN,
	nil: isNil,
	number: isNumber,
	null: isNull,
	object: isObject,
	objectLike: isObjectLike,
	plainObject: isPlainObject,
	regExp: isRegExp,
	set: isSet,
	string: isString,
	symbol: isSymbol,
	undefined: isUndefined,
	weakSet: isWeakSet,
	weakMap: isWeakMap,
};

export default is;
