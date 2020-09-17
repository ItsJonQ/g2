import { is } from '@wp-g2/utils';

import { COMPONENT_NAMESPACE } from '../namespaces';

export function getSelector(ComponentName) {
	if (!is.string(ComponentName)) return '';

	return `[${COMPONENT_NAMESPACE}="${ComponentName}"]`;
}

// Alias
export const $ = getSelector;
