import { is } from '@wp-g2/utils';

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
	if (is.number(namespace)) {
		return namespace;
	}
	// Quick return for invalid namespaces
	if (!is.string(namespace)) {
		return fallback;
	}

	if (!Z_INDEX_REGISTRY[namespace] && is.number(fallback)) {
		Z_INDEX_REGISTRY[namespace] = fallback;
	}

	return Z_INDEX_REGISTRY[namespace];
}

export function getZIndexRegistry() {
	return { ...Z_INDEX_REGISTRY };
}
