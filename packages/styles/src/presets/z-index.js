import { getZIndex, getZIndexRegistry } from '../mixins/z-index';
import { css } from '../style-system';

/**
 * @param {import('../mixins/z-index').ZIndexNamespace} namespace
 * @param {number} value
 */
export function zIndex(namespace, value) {
	return css({ zIndex: getZIndex(namespace, value) });
}

zIndex.get = getZIndexRegistry;
