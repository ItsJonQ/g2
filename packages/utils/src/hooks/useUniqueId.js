import { useMemo } from 'react';

const uniqueIdMap = new WeakMap();

/**
 * Creates a new id for a given object.
 *
 * @param {Object} object Object reference to create an id for.
 */
function createId(object) {
	const instances = uniqueIdMap.get(object) || 0;
	uniqueIdMap.set(object, instances + 1);

	return instances;
}

/**
 * Provides a unique instance ID.
 *
 * @param {Object} object Object reference to create an id for.
 * @param {string} prefix Prefix for the unique id.
 */
export function useUniqueId(object, prefix, preferredId) {
	return useMemo(() => {
		if (preferredId) return preferredId;
		const id = createId(object);

		return prefix ? `${prefix}-${id}` : id;
	}, [object, preferredId, prefix]);
}
