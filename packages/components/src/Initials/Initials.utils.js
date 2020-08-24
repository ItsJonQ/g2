import { is } from '@wp-g2/utils';

export function getInitials(name = '') {
	if (!is.string(name)) return '';

	const names = name
		.split(' ')
		.map((name) => name.charAt(0))
		.filter((name, index) => index < 2)
		.join('');

	return names;
}
