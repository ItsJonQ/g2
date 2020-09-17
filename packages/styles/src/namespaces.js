export const COMPONENT_NAMESPACE = 'data-g2-component';

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
	return { [COMPONENT_NAMESPACE]: componentName };
}
