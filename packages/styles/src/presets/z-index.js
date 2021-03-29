import { getZIndex, getZIndexRegistry } from '../mixins/z-index';
import { css } from '../style-system';

/**
 * @param {import('../mixins/z-index').ZIndexNamespace} namespace
 */
export function zIndex(namespace) {
	return css({ zIndex: getZIndex(namespace) });
}

zIndex.get = getZIndexRegistry;
