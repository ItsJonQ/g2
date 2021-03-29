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
 * @param {ZIndexNamespace} namespace
 */
export function getZIndex(namespace) {
	return Z_INDEX_REGISTRY[namespace];
}

export function getZIndexRegistry() {
	return { ...Z_INDEX_REGISTRY };
}
