/**
 * Creates a dedicated context namespace HTML attribute for components.
 * ns is short for "namespace"
 *
 * @example
 * ```jsx
 * <div {...ns('Container')} />
 * ```
 *
 * @param {string} componentName The name for the component.
 * @returns {object} A props object with the namespaced HTML attribute.
 */
export function ns(componentName) {
	return { 'data-g2-component': componentName };
}

/**
 * Creates a dedicated connected context namespace HTML attribute for components.
 * ns is short for "namespace"
 *
 * @example
 * ```jsx
 * <div {...cns()} />
 * ```
 *
 * @returns {object} A props object with the namespaced HTML attribute.
 */
export function cns() {
	return { 'data-g2-c16t': true };
}
