import {
	isArray,
	isBoolean,
	isDate,
	isEmpty,
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
 * @param {any} o
 * @return {boolean}
 */
const numeric = (o) => {
	const obj = typeof o === 'string' ? o.replace(/,/g, '') : o;
	return (
		!isNaN(parseFloat(obj)) &&
		!isNaN(Number(obj)) &&
		isFinite(obj) &&
		Object.prototype.toString.call(obj).toLowerCase() !== '[object array]'
	);
};

/**
 * @param {any} o
 * @return {boolean}
 */
const numericZero = (o) => {
	return o === 0 || o === '0';
};

export const is = {
	/** @type {(o: any) => o is Blob} */
	blob: (o) => o instanceof Blob,
	/**
	 * @template T
	 * @param {T} o
	 * @return {T is Exclude<T, undefined | null>}
	 */
	defined: (o) => !isNil(o),
	/** @type {(o: any) => o is File} */
	file: (o) => o instanceof File,
	numeric,
	numericZero,

	/**
	 * Re-exports from lodash
	 */
	array: isArray,
	boolean: isBoolean,
	date: isDate,
	empty: isEmpty,
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
