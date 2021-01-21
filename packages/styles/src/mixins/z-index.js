// Z-Index System

/**
 * Roughly matching the z-index layers index from @wordpress/base-styles
 * https://github.com/WordPress/gutenberg/blob/master/packages/base-styles/_z-index.scss
 */
const Z_INDEX_REGISTRY = {
	Tooltip: 1000002,
	Popover: 1000000,
	Dropdown: 1000000,
	Modal: 100000,
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
