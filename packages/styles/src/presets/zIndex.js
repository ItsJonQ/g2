import { getZIndex, getZIndexRegistry } from '../mixins/zIndex';
import { css } from '../style-system';

/**
 * @param {import('../mixins/zIndex').ZIndexNamespace} namespace
 * @param {number} value
 */
export function zIndex(namespace, value) {
	return css({ zIndex: getZIndex(namespace, value) });
}

zIndex.get = getZIndexRegistry;
