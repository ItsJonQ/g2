// Z-Index System
const Z_INDEX_REGISTRY = {
	Tooltip: 999999,
	Popover: 9999,
	Dropdown: 9998,
	Modal: 999,
	ControlFocus: 1,
};

/** @typedef {keyof Z_INDEX_REGISTRY} ZIndexNamespace */

/**
 *
 * @param {ZIndexNamespace} namespace
 * @param {number} fallback
 */
export function getZIndex(namespace, fallback) {
	// Accounts for direct z-index value (number) usage.
	if (typeof namespace === 'number') {
		return namespace;
	}
	// Quick return for invalid namespaces
	if (typeof namespace !== 'string') {
		return fallback;
	}

	if (!Z_INDEX_REGISTRY[namespace] && typeof fallback === 'number') {
		Z_INDEX_REGISTRY[namespace] = fallback;
	}

	return Z_INDEX_REGISTRY[namespace];
}

export function getZIndexRegistry() {
	return { ...Z_INDEX_REGISTRY };
}
