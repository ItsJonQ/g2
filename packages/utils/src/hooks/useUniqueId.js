import { useMemo } from 'react';

/**
 * @type {WeakMap<any, number>}
 */
const uniqueIdMap = new WeakMap();

/**
 * Creates a new id for a given object.
 *
 * @param {any} object Object reference to create an id for.
 * @return {number}
 */
function createId(object) {
	const instances = uniqueIdMap.get(object) || 0;
	uniqueIdMap.set(object, instances + 1);

	return instances;
}

/**
 * Provides a unique instance ID.
 *
 * @param {any} object Object reference to create an id for.
 * @param {string} prefix Prefix for the unique id.
 * @return {string}
 */
export function useUniqueId(object, prefix, preferredId) {
	return useMemo(() => {
		if (preferredId) return preferredId;
		const id = createId(object);

		return prefix ? `${prefix}-${id}` : id;
	}, [object, preferredId, prefix]);
}
