/**
 * @param {Record<any, any>} objA
 * @param {Record<any, any>} objB
 * @return {boolean}
 */
export function simpleEqual(objA, objB) {
	return JSON.stringify(objA) === JSON.stringify(objB);
}
