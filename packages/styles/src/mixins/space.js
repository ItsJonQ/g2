import { is } from '@wp-g2/utils';

import { get } from '../system';

export function space(value = 1) {
	return is.number(value) ? `calc(${get('gridBase')} * ${value})` : value;
}
