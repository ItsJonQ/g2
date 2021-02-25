import _ from 'lodash';

/**
 * Checks to see if a value is a numeric value (`number` or `string`).
 *
 * @param {any} o
 *
 * @return {boolean} Whether value is numeric.
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
 * Checks to see if a value is either `0` or `'0'`.
 *
 * @param {any} o
 *
 * @return {boolean} Whether value is a numeric `0`.
 */
const numericZero = (o) => {
	return o === 0 || o === '0';
};

/**
 * Checks to see if a value is not undefined and not null.
 *
 * @template T
 * @param {T} o
 *
 * @return {o is Exclude<T, undefined | null>} Whether value is defined.
 */
const defined = (o) => !_.isNil(o);

/**
 * Checks if a value is empty, null, or undefined.
 *
 * @param {any} value The value to check.
 *
 * @return {boolean} Whether value is empty.
 */
function valueEmpty(value) {
	const isEmptyString = value === '';
	return !is.defined(value) || isEmptyString;
}

/**
 * A collection of type checks.
 */
export const is = {
	/** @type {(o: any) => o is Blob} */
	blob: (o) => o instanceof Blob,
	defined,
	/** @type {(o: any) => o is File} */
	file: (o) => o instanceof File,
	numeric,
	numericZero,
	valueEmpty,

	// This is safe because we only accept Interpolation rather than any
	// _.isPlainObject(TemplateStringsArray) -> false
	// _.isPlainObject is also `false` for the rest of the values that `Interpolation` covers except for `ObjectInterpolation` :)
	/** @type {(o: TemplateStringsArray | import('create-emotion').Interpolation) => o is import('create-emotion').ObjectInterpolation} */
	objectInterpolation: (o) => _.isPlainObject(o),

	/**
	 * Re-exports from lodash
	 */
	array: _.isArray,
	boolean: _.isBoolean,
	date: _.isDate,
	empty: _.isEmpty,
	function: _.isFunction,
	map: _.isMap,
	nan: isNaN,
	nil: _.isNil,
	number: _.isNumber,
	null: _.isNull,
	object: _.isObject,
	objectLike: _.isObjectLike,
	plainObject: _.isPlainObject,
	regExp: _.isRegExp,
	set: _.isSet,
	string: _.isString,
	symbol: _.isSymbol,
	undefined: _.isUndefined,
	weakSet: _.isWeakSet,
	weakMap: _.isWeakMap,
};

export default is;
