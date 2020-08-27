import { getZIndex, getZIndexRegistry } from '../mixins/zIndex';
import { css } from '../style-system';

export function zIndex(namespace, value) {
	return css({ zIndex: getZIndex(namespace, value) });
}

zIndex.get = getZIndexRegistry;
